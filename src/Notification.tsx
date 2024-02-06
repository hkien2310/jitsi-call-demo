import { useContext, useEffect, useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import { IContactData, contactContext } from './App';
import { onBackgroundMessageListener, onMessageListener, requestForToken } from './firebase';
import { onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { messaging } from '.';
import { originalTitle } from './const/const';

export interface IPropsCallNotiResponseBody {
    // type: string,
    userSender: IContactData,
    groupName: string,
    room: string,
}

export interface IPropsCallNotiResponse {
    body: IPropsCallNotiResponseBody,
    image: string
}

const Notification = () => {
    const contact: any = useContext(contactContext)
    const { setDataCallNoti, setShowCallNotification }: any = contact ?? {}

    requestForToken();
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        updateTitleWithNotification()
        const { notification } = payload ?? {}

        // ...
        const { body, image } = notification ?? {}
        console.log('body', body)
        const parseBody = JSON.parse(body || '')
        // console.log('dddd')
        // Xử lý payload ở đây
        setShowCallNotification(true)
        setDataCallNoti(parseBody)
    });

    // useEffect(() => {
    //     console.log('Listening for messages in App component');
    //     navigator.serviceWorker.addEventListener('message', (event) => {
    //         if (event.data && event.data.type === 'FIREBASE_MESSAGE') {
    //             const firebasePayload = event.data.payload;
    //             console.log('Received Firebase payload in React component:', firebasePayload);
    //             handleFirebasePayload(firebasePayload);
    //         }
    //     });
    // }, []);

    // const handleFirebasePayload = (payload: any) => {
    //     // Implement your logic to handle the Firebase payload
    //     console.log('Received Firebase payload in React component:', payload);
    // };

    const updateTitleWithNotification = () => {
        document.title = '🔔 Bạn có thông báo mới! 🔔 ' + originalTitle;
    };

    const restoreOriginalTitle = () => {
        document.title = originalTitle;
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
          if (!document.hidden) {
            // Nếu trang web có focus, khôi phục title về giá trị ban đầu
            restoreOriginalTitle();
          }
        };
    
        // Đăng ký sự kiện visibilitychange
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        // Đăng ký sự kiện focus và blur để kiểm tra khi tab được chọn hoặc mất focus
        window.addEventListener('focus', restoreOriginalTitle);
        // window.addEventListener('blur', updateTitleWithNotification);
    
        // Gọi hàm updateTitleWithNotification khi có thông báo đến
        // updateTitleWithNotification();
    
        // Cleanup effect
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('focus', restoreOriginalTitle);
        //   window.removeEventListener('blur', updateTitleWithNotification);
        };
      }, []);
    


    useEffect(() => {
        // Lắng nghe sự kiện từ service worker
        const channel = new BroadcastChannel("fcm-background-channel");
        channel.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === "FCM_BACKGROUND_MESSAGE") {
                console.log("Received FCM background message in the app: ", payload);
                updateTitleWithNotification()
                const { notification } = payload ?? {}
                const { body, image } = notification ?? {}
                const parseBody = JSON.parse(body)
                // Xử lý payload ở đây
                setShowCallNotification(true)
                setDataCallNoti(parseBody)
            }
        };

        return () => {
            // Đảm bảo bạn clear sự kiện khi component unmount
            channel.close();
        };
    }, [setDataCallNoti, setShowCallNotification]);


    // onBackgroundMessage(messaging, (payload) => {
    //     console.log('onBackgroundMessage. ', payload);
    //     // ...
    // });
    // onBackgroundMessageListener()
    //     .then((payload) => {
    //         const { notification } = payload ?? {}
    //         const notificationFCM = notification as IPropsCallNotiResponse
    //         setDataCallNoti(notificationFCM)
    //         setShowCallNotification(true)
    //     })
    //     .catch((err) => console.log('failed: ', err));
    // // if(isBackground) {
    // // } else {
    //     onMessageListener()
    //         .then((payload) => {
    //             const { notification } = payload ?? {}
    //             const notificationFCM = notification as IPropsCallNotiResponse
    //             setDataCallNoti(notificationFCM)
    //             setShowCallNotification(true)
    //         })
    //         .catch((err) => console.log('failed: ', err));
    // // }



    return (
        <></>
    )
}

export default Notification