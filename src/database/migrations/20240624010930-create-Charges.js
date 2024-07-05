module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Charges', {
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
        itemID: {
            type: Sequelize.UUID,
            allowNull: false,
        },

        stripePaymentResponse: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        amount: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Charges'),
};
