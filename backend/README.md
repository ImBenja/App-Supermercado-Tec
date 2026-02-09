# 🔧 Backend - SuperGest API

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.10-green?style=flat-square&logo=spring)
![Maven](https://img.shields.io/badge/Maven-3.6+-blue?style=flat-square&logo=apache-maven)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![REST API](https://img.shields.io/badge/REST%20API-v1-brightgreen?style=flat-square)

**API REST profesional para gestión de supermercados construida con Spring Boot 3**

</div>

---

## 📋 Descripción

Backend de **SuperGest** proporciona una API REST completa para la gestión de:

- 📦 **Productos**: CRUD con búsqueda avanzada
- 🏪 **Sucursales**: Gestión de múltiples locales
- 💳 **Ventas**: Registro y seguimiento de transacciones

Construido con **Spring Boot 3**, **Spring Data JPA** y **REST API**, siguiendo arquitectura de capas y mejores prácticas.

---

## 🛠️ Stack Tecnológico

### Core Framework

- **Spring Boot** 3.5.10
- **Spring MVC** - Controladores REST
- **Spring Data JPA** - Persistencia de datos
- **Lombok** - Reducción de código boilerplate

### Base de Datos

- **MySQL** 8.0 (primario)
- **PostgreSQL** 12+ (alternativo)
- **H2** - Base de datos en memoria (testing)

### Validación y Seguridad

- **Jakarta Validation** 3.0.2
- **Spring Boot Starter Validation**

### Herramientas de Desarrollo

- **Maven** 3.6+
- **Java 17**
- **DevTools** - Reload automático

### Testing

- **JUnit** (Spring Boot Starter Test)
- **Mockito** (incluido)

---

## 📁 Estructura del Proyecto

```
appsupermercado/
├── src/
│   ├── main/
│   │   ├── java/com/tecsuper/appsupermercado/
│   │   │   ├── AppsupermercadoApplication.java      # Entrada principal
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── ProductoController.java          # API Productos
│   │   │   │   ├── SucursalController.java          # API Sucursales
│   │   │   │   └── VentaController.java             # API Ventas
│   │   │   │
│   │   │   ├── service/
│   │   │   │   ├── IProductoService.java            # Interfaz Productos
│   │   │   │   ├── ProductoService.java             # Lógica Productos
│   │   │   │   ├── ISucursalService.java            # Interfaz Sucursales
│   │   │   │   ├── SucursalService.java             # Lógica Sucursales
│   │   │   │   ├── IVentaService.java               # Interfaz Ventas
│   │   │   │   └── VentaService.java                # Lógica Ventas
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── ProductoRepository.java          # JPA Productos
│   │   │   │   ├── SucursalRepository.java          # JPA Sucursales
│   │   │   │   └── VentaRepository.java             # JPA Ventas
│   │   │   │
│   │   │   ├── model/
│   │   │   │   ├── Producto.java                    # Entidad Producto
│   │   │   │   ├── Sucursal.java                    # Entidad Sucursal
│   │   │   │   ├── Venta.java                       # Entidad Venta
│   │   │   │   └── DetalleVenta.java                # Entidad DetalleVenta
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── ProductoDTO.java                 # DTO Producto
│   │   │   │   ├── SucursalDTO.java                 # DTO Sucursal
│   │   │   │   ├── VentaDTO.java                    # DTO Venta
│   │   │   │   ├── DetalleVentaDTO.java             # DTO DetalleVenta
│   │   │   │   ├── ErrorResponse.java               # DTO Error
│   │   │   │   └── WebConfig.java                   # Configuración CORS
│   │   │   │
│   │   │   ├── mapper/
│   │   │   │   └── Mapper.java                      # Conversión Entidad-DTO
│   │   │   │
│   │   │   ├── exception/
│   │   │   │   ├── GlobalExceptionHandler.java      # Manejo centralizado
│   │   │   │   ├── NotFoundException.java           # 404 Exception
│   │   │   │   └── IllegalArgumentException.java    # Validación Exception
│   │   │   │
│   │   │   └── enums/
│   │   │       └── EstadoVenta.java                 # Estados (PENDIENTE, etc)
│   │   │
│   │   └── resources/
│   │       ├── application.properties               # Config principal
│   │       ├── application-example.properties       # Ejemplo config
│   │       ├── static/                              # Archivos estáticos
│   │       └── templates/                           # Templates Thymeleaf
│   │
│   └── test/
│       └── java/com/tecsuper/appsupermercado/
│           └── AppsupermercadoApplicationTests.java # Tests
│
├── target/                                          # Directorio compilado
├── pom.xml                                          # Dependencias Maven
├── mvnw                                             # Maven Wrapper (Linux)
├── mvnw.cmd                                         # Maven Wrapper (Windows)
└── HELP.md                                          # Ayuda Maven
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

```bash
# Verificar Java 17+
java -version

# Verificar Maven (ya incluido con mvnw)
mvn -version
```

### Opción 1: Ejecutar con Script (Recomendado - Windows)

```bash
# Desde la raíz del proyecto
cd backend
start-backend.cmd
```

### Opción 2: Ejecutar Manual

```bash
# Navega a la carpeta del backend
cd backend/appsupermercado

# Windows
mvnw spring-boot:run

# Linux/Mac
./mvnw spring-boot:run

# Con Maven instalado
mvn spring-boot:run
```

### Opción 3: Compilar y Ejecutar JAR

```bash
cd backend/appsupermercado

# Compilar
mvn clean package

# Ejecutar JAR
java -jar target/appsupermercado-0.0.1-SNAPSHOT.jar
```

---

## 🔧 Configuración

### Archivo: `application.properties`

**Ubicación**: `src/main/resources/application.properties`

#### Configuración del Servidor

```properties
spring.application.name=appsupermercado
server.port=8080
server.servlet.context-path=/
```

#### MySQL Configuration (Recomendado)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/appsupermercado?useSSL=false&serverTimezone=America/Argentina/Buenos_Aires
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=TU_USER
spring.datasource.password=TU_PASSWORD

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

#### PostgreSQL Configuration (Alternativo)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/appsupermercado
spring.datasource.username=TU_USER
spring.datasource.password=TU_PASSWORD

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

#### H2 Configuration (Testing)

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
```

### Crear Base de Datos

```sql
-- Para MySQL
CREATE DATABASE IF NOT EXISTS appsupermercado;
USE appsupermercado;

-- Para PostgreSQL
CREATE DATABASE appsupermercado;
\c appsupermercado
```

---

## 📚 API REST - Endpoints

### 🔗 Base URL

```
http://localhost:8080/api
```

### Productos

#### Listar todos los productos

```http
GET /api/productos
```

#### Obtener producto por ID

```http
GET /api/productos/id/{id}
```

#### Buscar productos por nombre

```http
GET /api/productos/nombre/{nombre}
```

#### Filtrar por categoría

```http
GET /api/productos/categoria/{categoria}
```

#### Filtrar por precio

```http
GET /api/productos/precio/{precio}
```

#### Crear producto

```http
POST /api/productos

Body:
{
    "nombre": "Leche Descremada",
    "categoria": "Lácteos",
    "precio": 2.30,
    "stock": 50
}

Response (201):
{
    "id": 1,
    "nombre": "Leche Descremada",
    "categoria": "Lácteos",
    "precio": 2.30,
    "stock": 50
}
```

#### Actualizar producto

```http
PUT /api/productos/{id}

Body:
{
    "nombre": "Leche Descremada",
    "categoria": "Lácteos",
    "precio": 2.40,
    "stock": 75
}
```

#### Eliminar producto

```http
DELETE /api/productos/{id}

Response (204): No Content
```

### Sucursales

#### Listar sucursales

```http
GET /api/sucursales
```

#### Obtener sucursal por ID

```http
GET /api/sucursales/id/{id}
```

#### Filtrar por nombre

```http
GET /api/sucursales/nombre/{nombre}
```

#### Filtrar por direccion

```http
GET /api/sucursales/direccion/{direccion}
```

#### Crear sucursal

```http
POST /api/sucursales

Body:
{
    "nombre": "Sucursal Centro",
    "direccion": "Av. Principal 123",
    "telefono": "011-1234-5678"
}
```

#### Actualizar sucursal

```http
PUT /api/sucursales/{id}
Content-Type: application/json

Body:
{
    "nombre": "Sucursal Centro Actualizada",
    "direccion": "Av. Principal 456",
    "telefono": "011-8765-4321"
}
```

#### Eliminar sucursal

```http
DELETE /api/sucursales/{id}
```

### Ventas

#### Listar todas las ventas

```http
GET /api/ventas
```

#### Obtener venta por ID

```http
GET /api/ventas/id/{id}

```

#### Filtrar por fecha

```http
GET /api/ventas/fecha/{fecha}
```

#### Filtrar por estado

```http
GET /api/ventas/estado/{estado}
```

#### Filtrar por Sucursal en una Fecha

```http
GET /api/ventas?sucursalId=&fecha=
```

#### Obtener ventas por sucursal

```http
GET /api/ventas/sucursal/{idSucursal}
```

#### Crear venta

```http
POST /api/ventas
Content-Type: application/json

Body:
{
    "fecha": "2026-02-06"
    "idSucursal": 1,
    "estado": "REGISTRADA",
    "detalles": [
        {
            "idProducto": 1,
            "cantidad": 2
        },
        {
            "idProducto": 2,
            "cantidad": 1
        }
    ]
}

Response (201):
{
    "id": 1,
    "idSucursal": 1,
    "estado": "REGISTRADA",
    "fecha": "2026-02-06",
    "total": ,
    "detalles": [...]
}
```

#### Actualizar venta

```http
PUT /api/ventas/{id}
Content-Type: application/json
```

#### Eliminar venta

```http
DELETE /api/ventas/{id}
```

---

## 📊 Modelo de Datos

### Entidad: Producto

| Campo         | Tipo          | Descripción                |
| ------------- | ------------- | -------------------------- |
| id            | Long          | ID única (PK)              |
| nombre        | String        | Nombre del producto        |
| categoria     | String        | Categoría del producto     |
| precio        | Double        | Precio unitario            |
| stock         | Integer       | Cantidad en stock          |
| creadoEn      | LocalDateTime | Fecha de creación          |
| actualizadoEn | LocalDateTime | Fecha última actualización |

### Entidad: Sucursal

| Campo         | Tipo          | Descripción                |
| ------------- | ------------- | -------------------------- |
| id            | Long          | ID única (PK)              |
| nombre        | String        | Nombre de la sucursal      |
| direccion     | String        | Dirección                  |
| telefono      | String        | Teléfono de contacto       |
| creadoEn      | LocalDateTime | Fecha de creación          |
| actualizadoEn | LocalDateTime | Fecha Ultima actualizacion |

### Entidad: Venta

| Campo         | Tipo               | Descripción                              |
| ------------- | ------------------ | ---------------------------------------- |
| id            | Long               | ID única (PK)                            |
| idSucursal    | Long               | ID Sucursal (FK)                         |
| estado        | Enum               | Estado (PENDIENTE, PROCESADA, CANCELADA) |
| fecha         | LocalDateTime      | Fecha de la venta                        |
| total         | Double             | Total de la venta                        |
| detalles      | List<DetalleVenta> | Productos en la venta                    |
| creadoEn      | LocalDateTime      | Fecha de creación                        |
| actualizadoEn | LocalDateTime      | Fecha ultima actualizacion.              |

### Entidad: DetalleVenta

| Campo          | Tipo          | Descripción                   |
| -------------- | ------------- | ----------------------------- |
| id             | Long          | ID única (PK)                 |
| idVenta        | Long          | ID Venta (FK)                 |
| idProducto     | Long          | ID Producto (FK)              |
| cantidad       | Integer       | Cantidad vendida              |
| precioUnitario | Double        | Precio al momento de venta    |
| subtotal       | Double        | cantidad × precioUnitario     |
| creadoEn       | LocalDateTime | Fecha de Creacion             |
| actualizadoEn  | LocalDateTime | Fecha de ultima Actualizacion |

### Diagrama de Relaciones

## ![Design preview for the NFT preview card component coding challenge](/util/images/Diagrama%20UML.png)

## 🧪 Testing

### Con Postman

1. **Importar Colección**
   - Abre Postman
   - Importa la colección desde `postman-collection.json`

2. **Ejecutar Pruebas**
   - Asegúrate de que el backend está corriendo
   - Ejecuta cada endpoint en orden

### Con cURL

```bash
# Obtener todos los productos
curl -X GET http://localhost:8080/api/productos \
  -H "Content-Type: application/json"

# Crear producto
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d "{
    \"nombre\": \"Yogur\",
    \"categoria\": \"Lácteos\",
    \"precio\": 1.50,
    \"stock\": 75
  }"

# Obtener producto específico
curl -X GET http://localhost:8080/api/productos/id/1

# Actualizar producto
curl -X PUT http://localhost:8080/api/productos/1 \
  -H "Content-Type: application/json" \
  -d "{
    \"nombre\": \"Yogur Griego\",
    \"categoria\": \"Lácteos\",
    \"precio\": 2.00,
    \"stock\": 50
  }"

# Eliminar producto
curl -X DELETE http://localhost:8080/api/productos/1
```

### Ejecutar Tests Unitarios

```bash
cd backend/appsupermercado

# Ejecutar todos los tests
mvn test

# Ejecutar tests de una clase específica
mvn test -Dtest=ProductoServiceTest

# Con cobertura de código
mvn clean test jacoco:report
```

---

## 🔍 Acceso a Consolas

### H2 Console (si uses H2)

```
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: (vacío)
```

### Actuator Endpoints (Monitoreo)

```
http://localhost:8080/actuator
http://localhost:8080/actuator/health
http://localhost:8080/actuator/env
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

```
Solución:
1. Verifica que MySQL/PostgreSQL está corriendo
2. Revisa usuario y contraseña en application.properties
3. Crea la base de datos manualmente
4. Verifica firewall no bloquea puerto 3306
```

### Error: "Port 8080 already in use"

```
Solución 1 - Cambiar puerto:
spring.port=9090

Solución 2 - Matar proceso:
# Windows
netstat -ano | findstr :8080
taskkill /PID {PID} /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### Error: "Failed to delete target/classes"

```
Solución:
mvn clean
rm -rf target/
mvn spring-boot:run
```

### Maven Wrapper no funciona

```
# Descargar wrapper nuevamente
mvn -N io.takari:maven:wrapper
```

---

## 📦 Dependencias Principales

```xml
<!-- Spring Boot -->
<spring-boot-starter-data-jpa>3.5.10</spring-boot-starter-data-jpa>
<spring-boot-starter-web>3.5.10</spring-boot-starter-web>
<spring-boot-starter-validation>3.5.10</spring-boot-starter-validation>

<!-- Database -->
<mysql-connector-j>8.0.33</mysql-connector-j>
<postgresql>42.7.3</postgresql>
<h2>latest</h2>

<!-- Utilities -->
<lombok>latest</lombok>
<jakarta.validation-api>3.0.2</jakarta.validation-api>

<!-- Testing -->
<spring-boot-starter-test></spring-boot-starter-test>
```

---

## 🏗️ Arquitectura

### Arquitectura de Capas

```
┌─────────────────────────────────┐
│      REST Controllers           │ ← Punto de entrada HTTP
├─────────────────────────────────┤
│  Service Layer (Lógica Negocio) │ ← Reglas de negocio
├─────────────────────────────────┤
│  Repository Layer (JPA/Datos)   │ ← Acceso a BD
├─────────────────────────────────┤
│   Entity/Model Layer (BD)       │ ← Persistencia
├─────────────────────────────────┤
│    DTO/Mapper Layer             │ ← Transformación datos
└─────────────────────────────────┘
```

### Flujo de Petición

```
1. Cliente HTTP
   ↓
2. Controller (recibe petición)
   ↓
3. Service (valida y procesa)
   ↓
4. Repository (accede a BD)
   ↓
5. Entity (obtiene datos)
   ↓
6. Mapper (convierte a DTO)
   ↓
7. Response (devuelve JSON)
   ↓
8. Cliente recibe respuesta
```

---

## 🔐 Seguridad

Recomendaciones para producción:

1. **Agregar Spring Security**

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   ```

2. **CORS Configuration**
   - Limitar orígenes permitidos
   - No usar `*` en producción

3. **Validación de Entrada**
   - Usar anotaciones `@Valid`
   - Validar tipos de datos

4. **HTTPS**
   - Configurar SSL/TLS
   - Certificados válidos

5. **API Keys/JWT**
   - Implementar autenticación
   - Proteger endpoints sensibles

---

## 📚 Recursos Adicionales

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Hibernate ORM](https://hibernate.org/)
- [Maven Documentation](https://maven.apache.org/guides/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📞 Soporte

Para más información:

- Consulta el README principal: `../README.md`
- Revisa guía de setup: `../SETUP_GUIA.md`
- Documentación frontend: `../frontend/README.md`

---

<div align="center">

**Backend de SuperGest** ⚙️

Construido con pasión usando Spring Boot

</div>
