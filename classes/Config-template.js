class Config {

    // Configuration to set
    static get accessToken() {
        var val = process.env.ACCESS_TOKEN || 'SET_ME';

        return this.isSet(val);
    }

    // Helper Methods
    static isSet(val) {
        if (val === 'SET_ME') {
            throw new Error(`SET 'SET_ME' in Config.js`);
        }
        else {
            return val;
        }
    }
}

module.exports = Config;