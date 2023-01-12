import React from 'react';
import { Text } from '@deriv/components';
import { getDiffDuration, isMobile, toMoment, epochToMoment } from '@deriv/shared';
import { localize } from 'Components/i18next';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

const OnlineStatusLabel = ({ is_online, last_online_time, size = isMobile() ? 'xxxs' : 'xs' }) => {
    const last_online_label = () => {
        if (!is_online) {
            if (last_online_time) {
                const start_time = epochToMoment(last_online_time).unix();
                const end_time = toMoment().unix();
                const diff = getDiffDuration(start_time, end_time);

                if (diff.years()) return localize('Seen more than 6 months ago');
                if (diff.months()) {
                    if (diff.months() > 6) {
                        return localize('Seen more than 6 months ago');
                    }
                    if (diff.months === 1) {
                        return localize('Seen {{ duration }} month ago', {
                            duration: diff.months(),
                        });
                    }
                    return localize('Seen {{ duration }} months ago', {
                        duration: diff.months(),
                    });
                }
                if (diff.days()) {
                    if (diff.days() === 1) {
                        return localize('Seen {{ duration }} day ago', {
                            duration: diff.days(),
                        });
                    }
                    return localize('Seen {{ duration }} days ago', {
                        duration: diff.days(),
                    });
                }
                if (diff.hours()) {
                    if (diff.hours() === 1) {
                        return localize('Seen {{ duration }} hour ago', {
                            duration: diff.hours(),
                        });
                    }
                    return localize('Seen {{ duration }} hours ago', {
                        duration: diff.hours(),
                    });
                }
                if (diff.minutes()) {
                    if (diff.minutes() === 1) {
                        return localize('Seen {{ duration }} minute ago', {
                            duration: diff.minutes(),
                        });
                    }
                    return localize('Seen {{ duration }} minutes ago', {
                        duration: diff.minutes(),
                    });
                }
            } else {
                return localize('Seen more than 6 months ago');
            }
        }
        return localize('Online');
    };

    return (
        <Text color='less-prominent' size={size}>
            {last_online_label()}
        </Text>
    );
};

OnlineStatusLabel.propTypes = {
    is_online: PropTypes.number.isRequired,
    last_online_time: PropTypes.number,
    size: PropTypes.string,
};

export default observer(OnlineStatusLabel);
