import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';

interface ItemModel extends Model<InferAttributes<ItemModel>, InferCreationAttributes<ItemModel>> {
    id: CreationOptional<string>,
    userID: string,
    PRBoxID: string,

    name: string,
    status: 'Received' | 'Shipped' | 'Delivered',
    price: CreationOptional<string> | null,
    image: CreationOptional<string> | null,
    tracking: CreationOptional<string> | null,
    weight: CreationOptional<string> | null, // AB: weight grams

    receivedAt: CreationOptional<string> | null,
    shippedAt: CreationOptional<string> | null,
    deliveredAt: CreationOptional<string> | null,
    createdAt: CreationOptional<string>,
    updatedAt: CreationOptional<string>,
}

const Item = sequelize.define<ItemModel>('Item', {
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
    tracking: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    weight: {
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
}, {
    tableName: 'Items',
    defaultScope: {
        attributes: {
            exclude: [
                // Excluded properties
            ]
        }
    },
});

export default Item;

export {
    ItemModel,
    Item,
};