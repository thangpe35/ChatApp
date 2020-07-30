const Controller = {}
Controller.register = (data) => {
    if (data.firstName.trim() === '') {
        document.getElementById('first-name-error').innerText = 'Please input first name'
    } else {
        document.getElementById('first-name-error').innerText = ''
    }
    if(data.lastName.trim() === ''){
        document.getElementById('last-name-error').innerText = 'Please input first name'
    } else {
        document.getElementById('last-name-error').innerText = ''
    }
    if(data.email.trim() === ''){
        document.getElementById('email-error').innerText = 'Please input email'
    } else {
        document.getElementById('email-error').innerText = ''
    }
    if(data.password === ''){
        document.getElementById('password-error').innerText = 'Please input password'
    } else {
        document.getElementById('password-error').innerText = ''
    }
    if(data.confirmPassword.trim() === ''){
        document.getElementById('confirmPassword-error').innerText = 'Please input confirmpassword'
    } else if(data.password !== data.confirmPassword){
            document.getElementById('confirmPassword-error').innerText = "Password didn't match"
    } else {
        document.getElementById('confirmPassword-error').innerText = ''
    }
    if(data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.password !== '' && data.confirmPassword !=='' && data.password === data.confirmPassword){
        model.register(data)
    }
}
Controller.login = (dataLogin) =>{
    if(dataLogin.email.trim() === ''){
        document.getElementById('email-error').innerText = 'Please input email'
    } else {
        document.getElementById('email-error').innerText = ''
    }
    if(dataLogin.password === ''){
        document.getElementById('password-error').innerText = 'Please input password'
    } else {
        document.getElementById('password-error').innerText = ''
    }
    if( dataLogin.email !== '' && 
        dataLogin.password !== ''){
            model.login(dataLogin)
    }
}
Controller.chatScreen = (dataChatScreen) =>{
    if(dataChatScreen != ""){
        model.chatScreen(dataChatScreen)
    }
}
