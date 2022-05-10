const {getAll,  getById,  getByVin, create} = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  getById(req.params.id)
  .then(entry => {
    if (!entry) {
      res.status(404).json({message: `car with id ${req.params.id} is not found`})
    } else {
      next()
    }
  })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json(!vin ? {message: "vin is missing"} : !make ? {message: "make is missing"} : !model ? {message: "model is missing"} : {message: "mileage is missing"})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  getByVin(req.body.vin)
  .then(record => {
    if (record.length > 0) {
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  })
}

module.exports = {
  checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique
}