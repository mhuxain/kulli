# Kulli REST Client

Kulli REST Client

### setup
- npm install
- update quasar.conf.js file devServer.proxy section to reflect to your dev environment
    * '/api': refers to this project api (to be developed). All requests that start with /api will be proxyed to api url
    * '/oauth' : refers to Oauth server all requests that start with /oauth will be proxyed to oauth url
    * '/vapi' : refers to vinavi api, all requests that start with /vapi will be proxyed to vinavi api, "/vapi" will be removed from the url. e.g. /vapi/settings will become /settings when sent to vianvi api

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).
