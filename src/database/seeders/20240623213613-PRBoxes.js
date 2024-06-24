const moment = require('moment');

const insert = [{
    id: 'd8985d0d-078b-41d2-bb2e-61bb71413976',
    userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    name: 'Seeded PRBox',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}];

module.exports = {
    up: (queryInterface,) => queryInterface.bulkInsert('PRBoxes', insert),
    down: () => { }
};
