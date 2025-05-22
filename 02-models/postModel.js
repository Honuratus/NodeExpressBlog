import { Admin } from "./adminModel.js";
import { DataTypes } from "sequelize";
import sequelize from '../database.js'

const Post = sequelize.define('Post', {
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    postText: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    postCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    adminID: {  
        type: DataTypes.INTEGER,
        references: {
            model: Admin,
            key: 'id'
        },
        allowNull: false, 
    }
});

Admin.hasMany(Post, {
    foreignKey: 'adminID',
    as: 'posts'
});

Post.belongsTo(Admin, {
    foreignKey: 'adminID',
    as: 'admin'
})



export default Post 