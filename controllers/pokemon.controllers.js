const Pokemon = require('../models/pokemon.model');

const findPokemons = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const { count, rows } = await Pokemon.findAndCountAll({
      attributes: ['id', 'name', 'image'],
      where: {
        status: 'available',
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Pokemons were found successfully',
      count,
      results: rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findPokemon = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;

    // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
    const pokemon = await Pokemon.findOne({
      attributes: ['id', 'name', 'image'],
      where: {
        id,
        status: 'available',
      },
    });

    // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
    if (!pokemon) {
      return res.status(404).json({
        status: 'error',
        message: 'Pokemon not found',
      });
    }

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const createPokemon = async (req, res) => {
  const { name, image } = req.body;

  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    image: image,
  });
  res.status(201).json({
    status: 'succes',
    message: 'Pokemon Created succesfully',
    pokemon,
  });
};
const updatePokemon = async (req, res = response) => {
  const { name, image } = req.body;
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;

  // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
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

  await pokemon.update({ name, image });
  res.status(200).json({
    status: 'succes',
    message: 'Pokemon Updated succesfully',
    pokemon,
  });
};
const deletePokemon = async (req, res) => {
  // 1. Get the ID from the parameters
  const { id } = req.params;

  // 2. Find the pokemon with the given ID and with status "available"
  const pokemon = await Pokemon.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  // 3. If the pokemon does not exist, return an error response
  if (!pokemon) {
    return res.status(404).json({
      status: 'error',
      message: 'Pokemon not found',
    });
  }

  // 4. Delete the pokemon
  await pokemon.update({ status: 'disable' });

  // 5. Return a success response
  res.status(200).json({
    status: 'success',
    message: 'Pokemon deleted successfully',
  });
};

module.exports = {
  findPokemons,
  findPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
