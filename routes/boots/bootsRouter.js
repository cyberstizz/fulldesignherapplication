const express = require('express');
const bootsRouter = express.Router({mergeParams: true});
// const cors = require('cors');
// const passport = require('passport');

const pool = require('../../db');



// all crocs
bootsRouter.get('/allBoots', async(req, res) => {
    try {
      const result = await pool.query('SELECT * FROM boots'); // Replace 'customers' with your table name
      const boots = result.rows;
      res.json({ boots });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  bootsRouter.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const result = await pool.query('SELECT * FROM boots WHERE product_id = $1', [productId]);
      const boot = result.rows[0]; // Assuming product_id is unique
  
      if (boot) {
        res.json({ boot });
      } else {
        res.status(404).json({ error: 'boot not found' });
      }
    } catch (error) {
      console.error('Error fetching croc:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = bootsRouter;
  