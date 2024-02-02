import { JitsiMeeting } from '@jitsi/react-sdk';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sendNotification } from '../helper/sendNotification';
import { IPropsCallNotiResponseBody } from '../Notification';

interface IParams {
    id?: number
    name: string
    room: string
    roomName: string
    email: string
    target?: string[]
}


const Jitsi = () => {
    const location = useLocation();
    const params = location?.state as IParams
    const apiRef = useRef<any>();
    const [logItems, updateLog] = useState<string[]>([]);
    const [showNew, toggleShowNew] = useState(false);
    const [knockingParticipants, updateKnockingParticipants] = useState<any[]>([]);

    useEffect(() => {
        if(params?.target){
            const body: IPropsCallNotiResponseBody = {
                groupName: params.roomName,
                room: params.room,
                userSender: params.name,
            }
            params?.target?.forEach((e) => {
                sendNotification(e, body);
            })
        }
    }, [params.name, params.room, params.roomName, params?.target])


    const printEventOutput = (payload: any) => {
        updateLog(items => [...items, JSON.stringify(payload)]);
    };

    const handleAudioStatusChange = (payload: any, feature: any) => {
        if (payload.muted) {
            updateLog(items => [...items, `${feature} off`])
        } else {
            updateLog(items => [...items, `${feature} on`])
        }
    };

    const handleChatUpdates = (payload: any) => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef?.current?.executeCommand?.('toggleChat');
        updateLog(items => [...items, `you have ${payload.unreadCount} unread messages`])
    };

    const handleKnockingParticipant = (payload: any) => {
        updateLog(items => [...items, JSON.stringify(payload)]);
        updateKnockingParticipants(participants => [...participants, payload?.participant])
    };

    // const resolveKnockingParticipants = (condition: any) => {
    //     knockingParticipants.forEach(participant => {
    //         apiRef.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
    //         updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
    //     });
    // };

    const handleJitsiIFrameRef1 = (iframeRef: any) => {
        const height = window.innerHeight
        const width = window.innerWidth
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = `${height}px`;
        iframeRef.style.width = `${width}px`;
        iframeRef.style.marginBottom = '20px';
    };

    // const handleJitsiIFrameRef2 = (iframeRef: any) => {
    //     iframeRef.style.marginTop = '10px';
    //     iframeRef.style.border = '10px dashed #df486f';
    //     iframeRef.style.padding = '5px';
    //     iframeRef.style.height = '400px';
    // };

    // const handleJaaSIFrameRef = (iframeRef: any) => {
    //     iframeRef.style.border = '10px solid #3d3d3d';
    //     iframeRef.style.background = '#3d3d3d';
    //     iframeRef.style.height = '400px';
    //     iframeRef.style.marginBottom = '20px';
    // };

    const handleApiReady = (apiObj: any) => {
        apiRef.current = apiObj;
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('audioMuteStatusChanged', (payload: any) => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', (payload: any) => handleAudioStatusChange(payload, 'video'));
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('notificationTriggered', (e: any) => console.log(e, 'ádasdasd'))
        // api.addEventListener('videoConferenceJoined', () => {
        //     // Trigger your event or notification here
        //     toast.success('Jitsi Meet session has started!', {
        //       position: 'top-right',
        //       autoClose: 3000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //     });

        //     // You can also call a function or dispatch an action to handle the event
        //     // YourCustomFunction();
        //   });

    };

    const handleReadyToClose = () => {
        /* eslint-disable-next-line no-alert */
        alert('Ready to close...');
    };

    // const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;

    // Multiple instances demo
    // const renderNewInstance = () => {
    //     if (!showNew) {
    //         return null;
    //     }

    //     return (
    //         <JitsiMeeting
    //             roomName={generateRoomName()}
    //             getIFrameRef={handleJitsiIFrameRef2} />
    //     );
    // };

    // const renderButtons = () => (
    //     <div style={{ margin: '15px 0' }}>
    //         <div style={{
    //             display: 'flex',
    //             justifyContent: 'center'
    //         }}>
    //             <button
    //                 // type = 'text'
    //                 title='Click to execute toggle raise hand command'
    //                 style={{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#f8ae1a',
    //                     color: '#040404',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick={() => apiRef.current.executeCommand('toggleRaiseHand')}>
    //                 Raise hand
    //             </button>
    //             <button
    //                 // type = 'text'
    //                 title='Click to approve/reject knocking participant'
    //                 style={{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#0056E0',
    //                     color: 'white',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick={() => resolveKnockingParticipants(({ name }: { name: any }) => !name.includes('test'))}>
    //                 Resolve lobby
    //             </button>
    //             <button
    //                 // type = 'text'
    //                 title='Click to execute subject command'
    //                 style={{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#df486f',
    //                     color: 'white',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick={() => apiRef.current.executeCommand('subject', 'New Subject')}>
    //                 Change subject
    //             </button>
    //             <button
    //                 // type='text'
    //                 title='Click to create a new JitsiMeeting instance'
    //                 style={{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#3D3D3D',
    //                     color: 'white',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick={() => toggleShowNew(!showNew)}>
    //                 Toggle new instance
    //             </button>
    //         </div>
    //     </div>
    // );

    // const renderLog = () => logItems.map(
    //     (item, index) => (
    //         <div
    //             style={{
    //                 fontFamily: 'monospace',
    //                 padding: '5px'
    //             }}
    //             key={index}>
    //             {item}
    //         </div>
    //     )
    // );

    const renderSpinner = () => (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            Loading..
        </div>
    );


    return (
        <>
            <JitsiMeeting
                roomName={params?.room}
                spinner={renderSpinner}
                domain={'vid-dev.digiworkhub.com'}
                // domain={'103.143.142.245:8443'}
                configOverwrite={{
                    subject: params?.roomName,
                    hideConferenceSubject: false
                }}
                userInfo={{
                    displayName: params?.name,
                    email: params?.email
                }}
                lang='vi'
                onApiReady={externalApi => handleApiReady(externalApi)}
                onReadyToClose={handleReadyToClose}
                getIFrameRef={handleJitsiIFrameRef1}
            />
        </>
    );
};

export default Jitsi;