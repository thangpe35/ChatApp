const Controller = {}
Controller.register = (data) => {
    if (data.firstName.trim() === '') {
        document.getElementById('first-name-error').innerText = 'Please input first name'
    } else {
        document.getElementById('first-name-error').innerText = ''
    }
    if (data.lastName.trim() === '') {
        document.getElementById('last-name-error').innerText = 'Please input first name'
    } else {
        document.getElementById('last-name-error').innerText = ''
    }
    if (data.email.trim() === '') {
        document.getElementById('email-error').innerText = 'Please input email'
    } else {
        document.getElementById('email-error').innerText = ''
    }
    if (data.password === '') {
        document.getElementById('password-error').innerText = 'Please input password'
    } else {
        document.getElementById('password-error').innerText = ''
    }
    if (data.confirmPassword.trim() === '') {
        document.getElementById('confirmPassword-error').innerText = 'Please input confirmpassword'
    } else if (data.password !== data.confirmPassword) {
        document.getElementById('confirmPassword-error').innerText = "Password didn't match"
    } else {
        document.getElementById('confirmPassword-error').innerText = ''
    }
    if (data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.password !== '' && data.confirmPassword !== '' && data.password === data.confirmPassword) {
        model.register(data)
    }
}
Controller.login = (dataLogin) => {
    if (dataLogin.email.trim() === '') {
        document.getElementById('email-error').innerText = 'Please input email'
    } else {
        document.getElementById('email-error').innerText = ''
    }
    if (dataLogin.password === '') {
        document.getElementById('password-error').innerText = 'Please input password'
    } else {
        document.getElementById('password-error').innerText = ''
    }
    if (dataLogin.email !== '' &&
        dataLogin.password !== '') {
        model.login(dataLogin)
    }
}
Controller.chatScreen = (dataChatScreen) => {
    if (dataChatScreen != "") {
        model.chatScreen(dataChatScreen)
    }
}
// Controller.createConversationScreen = (newConversation) => {
//     if(newConversation.conversationTitle.trim() === ''){
//         document.getElementById('conversation-name-error').innerText = 'Please input conversation Name'
//     } else {
//         document.getElementById('conversation-name-error').innerText = ''
//     }
//     if(newConversation.conversationEmail.trim() === ''){
//         document.getElementById('conversation-email-error').innerText = 'Please inpput conversation Email'
//     } else {
//         document.getElementById('conversation-email-error').innerText = ''
//     }   
// }

// cach 2

Controller.createConversationScreen = ({conversationTitle, conversationEmail}) => {
    if (conversationTitle.trim() === '') {
        view.setErrorMessage('conversation-name-error', 'Please input conversation Name')
    }
    if (conversationEmail.trim() === '') {
        view.setErrorMessage('conversation-email-error', 'Please input friend email')
    } else {
        view.setErrorMessage('conversation-email-error', '')
    }
    if (conversationTitle.trim() !== '' &&
        conversationEmail.trim() !== '') {
        const data = {
            title: conversationTitle,
            users: [conversationEmail, model.currentUser.email],
            createdAt: (new Date()).toISOString(),
            Messages: []
        }
        model.addConversation(data)
    }
}
Controller.addUser = (user) => {
    if(user.trim() === ''){
        view.setErrorMessage('add-user-email-error' , 'Please input friend email')
    } else {
        view.setErrorMessage('add-user-email-error', '')
    }
    if(user.trim() !== ''){
        model.addUser(user)
    }
}
