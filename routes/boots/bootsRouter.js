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

  module.exports = bootsRouter;
  