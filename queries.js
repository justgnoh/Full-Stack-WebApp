const Pool = require("pg").Pool;
const asyncHandler = require("express-async-handler");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows);
  });
});

pool.on("connect", (client) => {
  console.log("connected");
});

pool.on("error", (err) => {
  console.log(err);
});

const ERROR_NO_USER_ID = "Bad Request. No user id provided.";
const ERROR_NO_NAME = "Bad Request. No name provided.";
const ERROR_NO_EMAIL = "Bad Request. No email provided."
const ERROR_NO_ID = "Bad Request. No ID provided."

// GET Users
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// GET user by ID
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).send(ERROR_NO_USER_ID);
  }

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// POST new user
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).send(ERROR_NO_NAME);
  }

  if (!email) {
    return res.status(400).send(ERROR_NO_EMAIL);
  }

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added`);
    }
  );
};

// UPDATE user
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).send(ERROR_NO_NAME);
  }

  if (!email) {
    return res.status(400).send(ERROR_NO_EMAIL);
  }

  if (!id) {
    return res.status(400).send(ERROR_NO_ID);
  }

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  try {
    if (!id) {
      throw new Error("Shit happened");
    }
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
