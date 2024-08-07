import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<string>,
    PRBoxID: CreationOptional<string> | null,

    email: string,
    password: string,
    type: 'User' | 'Admin',
    status: 'Pending' | 'Approved' | 'Banned',

    firstName: string,
    lastName: CreationOptional<string> | null,
    tos: CreationOptional<string> | null,
    bio: CreationOptional<string> | null,

    addressLine1: CreationOptional<string> | null,
    addressLine2: CreationOptional<string> | null,
    addressLine3: CreationOptional<string> | null,
    city: CreationOptional<string> | null,
    zipcode: CreationOptional<string> | null,
    state: CreationOptional<string> | null,

    stripeCustomerID: CreationOptional<string> | null,
    stripeLast4: CreationOptional<string> | null,
    stripePaymentMethod: CreationOptional<string> | null,

    inviteKey: CreationOptional<string> | null,
    passwordResetKey: CreationOptional<string> | null,
    emailVerificationKey: CreationOptional<string> | null,
    emailVerified: CreationOptional<boolean>,
    lastLoginAt: CreationOptional<string>,
}

const User = sequelize.define<UserModel>('User', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    PRBoxID: {
        type: Sequelize.UUID,
        allowNull: true,
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
    type: {
        type: Sequelize.STRING,
        defaultValue: 'User',
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending',
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

    stripeCustomerID: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    stripeLast4: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    stripePaymentMethod: {
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
}, {
    tableName: 'Users',
    defaultScope: {
        attributes: {
            exclude: [
                'password',
                'passwordResetKey',
                'emailVerificationKey',
                'inviteKey',
                'stripeCustomerID',
                'stripePaymentMethod',
            ]
        }
    },
});

export default User;

export {
    UserModel,
    User,
};
