const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DIALECT, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const User = sequelize.define('users', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    profile_picture: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    isPaid: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isVerify: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verification_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    hasAccess: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    resetToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiry: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
    },
    createdBy: {
        type: Sequelize.DataTypes.STRING,
    },
    deletedAt: {
        type: Sequelize.DataTypes.DATE,
    },
    deletedBy: {
        type: Sequelize.DataTypes.STRING,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
    },
    updatedBy: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;