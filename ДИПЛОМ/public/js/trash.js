
// Подключаем необходимые библиотеки
const ExcelJS = require('exceljs');
const Chart = require('chart.js');

// Создаем новый экземпляр книги Excel
const workbook = new ExcelJS.Workbook();

// Загружаем файл Excel
workbook.xlsx.readFile('material\n4.xlsx')
    .then(function() {
        // Получаем данные из первой страницы
        const worksheet = workbook.getWorksheet(1);
        const data = [];

        worksheet.eachRow(function(row, rowNumber) {
            data.push({
                x: row.getCell(1).value,
                y: row.getCell(2).value
            });
        });

        // Отрисовываем график на второй странице
        const canvas = document.getElementById('myChart');
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Data',
                    data: data,
                    borderColor: 'blue'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
    })
    .catch(function(error) {
        console.log('Error:', error);
    });