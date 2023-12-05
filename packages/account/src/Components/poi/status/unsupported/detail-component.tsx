import React from 'react';
import { Loading, Icon, Text } from '@deriv/components';
import { localize } from '@deriv/translations';
import { AUTH_STATUS_CODES, isMobile, WS } from '@deriv/shared';
import PoiUnsupportedFailed from '../../../poi-unsupported-failed';
import uploadFile from '../../../file-uploader-container/upload-file';
import OnfidoUpload from '../../../../Sections/Verification/ProofOfIdentity/onfido-sdk-view-container';
import CardDetails from './card-details';
import { SELFIE_DOCUMENT, getDocumentIndex } from './constants';
import { FormikValues } from 'formik';
import VerificationStatus from '../../../verification-status/verification-status';
import { getUploadCompleteStatusMessages } from '../../../../Sections/Verification/ProofOfIdentity/proof-of-identity-configs';

const STATUS = {
    IS_UPLOADING: 'IS_UPLOADING',
    IS_COMPLETED: 'IS_COMPLETED',
    IS_FAILED: 'IS_FAILED',
};

type TDetailComponent = {
    document: ReturnType<typeof getDocumentIndex>[number];
    onClickBack: () => void;
    root_class: string;
    country_code_key?: string;
    height?: string | number;
    handleComplete?: () => void;
    is_onfido_supported?: boolean;
    is_from_external?: boolean;
    setIsCfdPoiCompleted?: () => void;
    is_mt5?: boolean;
    handlePOIforMT5Complete?: () => void;
};

const DetailComponent = ({
    document,
    onClickBack,
    root_class,
    country_code_key,
    height,
    handleComplete,
    is_onfido_supported,
    is_from_external,
    setIsCfdPoiCompleted,
    is_mt5,
    handlePOIforMT5Complete,
    ...props
}: TDetailComponent) => {
    const [status, setStatus] = React.useState('');
    const [response_error, setError] = React.useState('');

    const manual_upload_complete_status_content = getUploadCompleteStatusMessages(
        AUTH_STATUS_CODES.PENDING,
        { needs_poa: false, is_manual_upload: true },
        false,
        true
    );

    let is_any_failed = false;

    const uploadFiles = (data: FormikValues) =>
        new Promise((resolve, reject) => {
            const docs = document.details.documents.map((item: FormikValues) => item.name);
            const files = Object.values(data).filter(item => [...docs, SELFIE_DOCUMENT.name].includes(item.name));
            const files_length = files.length;
            let file_to_upload_index = 0;
            const results: object[] = [];
            const uploadNext = () => {
                const item = files[file_to_upload_index];
                const { file, document_type, pageType, lifetime_valid } = item;
                const expiration_date =
                    typeof data.expiry_date?.format === 'function' ? data.expiry_date.format('YYYY-MM-DD') : undefined;
                uploadFile(file, WS.getSocket, {
                    document_type,
                    page_type: pageType,
                    expiration_date,
                    document_id: data.document_id || '',
                    lifetime_valid: +(lifetime_valid && !expiration_date),
                    document_issuing_country: country_code_key,
                })
                    .then(response => {
                        file_to_upload_index += 1;
                        if (response.warning || response.error) {
                            is_any_failed = true;
                            setStatus(STATUS.IS_FAILED);
                            setError(
                                response.message || (response.error ? response.error.message : localize('Failed'))
                            );
                            if (file_to_upload_index < files_length) {
                                uploadNext();
                            }
                        } else if (file_to_upload_index < files_length) {
                            results.push(response);
                            uploadNext();
                        } else {
                            resolve(results);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            };

            uploadNext();
        });

    const onComplete = (values: FormikValues) => {
        setStatus(STATUS.IS_UPLOADING);
        uploadFiles(values)
            .then(() => {
                if (!is_any_failed) {
                    if (is_mt5) {
                        handlePOIforMT5Complete?.();
                    } else {
                        setStatus(STATUS.IS_COMPLETED);
                    }
                }
            })
            .catch(error => {
                setStatus(STATUS.IS_FAILED);
                setError(error.message);
            });
    };

    switch (status) {
        case STATUS.IS_UPLOADING:
            return <Loading is_fullscreen={false} is_slow_loading status={[localize('Uploading documents')]} />;
        case STATUS.IS_COMPLETED:
            return (
                <VerificationStatus
                    icon={manual_upload_complete_status_content.icon}
                    is_mobile={isMobile()}
                    status_description={manual_upload_complete_status_content.description}
                    status_title={manual_upload_complete_status_content.title}
                />
            );
        case STATUS.IS_FAILED:
            return <PoiUnsupportedFailed error={response_error} />;
        default:
            return (
                <React.Fragment>
                    {is_onfido_supported ? (
                        <React.Fragment>
                            <div className={`${root_class}__detail-header`} onClick={onClickBack}>
                                <Icon icon='IcArrowLeftBold' />
                                <Text
                                    as='p'
                                    size='xs'
                                    weight='bold'
                                    color='prominent'
                                    className={`${root_class}__back-title`}
                                >
                                    {localize('Back')}
                                </Text>
                            </div>
                            <OnfidoUpload
                                country_code={country_code_key}
                                documents_supported={[document.onfido_name]}
                                height={height ?? null}
                                handleComplete={is_mt5 ? handlePOIforMT5Complete : handleComplete}
                                is_default_enabled
                                handleViewComplete={is_mt5 ? handlePOIforMT5Complete : handleComplete}
                                {...props}
                            />
                        </React.Fragment>
                    ) : (
                        <CardDetails
                            data={document.details}
                            onComplete={onComplete}
                            goToCards={onClickBack}
                            is_from_external={is_from_external}
                            setIsCfdPoiCompleted={setIsCfdPoiCompleted}
                        />
                    )}
                </React.Fragment>
            );
    }
};

export default DetailComponent;
