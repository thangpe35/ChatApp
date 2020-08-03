const model = {}
model.currentUser = undefined
model.register = (data) => {

    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((res) =>{
        firebase.auth().currentUser.updateProfile({
            displayName: data.fisrtName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert('The email has been registered, please check you email')
        view.setActiveScreen('loginScreen')
    }).catch((err) =>{
        console.log(err)
        alert(err.message)
    })  
}

model.login = async (dataLogin) => {
    try{
    const response = await firebase.auth().signInWithEmailAndPassword(dataLogin.email , dataLogin.password)
    // console.log(response)
    // if(response.user.emailVerified === false){
    //     alert('Please verify your email')
    // } else {
    //     model.currentUser = {
    //         displayName: response.user.displayName,
    //         email: response.user.email
    //     }
    //     view.setActiveScreen('chatScreen')
    // }
    } catch(err){
        console.log(err)
        alert(err.message)
    }   
}
