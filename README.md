# 🛒 SuperGest - Sistema de Gestión de Supermercados

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.10-green?style=flat-square&logo=spring)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

**Una aplicación web completa para la gestión integral de supermercados con inventario, ventas y sucursales**

[Características](#características) • [Estructura](#estructura) • [Requisitos](#requisitos) • [Instalación](#instalación) • [Documentación](#documentación)

</div>

---

## 📋 Descripción

**SuperGest** es una plataforma profesional diseñada para la gestión centralizada de supermercados. Permite administrar productos, sucursales, inventario y ventas de forma eficiente a través de una interfaz intuitiva y responsiva.

La solución está desarrollada con:

- **Backend**: Spring Boot 3 con REST API
- **Frontend**: HTML5, CSS3 y JavaScript moderno
- **Base de datos**: MySQL 8.0 (con soporte para PostgreSQL y H2)

---

## ✨ Características

### 📦 Gestión de Productos

- ✅ CRUD completo de productos
- ✅ Búsqueda por nombre, categoría y ID
- ✅ Control de stock en tiempo real
- ✅ Seguimiento de precios
- ✅ Validación de inventario

### 🏪 Gestión de Sucursales

- ✅ Administración de múltiples sucursales
- ✅ Gestión independiente de inventario por sucursal
- ✅ Información de ubicación para cada sucursal
- ✅ Reportes por sucursal

### 💳 Gestión de Ventas

- ✅ Registro de transacciones
- ✅ Detalles de ventas con múltiples productos
- ✅ Estados de venta (pendiente, procesada, cancelada)
- ✅ Cálculo automático de totales
- ✅ Historial de ventas completo

### 🎨 Interfaz de Usuario

- ✅ Dashboard ejecutivo
- ✅ Diseño responsivo y moderno
- ✅ Navegación intuitiva
- ✅ Notificaciones en tiempo real
- ✅ Carga asincrónica sin refresco

---

## 📁 Estructura del Proyecto

```
App-Supermercado/
├── backend/
│   └── appsupermercado/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/tecsuper/appsupermercado/
│       │   │   │   ├── controller/          # Controladores REST
│       │   │   │   ├── service/             # Lógica de negocio
│       │   │   │   ├── repository/          # Acceso a datos (JPA)
│       │   │   │   ├── model/               # Entidades JPA
│       │   │   │   ├── dto/                 # Data Transfer Objects
│       │   │   │   ├── exception/           # Manejo de excepciones
│       │   │   │   ├── enums/               # Enumeraciones
│       │   │   │   └── mapper/              # Mapeo de entidades
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       ├── pom.xml                          # Dependencias Maven
│       ├── mvnw                             # Maven wrapper
│       └── start-backend.cmd                # Script de inicio
├── frontend/
│   ├── index.html                          # Página principal
│   ├── js/
│   │   ├── app.js                          # Lógica principal
│   │   ├── api.js                          # Cliente HTTP
│   │   ├── productos.js                    # Módulo de productos
│   │   ├── sucursales.js                   # Módulo de sucursales
│   │   ├── ventas.js                       # Módulo de ventas
│   │   └── nueva-venta.js                  # Formulario de ventas
│   ├── css/
│   │   └── style.css                       # Estilos globales
│   └── start-frontend.cmd                  # Script de inicio
└── SETUP_GUIA.md                            # Guía de configuración
```

---

## 🛠️ Requisitos del Sistema

### Backend

- **Java**: 17 o superior
- **Maven**: 3.6+ (incluido con Maven Wrapper)
- **Base de datos**:
  - MySQL 8.0+ (Recomendado)
  - PostgreSQL 12+ (Alternativo)
  - H2 (Desarrollo/Testing)

### Frontend

- **Python**: 3.6+ (para servidor local)
- **Navegador**: Chrome, Firefox, Safari, Edge (versiones recientes)

### Herramientas opcionales

- **Git**: Para control de versiones
- **Postman/Insomnia**: Para pruebas de API
- **IDE**: VS Code, IntelliJ IDEA, Eclipse

---

## 🚀 Instalación y Ejecución

### Opción 1: Scripts Automáticos (Recomendado - Windows)

**Paso 1**: Abre PowerShell en la raíz del proyecto y ejecuta:

```cmd
# Terminal 1 - Backend
start-backend.cmd
```

**Paso 2**: Abre otra terminal y ejecuta:

```cmd
# Terminal 2 - Frontend
start-frontend.cmd
```

### Opción 2: Ejecución Manual

#### Backend

```bash
cd backend/appsupermercado

# Con Maven Wrapper (Windows)
mvnw spring-boot:run

# Con Maven Wrapper (Linux/Mac)
./mvnw spring-boot:run

# Con Maven instalado
maven spring-boot:run
```

El backend estará disponible en: **http://localhost:8080**

#### Frontend

```bash
cd frontend

# Usar servidor Python
python -m http.server 5500
```

El frontend estará disponible en: **http://localhost:5500**

---

## 🔧 Configuración

### Backend - application.properties

**Ubicación**: `backend/appsupermercado/src/main/resources/application-example.properties`

#### Base de datos MySQL

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/appsupermercado
spring.datasource.username=USER
spring.datasource.password=PASSWORD
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

#### Base de datos PostgreSQL

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/appsupermercado
spring.datasource.username=USER
spring.datasource.password=PASSWORD
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect
```

#### Base de datos H2 (Testing)

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
```

### Frontend - Configuración de API

**Ubicación**: `frontend/js/api.js`

```javascript
const API_URL = "http://localhost:8080";
```

---

## 📚 Documentación Técnica

### Endpoints de la API

#### Productos

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/id/{id}` - Obtener producto por ID
- `GET /api/productos/nombre/{nombre}` - Buscar por nombre
- `GET /api/productos/categoria/{categoria}` - Filtrar por categoría
- `GET /api/productos/precio/{precio}` - Filtrar por precio
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

#### Sucursales

- `GET /api/sucursales` - Obtener todas las sucursales
- `GET /api/sucursales/id/{id}` - Obtener sucursal por ID
- `GET /api/sucursales/nombre/{nombre}` - Obtener sucursal/es por Nombre
- `GET /api/sucursales/direccion/{direccion}` - Obtener sucursal/es por Direccion
- `POST /api/sucursales` - Crear nueva sucursal
- `PUT /api/sucursales/{id}` - Actualizar sucursal
- `DELETE /api/sucursales/{id}` - Eliminar sucursal

#### Ventas

- `GET /api/ventas` - Obtener todas las ventas
- `GET /api/ventas/id/{id}` - Obtener venta por ID
- `GET /api/ventas/fecha/{fecha}` - Ventas por Fecha
- `GET /api/ventas/estado/{estado}` - Ventas por Estado
- `GET /api/ventas?sucursalId=&fecha=` - Ventas de una sucursal en un determinada fecha.
- `POST /api/ventas` - Crear nueva venta
- `PUT /api/ventas/{id}` - Actualizar venta
- `DELETE /api/ventas/{id}` - Cancelar venta

Ver [documentación completa del Backend](./backend/README.md) para más detalles.

---

## 🔍 Uso de la Aplicación

### Acceso Inicial

1. Abre tu navegador y ve a `http://localhost:5500`
2. Verás el dashboard principal de **SuperGest**
3. Navega por los módulos usando el menú superior

### Dashboard

- Visualización de métricas principales
- Resumen de ventas recientes
- Control de inventario

### Módulo de Productos

- Crear nuevos productos con categoría, precio y stock
- Buscar productos por nombre o categoría
- Actualizar precios y stock
- Eliminar productos del sistema

### Módulo de Sucursales

- Registrar nuevas sucursales
- Visualizar información de cada sucursal
- Gestionar datos de ubicación
- Eliminar sucursales

### Módulo de Ventas

- Crear nuevas ventas seleccionando productos
- Agregar múltiples productos en una transacción
- Ver historial completo de ventas
- Filtrar por estado (pendiente, procesada, cancelada)

---

## 🧪 Testing

### Con Postman/Insomnia

Se incluyen colecciones de pruebas para todos los endpoints. Importa el archivo de colección y ejecuta:

1. Pruebas de productos (CRUD)
2. Pruebas de sucursales (CRUD)
3. Pruebas de ventas (CRUD)

### Con cURL

```bash
# Obtener productos
curl -X GET http://localhost:8080/api/productos

# Crear producto
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Leche","categoria":"Lácteos","precio":2.50,"stock":100}'
```

---

## 📊 Modelo de Datos

### Entidades Principales

**Producto**

- ID (PK)
- Nombre
- Categoría
- Precio
- Stock
- Fecha de Creación
- Fecha de Actualización

**Sucursal**

- ID (PK)
- Nombre
- Dirección
- Teléfono
- Fecha de Creación
- Fecha de Actualización

**Venta**

- ID (PK)
- ID Sucursal (FK)
- Estado (Enum)
- Fecha
- Total
- DetallesVenta (One-to-Many)
- Fecha de Creación
- Fecha de Actualización

**DetalleVenta**

- ID (PK)
- ID Venta (FK)
- ID Producto (FK)
- Cantidad
- Precio Unitario
- Subtotal
- Fecha de Creación
- Fecha de Actualización

---

## 🐛 Solución de Problemas

### Error: "Failed to delete target/classes"

```bash
# Elimina la carpeta target
rm -r backend/appsupermercado/target

# Vuelve a ejecutar
start-backend.cmd
```

### Puerto 8080 ya está en uso

Cambia el puerto en `application.properties`:

```properties
server.port=9090
```

### Puerto 5500 ya está en uso

Usa otro puerto con Python:

```bash
python -m http.server 8000
```

### Backend no responde desde Frontend

- Verifica que backend está corriendo: `http://localhost:8080`
- Abre la consola del navegador (F12) - pestaña Network
- Revisa la configuración de `API_URL` en `api.js`

### Base de datos no se conecta

- Verifica credenciales en `application.properties`
- Asegúrate de que MySQL/PostgreSQL está ejecutándose
- Crea la base de datos: `CREATE DATABASE appsupermercado;`

---

## 📁 Archivos Importantes

| Archivo                    | Descripción                        |
| -------------------------- | ---------------------------------- |
| `pom.xml`                  | Dependencias y configuración Maven |
| `application.properties`   | Configuración del servidor         |
| `SETUP_GUIA.md`            | Guía detallada de instalación      |
| `package.json` (si existe) | Dependencias frontend              |

---

## 🤝 Contribuidores

Desarrollado por el **Benjamin Juarez**

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Consulta el archivo LICENSE para más detalles.

---

## 📞 Soporte

Para problemas o sugerencias:

1. Revisa la [documentación del backend](./backend/README.md)
2. Revisa la [documentación del frontend](./frontend/README.md)
3. Consulta la [guía de configuración](./SETUP_GUIA.md)
4. Crea un issue en el repositorio

---

## 🔗 Enlaces Relacionados

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Setup Guide](./SETUP_GUIA.md)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

<div align="center">

**Hecho con ❤️ para la gestión de supermercados**

⭐ Si te resulta útil, considera dar una estrella en GitHub

</div>
