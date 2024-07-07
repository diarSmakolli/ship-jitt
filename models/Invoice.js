// build the invoice table and associate it with the user table, i have associated userId in invoices in pg admin postgre sql

const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const User = require('./User');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DIALECT, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const Invoice = sequelize.define('invoices', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
    },
    transactionId: {
        type: Sequelize.DataTypes.STRING,
    },
    date: {
        type: Sequelize.DataTypes.STRING,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
    },
    currency: {
        type: Sequelize.DataTypes.STRING,
    },
    paymentMethod: {
        type: Sequelize.DataTypes.STRING,
    },
    paymentStatus: {
        type: Sequelize.DataTypes.STRING,
    },
    createdAt: {
        type: Sequelize.DataTypes.STRING,
    },
    createdBy: {
        type: Sequelize.DataTypes.STRING,
    },
    updatedAt: {
        type: Sequelize.DataTypes.STRING,
    },
    updatedBy: {
        type: Sequelize.DataTypes.STRING,
    },
    deletedAt: {
        type: Sequelize.DataTypes.STRING,
    },
    deletedBy: {
        type: Sequelize.DataTypes.STRING,
    },
    userId: {
        type: Sequelize.DataTypes.STRING,
    },
    priceId: {
        type: Sequelize.DataTypes.STRING,
    },
    planName: {
        type: Sequelize.DataTypes.STRING,
    },
    
}, {
    tableName: 'invoices',
    timestamps: false
});


module.exports = Invoice;