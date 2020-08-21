const components = {}

components.welcomeScreen = `
<h1>Welcome to Chat App</h1>
`
components.registerScreen = `
<div class="register-container">
        <div class="aside-right">
            <div class="header">
                <h3>Mindx chat</h3>
            </div>
            <form id="register-form">
                <div class="input-name-wrapper">
                    <div class="input-wrapper">
                        <input type="text" placeholder="First Name" name="firstName">
                        <div class="error" id="first-name-error"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Last Name" name="lastName">
                        <div class="error" id="last-name-error"></div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input type="text" placeholder="Email" name="email">
                    <div class="error" id="email-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="Password" name="password">
                    <div class="error" id="password-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="Confirm password" name="confirmPassword">
                    <div class="error" id="confirmPassword-error"></div>
                </div>
                <div class="form-action">
                   <span id="redirect-to-login" >
                       Already have an account? Login 
                   </span>
                   <button class="btn" type="submit">
                       Register
                   </button>
                </div>
            </form>
        </div>
    </div>`

components.loginScreen = `   
<div class="login-container">
<div class="aside-right">
    <div class="header">
        <h3>
            Mindx Chat
        </h3>
    </div>
    <form id="login-form">
        <div class="input-name-wrapper">
                <div class="input-wrapper">
                    <input type="text" placeholder="Email" name="email">
                    <div class="error" id="email-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="password" name="password">
                    <div class="error" id="password-error"></div>
                </div>
                <div class="form-action">
                    <span id="redirect-to-Regiser">
                        Don't have an account? Register
                    </span>
                    <button class="btn" type="submit" id="btn">
                        login
                    </button>
                 </div>
            </div>
    </form>
</div>
</div>
`
components.chatScreen = `
<div class="chat-container">
<div class="header">
    Mindx Chat
</div>
<div class="main">
    <div class="aside-left ">
        <div class="create-conversation">
            <button class="btn">+ New conversation</button>
        </div>
        <div class="list-conversation">
            
        </div>
    </div>
    <div class="conversation-detail">   
        <div class="conversation-header">
            First conversation
        </div>
        <div class="list-messages">
            <div class="message-container mine">
            </div>
            <div class="message-container their">
            </div>
        </div>
        <form id="send-messages-form">
            <div class="input-wrapper">
                <input type="text" placeholder="Type a message" name="message">
            </div>
            <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </form>
    </div>
    <div class="aside-right">
        <div class="list-user">
            
        </div>
        <form id="add-user-form">
            <div class="input-wrapper">
                <input type="text" placeholder="Input friend email" name="email">
                <div class="error" id="add-user-email-error"></div>
            </div>
            <button class="btn" type="submit">Save</button>
        </form>
    </div>
</div>
</div>
`
components.createConversation =`  <div class="create-conversation-container">
<div class="header">Mindx Chat</div>
<div class="main" style="padding: 50px 20%;">
    <form id="create-conversation-form">
        <div>
            Create a new conversation
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Conversation name" name="conversationTitle">
            <div class="error" id="conversation-name-error"></div> 
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Conversation email" name="conversationEmail">
            <div class="error" id="conversation-email-error"></div> 
        </div>
        <button type="submit" class="btn">Save</button>
        <button type="button" id="back-to-chat" class="btn btn-light">Cancel</button>
    </form>
</div>
</div>
`
