// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth } from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi8qesfqgJxI2XTZne0uDF2YuTJaPwvAg",
  authDomain: "resumecreator-3d8fd.firebaseapp.com",
  projectId: "resumecreator-3d8fd",
  storageBucket: "resumecreator-3d8fd.appspot.com",
  messagingSenderId: "297639615162",
  appId: "1:297639615162:web:760c9b3fce659a0e698083",
  measurementId: "G-JY9C7F0TF9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export const isUserLoggedIn = auth.currentUser!=null?true:false;

export { app, auth, db, analytics, storage };

// export const addUserInDatabase = async (user)=>{
//   try{
//     await setDoc(doc(db, "users", user.email),{...user, profile:false, credits:100})
//   }catch(err){
//     console.log(err)
//   }
// }

// export const addUserInWaitlist = async (email)=>{
//   try{
//     await updateDoc(doc(db, "meta", "waitlist"), {
//       users: arrayUnion(email)
//   });
   
//   }catch(err){
//     console.log(err)
//   }
// };

// export const getWaitlistFromDatabase = async () => {
//   //let User;
//   try{
//     const docSnap = await getDoc(doc(db, "meta", "waitlist"));
//     var temp = docSnap.data()
//     return temp.users;
//   }catch (error){
//     console.log(error)
//     return undefined;
//   }
//   //console.log(docSnap.data(), "docSnap");
// };

export const getUserFromDatabase = async (email) => {
  //let User;
  try{
    const docRef = doc(db, "users", email);
    console.log("docRef",db, "users", email)
    const docSnap = await getDoc(docRef);
    console.log("getUserFromDatabase",docSnap.data())
    return docSnap.data();
  }catch (error){
    console.log(error)
    return undefined;
  }
  //console.log(docSnap.data(), "docSnap");
};

// export const updateUserInDatabase = async (email,data)=>{
//   try{
//     console.log("updateUserInDatabase",data, email)
//     const docRef = doc(db, "users", email);
//     await updateDoc(docRef,{resume:data})
//   }catch(err){
//     console.log(err)
//   }
// }

// export const updateUserPhotoInDatabase = async (email,data)=>{
//   try{
//     console.log("updateUserPhotoInDatabase",data, email)
//     const docRef = doc(db, "users", email);
//     await updateDoc(docRef,{uploadedPhotoURL:data})
//   }catch(err){
//     console.log(err)
//   }
// }
// export const updateUserCreditsInDatabase = async (email,credits)=>{
//   try{
//     console.log(credits, email)
//     const docRef = doc(db, "users", email);
//     await updateDoc(docRef,{credits:credits})
//   }catch(err){
//     console.log(err)
//   }
// }


// export const updateUserProfileInDatabase = async (email,data)=>{
//   try{
//     console.log("updateUserProfileInDatabase",data, email)
//     const docRef = doc(db, "users", email);
//     await updateDoc(docRef,{...data})
//   }catch(err){
//     console.log(err)
//   }
// }

// export const addUserResume = async (email,data)=>{
//   try{
//     console.log("addUserResume",data, email)
//     const docRef = doc(db, "users", email);
//     await updateDoc(docRef,{resumes:data})
//   }catch(err){
//     console.log(err)
//   }
// }

// export const updateUserResumes = async (email,data)=>{
//   try{
//     console.log("updateUserResumes",data, email)
//     const docRef = doc(db, "users", email);
//     await updateDoc(docRef,{resumes:data})
//   }catch(err){
//     console.log(err)
//   }
// }
// export const getUserDocByRef = async (DocumentReference) => {
//   const userDocSnapshot = await getDoc(DocumentReference);
//   return userDocSnapshot.data();
// };

// export const getMentorFromDatabase = async (email) => {
//   let Mentor;
//   await (
//     await getDocs(
//       query(collection(db, "Users"), where("email", "==", `${email}`))
//     )
//   ).forEach((doc) => {
//     Mentor = { ...doc.data() };
//   });
//   return Mentor;
// };

// export const getMentorMsgs = async (email) => {
//   try {
//     let clients = [];

//     await (
//       await getDocs(collection(db, `Messages/${email}/YourClients`))
//     ).forEach((doc) => {
//       clients.push({ ...doc.data(), email: doc.id });
//     });

//     console.log("getMentorMsgs",clients);
//     return clients;
//   } catch (err) {
//     console.log("Err: ", err);
//   }
// };

// export const uploadMedia = async (media, path) => {
//   try {
//     await uploadBytesResumable(ref(storage, `${path}/${media.name}`), media);
//     const getMedia = await ref(storage, `${path}/${media.name}`);
//     const mediaLink = await getDownloadURL(getMedia);
//     return mediaLink;
//   } catch (err) {
//     console.log("Err: ", err);
//   }
// };

// export const createMatchedInMessagesDoc = async (userId, senderId) => {
//   const userRef = doc(db, "Messages", userId);
//   const furtherUserRef = doc(userRef, "Matched", senderId);
//   const senderRef = doc(db, "Messages", senderId);
//   const furtherSenderRef = doc(senderRef, "Matched", userId);

//   try {
//     await setDoc(furtherUserRef, {
//       messages: [{ createdAt: "", msg: "", sendBy: "" }],
//     });
//     await setDoc(furtherSenderRef, {
//       messages: [{ createdAt: "", msg: "", sendBy: "" }],
//     });
//   } catch (error) {
//     console.log(error.messages);
//   }
// };

// export const getAllMatchedUserHavingChatWith = async (userEmail, setList) => {
//   // const userEmail = currentcUser?.email;
//   if (!userEmail) {
//     throw new Error("User email not available");
//   }
//   const ref = doc(db, "Messages", userEmail);

//   try {
//     const f = collection(ref, "Matched");
//     const matchedSnapshot = await getDocs(f);
//     let matchedData = matchedSnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//       bucket: "Matched",
//     }));
//     setList(matchedData);
//     // console.log("matched", matchedData)
//     console.log("getAllMatchedUserHavingChatWith", matchedData)
//   } catch (error) {
//     // Handle error fetching from the 'f' collection (Matched)
//     console.error("Error fetching from 'f' collection:", error);
//   }
// };

// export const getAllUserHavingChatWith = async (currentcUser, setList) => {
//   const userEmail = currentcUser?.email;
//   if (!userEmail) {
//     throw new Error("User email not available");
//   }
//   const ref = doc(db, "Messages", userEmail);

//   const isMentor =
//     currentcUser && currentcUser.userType?.toLowerCase() === "mentor";

//   let clientData = [];
//   let networkData = [];

//   try {
//     const c = collection(ref, isMentor ? "YourClients" : "YourMentors");
//     const clientSnapshot = await getDocs(c);
//     clientData = clientSnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//       bucket: isMentor ? "YourClients" : "YourMentors",
//     }));
//   } catch (clientError) {
//     // Handle error fetching from the 'c' collection (YourClients or YourMentors)
//     console.error("Error fetching from 'c' collection:", clientError);
//   }

//   try {
//     const f = collection(ref, "Networks");
//     const networkSnapshot = await getDocs(f);
//     networkData = networkSnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//       bucket: "Networks",
//     }));
//   } catch (networkError) {
//     // Handle error fetching from the 'f' collection (Networks)
//     console.error("Error fetching from 'f' collection:", networkError);
//   }

//   const mergedData = [...clientData, ...networkData];
//   setList(mergedData);

//   // const list = [];
//   // const ref = doc(db, "Messages", currentcUser.email);
//   // const c = collection(
//   //   ref,
//   //   currentcUser && currentcUser.userType?.toLowerCase() === "mentor"
//   //     ? "YourClients"
//   //     : "YourMentors"
//   // );

//   // const f = collection(ref, "Networks");

//   // const snap = await getDocs(f);
//   // onSnapshot(f, (snapshot) => {
//   //   const dummyList = [];
//   //   snapshot.docs.forEach((doc) => {
//   //     dummyList.push({ ...doc.data(), id: doc.id, bucket: "Networks" });
//   //   });

//   //   setList(dummyList);
//   // });

//   // const querySnapshot = await getDocs(c);
//   // //SNAPSHOT IMPLEMENT
//   // onSnapshot(c, (snapshot) => {
//   //   const dummyList = [];
//   //   snapshot.docs.forEach((doc) => {
//   //     dummyList.push({
//   //       ...doc.data(),
//   //       id: doc.id,
//   //       bucket:
//   //         currentcUser && currentcUser.userType?.toLowerCase() === "mentor"
//   //           ? "YourClients"
//   //           : "YourMentors",
//   //     });
//   //   });

//   //   setList(dummyList);
//   // });

// };

// export const createNetworkInMessagesDoc = async (userId, senderId) => {
//   const userRef = doc(db, "Messages", userId);
//   const furtherUserRef = doc(userRef, "Networks", senderId);
//   const senderRef = doc(db, "Messages", senderId);
//   const furtherSenderRef = doc(senderRef, "Networks", userId);

//   try {
//     await setDoc(furtherUserRef, {
//       messages: [{ createdAt: "", msg: "", sendBy: "" }],
//     });
//     await setDoc(furtherSenderRef, {
//       messages: [{ createdAt: "", msg: "", sendBy: "" }],
//     });
//   } catch (error) {
//     console.log(error.messages);
//   }
// };

// export const createMentorInMessagesDoc = async (userId, mentorId) => {
//   const userRef = doc(db, "Messages", userId);
//   const furtherUserRef = doc(userRef, "YourMentors", mentorId);
//   const mentorRef = doc(db, "Messages", mentorId);
//   const furtherMentorRef = doc(mentorRef, "YourClients", userId);

//   try {
//     await setDoc(furtherUserRef, {
//       messages: [{ createdAt: "", msg: "", sendBy: "" }],
//     });
//     await setDoc(furtherMentorRef, {
//       messages: [{ createdAt: "", msg: "", sendBy: "" }],
//     });
//   } catch (error) {
//     console.log(error.messages);
//   }
// };

// export const SendMessage = async (
//   currentcUser,
//   sendTo,
//   message,
//   imgLink,
//   bucket
// ) => {
//   const senderRef = doc(db, "Messages", currentcUser.email);
//   let furtherSenderRef;
//   if (bucket === "YourClients" || bucket === "YourMentors") {
//     furtherSenderRef = doc(
//       senderRef,
//       currentcUser && currentcUser.userType?.toLowerCase() === "mentor"
//         ? "YourClients"
//         : "YourMentors",
//       sendTo.email
//     );
//   } else if (bucket === "Networks") {
//     furtherSenderRef = doc(senderRef, "Networks", sendTo.email);
//   } else if (bucket === "Matched") {
//     furtherSenderRef = doc(senderRef, "Matched", sendTo.email);
//   }
//   const receiverRef = doc(db, "Messages", sendTo.email);
//   let furtherReceiverRef;
//   if (bucket === "YourClients" || bucket === "YourMentors") {
//     furtherReceiverRef = doc(
//       receiverRef,
//       sendTo && sendTo.userType?.toLowerCase() === "mentor"
//         ? "YourClients"
//         : "YourMentors",
//       currentcUser.email
//     );
//   } else if (bucket === "Networks") {
//     furtherReceiverRef = doc(receiverRef, "Networks", currentcUser.email);
//   } else if (bucket === "Matched") {
//     furtherReceiverRef = doc(receiverRef, "Matched", currentcUser.email);
//   } 

//   let timestmp = Timestamp.now();

//   try {
//     await updateDoc(furtherSenderRef, {
//       messages: arrayUnion({
//         msg: message,
//         createdAt: timestmp,
//         sendBy: currentcUser.email,
//         imgMsg: imgLink,
//         read: false
//       }),
//     });

//     // ref.current.scrollTo({
//     //   top:ref.current.scrollHeight,
//     //   behavior:"smooth"
//     // });

//     await updateDoc(furtherReceiverRef, {
//       messages: arrayUnion({
//         msg: message,
//         createdAt: timestmp,
//         sendBy: currentcUser.email,
//         imgMsg: imgLink,
//         read: false
//       }),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatereadmessage = async(
//   currentcUser,
//   sendTo,
// )=>{
//   const senderRef = doc(db, "Messages", currentcUser.email);
//   const furtherSenderRef = doc(senderRef, "Matched", sendTo)
//   const chatdoc = await getDoc(furtherSenderRef)
//   // console.log("fufnsda",chatdoc.data());
//   console.log("updatereadmessage",currentcUser.email, sendTo)
//   try {
//     let updatedmessges = chatdoc.data().messages.map(m=> {
//       // console.log("mmmmm",m);
//       if(m.read === false){
//         m.read = true
//       }
//       return m
//     })
//     await updateDoc(furtherSenderRef, {
//       messages: updatedmessges
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const ReciveMessage = async (currentcUser, sendTo, setmsg, bucket) => {
//   try {
//     console.log(currentcUser.email, sendTo, bucket)
//     console.log("ReciveMessage",currentcUser.email, sendTo, bucket)
//     const docRef = doc(db, "Messages", currentcUser.email);
//     const furtherdocRef = collection(docRef, bucket);
    

//     onSnapshot(furtherdocRef, (snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         if (doc.id === sendTo.email) {
//           setmsg(doc.data().messages);
//         }
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const sendNotification = async (toemail, fromemail, messaage) => {
//   const obj = {
//     subject: fromemail,
//     message: messaage,
//     email: toemail,
//     type: "chat",
//     date: serverTimestamp(),
//   };

//   const docRef = doc(db, "Users", toemail);

//   try {
//     await updateDoc(docRef, {
//       notifications: arrayUnion(obj),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };