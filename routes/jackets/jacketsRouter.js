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

  
  module.exports = jacketsRouter;
