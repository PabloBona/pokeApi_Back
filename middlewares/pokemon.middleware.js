const Pokemon = require('../models/pokemon.model');

const validExistPokemon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pokemon = await Pokemon.findOne({
      attributes: ['id', 'name', 'image'],
      where: {
        id,
        status: 'available',
      },
    });
    if (!pokemon) {
      return res.status(404).json({
        status: 'error',
        message: 'Pokemon not found',
      });
    }
    req.pokemon = pokemon;

    next();
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went mal',
    });
  }
};

module.exports = {
  validExistPokemon,
};
