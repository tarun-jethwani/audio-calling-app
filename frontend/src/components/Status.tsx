import React from 'react';

interface StatusProps {
    callStatus: 'idle' | 'calling' | 'inCall' | 'ended';
}

const Status: React.FC<StatusProps> = ({ callStatus }) => {
    const getStatusMessage = () => {
        switch (callStatus) {
            case 'calling':
                return 'Calling...';
            case 'inCall':
                return 'In Call';
            case 'ended':
                return 'Call Ended';
            default:
                return 'Ready to Call';
        }
    };

    return (
        <div className="call-status">
            <h2>{getStatusMessage()}</h2>
        </div>
    );
};

export default Status;