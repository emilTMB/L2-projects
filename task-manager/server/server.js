const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Разрешаем CORS для запросов с вашего клиента
const corsOptions = {
  origin: 'http://localhost:8080', // домен нашего клиента
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Обработчик POST-запроса на маршруте /send-email
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Создаем транспортер для отправки писем
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: 'kvemil2@gmail.com',
    to: to, // Получатель
    subject: subject,
    text: text,
  };

  // Отправляем письмо
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Произошла ошибка при отправке письма' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Письмо успешно отправлено' });
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});