const { Router } = require('express');
const { transferAmount } = require('../controllers/transfer.controller');

const router = Router();

router.post('/', transferAmount);

module.exports = {
  transferRouter: router,
};
