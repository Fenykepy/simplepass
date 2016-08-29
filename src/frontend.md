# Simple Pass Frontend

# only four urls

 - "/" => redirect to "/login/" if user isn't authenticated
 - "/login/"
 - "/register/"
 - "/recover/"
 - "/profil/" => redirect to "/login/" if user isn't authenticated

# components
    - App -> Header -> child
        - not authenticated: '/' Index
        - not authenticated: '/login/' Login
        - not authenticated: '/signup/' Signup
        - authenticated: '/' Home
            - Spinner or Keychain
        - authenticated: /admin' Admin


# Flow

[OK]- user arrives on Index:
    [OK]- Login
    [OK]- Signup
    - recover password
[OK]- then user arrives on Home, and is authenticated:
if we have no ejson (empty string) user is new:
    [OK]- show passphrase creation form
    [OK]- dispatch(init)(app)
        [OK]- dispatch(SET_PASSPHRASE)(app)
        [OK]- dispatch(SET_CONFIG_USER)(keychain)
        [OK]- dispatch(SET_CONFIG_EMAIL)(keychain)
        [OK]- dispatch(syncKeychain)(app) (promise)
        [OK]- dispatch(updateEjson)(ejson)
            - dispatch(resetTimeout)
if we have ejson (any string):
    [OK]- show passphrase form
    [OK]- dispatch(loadKeychain)(app)
        [OK]- dispatch(SET_PASSPHRASE)(app)
        [OK]- dispatch(loadJSON)(keychain)
        [OK]- dispatch(UNLOCK_KEYCHAIN)(app)
        - dispatch(resetTimeout)

user plays with app:
    - when user starts modifying (any action)
        - dispatch(resetTimeout)(app) - to avoid timeout happening during form fullfilling
    - when something has been modified
        - dispatch(syncKeychain)(app)

timeout ends:
    - dispatch(LOCK_KEYCHAIN)(app) - and erase everything in clear

