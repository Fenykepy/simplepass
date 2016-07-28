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

