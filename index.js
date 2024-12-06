const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // Cambia si tu base de datos está en la nube
    user: 'root',
    password: 'rootpassword', // Cambia por tu contraseña
    database: 'ordinario_admin'
  });
  
  // Conexión a la base de datos
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos.');
  });

  // Configurar Express
const app = express();
const port = 3000;
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });

// Middleware
app.use(bodyParser.json());




