import express from 'express';
const router = express.Router();

import { Characters, sequelize } from '../../utils/db.js';

// Define character routes
router.get('/', async (req, res) => {
    try {
        const characters = await Characters.findAll();
        res.status(200).json({characters})
    } catch (error) {
        console.log('Error fetching characters:', error);
        res.status(500).json({error})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const character = await Characters.findByPk(req.params.id);
        res.status(200).json({character})
    } catch (error) {
        console.log(`Error fetching character ${req.params.id}:`, error);
        res.status(500).json({error})
    }
});


router.post('/create', async (req, res) => {
    const {name, mass, height, gender, picture} = req.body

    // We should perform security checks and validate data from req.body, for time reasons, they will not be done here
    if (name, mass, height, gender, picture) {
        try {
            const newCharacter = await Characters.create({
                name, mass, height, gender, picture
            });
            res.status(200).json({characters: newCharacter})
        } catch (error) {
            throw new Error('Error creating character:', error);
        }
    }
});

router.put('/update/:id', async (req, res) => {
    // We should perform security checks and validate data from req.body, for time reasons, they will not be done here
    try {
        const character = await Characters.findByPk(req.params.id);
        if (!character) {
            throw new Error('Character not found');
        }
        await character.update(req.body);
        return character;
    } catch (error) {
        throw new Error('Error updating character:', error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const character = await Characters.findByPk(req.params.id);
        if (!character) {
            throw new Error(`Character ${req.params.id} not found`);
        }
        await character.destroy();
        res.sendStatus(200)
    } catch (error) {
        console.log(`Error deleting character ${req.params.id}:`, error);
        res.status(500).json({error})
    }
});

export default router;