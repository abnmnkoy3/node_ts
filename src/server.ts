import { json } from 'body-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Query } from "express-serve-static-core";
import { User } from "./model/user.type";
// import cors from 'cors'
// import multer from 'multer'
import fileController from './controllers/FileController'
// // const upload = multer()
const port = 3001;
const app = express();
var multer = require('multer');
var cors = require('cors');

app.use(cors())
var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'C:/xampp/htdocs/ImageSave')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null,file.originalname)

    }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {

    upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})