
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
    console.log(`Window loaded`)
    view.setActiveScreen('registerScreen')
    // view.setActiveScreen('loginScreen')

    // Nhớ trạng thái đăng nhập

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          view.setActiveScreen('chatScreen')         
        }
      });

}
window.onload = init

