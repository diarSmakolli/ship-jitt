const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const User = require('./User');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DIALECT, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const Notification = sequelize.define('notifications', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.DataTypes.STRING,
    },
    read: {
        type: Sequelize.DataTypes.BOOLEAN,
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
    },
}, {
    tableName: 'notifications',
    timestamps: false
});

module.exports = Notification;