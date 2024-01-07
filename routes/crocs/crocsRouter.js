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


  module.exports = crocsRouter;
