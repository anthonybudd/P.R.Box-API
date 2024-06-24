import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';
import { UpdatedAt } from 'sequelize-typescript';

interface ChargeModel extends Model<InferAttributes<ChargeModel>, InferCreationAttributes<ChargeModel>> {
    id: CreationOptional<string>,
    userID: string,
    amount: string,
    description: string,
    createdAt: CreationOptional<string>,
    updatedAt: CreationOptional<string>,
}

const Charge = sequelize.define<ChargeModel>('Charges', {
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
}, {
    tableName: 'Charges',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: [
                // Excluded properties
            ]
        }
    },
});

export default Charge;

export {
    ChargeModel,
    Charge,
};
