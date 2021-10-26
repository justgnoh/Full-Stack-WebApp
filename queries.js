const Pool = require('pg').Pool
// const pool = new Pool({
//     user:'justingnoh',
//     host:'localhost',
//     database:'api',
//     password:'justgnoh',
//     port:5003
// })
 
const pool = new Pool({
  user:'postgres',
  host: 'localhost',
  database:'api',
  port:5432
})

// GET Users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id', (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

// GET user by ID
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
 
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// POST new user
const createUser = (request, response) => {
    const {name, email} = request.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if(error){
            throw error;
        }
        response.status(201).send(`User added`)
    })
}

// UPDATE user
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

// DELETE user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    try{
    if (!id) {
      throw new Error('Shit happened');
    }
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
      })
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
    
}

// Gets beer styles
const getStyles = (request, response) => {
    pool.query('SELECT * FROM styles ORDER BY id', (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

module.exports = {
    getUsers,
    createUser,
    getStyles,
    updateUser,
    deleteUser,
    getUserById,
}
