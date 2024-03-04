const express = require('express');
const crocsRouter = express.Router({mergeParams: true});
const pool = require('../../db');
// const redisClient = require('../../redis-config');



// all crocs
crocsRouter.get('/allCrocs', async(req, res) => {

  
  // if (!redisClient.isOpen) {
  //   console.log('Redis client not connected. Attempting to reconnect...');
  //   await redisClient.connect().catch(console.error);
  // }


  // const cacheKey = 'allCrocs';

  // redisClient.get(cacheKey, async (err, cachedCrocs) => {
  //     if (err) {
  //         console.error('Redis error:', err);
  //         return res.status(500).json({ error: 'Internal server error' });
  //     }

  //     if (cachedCrocs) {
  //         // Send cached data
  //         return res.json(JSON.parse(cachedCrocs));
  //     } else {
          try {
              const result = await pool.query('SELECT * FROM crocs');
              const crocs = result.rows;

              // Cache the result
              // redisClient.setex(cacheKey, 3600, JSON.stringify(crocs)); // Cache for 1 hour

              res.json({ crocs });
          } catch (error) {
              console.error('Error fetching crocs:', error);
              res.status(500).json({ error: 'Internal server error' });
          }
      });

  


    
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
