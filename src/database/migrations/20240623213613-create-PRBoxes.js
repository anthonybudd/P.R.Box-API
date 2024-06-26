module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('PRBoxes', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        addressLine1: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        addressLine2: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        addressLine3: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        zipcode: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        state: {
            type: Sequelize.STRING,
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
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('PRBoxes'),
};
