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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'First name is required'
            }
        }
    },
    last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Last name is required'
            }
        }
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'A valid email is required.'
            }
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password is required'
            },
            len: {
                args: [6, 100],
                msg: 'Password must be at least 6 characters long'
            }
        }
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
    },
    customerId: {
        type: Sequelize.DataTypes.STRING,
        // validate: {
        //     is: /^cus_.+/,
        // },
        allowNull: true,
    },
    priceId: {
        type: Sequelize.DataTypes.STRING,
        // validate: {
        //     is: /^price_.+/,
        // },
        allowNull: true,
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;