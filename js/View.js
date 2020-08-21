const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
        switch (screenName) {

            // in ra man hinh register
            case 'registerScreen':
                document.getElementById('app').innerHTML = components.registerScreen
                const registerForm = document.getElementById('register-form')

                registerForm.addEventListener('submit', (event) => {
                        event.preventDefault() // ko cho trinh duyet load lai , chi dung cho submit
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
                        // if(sendMessageForm.message.value.trim() !== " "){
                        //     const message = {
                        //         content: sendMessageForm.message.value,
                        //         owner: model.currentUser.email // dung cho mine
                        //     }
                        //     view.addMessage(message)
                        // }
                    const message = {
                        content: sendMessageForm.message.value,
                        owner: model.currentUser.email, // dung cho mine
                        createdAd: new Date().toISOString()
                    }
                    const reg = /\S/g; // tat ca cac khoang trang
                    if (message.content == '' || !reg.test(message.content)) {
                        sendMessageForm.message.value = '';
                    } else {
                        model.addMessage(message);

                    }
                    sendMessageForm.message.value = '';
                    // add user message in firebase
                    // const documentId = "MPH1soyWWx8ZYHyBGSZA"
                    // const addMessage = {
                    //     Messages: firebase.firestore.FieldValue.arrayUnion(message)
                    // }
                    // firebase.firestore().collection("Conversations").doc(documentId).update(addMessage)
                });

                if (!fromCreateConversation) {
                    model.loadConversations()
                    model.listenConversationsChange()
                } else {
                    view.showConversation()
                    view.showCurrentConversation()
                }
                document.querySelector('.create-conversation .btn').addEventListener('click', () => {
                    view.setActiveScreen('createConversation')
                });
                const addUserForm = document.getElementById('add-user-form')
                addUserForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    const user = addUserForm.email.value
                    Controller.addUser(user)
                    addUserForm.email.value = ''
                })
                document.querySelector('#send-messages-form input').addEventListener('click', () => {
                    view.hideNotification(model.currentConversation.id)
                })
                break;
            case 'createConversation':
                document.getElementById('app').innerHTML = components.createConversation
                const backToChat = document.getElementById('back-to-chat')
                backToChat.addEventListener('click', () => {
                    view.setActiveScreen('chatScreen', true)
                })
                const createConversation = document.getElementById('create-conversation-form')
                createConversation.addEventListener('submit', (event) => {
                    event.preventDefault()
                    const newConversation = {
                        conversationTitle: createConversation.conversationTitle.value,
                        conversationEmail: createConversation.conversationEmail.value
                    }
                    createConversation.conversationTitle.value = ''
                    createConversation.conversationEmail.value = ''
                    Controller.createConversationScreen(newConversation)
                        // firebase.firestore().collection('Conversations').add(newConversation)
                })

                // model.addDocument(newConversation)
                break;

        }
    }
    // hien thi tin nhan 
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

view.showCurrentConversation = () => {
    document.querySelector('.list-messages').innerHTML = ''
        // doi ten cuoc tro chuyen
    document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title
        // in cac tin nhan len man hinh
    for (message of model.currentConversation.Messages) {
        view.addMessage(message)
    }
    view.scrollToEndElement()
    view.showListUsers(model.currentConversation.users)
}
view.showListUsers = (users) => {
    document.querySelector('.list-user').innerHTML = ''
    for (user of users) {
        view.addUser(user)
    }
}
view.addUser = (user) => {
    // tao 1 the div
    const userWrapper = document.createElement('div')
        // add user
    userWrapper.classList.add('user')
    userWrapper.innerText = user
    document.querySelector('.list-user').appendChild(userWrapper)
}
view.scrollToEndElement = () => {
    const element = document.querySelector('.list-messages')
    element.scrollTop = element.scrollHeight
}
view.showConversation = () => {
    for (oneConversation of model.conversations) {
        view.addConversation(oneConversation)
    }
}
view.addConversation = (conversation) => {

    const conversationWrapper = document.createElement('div')
        // conversationWrapper.classList.add(['conversation', 'cursor-pointer'])
    conversationWrapper.className = 'conversation', 'cursor-pointer'
    conversationWrapper.id = conversation.id
    if (model.currentConversation.id === conversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length} user</div>
    <div class="notification"></div>
    `
    const mediaQuery = window.matchMedia('(max-width : 768px)')
        // console.log(mediaQuery) 
    if (mediaQuery.matches) {
        // hiển thị chữ cái đầu tiên trong tên người nt    
        const firstCharacter = conversation.title.charAt(0).toUpperCase()
        conversationWrapper.firstElementChild.innerText = firstCharacter
        document.querySelector('.create-conversation .btn').innerText = " + "
    }

    mediaQuery.addListener((e) => {
        if (e.matches) {
            // hiển thị chữ cái đầu tiên trong tên người nt    
            const firstCharacter = conversation.title.charAt(0).toUpperCase()
            conversationWrapper.firstElementChild.innerText = firstCharacter
            document.querySelector('.create-conversation .btn').innerText = " + "
        } else {
            conversationWrapper.firstElementChild.innerText = conversation.title
            document.querySelector('.create-conversation .btn').innerText = '+ New conversation'
        }
    })
    conversationWrapper.addEventListener('click', () => {
        // thay doi giao dien , doi current
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')
            // thay doi model.currentConversation
        for (oneConversation of model.conversations) {
            if (oneConversation.id === conversation.id) {
                model.currentConversation = oneConversation
            }
        }
        // model.currentConversation = conversation
        // in cac tin nhan cua model.currentConversation len man hinh
        view.showCurrentConversation()
        view.hideNotification(conversation.id)
    })
    document.querySelector('.list-conversation').appendChild(conversationWrapper)
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message
}
view.updateNumberUsers = (docId, numberUsers) => {
        const conversation = document.getElementById(docId)
        const secondChild = conversation.getElementsByTagName('div')[1]
        secondChild.innerText = numberUsers + ' users'

    }
    //( hien / an ) thong bao tin nhan 
view.showNotification = (conversationId) => {
    const conversation = document.getElementById(conversationId)
    conversation.lastElementChild.style = 'display: block'
}
view.hideNotification = (conversationId) => {
    const conversation = document.getElementById(conversationId)
    conversation.lastElementChild.style = 'display: none'
}