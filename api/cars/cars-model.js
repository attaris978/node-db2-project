const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  console.log("getting all");
  return db('cars')
  
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where({id})
  .then(car => car[0])
  .catch(() => console.error("Failed to get car from database"))
}

const getByVin = (vin) => {
  // DO YOUR MAGIC
  return db('cars').where({vin})
  .then(car => car)
  .catch(() => console.error("Failed to get car from database"))
}


const create = (car) => {
  // DO YOUR MAGIC
  return db('cars').insert(car)
  .then(id => db('cars').where({id}))
  .then(car => car[0])

  .catch(() => console.error("Failed to add car to database"))
}

module.exports = {
  getAll,  getById,  getByVin, create
}
