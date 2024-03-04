import express from 'express';
const router = express.Router();

import { Movies } from '../../utils/db.js';

// Define movies routes
router.get('/', async (req, res) => {
    try {
        const movies = await Movies.findAll();
        res.status(200).json({movies})
    } catch (error) {
        console.log('Error fetching movies:', error);
        res.status(500).json({error})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movies.findByPk(req.params.id);
        res.status(200).json({movie})
    } catch (error) {
        console.log(`Error fetching movie ${req.params.id}:`, error);
        res.status(500).json({error})
    }
});

export default router;