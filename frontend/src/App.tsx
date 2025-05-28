import React, { useState } from 'react';
import CallButton from './components/CallButton';
import Status from './components/Status';
import EndCallButton from './components/EndCallButton';

const App: React.FC = () => {
    const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'inCall' | 'ended'>('idle');

    const handleCallStart = () => {
        setCallStatus('calling');
        // Logic to initiate the call goes here
    };

    const handleCallEnd = () => {
        setCallStatus('ended');
        // Logic to end the call goes here
    };

    return (
        <div>
            <h1>Audio Calling App</h1>
            {callStatus === 'idle' && <CallButton onClick={handleCallStart} />}
            {callStatus === 'calling' && <Status status="Calling..." />}
            {callStatus === 'inCall' && (
                <>
                    <Status status="In Call" />
                    <EndCallButton onClick={handleCallEnd} />
                </>
            )}
            {callStatus === 'ended' && <Status status="Call Ended" />}
        </div>
    );
};

export default App;