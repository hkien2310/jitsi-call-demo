import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { createContext, useEffect, useState } from 'react';
import { db, vapikey } from ".";
import './App.css';
import NotificationL, { IPropsCallNotiResponse } from "./Notification";
import { updateDocument } from "./helper/updateDocument";
import RouterList from './navigation';
import useGetUserEmail from './navigation/useGetUserEmail';
import LoadingScreen from "./screen/Loading";
const messaging = getMessaging();

export interface IContactData {
  id: number
  email: string
  name: string
  room: string
  roomName: string
  avatar: string
  tokenNotifications?: string
}

export interface IGroupData {
  groupName: string
  data: IContactData[]
  groupId: string
}

export const contactContext = createContext({});
function App() {
  const [isLoadingApp, setIsLoadingApp] = useState(false)
  const [activeSection, setActiveSection] = useState<1 | 2 | 3>()
  const [allUser, setAllUser] = useState<IContactData[]>()
  const [currentUser, setCurrentUser] = useState<IContactData>()
  const [currentUserId, setCurrentUserId] = useState<string>()
  const [listContact, setListContact] = useState<IContactData[]>([])
  const [currentTarget, setCurrentTarget] = useState<IContactData>()
  const [showCallNoti, setShowCallNoti] = useState<boolean>(false)
  const [dataCallNoti, setDataCallNoti] = useState<IPropsCallNotiResponse>()

  const [listGroup, setListGroup] = useState<IGroupData[]>([])
  const [currentTargetGroup, setCurrentTargetGroup] = useState<IGroupData>()
  // console.log(currentTarget, 'currentTargetcurrentTarget')
  // const [listContactGroup, setListContactGroup] = useState([])
  const [tab, setTab] = useState(0)
  const auth = getAuth();
  const { emailUser } = useGetUserEmail()

  // const q = query(collection(db, "contact"));
  // const unsubscribe = onSnapshot(q, (snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     if (change.type === "added") {
  //       console.log("New city: ", change.doc.data());
  //     }
  //     if (change.type === "modified") {
  //       console.log("Modified city: ", change.doc.data());
  //     }
  //     if (change.type === "removed") {
  //       console.log("Removed city: ", change.doc.data());
  //     }
  //   });
  // });

  // unsubscribe()

  useEffect(() => {
    const fetchDataContact = async () => {
      // onDocumentUpdated
      try {
        const q = query(collection(db, "contact"));

        const querySnapshot = await getDocs(q);
        let data: any[] = []
        let allUser: any[] = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const dataCvt = doc.data() as IContactData
          // console.log(doc.id, " => ", doc.data());
          allUser.push(dataCvt)
          const isCurrentUser = dataCvt?.email === emailUser
          if (isCurrentUser) {
            setCurrentUser(dataCvt as IContactData)
            setCurrentUserId(doc.id)
          } else {
            data.push(dataCvt)
          }
        });
        setAllUser(allUser)
        setListContact(data)
        // console.log(docSnap, 'contactRef')
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchDataContact();
  }, [emailUser]);

  useEffect(() => {
    setListContact(allUser?.filter(e => e?.id !== currentUser?.id) || [])
  }, [allUser, currentUser?.id])

  const setTarget = (target: any) => {
    setCurrentTarget(target)
  }
  const setShowCallNotification = (show: boolean) => {
    setShowCallNoti(show)
  }

  // watch group
  useEffect(() => {

    const q = query(collection(db, "group"));
    const getDocument = async (query: any) => {
      const data: IGroupData[] = []
      const querySnapshot = await getDocs(query);
      await querySnapshot.forEach((doc) => {
        const docId = doc.id
        const docParsed = doc.data() as any
        const groupName = docParsed?.groupName
        const dataItem = docParsed?.data
        const isUser = dataItem?.some((e: IContactData) => `${e?.email}` === `${currentUser?.email}`)
        // doc.data() is never undefined for query doc snapshots
        if (isUser) {
          const dataToPush: IGroupData = {
            data: dataItem,
            groupId: docId,
            groupName: groupName
          }
          data.push(dataToPush)
        }
      });
      setListGroup(data)

      // return data
    }

    getDocument(q)

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       // setListGroup(change.doc.data()?.data)
    //       getDocument(q)
    //       console.log("New city: ", change.doc.data());
    //     }
    //     if (change.type === "modified") {
    //       getDocument(q)
    //       console.log("Modified city: ", change.doc.data());
    //       // setListGroup(change.doc.data()?.data)
    //     }
    //     if (change.type === "removed") {
    //       getDocument(q)
    //       console.log("Removed city: ", change.doc.data());
    //       // setListGroup(change.doc.data()?.data)
    //     }
    //   });
    // });

    // return () => unsubscribe()
  }, [currentUser?.email, currentUserId]); // Chạy một lần khi component mount

  // update token to contact collection
  useEffect(() => {
    if (currentUserId) {
      setIsLoadingApp(true)
      const docRef = doc(db, 'contact', currentUserId);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Người dùng đã đăng nhập, gọi hàm cập nhật token FCM
          // updateFCMToken(user);
          getToken(messaging, { vapidKey: vapikey }).then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
              // console.log('currentToken', currentToken)
              updateDoc(docRef, {
                timestamp: serverTimestamp(),
                tokenNotifications: currentToken
              });
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          }).finally(() => {
            setIsLoadingApp(false)
          });
        }
      });
    }
  }, [auth, currentUserId]);

  // update token to group collection
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập, gọi hàm cập nhật token FCM
        // updateFCMToken(user);
        getToken(messaging, { vapidKey: vapikey }).then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            // console.log('currentToken', currentToken)
            if (listGroup && listGroup?.length > 0) {
              listGroup?.forEach((e) => {
                const user = e?.data?.find((el) => {
                  return el?.email === currentUser?.email
                })
                if (user) {
                  const listAnother = e?.data?.filter((el) => {
                    return el?.email !== currentUser?.email
                  })
                  const dataChange = {
                    ...user, tokenNotifications: currentToken
                  }
                  updateDocument('group', e.groupId, {
                    data: [...listAnother, dataChange]
                  })
                }
              })
            }

          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
      }

    });

  }, [auth, currentUser?.email, listGroup]);


  return (
    <contactContext.Provider
      value={{
        listContact: listContact,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        currentTarget: currentTarget,
        setCurrentTarget: setTarget,
        tab: tab,
        setTab: setTab,
        setShowCallNotification: setShowCallNotification,
        showCallNoti: showCallNoti,
        setDataCallNoti: setDataCallNoti,
        dataCallNoti: dataCallNoti,
        currentUserId: currentUserId,
        listGroup: listGroup,
        setListGroup: setListGroup,
        setCurrentTargetGroup: setCurrentTargetGroup,
        currentTargetGroup: currentTargetGroup,
        setActiveSection: setActiveSection,
        activeSection: activeSection,
        isLoadingApp: isLoadingApp,
        setIsLoadingApp: setIsLoadingApp,
      }}
    >
      <div className="App">
        <LoadingScreen isLoading={isLoadingApp} />
        <RouterList />
        <NotificationL />
      </div>
    </contactContext.Provider>
  );
}

export default App;
