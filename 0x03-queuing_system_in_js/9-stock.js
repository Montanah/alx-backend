const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

const getAsync = promisify(client.get).bind(client);

const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
    return listProducts.filter((item) => item.itemId === id)[0];
}

function reserveStockById(itemId, stock) {
    client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const stock = await getAsync(`item.${itemId}`);
    return stock;
}

app.get('/list_products', (req, res) => {
    res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
    const item = getItemById(parseInt(req.params.itemId, 10));
    if (!item) {
        res.json({ status: 'Product not found' });
    } else {
        const currentStock = await getCurrentReservedStockById(req.params.itemId);
        res.json({
            ...item,
            currentQuantity: currentStock,
        });
    }
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const item = getItemById(parseInt(req.params.itemId, 10));
    if (!item) {
        res.json({ status: 'Product not found' });
    } else {
        const currentStock = await getCurrentReservedStockById(req.params.itemId);
        if (currentStock <= 0) {
            res.json({ status: 'Not enough stock available', itemId: req.params.itemId });
        } else {
            reserveStockById(req.params.itemId, currentStock - 1);
            res.json({ status: 'Reservation confirmed', itemId: req.params.itemId });
        }
    }
});

app.listen(1245);

module.exports = app;
