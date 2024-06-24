import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';
import { UpdatedAt } from 'sequelize-typescript';

interface PRBoxModel extends Model<InferAttributes<PRBoxModel>, InferCreationAttributes<PRBoxModel>> {
    id: CreationOptional<string>,
    userID: string,
    name: string,
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

    userID: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    name: {
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
