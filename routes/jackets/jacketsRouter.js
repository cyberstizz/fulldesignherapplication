const express = require('express');
const jacketsRouter = express.Router({mergeParams: true});
// const cors = require('cors');
// const passport = require('passport');

const pool = require('../../db');



// all jackets
jacketsRouter.get('/allJackets', async(req, res) => {
    try {
      const result = await pool.query('SELECT * FROM jackets'); // Replace 'customers' with your table name
      const jackets = result.rows;
      res.json({ jackets });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  jacketsRouter.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const result = await pool.query('SELECT * FROM jackets WHERE product_id = $1', [productId]);
      const jacket = result.rows[0]; // Assuming product_id is unique
  
      if (jacket) {
        res.json({ jacket });
      } else {
        res.status(404).json({ error: 'jacket not found' });
      }
    } catch (error) {
      console.error('Error fetching croc:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  module.exports = jacketsRouter;
