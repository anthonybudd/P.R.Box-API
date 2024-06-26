const moment = require('moment');

const insert = [{
    id: 'd8985d0d-078b-41d2-bb2e-61bb71413976',
    name: 'P.R Box 9444',
    addressLine1: '300 Fake St.',
    addressLine2: 'Apt 1610',
    addressLine3: '',
    city: 'Austin',
    zipcode: '78701',
    state: 'Texas',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}];

module.exports = {
    up: (queryInterface,) => queryInterface.bulkInsert('PRBoxes', insert),
    down: () => { }
};
