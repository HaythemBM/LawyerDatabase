const mongoose = require('mongoose');
const client = require('../models/client');

const dossierSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: true,
        min: 1
    },
    sujet: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true,
        unique: true
    },
    prix: {
        type: Number,
        required: true 
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
})

const Dossier = mongoose.model('Dossier', dossierSchema);

module.exports = Dossier;