const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

const User = require('./User');
const Invoice = require('./Invoice');
const GithubRequest = require('./GithubRequest');
const Notification = require('./Notification');

// Set up associations
User.hasMany(Invoice, { foreignKey: 'userId' });
Invoice.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(GithubRequest, { foreignKey: 'userId' });
GithubRequest.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });


const models = {
    User,
    Invoice,
    GithubRequest,
    Notification,
    sequelize,
};

module.exports = models;
