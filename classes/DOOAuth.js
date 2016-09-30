const electronOauth2 = require('electron-oauth2');

class DOOAuth {

    constructor() {
        // Instance Vars
        this.oAuthConfig = {
            clientId: 'SET_ME',
            clientSecret: 'SET_ME',
            authorizationUrl: 'https://cloud.digitalocean.com/v1/oauth/authorize',
            tokenUrl: 'https://cloud.digitalocean.com/v1/oauth/token',
            useBasicAuthorizationHeader: false,
            redirectUri: 'https://localhost/api/v1/oauth'
        };
        this.windowParams = {
            alwaysOnTop: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false
            },
            width: 1200,
            height: 800
            //width: 400,
            //height: 720
        };
        this.options = {
            scope: 'read write'
            //,accessType: 'ACCESS_TYPE'
        };
        this.oAuth = electronOauth2(this.oAuthConfig, this.windowParams);
    }

    getAccessToken() {
        return this.oAuth.getAccessToken(this.options);
    }

    getRefreshToken(refreshToken) {
        return this.oAuth.refreshToken(refreshToken);
    }
}

module.exports = DOOAuth;