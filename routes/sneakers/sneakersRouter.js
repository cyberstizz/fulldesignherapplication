const express = require('express');
const sneakersRouter = express.Router({mergeParams: true});
// const cors = require('cors');
// const passport = require('passport');

const pool = require('../../db');



// all sneakers
sneakersRouter.get('/allSneakers', async(req, res) => {
    try {
      const result = await pool.query('SELECT * FROM sneakers'); // Replace 'customers' with your table name
      const sneakers = result.rows;
      res.json({ sneakers });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  sneakersRouter.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const result = await pool.query('SELECT * FROM sneakers WHERE product_id = $1', [productId]);
      const sneaker = result.rows[0]; // Assuming product_id is unique
  
      if (sneaker) {
        res.json({ sneaker });
      } else {
        res.status(404).json({ error: 'sneaker not found' });
      }
    } catch (error) {
      console.error('Error fetching croc:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  module.exports = sneakersRouter;
