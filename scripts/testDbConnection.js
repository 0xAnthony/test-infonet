import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Try connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected');
    } catch (error) {
        console.error('Error connecting:', error);
    }
})();