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

- Get credentials
- Get encrypted json object
- Ask main password to user
- Decrypt json object
- play with it
    - add new entry
    - update entry
    - delete entry
    - add group
    - delete group
    - copy hidden content to clipboard -> https://github.com/xavi-/node-copy-paste
    - change timeout
    - change main password
- Encrypt and post it to server at each change
- Ask again main password at timeout end
- Logout - clear encrypted json object and delete jwt


## Encrypted json object structure (.ejson file)

    JSON = {
        config: {
            timeout: 180 # default to 3 minutes,
            username: "fenykepy",
            email: "pro@lavilotte-rolle.fr",
        },
        groups: [
            {id: "hash of name", name: "groupe1"},
            {id: "hash of name", name: "groupe1"},
        ],
        entries: [
            {id: "hash of name", name: "my password name", type: "password", url: "http://my_site", content: "my password", group: "group's hash"},
            {id: "hash of name", name: "my note name", type: "note", url: "http://my_site", content: "my note", group: "group's hash", date_created: date, date_updated: date},
        ]
    }

