module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Items', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },

        userID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        PRBoxID: {
            type: Sequelize.UUID,
            allowNull: false,
        },

        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        imageShipped: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tracking: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        weight: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        carrier: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        receivedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        shippedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        deliveredAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Items'),
};
