const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const User = require('./User');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DIALECT, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const GithubRequest = sequelize.define('github_requests', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
    },
    createdBy: {
        type: Sequelize.DataTypes.STRING,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
    },
    updatedBy: {
        type: Sequelize.DataTypes.STRING,
    },
    deletedAt: {
        type: Sequelize.DataTypes.DATE,
    },
    deletedBy: {
        type: Sequelize.DataTypes.STRING,
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
    },
}, {
    tableName: 'github_requests',
    timestamps: false
});

module.exports = GithubRequest;