const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

router.get('/', async (req, res) => {
    try {
        const areas = await Candidate.find({}, 'name');
        res.json(areas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:area', async (req, res) => {
    try {
        const areaName = req.params.area;

        const documentWithAreas = await Candidate.findOne({});

        if (!documentWithAreas) {
            return res.status(404).json({ message: 'Document not found in the database' });
        }

        console.log('Document:', documentWithAreas);

        const areasArray = documentWithAreas.toObject().areas;

        console.log('Areas Property:', areasArray);

        if (!Array.isArray(areasArray)) {
            return res.status(500).json({ message: 'Areas property is not an array or is missing' });
        }

        const specificArea = areasArray.find(a => a && a.name.toLowerCase() === areaName.toLowerCase());

        if (!specificArea) {
            return res.status(404).json({ message: 'Area not found in the document or does not have candidates' });
        }

        if (!Array.isArray(specificArea.candidates)) {
            return res.status(500).json({ message: 'Candidates property is not an array or is missing' });
        }

        res.json(specificArea.candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});




module.exports = router;
