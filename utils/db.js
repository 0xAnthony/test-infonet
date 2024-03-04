import {Sequelize, DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const Characters = sequelize.define('Characters', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Movies = sequelize.define('movies', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const MoviesCharacters = sequelize.define('movies_characters', {
    movie_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'movies', // References the movies table
            key: 'id' // References the id column in the movies table
        }
    },
    character_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Characters', // References the Characters table
            key: 'id' // References the id column in the Characters table
        }
    }
});

// Sync the model with the database
(async () => {
    try {
        await sequelize.sync();
        console.log('Models synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
})();

export default {Characters, Movies, MoviesCharacters, sequelize};
