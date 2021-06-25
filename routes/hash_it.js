var crypto = require('crypto');

var hash_it=(raw, key)=>{
    var hmac = crypto.createHmac('sha256',key);
    var data = hmac.update(raw);
    return data.digest('hex');
}

module.exports = hash_it;