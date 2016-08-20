# SimplePass, a simple password manager

## Install

### Install Dependencies

On a debian like system, run as root:

    # apt-get update
    # apt-get safe-upgrade
    # apt-get install nodejs npm mongodb

### Configure Node

    $ git clone https://github.com/Fenykepy/simplepass.git
    $ cd simplepass
    $ npm install

### Start for development

    $ npm start

 * Open your browser http://localhost:3000/


### Start for production

 * Set up your production configuration:

    $ cp prod_config.js.example prod_config.js

 * Edit config as you wish (make sure to set a strong `SECRET_KEY` )
 * Edit `config.js` as follow:


```
    //import settings from './devel_config'
    import settings from './prod_config'
    export default settings
```

 * Build then start node server

    $ npm run build
    $ npm start_prod
