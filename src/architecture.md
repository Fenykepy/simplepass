# Simple Pass
## Main idea

- All passwords are stored in an single text file:
 * It makes it easy to backup and clone
 * File name is stored in config.js with username
 * Content of file is a encrypted json object

 1. Client request whole file content to server with credentials (force ssl)
 2. Client ask user for passphrase and starts a timeout
 3. Client decrypt file with passphrase and parse json then :
    - User can copy existing password to clipboard
    - User can add new password or note with datas
    - User can group passwords by group
 4. At each write operation, client encrypt json object and send it to server
 5. When timeout ends, everything is cleared and user needs to enter passphrase again

## Server side

- We need a way to store user credentials (username, mail, password, filename -> maybe a hash of username)
- We use jwt for credentials
- API end points :
    - get jwt
    - get encrypted json object
    - put encrypted json object
    - register
    - password recovery
    - user profil update (new password or new mail)
    - remove file

## Client side

- Check credentials
- Get encrypted json object:
    - if we have an empty string:
        - ask user to set a main password and to confirm it
        - store main password in state TODO find a way to do not store password (asymetric keys ?)
        - create default ejson with user data (username, email)
        - start timeout
    - if we have ejson:
        - ask user for main password
        - store main password in state
        - uncrypt ejson
        - start timeout
    - play with app:
        - add new password, note or bank card
        - update it
        - delete it
        - add group
        - update group
        - delete group
        - copy hidden content to clipboard -> https://github.com/xavi-/node-copy-paste
        - change timeout
        - change main password
        - grab json from state, crypt json to ejson and send it to server at each writing change
    - at timeout end:
        - delete json and password
        - keep ejson
    - at logout:
        - clear everything, including ejson


## Keychain structure ( content of .ejson file once uncrypted)

    JSON = {
        config: {
            timeout: 180 # default to 3 minutes,
            username: "fenykepy",
            email: "pro@lavilotte-rolle.fr",
        },
        groups: {
            [id]: {id: "hash", name: "groupe1"},
            [id]: {id: "hash", name: "groupe1"},
        },
        passwords: {
            [id]: {id: "hash", name: "my password name", url: "http://my_site", password: "my password", groups: "group's hash"},
        },
        notes: {
            [id]: {id: "hash", title: "my title", content: "my content"},
        },
        bank_cards: {
            [id]: {id: "hash", owner: "John Poe", number: 0000000000000000, expires: "MM/AA", cryptogram: 000, description: "cic card"},
        }
    }

## Encrypted json object structure (.ejson file)

We almost work like a jwt :

    eyJhbGciOiJBRVMtQ0JDIiwiaXYiOiI3L1BocG1HMW5JWk1LU0JYSnMrK3lBPT0iLCJ0eXBlIjoiRUpTT04ifQ.k6UhQG_mZUnhkgoiOiWeZw28RcFzgBMHL38IsFMT2q-

We have the header and the cipher, both urlbase64 encoded, separated by a dot `.`

I wonder if it's necessary to add a signature :
    - Header could be modified, and it would result in invalid EJSON, but is that a problem ?

### Header
    urlbase64 encoded JSON:
    
    {
        "alg": "AES-CBC",
        "iv": "7/PhpmG1nIZMKSBXJs++yA==",
        "type": "EJSON"
    }

### Cipher
    url base64 encoded encryted keychain
    
