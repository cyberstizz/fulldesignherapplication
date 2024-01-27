const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3001; // Change this to the desired port
// const { Pool } = require('pg');
const pool = require('./db');
const cors = require('cors');
const crocsRouter = require('./routes/crocs/crocsRouter')
const jacketsRouter = require('./routes/jackets/jacketsRouter')
const bootsRouter = require('./routes/boots/bootsRouter')
const sneakersRouter = require('./routes/sneakers/sneakersRouter')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//now setup passport local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    // Check your database for the user with the given email
    // Example with a hypothetical User model:
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    // If everything is fine, return the user object
    return done(null, user);
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // Retrieve user information from the database using the id
  // Example with a hypothetical User model:
  const user = await User.findById(id);

  done(null, user);
});




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

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Serve static files from the client directory
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));
}




///////////////////////////////////////////////
app.use('/croc', crocsRouter)

app.use('/jacket', jacketsRouter)

app.use('/boot', bootsRouter)

app.use('/sneaker', sneakersRouter);

///////////////////////////////////////////////


// the routes will inlcude


//all products
app.get('/allProducts', async(req, res) => {
        try {
          const crocResult = await pool.query('SELECT * FROM crocs'); // Replace 'products' with your table name
          const jacketResult = await pool.query('SELECT * FROM jackets'); // Replace 'products' with your table name
          const sneakerResult = await pool.query('SELECT * FROM sneakers'); // Replace 'products' with your table name
          const bootResult = await pool.query('SELECT * FROM boots'); // Replace 'products' with your table name

          const crocs = crocResult.rows;
          const jackets = jacketResult.rows;
          const sneakers = sneakerResult.rows;
          const boots = bootResult.rows;

          res.json({ crocs }, { jackets }, { sneakers },{ boots });
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
})

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

app.post('/payments', async (req, res) => {
  const { product, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
    });

    console.log('Payment Successful:', charge);

    await sendEmail('diannabeaty65@gmail.com', `an order just came in for ${product}`, `this sale was made by this email${token.email}!`);
    await sendEmail(`${token.email}`, 'Order Confirmation', `Thank you for your order of ${product}!`);

    res.json({ success: true, charge });
  } catch (error) {
    console.error('Payment Error:', error);
    res.json({ success: false, error: error.message });
  }
});

 

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

