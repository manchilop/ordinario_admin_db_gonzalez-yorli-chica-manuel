require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,          // Usar la variable de entorno para el host (ej. IP pública de la base de datos)
  user: process.env.DB_USER,          // Usar la variable de entorno para el usuario
  password: process.env.DB_PASSWORD,  // Usar la variable de entorno para la contraseña
  database: process.env.DB_DATABASE   // Usar la variable de entorno para la base de datos
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

// Establecer el puerto para el servidor
const port = process.env.PORT || 3000;  // Usar un puerto configurado en el .env o el puerto 3000 por defecto

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Escuchar en todas las interfaces de red
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});

// Función común para manejar la consulta `GET`
function handleGetRequest(table, res) {
  connection.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}

// Función común para manejar la inserción `POST`
function handlePostRequest(table, requiredFields, body, res) {
  const fecha_creacion = new Date(); // Fecha y hora actuales

  // Validaciones simples para todos los campos requeridos
  for (const field of requiredFields) {
    if (!body[field]) {
      return res.status(400).json({ error: `El campo ${field} es obligatorio.` });
    }
  }

  // Construcción de la consulta
  const query = `INSERT INTO ${table} (${requiredFields.join(', ')}, fecha_creacion) 
                 VALUES (${requiredFields.map(() => '?').join(', ')}, ?)`;

  const values = [...requiredFields.map(field => body[field]), fecha_creacion];

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: `${table.slice(0, -1).toUpperCase()} creado.`, id: results.insertId });
  });
}

// **1. Rutas para estudiantes**
app.get('/api/estudiantes', (req, res) => {
  handleGetRequest('estudiantes', res);
});

app.post('/api/estudiantes', (req, res) => {
  const requiredFields = ['nombre', 'apellidos', 'email', 'matricula', 'edad', 'semestre', 'usuario_creacion'];
  handlePostRequest('estudiantes', requiredFields, req.body, res);
});

// **2. Rutas para maestros**
app.get('/api/maestros', (req, res) => {
  handleGetRequest('maestros', res);
});

app.post('/api/maestros', (req, res) => {
  const requiredFields = ['nombre', 'edad', 'telefono', 'correo', 'usuario_creacion'];
  handlePostRequest('maestros', requiredFields, req.body, res);
});




