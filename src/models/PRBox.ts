import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';
import { UpdatedAt } from 'sequelize-typescript';

interface PRBoxModel extends Model<InferAttributes<PRBoxModel>, InferCreationAttributes<PRBoxModel>> {
    id: CreationOptional<string>,
    name: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    city: string,
    zipcode: string,
    state: string,
    createdAt: CreationOptional<string>,
    updatedAt: CreationOptional<string>,
}

const PRBox = sequelize.define<PRBoxModel>('PRBox', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
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
}, {
    tableName: 'PRBoxes',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: [
                // Excluded properties
            ]
        }
    },
});

export default PRBox;

export {
    PRBoxModel,
    PRBox,
};
