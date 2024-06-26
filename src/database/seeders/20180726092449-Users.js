const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const insert = [{
    id: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    email: 'user@example.com',
    password: bcrypt.hashSync('Password@1234', bcrypt.genSaltSync(10)),
    type: 'User',
    PRBoxID: 'd8985d0d-078b-41d2-bb2e-61bb71413976',
    status: 'Approved',
    // status: 'Pending',
    firstName: 'User',
    lastName: 'One',
    bio: 'I am a user',
    tos: 'tos-version-2023-07-13',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    zipcode: '',
    state: 'Puerto Rico',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    lastLoginAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}, {
    id: 'd700932c-4a11-427f-9183-d6c4b69368f9',
    email: 'other.user@foobar.com',
    password: bcrypt.hashSync('Password@1234', bcrypt.genSaltSync(10)),
    type: 'User',
    status: 'Pending',
    firstName: 'John',
    lastName: 'Smith',
    state: 'Puerto Rico',
    bio: 'I am a user',
    tos: 'tos-version-2023-07-13',
    inviteKey: '86f30ff9618e',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    lastLoginAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}, {
    id: '46d4eba1-4d93-45b4-a74c-33ab657e3daf',
    email: 'admin@example.com',
    password: bcrypt.hashSync('Password@1234', bcrypt.genSaltSync(10)),
    type: 'Admin',
    status: 'Approved',
    state: 'Puerto Rico',
    firstName: 'ADMIN',
    lastName: 'ADMIN',
    bio: 'I\'m the Admin',
    tos: 'tos-version-2023-07-13',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    lastLoginAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}];


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', insert).catch(err => console.log(err)),
    down: (queryInterface, Sequelize) => { }
};
