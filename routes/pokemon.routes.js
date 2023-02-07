const { Router } = require('express');
const {
  createPokemon,
  deletePokemon,
  findPokemon,
  findPokemons,
  updatePokemon,
} = require('../controllers/pokemon.controllers.js');

const router = Router();

//Get routes

router.get('/', findPokemons);
router.get('/:id', findPokemon);

//Post routes

router.post('/create', createPokemon);

//Patch routes
router.patch('/update/:id', updatePokemon);

//delete routes
router.patch('/delete/:id', deletePokemon);

module.exports = {
  pokemonRouter: router,
};
