const user = require('../dao/user.db');

async function userService(firstname,lastname,mobile,email){
    return await user.insertUser(firstname,lastname,mobile,email);
}


async function userByEmailService(email){
    return await user.existbyEmail(email) ; 
}

module.exports = {
    userService,
    userByEmailService
}