const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {

        // in ra man hinh register
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('register-form')

            registerForm.addEventListener('submit', (event) => {
                event.preventDefault()  // ko cho trinh duyet load lai
                const data = {
                    // lay du lieu nguoi dung
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value

                }
                console.log(data)
                Controller.register(data)
            })
            // chuyen huong sang man hinh login
            const alReady = document.getElementById('redirect-to-login')
            alReady.addEventListener('click', (event) => {
                view.setActiveScreen('loginScreen')
            })

            break;

        // in ra man hinh login
        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen
            const loginScreen = document.getElementById('login-form')
            loginScreen.addEventListener('submit', (event) => {
                event.preventDefault()
                const dataLogin = {
                    email: loginScreen.email.value,
                    password: loginScreen.password.value
                }
                console.log(dataLogin)
                Controller.login(dataLogin)
            })
            // chuyen huong sang man hinh register
            const Account = document.getElementById('redirect-to-Regiser')
            Account.addEventListener('click', (event) => {
                view.setActiveScreen('registerScreen')
            })

            break;
        // chuyen vao man hinh chatScreen
        case 'chatScreen':
            document.getElementById('app').innerHTML = components.chatScreen
            const sendMessageForm = document.getElementById('send-messages-form')
            sendMessageForm.addEventListener('submit', (event) => {
                event.preventDefault()
                // Định nghĩa tin nhắn
                // if(sendMessageForm.message.value !== " "){
                //     const message = {
                //         content: sendMessageForm.message.value,
                //         owner: model.currentUser.email // dung cho mine
                //     }
                //     view.addMessage(message)
                // }
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email // dung cho mine
                }
                const botMsg = {
                    content: sendMessageForm.message.value,
                    owner: 'bot'
                }
                const reg = /\S/g; // tat ca cac khoang trang
                if (message.content == '' || !reg.test(message.content)) {
                    sendMessageForm.message.value = '';
                } else {
                    view.addMessage(message);
                    view.addMessage(botMsg);
                }

                sendMessageForm.message.value = '';

                // add user message in firebase
                const documentId = "MPH1soyWWx8ZYHyBGSZA"
                const addMessage = {
                    Messages: firebase.firestore.FieldValue.arrayUnion(message)
                }
                firebase.firestore().collection("Conversations").doc(documentId).update(addMessage)
            });
            break;

    }
}
view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
        <div class = "content">
        ${message.content} 
        </div>
            `
    } else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class="owner">
        ${message.owner}
        </div>
        <div class="content">
        ${message.content}
        </div>
        `
    }
    document.querySelector('.list-messages').appendChild(messageWrapper)
}