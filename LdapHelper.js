const BaseHelper = require('../BaseHelper.js');

export class LdapHelper {

    loginLdap (url, domain, username, password) {

        const Ldap = require('ldapjs');

        return new Promise((resolve, reject) => {
            const client = Ldap.createClient({
                url: url,
                timeout: 600000,
                connectTimeout: 1000,
            });

            client.once('error', () => {
                reject(false);
            });

            client.bind(`${domain}\\${username}`, (password ? password : ''), (err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                }

                resolve(client);
            });
        });
    }

    async searchLdapUser (key) {

        const client = await this.loginLdap(['ldap://yourldapserver.om:9999'], 'yourdomain', 'yourusername', 'thepasswordissecret');
        let exist = {};

        const opts = {
            filter: `(${key})`,
            scope: 'sub',
            attributes: []
        };

        let done = await new Promise((resolve, reject) => {
            client.search('DC=yourdomain,DC=com', opts, (err, res) => {

                res.on('searchEntry', async (entry) => {
                    let ldapEntry = entry.object;

                    exist[ldapEntry.dn.split(',')] = ldapEntry.dn.split(',')[0];

                    resolve(ldapEntry);
                });

                res.on('resultError', (err) => {
                    console.error('error:'  + err);
                    resolve(false);
                });

                res.on('error', (err) => {
                    console.error('error: ' + err.message);
                    resolve(false);
                });

                res.on('end', (result) => {
                    console.log('on: --------end: ' + result);
                    resolve(result);
                });
            });
        });

        return done;
    }
    
}

module.exports = LdapHelper;
