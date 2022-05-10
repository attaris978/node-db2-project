// DO YOUR MAGIC
const express = require('express');

const {getAll,  getById,  create} = require('./cars-model');
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware');

const router = express.Router();



router.get('/', (req,res) => {
    getAll()
    .then(cars => res.status(200).json(cars))
    .catch(() => res.status(500).json({message: "Failed to get car records"}))
})

router.get('/:id', checkCarId, (req,res) => {
    getById(req.params.id)
    .then(car => res.status(200).json(car))
    .catch(() => res.status(500).json({message: "Failed to get car records"}))
})

router.post('/', checkCarPayload , checkVinNumberValid, checkVinNumberUnique, (req,res) => {
    create(req.body)
    .then(newCar => res.status(201).json(newCar))
    .catch(() => res.status(500).json({message: "Failed to new car record"}))
})

module.exports = router;