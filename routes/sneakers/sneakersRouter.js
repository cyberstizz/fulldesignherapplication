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

  
  module.exports = sneakersRouter;
