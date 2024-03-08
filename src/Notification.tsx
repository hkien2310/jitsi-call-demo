import { useContext, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import { onMessage } from 'firebase/messaging';
import { messaging } from '.';
import { IContactData, contactContext } from './App';
import { originalTitle } from './const/const';
import { requestForToken } from './firebase';
import { useTranslation } from 'react-i18next';

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
    const {t} = useTranslation()

    requestForToken();
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        updateTitleWithNotification()
        const { notification } = payload ?? {}

        // ...
        const { body, image } = notification ?? {}
        // console.log('body', body)
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
        document.title = `🔔 ${t('shared:newNoti')} 🔔 ' + ${t(originalTitle)}`;
    };

    const restoreOriginalTitle = () => {
        document.title = t(originalTitle);
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