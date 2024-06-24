const moment = require('moment');

const insert = [{
    id: '0b830fd7-fa57-4d86-9432-d8bf3c40dc77',
    userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    PRBoxID: 'd8985d0d-078b-41d2-bb2e-61bb71413976',
    name: 'Seeded Item',
    status: 'Received',
    image: '/img/package-1.png',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}, {
    id: 'ef37d0b1-879f-459e-b0c9-ee3a0348cbd2',
    userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    PRBoxID: 'd8985d0d-078b-41d2-bb2e-61bb71413976',
    name: 'Seeded Item',
    status: 'Shipped',
    tracking: '1ZY5672W0398860870',
    price: '12.00',
    image: '/img/package-2.png',
    weight: '1000',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}, {
    id: 'f9768987-f521-40fe-8ad7-db14f92e8c18',
    userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    PRBoxID: 'd8985d0d-078b-41d2-bb2e-61bb71413976',
    name: 'Seeded Item',
    status: 'Delivered',
    tracking: '1ZY5672W0398860870',
    price: '15.00',
    image: '/img/package-3.png',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
}];

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert('Items', insert),
    down: () => { }
};
