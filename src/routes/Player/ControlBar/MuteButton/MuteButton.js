const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const Icon = require('stremio-icons/dom');
const { Button } = require('stremio/common');

const MuteButton = ({ className, muted, volume, onMuteRequested, onUnmuteRequested }) => {
    const toggleMuted = React.useCallback(() => {
        if (muted) {
            if (typeof onUnmuteRequested === 'function') {
                onUnmuteRequested();
            }
        } else {
            if (typeof onMuteRequested === 'function') {
                onMuteRequested();
            }
        }
    }, [muted, onMuteRequested, onUnmuteRequested]);
    const icon = (typeof muted === 'boolean' && muted) ? 'ic_volume0' :
        (volume === null || isNaN(volume)) ? 'ic_volume3' :
            volume < 30 ? 'ic_volume1' :
                volume < 70 ? 'ic_volume2' :
                    'ic_volume3';
    return (
        <Button className={classnames(className, { 'disabled': typeof muted !== 'boolean' })} title={muted ? 'Unmute' : 'Mute'} tabIndex={-1} onClick={toggleMuted}>
            <Icon className={'icon'} icon={icon} />
        </Button>
    );
};

MuteButton.propTypes = {
    className: PropTypes.string,
    muted: PropTypes.bool,
    volume: PropTypes.number,
    onMuteRequested: PropTypes.func,
    onUnmuteRequested: PropTypes.func
};

module.exports = MuteButton;
