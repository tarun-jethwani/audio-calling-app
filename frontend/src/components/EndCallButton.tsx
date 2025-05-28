import React from 'react';

interface EndCallButtonProps {
    onEndCall: () => void;
}

const EndCallButton: React.FC<EndCallButtonProps> = ({ onEndCall }) => {
    return (
        <button onClick={onEndCall} style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
            End Call
        </button>
    );
};

export default EndCallButton;