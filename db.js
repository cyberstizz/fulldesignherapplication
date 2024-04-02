// creation of the vatiable representing our connection to the database -- 
// which is through the pg library

const Pool = require('pg').Pool;

//creating the variable representing the heroku environment variables for postgres
const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

//creating a variable representing the local config for postgres

const localConfig = {
    user: "postgres",
    password: "chicken",
    host: "localhost",
    database: "designher",
    port: 5432
}

//setting up the config with the correct user, credentials, database and port with turnery logic


let pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : localConfig); 


  // let pool = new Pool(localConfig)
//exporting the variable which represents the configured reference to the --
//database for use by the server :)




module.exports = pool;