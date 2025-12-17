const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getAllItems);
router.get('/category/:category', menuController.getItemsByCategory);
router.get('/:id', menuController.getItemById);
router.post('/', menuController.createItem);
router.put('/:id', menuController.updateItem);
router.delete('/:id', menuController.deleteItem);
router.post('/seed', menuController.seedData);

module.exports = router;