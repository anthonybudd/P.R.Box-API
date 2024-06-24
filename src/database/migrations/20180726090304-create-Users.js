module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false,
        },
        bio: {
            type: Sequelize.STRING,
            defaultValue: '',
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


        tos: Sequelize.STRING,
        inviteKey: Sequelize.STRING,
        passwordResetKey: Sequelize.STRING,
        emailVerificationKey: Sequelize.STRING,
        emailVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },

        lastLoginAt: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
