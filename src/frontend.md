# Simple Pass Frontend

# only four urls

 - "/" => redirect to "/login/" if user isn't authenticated
 - "/login/"
 - "/register/"
 - "/recover/"
 - "/profil/" => redirect to "/login/" if user isn't authenticated

# components
    - App (some kind of very simple router)
        - authentication free components
            - Login (login form, with link to register form and recovering form)
            - Register (register form, with link to login form)
            - Recover (form to get a new password)
        - authentication required components
            - Main
                - Toolbar (top) (search bar, logout, user info, timeout)
                - Navbar (left) (Groups, Notes, Passwords, Settings)
                - Settings
                    (Set new password form)
                    (Change user datas form)
                - Main
                    - List
                        (List results of research, 
                        - Entries
                            - Groups entries

# Flow

[OK]- user arrives on Index:
    [OK]- Login
    [OK]- Signup
    - recover password
[OK]- then user arrives on Home, and is authenticated:
if we have no ejson (empty string) user is new:
    [OK]- show passphrase creation form
    - dispatch(init)(app)
        [OK]- dispatch(SET_PASSPHRASE)(app) - and start timeout
        [OK]- dispatch(SET_CONFIG_USER)(keychain)
        [OK]- dispatch(SET_CONFIG_EMAIL)(keychain)
        - dispatch(syncKeychain)(app)
if we have ejson (any string):
    - show passphrase form
    - dispatch(load)(app)
        - dispatch(SET_PASSPHRASE)(app) - and start timeout
        - dispatch(UNLOCK_KEYCHAIN)(app)
        - dispatch(loadJSON)(keychain)

user plays with app:
    - when user starts modifying (any action)
        - dispatch(resetTimeout)(app) - to avoid timeout happening during form fullfilling
    - when something has been modified
        - dispatch(syncKeychain)(app)

timeout ends:
    - dispatch(LOCK_KEYCHAIN)(app) - and erase everything in clear

