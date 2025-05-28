import React from 'react';

const CallButton: React.FC<{ onCallStart: () => void }> = ({ onCallStart }) => {
    return (
        <button onClick={onCallStart}>
            Start Call
        </button>
    );
};

export default CallButton;