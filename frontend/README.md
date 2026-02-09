# 🎨 Frontend - SuperGest UI (EN CONSTRUCCION)

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![Responsive](https://img.shields.io/badge/Responsive-Design-blue?style=flat-square)

**Interfaz moderna y responsiva para gestión de supermercados - SuperGest PRO**

</div>

---

## 📋 Descripción

Frontend de **SuperGest** proporciona una interfaz profesional y fácil de usar para:

- 📦 Gestionar productos (crear, editar, eliminar, buscar)
- 🏪 Administrar sucursales
- 💳 Registrar y seguimiento de ventas
- 📊 Visualizar datos en un dashboard ejecutivo

Construido con **HTML5**, **CSS3** (Custom Properties) y **JavaScript vanilla**, sin dependencias externas de frameworks, garantizando máxima compatibilidad y excelente rendimiento.

---

## 🛠️ Stack Tecnológico

### Frontend

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con Custom Properties
- **JavaScript (ES6+)** - Lógica interactiva
- **Fetch API** - Comunicación con backend

### Herramientas

- **Font Awesome 6** - Iconografía
- **Google Fonts** - Tipografía (Inter, Poppins)
- **Python 3.6+** - Servidor local (http.server)

### Características

- ✅ Sin dependencias NPM/build tools
- ✅ Diseño Mobile-First
- ✅ Totalmente responsivo
- ✅ Animaciones suaves
- ✅ Consumo mínimo de recursos

---

## 📁 Estructura del Proyecto

```
frontend/
├── index.html                       # Página principal HTML
├── start-frontend.cmd               # Script iniciar servidor (Windows)
├── start-frontend.ps1               # Script PowerShell (Windows)
│
├── css/
│   └── style.css                   # Estilos globales
│       ├── Variables de color
│       ├── Tipografía
│       ├── Layout responsivo
│       ├── Componentes (cards, botones, formularios)
│       ├── Animaciones
│       └── Mobile responsive (media queries)
│
└── js/
    ├── app.js                      # Lógica principal de la aplicación
    │   ├── Navegación entre vistas
    │   ├── Carga de datos
    │   ├── Dashboard
    │   └── Gestora de eventos
    │
    ├── api.js                      # Cliente HTTP
    │   ├── Configuración de URL
    │   ├── Funciones CRUD genéricas
    │   ├── Manejo de errores
    │   ├── Loading states
    │   └── Toast notifications
    │
    ├── productos.js                # Módulo de Productos
    │   ├── Listar productos
    │   ├── Crear producto
    │   ├── Editar producto
    │   ├── Eliminar producto
    │   ├── Búsqueda
    │   └── Filtros
    │
    ├── sucursales.js               # Módulo de Sucursales
    │   ├── Listar sucursales
    │   ├── Crear sucursal
    │   ├── Editar sucursal
    │   ├── Eliminar sucursal
    │   └── Tabla de sucursales
    │
    ├── ventas.js                   # Módulo de Ventas
    │   ├── Listar ventas
    │   ├── Filtrar por fecha
    │   ├── Cambiar estado
    │   ├── Ver detalles
    │   └── Anular venta
    │
    └── nueva-venta.js              # Módulo Crear Venta
        ├── Selección de sucursal
        ├── Selección de productos
        ├── Cálculo de totales
        ├── Validaciones
        ├── Envío de datos
        └── Confirmación
```

---

## 🚀 Instalación y Ejecución

### Requisitos

- **Python 3.6+** (para servidor local)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **Backend en ejecución** en puerto 8080

### Opción 1: Ejecutar con Script (Recomendado - Windows)

```cmd
# Desde la raíz del proyecto
cd frontend
start-frontend.cmd
```

Se abrirá automáticamente en `http://localhost:5500`

### Opción 2: Ejecutar Manual

```bash
cd frontend

# Usar servidor HTTP de Python (Linux/Mac/Windows)
py -m http.server 5500

# Alternativa con Python 2 (antiguo)
py -m SimpleHTTPServer 5500

# Usando otro puerto
py -m http.server 8000
```

Abre en navegador: **http://localhost:5500**

### Opción 3: Usar Servidor Web Diferente

```bash
# Con Node.js (si lo tienes instalado)
npx http-server

# Con Live Server (VS Code extension)
# Abre carpeta en VS Code y click en "Go Live"

# Con http-server de NPM
npm install -g http-server
http-server
```

---

## 🔧 Configuración

### Configurar URL de Backend

**Archivo**: `js/api.js`

```javascript
// Línea 1:
const API_URL = "http://localhost:8080";

// Cambiar si backend está en otro servidor
const API_URL = "http://192.168.1.100:8080";
const API_URL = "https://api.example.com";
```

### Variables CSS Personalizar

**Archivo**: `css/style.css` - Líneas 1-30

```css
:root {
  /* Cambiar colores principales */
  --primary: #2563eb; /* Azul primario */
  --primary-dark: #1d4ed8; /* Azul oscuro */
  --success: #10b981; /* Verde */
  --danger: #ef4444; /* Rojo */
  --warning: #f59e0b; /* Naranja */

  /* Cambiar tipografía en body */
  font-family: "Inter", sans-serif;
}
```

---

## 📚 Estructura de Vistas

### 🏠 Dashboard

- **URL Virtual**: `http://localhost:5500` (por defecto)
- **Contenido**:
  - Métricas principales
  - Total de productos
  - Stock bajo (<10 unidades)
  - Total de sucursales
  - Ventas del día
  - Últimas 5 ventas
  - Alertas de stock bajo

![Dashboard Principal](/util/images/front/Dashboard%20Principal.png)

### 📦 Productos

- **Características**:
  - Tabla con todos los productos
  - Búsqueda por nombre/categoría
  - Crear nuevo producto (modal)
  - Editar producto (modal)
  - Eliminar producto (confirmación)
  - Información: Nombre, Categoría, Precio, Stock

  ![Gestion de Productos](/util/images/front/Productos%20Modulo.png)

### 🏪 Sucursales

- **Características**:
  - Tabla con todas las sucursales
  - Crear nueva sucursal (modal)
  - Editar sucursal (modal)
  - Eliminar sucursal
  - Información: Nombre, Dirección, Localidad, Teléfono

**Acciones disponibles**:

```javascript
// Crear
POST /api/sucursales
{
  "nombre": "Sucursal Centro",
  "direccion": "Av. Principal 123",
  "localidad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "telefono": "011-1234-5678"
}

// Actualizar
PUT /api/sucursales/{id}

// Eliminar
DELETE /api/sucursales/{id}
```

### 💳 Ventas

- **Características**:
  - Tabla de todas las ventas
  - Filtrar por fecha
  - Ver detalles de venta
  - Cambiar estado
  - Anular venta
  - Exportar datos (opcional)

**Estados de venta**:

- 🟢 `PROCESADA` - Venta completada
- 🟡 `PENDIENTE` - Aún no procesada
- 🔴 `CANCELADA` - Venta anulada

### ✨ Nueva Venta

- **Paso 1**: Seleccionar sucursal
- **Paso 2**: Agregar productos
- **Paso 3**: Revisar total
- **Paso 4**: Confirmar y enviar

```javascript
Flujo:
1. Selecciona sucursal
2. Busca y agrega producto
3. Ingresa cantidad
4. El precio se calcula automáticamente
5. Summa de productos en total
6. Confirma la venta
7. Se registra en la BD
```

---

## 🎨 Componentes Principales

### Botones

```html
<!-- Primario -->
<button class="btn btn-primary">Crear</button>

<!-- Secundario -->
<button class="btn btn-secondary">Cancelar</button>

<!-- Peligro -->
<button class="btn btn-danger">Eliminar</button>

<!-- Éxito -->
<button class="btn btn-success">Guardar</button>
```

### Tarjetas (Cards)

```html
<div class="card">
  <div class="card-header">
    <h3>Título</h3>
  </div>
  <div class="card-body">Contenido...</div>
</div>
```

### Modales (Diálogos)

```html
<div class="modal" id="miModal">
  <div class="modal-dialog">
    <div class="modal-header">Título</div>
    <div class="modal-body">Contenido</div>
    <div class="modal-footer">
      <button onclick="cerrarModal('miModal')">Cerrar</button>
    </div>
  </div>
</div>
```

### Tablas

```html
<table class="table">
  <thead>
    <tr>
      <th>Columna 1</th>
      <th>Columna 2</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <!-- Filas dinámicas -->
  </tbody>
</table>
```

### Formularios

```html
<form class="form-group">
  <label for="campo">Etiqueta:</label>
  <input type="text" id="campo" class="form-control" required />

  <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

---

## 🔌 Cliente API (api.js)

### Estructura General

```javascript
// Configuración base
const API_URL = "http://localhost:8080";

// Cliente fetch mejorado
async function apiFetch(url, options = {}) {
  // Muestra loader
  // Realiza petición
  // Maneja errores
  // Oculta loader
  // Retorna datos
}

// Funciones para cada módulo
const api = {
  productos: {
    getAll(): GET /api/productos,
    getById(id): GET /api/productos/id/{id},
    create(data): POST /api/productos,
    update(id, data): PUT /api/productos/{id},
    delete(id): DELETE /api/productos/{id}
  },
  // Similar para sucursales y ventas
}
```

### Ejemplos de Uso

#### Obtener Productos

```javascript
try {
  const productos = await api.getProductos();
  console.log(productos); // Array de productos
} catch (error) {
  console.error("Error:", error);
}
```

#### Crear Producto

```javascript
const nuevoProducto = {
  nombre: "Leche",
  categoria: "Lácteos",
  precio: 2.5,
  stock: 100,
};

try {
  const resultado = await api.crearProducto(nuevoProducto);
  showToast("success", "Éxito", "Producto creado");
} catch (error) {
  showToast("error", "Error", error.message);
}
```

#### Actualizar Producto

```javascript
const productoActualizado = {
  nombre: "Leche Premium",
  categoria: "Lácteos",
  precio: 3.0,
  stock: 75,
};

await api.actualizarProducto(1, productoActualizado);
```

#### Eliminar Producto

```javascript
await api.eliminarProducto(1);
```

---

## 📦 Gestión de Estado

### Loading Global

```javascript
// Muestra automáticamente loader durante peticiones
showLoading(); // Mostrar
hideLoading(); // Ocultar
// El loader se maneja automáticamente en apiFetch()
```

### Notificaciones (Toast)

```javascript
// Éxito
showToast("success", "Éxito", "Operación completada");

// Error
showToast("error", "Error", "Algo salió mal");

// Info
showToast("info", "Información", "Mensaje informativo");

// Warning
showToast("warning", "Aviso", "Mensaje de advertencia");
```

### Modales

```javascript
// Abrir modal
document.getElementById("miModal").style.display = "block";

// Cerrar modal
document.getElementById("miModal").style.display = "none";

// O usar función helper
cerrarModal("miModal");
```

---

## 🎯 Navegación

### Cambiar entre Vistas

```javascript
// Click en botón de navegación
onclick = "mostrar('productos')";

// O programáticamente
function mostrar(vista) {
  // Oculta todas las vistas
  // Muestra la vista solicitada
  // Actualiza estado del nav
  // Carga datos si es necesario
}
```

### Vistas Disponibles

- `dashboard` - Panel principal
- `productos` - Gestión de productos
- `sucursales` - Gestión de sucursales
- `ventas` - Historial de ventas
- `nueva-venta` - Crear venta

---

## 🎨 Personalización

### Cambiar Colores

**Archivo**: `css/style.css` (líneas 1-30)

```css
:root {
  /* Tema Azul (actual) */
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #3b82f6;
}

/* Tema Verde */
:root {
  --primary: #059669;
  --primary-dark: #047857;
  --primary-light: #10b981;
}

/* Tema Rojo */
:root {
  --primary: #dc2626;
  --primary-dark: #b91c1c;
  --primary-light: #ef4444;
}
```

### Cambiar Tipografía

```html
<!-- En index.html, línea ~15 -->
<!-- Cambiar fuentes de Google Fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Cambiar Logo/Título

```html
<!-- En index.html, línea ~92 -->
<div class="logo">
  <i class="fas fa-shopping-cart"></i>
  <h1>NombreApp <span class="version">PRO</span></h1>
</div>
```

---

## 📱 Responsividad

### Breakpoints

```css
/* Mobile: < 768px */
@media (max-width: 767px) {
  /* Estilos mobile */
}

/* Tablet: 768px - 1024px */
@media (min-width: 768px) {
  /* Estilos tablet */
}

/* Desktop: > 1024px */
@media (min-width: 1025px) {
  /* Estilos desktop */
}
```

### Diseño Mobile-First

- ✅ Menú colapsable
- ✅ Tablas responsivas
- ✅ Modales adaptables
- ✅ Botones táctiles
- ✅ Fuentes legibles

---

## 🐛 Solución de Problemas

### Frontend no carga

```
Soluciones:
1. Verifica que corrió: python -m http.server 5500
2. Abre: http://localhost:5500 (no localhost)
3. Abre DevTools (F12) y revisa si hay errores
```

### No se conecta al backend

```
Soluciones:
1. Verifica backend está corriendo: http://localhost:8080
2. Revisa que API_URL sea correcto en api.js
3. Abre consola (F12) y busca errores de fetch
4. Revisa CORS en backend
```

### Datos no actualizan

```
Soluciones:
1. Abre DevTools (F12) - pestaña Network
2. Verifica que la petición HTTP sea exitosa (200)
3. Revisa respuesta del server
4. Limpia caché: Ctrl+Shift+Delete
```

### Estilos no se aplican

```
Soluciones:
1. Limpia caché del navegador
2. Verifica que style.css se cargó (Network tab)
3. Revisa selectores CSS en DevTools
4. Hard refresh: Ctrl+Shift+R
```

### Puerto 5500 ya está en uso

```
Soluciones:
1. Usa otro puerto: python -m http.server 8000
2. Cierra aplicación que usa puerto
3. En Windows: netstat -ano | findstr :5500
4. En Linux: lsof -ti:5500 | xargs kill -9
```

---

## 🔍 Debugging

### Consola del Navegador (F12)

```javascript
// Ver productos en consola
const productos = await api.getProductos();
console.log(productos);

// Ver configuración API
console.log(API_URL);

// Ver último error
console.error();
```

### DevTools - Network Tab

1. Abre DevTools (F12)
2. Pestaña **Network**
3. Realiza acción
4. Busca request
5. Revisa:
   - Status (200, 404, 500)
   - Response
   - Headers
   - Payload

---

## ✨ Características Avanzadas

### Búsqueda en Tiempo Real

```javascript
// Implementado en productos.js
function buscarProductos(termino) {
  // Filtra mientras escribes
  // Sin recargar página
  // Resalta resultados
}
```

### Validación de Formularios

```javascript
// Valida antes de enviar
- Campos requeridos
- Formatos válidos (email, números)
- Longitud de campos
- Valores únicos
```

### Cálculo Automático de Totales

```javascript
// En nueva-venta.js
// Suma automática mientras agregas productos
// Actualiza en tiempo real
// Redondea a 2 decimales
```

### Estados de Venta

```javascript
// Cambio de estado
- PENDIENTE → PROCESADA
- PENDIENTE → CANCELADA
- PROCESADA → CANCELADA
```

---

## 📊 Optimizaciones

### Rendimiento

- ✅ CSS modular
- ✅ JavaScript minificado (producción)
- ✅ Lazy loading de imágenes
- ✅ Caché de datos
- ✅ Compresión de assets

### Accesibilidad

- ✅ Atributos `alt` en imágenes
- ✅ Etiquetas semánticas
- ✅ Contraste de colores WCAG
- ✅ Navegación por teclado
- ✅ ARIA labels

---

## 🤝 Mejoras Futuras

Posibles enhancements:

- [ ] Exportar a Excel/PDF
- [ ] Gráficos de ventas
- [ ] Autenticación
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] Caché offline (Service Workers)
- [ ] Push notifications
- [ ] Reportes avanzados

---

## 📚 Recursos Adicionales

- [MDN Web Docs](https://developer.mozilla.org/)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [JavaScript ES6](https://www.w3schools.com/js/js_es6.asp)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

## 📞 Soporte

Para más información:

- Consulta el README principal: `../README.md`
- Revisa guía de setup: `../SETUP_GUIA.md`
- Documentación backend: `../backend/README.md`

---

<div align="center">

**Frontend de SuperGest** 🎨

Interfaz profesional para gestión moderna de supermercados

</div>
