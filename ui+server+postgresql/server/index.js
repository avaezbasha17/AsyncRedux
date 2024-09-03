import express from 'express'
import pkg from 'pg';
import cros from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PGUSER,          
    host: process.env.PGHOST,          
    database: process.env.PGDATABASE,  
    password: process.env.PGPASSWORD,  
    port: process.env.PGPORT,    
});

app.use(cros())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/check-connection', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).send('Database connection is healthy.');
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection failed.');
    }
});

app.get('/users', async (req, res) => {
    try {
        const {rows} = await (await pool.connect()).query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/createUsers', async (req, res) => {
    const { username, email } = req.body;
    try {
        const result = await (await pool.connect()).query('insert into users (username,email) values ($1, $2)', [username, email]);
        res.json(result.command);
    } catch (err) {
        res.status(500).json(err.detail);
    }
})

app.post('/updateUsers', async (req, res) => {
    const { user_id, username, email } = req.body
    try {
        const result = await (await pool.connect()).query('update users set username=$1, email=$2 where user_id=$3', [username, email, user_id]);
        res.json(result.command)
    } catch (err) {
        res.json(err)
    }
})

app.post('/deleteUsers', async (req, res) => {
    try {
        const { user_id } = req.body
        const result = await (await pool.connect()).query('delete from users where user_id=$1', [user_id])
        res.json(result.command)
    } catch (error) {
        res.json(error)
    }
})


app.listen("4000", () => {
    console.log("Server is up on 4000");
})