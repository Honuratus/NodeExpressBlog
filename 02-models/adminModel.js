import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from '../database.js'


export const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
});

await sequelize.sync();

export const createAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ where: { username: 'honuratus' } });
        if (existingAdmin) {
            return;
        }

        const plainPassword = 'Yeniaday1236'
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt)

        const admin = await Admin.create({
            username: 'honuratus',
            password: hashedPassword,
            email: 'onurbaranyilmaz@gmail.com'
        })

    }
    catch (error) {
        console.log("error:", error)
    }
}


