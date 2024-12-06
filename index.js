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

// **1. Rutas para estudiantes**
app.get('/api/estudiantes', (req, res) => {
  connection.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/estudiantes', (req, res) => {
  const { nombre, apellidos, email, matricula, edad, semestre, usuario_creacion } = req.body;
  const fecha_creacion = new Date(); // Fecha y hora actuales

  // Validaciones simples
  if (!nombre || !apellidos || !email || !matricula || !edad || !semestre || !usuario_creacion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const query = 'INSERT INTO estudiantes (nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  connection.query(query, [nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Estudiante creado.', id: results.insertId });
  });
});

// **2. Rutas para maestros**
app.get('/api/maestros', (req, res) => {
  connection.query('SELECT * FROM maestros', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/maestros', (req, res) => {
  const { nombre, edad, telefono, correo, usuario_creacion } = req.body;
  const fecha_creacion = new Date(); // Fecha y hora actuales

  // Validaciones simples
  if (!nombre || !edad || !telefono || !correo || !usuario_creacion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Consulta para insertar los datos, incluyendo fecha_creacion y usuario_creacion
  const query = 'INSERT INTO maestros (nombre, edad, telefono, correo, usuario_creacion, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [nombre, edad, telefono, correo, usuario_creacion, fecha_creacion], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Maestro creado.', id: results.insertId });
  });
});



