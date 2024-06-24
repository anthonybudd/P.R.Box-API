const moment = require('moment');

const insert = [{
    id: '05447dd7-1035-49aa-bb3e-719cd4712752',
    userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    amount: '1000',
    description: 'For package 1 and 2',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}];

module.exports = {
    up: (queryInterface,) => queryInterface.bulkInsert('Charges', insert),
    down: () => { }
};
