const express = require("express");
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const ExcelJS = require('exceljs');
const { exec } = require('child_process');
//app.use(fileUpload());
//const fileUpload = require('express-fileupload');
app.set('view engine','ejs')
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname+'/material'));
app.use(express.static(__dirname+'/mmm'));
//app.use(express.static(__dirname+'/testing'));
app.use(express.static(__dirname+'/views'));
app.use('/css',express.static(__dirname+'/public/css'));
app.use('/js',express.static(__dirname+'/public/js'));
app.use('/karty',express.static(__dirname+'/public/karty'));
//app.use('/testing',express.static(__dirname+'/public/testing'));
const multer  = require("multer");


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "material/");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
}); 

app.get("/", function (req, res) {
    res.render('1page')
})
app.get('/dowl', (req, res) => {
    res.render('dowl')
});
app.get('/teor', (req, res) => {
    res.render('teor')
});
app.get('/analys', (req, res) => {
    res.render('analys')
});

app.listen(3000, ()=>console.log("Сервер запущен...http://localhost:3000"));


app.use(multer({storage:storageConfig}).single("data"));

var filePath;
app.post("/upload", function (req, res) {
  let filedata = req.file;
  filePath = req.file.path;
  const args = filePath;
  if(!filedata)
    res.render('false');
  exec(`python mmm/tray.py ${args}`, (error, stdout, stderr) => {
    if (error) {
    console.error(`exec error: ${error}`);
    return;
    }
    console.log(`Результат выполнения Python скрипта: ${stdout}`);
    setTimeout(() => {}, 700); 
    fs.readFile('mmm/value.txt', 'utf8', (err1, data1) => {
        if (err1) {
            console.error(err1);
            return;
        }
        // Чтение содержимого второго файла 
        fs.readFile('mmm/value_copy.txt', 'utf8', (err2, data2) => {
            if (err2) {
                console.error(err2);
                return;
            }
            let stat;
            // Сравнение содержимого файлов
            if (data1 === data2) {
                console.log('здоров');
                    stat = 'Анализ нормальный';
            } else {
                console.log('болен');
                    stat = 'Анализ с патологией';
            }
            const data = {stat};
            //console.log(filedata);
           if(!filedata)
              res.render('false');
              else
              res.render('analis2',{data});
        });
        
    });
    
    });

});


app.get('/loadData1', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const data = [];
    //await workbook.xlsx.readFile(filePath);
    await workbook.xlsx.readFile('test_1.xlsx');
    //await workbook.xlsx.readFile('problem_1.xlsx');
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
        data.push({
            x: row.getCell(1).value,
            y: row.getCell(2).value
        });
    });

    res.json(data);
});
app.get('/loadData2', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const data = [];
    //await workbook.xlsx.readFile(filePath);
    await workbook.xlsx.readFile('test_2.xlsx');
    //await workbook.xlsx.readFile('problem_2.xlsx');
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
        data.push({
            x: row.getCell(1).value,
            y: row.getCell(2).value
        });
    });

    res.json(data);
});
app.get('/loadData3', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const data = [];
    //await workbook.xlsx.readFile(filePath);
    await workbook.xlsx.readFile('test_3.xlsx');
    //await workbook.xlsx.readFile('problem_3.xlsx');
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
        data.push({
            x: row.getCell(1).value,
            y: row.getCell(2).value
        });
    });

    res.json(data);
});
