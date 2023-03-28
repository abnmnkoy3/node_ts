import { json } from 'body-parser';
import express, { Application, Request, Response } from 'express';
var config = require('../vandapa1_kpi.json');
var mysql = require('mysql');
// const mysql = require('mysql2');
const server: Application = express();
const PORT: number = 3001;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vandapa1_kpi',
    port: '3306'
});

server.use(express.json());
// con.connect((error) => {
//     if (err) {
//         console.log('Error connecting to MySQL database =', err);
//         return;
//     }
//     console.log('MySQL successfully connectted')
// })

server.post('/login', (req, res) => {
    const { email, password } = req.body;
    // try {
    const rows = con.query(
        `SELECT * FROM employee WHERE Em_Email = ?`,
        [email]

    )
     console.log(json(rows));
});
// } catch (err) {

// }
// })


server.get('/api', (req: Request, res: Response) => res.json({ message: 'Express + TypeScript Server Test' }));

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});