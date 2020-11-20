const express = require('express');
const config = require('../../config');
const path = require('path');


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/index.html'));
});

router.get('/bisection', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/bisection.html'));
});

router.get('/incrementales', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/incrementales.html'));
});

router.get('/false', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/falsa.html'));
});

router.get('/newton', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/newton.html'));
});

router.get('/puntofijo', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/puntofijo.html'));
});

router.get('/gaussianaSimple', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/gaussianaSimple.html'));
});

module.exports = router;