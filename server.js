const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const redis = require('redis');
const { createClient } = require('redis');
const secret = crypto.randomBytes(64).toString('hex');
const app = express();
const port = process.env.PORT || 3001; // Change this to the desired port
const pool = require('./db');
const cors = require('cors');
const crocsRouter = require('./routes/crocs/crocsRouter')
const jacketsRouter = require('./routes/jackets/jacketsRouter')
const bootsRouter = require('./routes/boots/bootsRouter')
const sneakersRouter = require('./routes/sneakers/sneakersRouter')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
app.use(bodyParser.json());
app.use(cors());
app.use(flash());
app.use(session({
  store: new pgSession({
    pool: pool, 
    tableName: 'session',
  }),
  secret: '415bce5250e29548041087cd1add8dc54347dd7414d33d49b91d28f9ddd4fefc', // Change this to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret, resave: true, saveUninitialized: true }));



//setting up the methods to serialize and deserialize a user
passport.serializeUser((user, done) => {
  done(null, user.user_id); // Use 'user.user_id' to match your schema
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (error) {
    done(error, null);
  }
});

//now setup passport local strategy
// now setup passport local strategy
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return done(null, false, { message: 'the user was not found.' });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    console.error('Error during authentication:', error);
    return done(error);
  }
}));

// // Configure AWS SDK
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();







const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: ({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'designherbucket',
    key: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname);
    },
  }),
});


console.log('Multer-S3 configuration:', upload);  // Add this line for logging




// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'charles.lamb.dev@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'charles.lamb.dev@gmail.com',
    to,
    subject,
    text,
  };

  console.log('Gmail credentials:', {
    user: 'charles.lamb.dev@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  });
  

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build')); // Replace 'path_to_your_index_html_file' with the actual path to your HTML file
//   });



// Serve static files from the client directory
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));
}


app.delete('/:productType/:productId', async (req, res) => {
  try {
    const { productType, productId } = req.params;

    // Validate if productType is one of the allowed types
    const allowedTypes = ['crocs', 'jackets', 'sneakers', 'boots'];
    if (!allowedTypes.includes(productType)) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    // Fetch the product to be deleted to get its image path
    const selectQuery = `SELECT * FROM ${productType} WHERE product_id = $1`;
    const selectResult = await pool.query(selectQuery, [productId]);
    if (selectResult.rows.length === 0) {
      // If the product was not found
      return res.status(404).json({ error: 'Product not found' });
    }

    // Extract the image path from the product
    const imagePath = selectResult.rows[0].image_path;
    const imageKey = imagePath.split('/').pop(); // Assuming 'image_path' contains the full S3 key

    // Check if the image is shared with other products
    const checkImageUsageQuery = `
      SELECT COUNT(*) AS usage_count
      FROM ${allowedTypes.join(", ")}
      WHERE image_path = $1 AND product_id != $2;
    `;
    const imageUsageResult = await pool.query(checkImageUsageQuery, [imagePath, productId]);
    const isImageShared = parseInt(imageUsageResult.rows[0].usage_count, 10) > 0;

    // Delete the product from the database
    const deleteQuery = `DELETE FROM ${productType} WHERE product_id = $1 RETURNING *`;
    await pool.query(deleteQuery, [productId]);

    // Only delete the image from S3 if it is not shared
    if (!isImageShared) {
      const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
      await s3.send(new DeleteObjectCommand({
        Bucket: 'designherbucket',
        Key: imageKey,
      }));
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// const redisClient = redis.createClient({
//   // If you're using a local Redis server without a password
//   // For a managed Redis instance, you would specify host, port, and auth_pass
// });




///////////////////////////////////////////////
app.use('/croc', crocsRouter)

app.use('/jacket', jacketsRouter)

app.use('/boot', bootsRouter)

app.use('/sneaker', sneakersRouter);

///////////////////////////////////////////////

app.get('/reviews/:productType/:productId', async (req, res) => {
  const { productType, productId } = req.params;

  try {
    // Query to fetch reviews and calculate average rating
    const reviewQuery = `
      SELECT * FROM reviews
      WHERE product_id = $1 AND product_type = $2;
    `;

    const avgRatingQuery = `
      SELECT AVG(rating) as average_rating FROM reviews
      WHERE product_id = $1 AND product_type = $2;
    `;

    // Execute both queries in parallel
    const [reviewResult, avgRatingResult] = await Promise.all([
      pool.query(reviewQuery, [productId, productType]),
      pool.query(avgRatingQuery, [productId, productType])
    ]);

    const reviews = reviewResult.rows;
    const averageRating = avgRatingResult.rows[0].average_rating ? parseFloat(avgRatingResult.rows[0].average_rating).toFixed(1) : null;

    // Send back reviews along with the average rating
    res.json({ reviews, averageRating });
  } catch (error) {
    console.error('Error fetching reviews and average rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to submit a new review
app.post('/reviews', async (req, res) => {
  console.log(req.body); // Add this line to log the request body

  const { product_id, product_type, user_id, headline, review, rating } = req.body;

  try {
      const sqlQuery = `
          INSERT INTO reviews (product_id, product_type, user_id, headline, review, rating)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
      `;
      const values = [product_id, product_type, user_id, headline, review, rating];
      
      const result = await pool.query(sqlQuery, values);
      const newReview = result.rows[0];
      
      res.status(201).json({
          message: "Review submitted successfully",
          review: newReview,
      });
  } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/search', async (req, res) => {
  const { query } = req.query; // Assuming you're passing the search query as a query parameter

  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });


  try {
    // Use UNION to combine results from multiple tables
    const sqlQuery = `
      (SELECT 'crocs' AS product_type, product_id, name, image_path, description, product_price FROM crocs WHERE name ILIKE $1)
      UNION
      (SELECT 'jackets' AS product_type, product_id, name, image_path, description, product_price FROM jackets WHERE name ILIKE $1)
      UNION
      (SELECT 'sneakers' AS product_type, product_id, name, image_path, description, product_price FROM sneakers WHERE name ILIKE $1)
      UNION
      (SELECT 'boots' AS product_type, product_id, name, image_path, description, product_price FROM boots WHERE name ILIKE $1);`;
    const values = [`%${query}%`]; 

    const result = await pool.query(sqlQuery, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/:productType/:productId', upload.single('image'), async (req, res) => {
  try {
    console.log('Received file:', req.file);  // Add this line for logging

    const { productType, productId } = req.params;
    const updatedProduct = req.body;

    // Validate if productType is one of the allowed types (crocs, jackets, sneakers, boots)
    const allowedTypes = ['crocs', 'jackets', 'sneakers', 'boots'];
    if (!allowedTypes.includes(productType)) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    // Use the S3 URL for the image_path in the database
    const s3Url = req.file.location;

    // Construct the SQL query based on the product type
    const query = `UPDATE ${productType} SET name = $1, image_path = $2, description = $3, product_price = $4 WHERE product_id = $5 RETURNING *`;
    const values = [updatedProduct.name, s3Url, updatedProduct.description, updatedProduct.product_price, productId];

    // Execute the query using the pool
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      // If no rows were updated, the product with the given ID was not found
      return res.status(404).json({ error: 'Product not found' });
    }

    // Send the updated product as a response
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// the routes will inlcude


// Registration endpoint
app.post('/register', async (req, res) => {
  console.log(req.body)
  const { email_address, password, first_name, last_name, username } = req.body; // Include username in the destructured request body


  // Validation checks
  if (!email_address || !password || !first_name || !last_name || !username) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the email is already taken
    const existingUser = await pool.query('SELECT * FROM users WHERE email_address = $1 OR username = $2', [email_address, username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the users table
    await pool.query(`INSERT INTO users (email_address, first_name, last_name, password, username)
      VALUES ($1, $2, $3, $4, $5)
    `, [email_address, first_name, last_name, hashedPassword, username]); // Pass username as a parameter


    //send emails after account is created
    await sendEmail(`${email_address}`, 'Welcome to DesignHer', `Thank you for signing up for our services. we will contact you whenever a new deal arrives that you might be intterested in.`);
    await sendEmail(`diannabeaty65@gmail.com`, 'you just got a new signup!!',  `someone just created an account on the website. there name is: ${first_name} --${last_name}. and there email is: ${email_address} they are using the username: ${username}`)  
    await sendEmail(`charles.lamb.dev@gmail.com`, 'A new account has been created', `so if you are reading this it means that eerything worked out and an account has been created while the eamils have alos been sent`);


    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});


app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, send user information
    return res.status(200).json({
      user: req.user,
      authenticated: true,
    });
  } else {
    // User is not authenticated
    return res.status(401).json({
      authenticated: false,
    });
  }
});


// Login endpoint
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      console.log('this is the user', user)
      console.log('this is the mysterious info', info)

      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!user) {
        // Authentication failed
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      req.logIn(user, err => {
        if (err) {
          console.error('Error during req.logIn:', err); // Ensure this logging is in place
          return res.status(500).json({ error: 'Error logging in' });
        }
        // Authentication and login successful
        return res.status(200).json({ message: 'Login successful', user: user });
      });
    })(req, res, next)
  })


// Logout endpoint
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/allProducts', async (req, res) => {
  try {
      // Direct database queries to fetch products
      const crocResult = await pool.query('SELECT * FROM crocs'); 
      const jacketResult = await pool.query('SELECT * FROM jackets'); 
      const sneakerResult = await pool.query('SELECT * FROM sneakers');
      const bootResult = await pool.query('SELECT * FROM boots');

      // Compile the results into a single object
      const products = {
          crocs: crocResult.rows,
          jackets: jacketResult.rows,
          sneakers: sneakerResult.rows,
          boots: bootResult.rows,
      };

      // Respond with the compiled products object
      res.json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/products/:productId', async(req, res) => {
  
    const { productId } = req.params;
    console.log(productId)

    console.log(`this is the user ${req.user}`)

    try{
      const myTest = await pool.query(`select * from pictestertwo where name = $1`, [`${productId}`]);
   console.log(myTest.rows[0])
   console.log(myTest.rows[0].name)
   console.log(myTest.rows[0].price)
   console.log(myTest.rows[0].description)
   
     res.status(200).json({"theName": `${myTest.rows[0].name}`, "thePrice": myTest.rows[0].price, "theDescription": `${myTest.rows[0].description}`, "theSneakerPath": `${myTest.rows[0].sneakerpath}` });
   
     //  console.log(myTest.rows[0])
    } catch(err){
      console.log(err.message);
    }
})

// all customers
app.get('/allCustomers', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Replace 'customers' with your table name
    const customers = result.rows;
    res.json({ customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



// all jackets
// app.get('/allJackets', async(req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM jackets'); // Replace 'customers' with your table name
//     const jackets = result.rows;
//     res.json({ jackets });
//   } catch (error) {
//     console.error('Error fetching customers:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })

// all sneakers
app.get('/allSneakers', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sneakers'); // Replace 'customers' with your table name
    const sneakers = result.rows;
    res.json({ sneakers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// all boots
app.get('/allBoots', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM boots'); // Replace 'customers' with your table name
    const boots = result.rows;
    res.json({ boots });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// get item
app.get('/item/{$item_number}', (req, res) => {

})

//get order
app.get('/order/{$order_number}', (req, res) => {

})


//payment route integrated with stripe
app.post('/payments', async (req, res) => {
  const { product } = req.body;
  
  try {
    // Create a PaymentIntent without immediately confirming it
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100, // Assuming price is in dollars, convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    console.log('Payment Intent created:', paymentIntent);

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Error:', error);
    res.json({ success: false, error: error.message });
  }
});


 //create route
app.post('/:productType', upload.single('image'), async (req, res) => {
  try {
    console.log('Received file:', req.file);  // Add this line for logging

    console.log(req.body)

    const { productType } = req.params;
    const newProduct = req.body;

    // Validate if productType is one of the allowed types (crocs, jackets, sneakers, boots)
    const allowedTypes = ['crocs', 'jackets', 'sneakers', 'boots'];
    if (!allowedTypes.includes(productType)) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    // Use the S3 URL for the image_path in the database
    const s3Url = req.file.location;

    // Generate a new UUID for the product_id
    const productId = uuidv4();

    // Construct the SQL query for inserting a new product
    const query = `INSERT INTO ${productType} (product_id, name, image_path, description, product_type, product_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [productId, newProduct.name, s3Url, newProduct.description, newProduct.productType, newProduct.product_price];

    // Execute the query using the pool
    const result = await pool.query(query, values);

    // Send the newly created product as a response
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

