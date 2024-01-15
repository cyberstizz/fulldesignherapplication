const express = require('express');
const crocsRouter = express.Router({mergeParams: true});
// const cors = require('cors');
// const passport = require('passport');

const pool = require('../../db');



// all crocs
crocsRouter.get('/allCrocs', async(req, res) => {
    try {
      const result = await pool.query('SELECT * FROM crocs'); // Replace 'customers' with your table name
      const crocs = result.rows;
      res.json({ crocs });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


    
// Get one croc by product_id
crocsRouter.get('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const result = await pool.query('SELECT * FROM crocs WHERE product_id = $1', [productId]);
    const croc = result.rows[0]; // Assuming product_id is unique

    if (croc) {
      res.json({ croc });
    } else {
      res.status(404).json({ error: 'Croc not found' });
    }
  } catch (error) {
    console.error('Error fetching croc:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  module.exports = crocsRouter;
