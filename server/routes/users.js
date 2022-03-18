const express = require('express');

const settleController = require('../controllers/settleController');

const router = express.Router();

router.get('/', settleController.getUser, (req, res) => {
  res.status(200).json([]);
});

// :id could use any extension name
router.get('/:id', settleController.getOneUser);

router.post('/', settleController.createUser);

router.put('/:id', settleController.updateUser, (req, res) => {
  res.status(200).json();
});

router.delete('/:id', settleController.deleteUser, (req, res) => {
  res.status(200).json();
});

module.exports = router;
