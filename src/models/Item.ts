import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';

interface ItemModel extends Model<InferAttributes<ItemModel>, InferCreationAttributes<ItemModel>> {
    id: CreationOptional<string>,
    userID: string,
    PRBoxID: string,

    status: 'Received' | 'Shipped' | 'Delivered',
    price: CreationOptional<string> | null,
    image: CreationOptional<string> | null,
    imageShipped: CreationOptional<string> | null,
    tracking: CreationOptional<string> | null,
    weight: CreationOptional<string> | null, // AB: weight grams
    carrier: CreationOptional<string> | null,

    stripePaymentResponse: CreationOptional<string> | null,

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

    stripePaymentResponse: {
        type: Sequelize.TEXT,
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
                'stripePaymentResponse'
            ]
        }
    },
});

export default Item;

export {
    ItemModel,
    Item,
};
