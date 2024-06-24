import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';
import { UpdatedAt } from 'sequelize-typescript';

interface PackageModel extends Model<InferAttributes<PackageModel>, InferCreationAttributes<PackageModel>> {
    id: CreationOptional<string>,
    userID: string,
    PRBoxID: string,
    name: string,
    status: 'Received' | 'Shipped' | 'Delivered',
    price: CreationOptional<string> | null,
    image: CreationOptional<string> | null,
    createdAt: CreationOptional<string>,
    updatedAt: CreationOptional<string>,
}

const Package = sequelize.define<PackageModel>('Package', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },

    userID: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    PRBoxID: {
        type: Sequelize.UUID,
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
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
}, {
    tableName: 'Packages',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: [
                // Excluded properties
            ]
        }
    },
});

export default Package;

export {
    PackageModel,
    Package,
};
