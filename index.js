const express =require("express");
const bodyParser=require("body-parser");
const multer = require("multer")
const app=express();
var pdfParser = require('pdf-parser');
var PDF_PATH = 'sample.pdf';
var upload = multer();
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/uploadPdf',upload.any('file'),function(req,res){
    console.log(`Resquet file: ${JSON.stringify(req.file)}`)
    pdfParser.pdf2json(PDF_PATH, function (error, pdf) {
        if(error != null){
            console.log(error);
        }else{
            console.log(JSON.stringify(pdf));
            return res.send({pdf})
        }
    });
})
app.listen(port,()=>{
    console.log(`Port running on http://localhost:${port}`)
})