CREATE TABLE `estudiantes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `matricula` varchar(100) NOT NULL,
  `edad` integer NOT NULL,
  `semestre` varchar(255) NOT NULL,
  `usuario_creacio` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL
);

CREATE TABLE `maestros` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `edad` integer NOT NULL,
  `telefono` bigint NOT NULL,
  `correo` varchar(255) NOT NULL,
  `usuario_creacio` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL
);

CREATE TABLE `materias` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `profesor_id` integer NOT NULL,
  `create_user` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL,
  FOREIGN KEY (`profesor_id`) REFERENCES `maestros` (`id`)
);

CREATE TABLE `calificaciones` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `estudiante_id` integer NOT NULL,
  `maestro_id` integer NOT NULL,
  `materia_id` integer NOT NULL,
  `create_user` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL,
  FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  FOREIGN KEY (`maestro_id`) REFERENCES `maestros` (`id`),
  FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`)
);
