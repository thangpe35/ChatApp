
const init = () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyApxRj9cIexg0vq6d9A1xCGZmqmnfdoV7g",
    authDomain: "chat-app-6796a.firebaseapp.com",
    databaseURL: "https://chat-app-6796a.firebaseio.com",
    projectId: "chat-app-6796a",
    storageBucket: "chat-app-6796a.appspot.com",
    messagingSenderId: "91842939033",
    appId: "1:91842939033:web:fc305e72ab0c61c5681008"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.app().name)


  // view.setActiveScreen('registerScreen')
  // view.setActiveScreen('loginScreen')
  // firestoreFunction()

  // Nhớ trạng thái đăng nhập

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (user.emailVerified) {
        model.currentUser = {
          displayName: user.displayName,
          email: user.email
        }
        view.setActiveScreen('chatScreen')
      } else {
        view.setActiveScreen('loginScreen')
        alert('Please verify your mail')
      }
    } else {
      view.setActiveScreen('loginScreen')
    }
  });
}

window.onload = init
//   làm việc vs database 
// firestoreFunction = async () => {
// get one document 
// const documentID = 'tTYmMCX78JWhbRZg2Oh6'
// const response = await firebase.firestore().collection('users').doc(documentID).get()
// const user = getDataFromDoc(response)
// const user = response.data() 
// response.data()
// user.id = response.id
// console.log(user)
// get many document
// const response2 = await firebase.firestore().collection('users')
// .where('phoneNumber','array-contains' ,'091').get()

// console.log(response2)
// const listUser = getDataFromDocs(response2.docs)
// console.log(getDataFromDoc(response2.docs[1]))
// console.log(listUser)
// add document
// const userToAdd = {
//   name: "Thang",
//   age: 23,
//   email: 'abcxyz@gmail.com'
// }
// firebase.firestore().collection('users').add(userToAdd)

// update document

// documentIdUpdate = 'tTYmMCX78JWhbRZg2Oh6'
// const dataUpdate = {
//   age:18,
//   phoneNumber: firebase.firestore.FieldValue.arrayUnion("098")
// } 
// firebase.firestore().collection('users').doc(documentIdUpdate).update(dataUpdate)

// delete document 
//   const docToDelete = 'Vc8YOpR96mWPFyxhExhR'
//   firebase.firestore().collection('users').doc(docToDelete).delete()
// }
// lay du lieu tu doc
// getDataFromDoc = (doc) => {
//   const data = doc.data()
//   data.id = doc.id
//   return data
// } 
// lay du lieu tu docs
getDataFromDocs = (docs) => {
  // su dung for

  // for(let index = 0 ; index <docs.length ; index++){
  //   const element = getDataFromDoc(docs[index])
  //   listData.push(element)
  // }
  // return listData

  // dung map 
  return docs.map(item => getDataFromDoc(item));

}

// const documentId = "MPH1soyWWx8ZYHyBGSZA"
// const addMessage = {
//   Messages: firebase.firestore.FieldValue.arrayUnion(message)
// }
// firesbase.firestore().collectiom("Conversations").doc(documentId).update(addMessage)


getDataFromDoc = (doc) => {
  const data = doc.data()
  data.id = doc.id
  return data
}


