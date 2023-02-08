const { Router } = require('express');
const {
  createPokemon,
  deletePokemon,
  findPokemon,
  findPokemons,
  updatePokemon,
} = require('../controllers/pokemon.controllers.js');
const { validExistPokemon } = require('../middlewares/pokemon.middleware.js');

const router = Router();

//Get routes

router.get('/', findPokemons);
router.get('/:id', validExistPokemon, findPokemon);

//Post routes

router.post('/create', createPokemon);

//Patch routes
router.patch('/update/:id', updatePokemon);

//delete routes
router.patch('/delete/:id', validExistPokemon, deletePokemon);

module.exports = {
  pokemonRouter: router,
};
