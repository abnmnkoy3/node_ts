import { json } from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { Query } from "express-serve-static-core";
import { User } from "./model/user.type";
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
export interface TypeRequestQuery<T extends Query> extends Express.Request {
    query: T;
}
server.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const rows = con.query(
            `SELECT * FROM employee WHERE Em_Email = ?`,
            [email]

        )
        res.status(201).json(rows);
    } catch (e) {

    }
});


server.get('/api', (req: TypeRequestQuery<User>, res: Response) => res.json(req.query.username));

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});