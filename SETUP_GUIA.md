# 🚀 Guía de Ejecución - SuperApp

## Requisitos Previos

- **Java 8+** instalado
- **Python 3+** instalado
- **Maven** (incluido en el proyecto con `mvnw`)

## Paso 1: Verificar Python

Abre una terminal y verifica Python:

```bash
python --version
```

Si no tienes Python, descárgalo desde: https://www.python.org/

## Paso 2: Iniciar el Backend

### Opción A: Usar el script (Recomendado - Windows)

```bash
# Navega a la carpeta del proyecto y ejecuta:
start-backend.cmd
```

### Opción B: Ejecutar manualmente

```bash
cd appsupermercado
call mvnw spring-boot:run
```

**El backend estará disponible en:** `http://localhost:8080`
**H2 Console disponible en:** `http://localhost:8080/h2-console`

## Paso 3: Iniciar el Frontend

### Opción A: Usar el script (Recomendado - Windows)

```bash
# Abre otra terminal en la carpeta del proyecto y ejecuta:
start-frontend.cmd
```

### Opción B: Ejecutar manualmente

```bash
cd frontend
python -m http.server 5500
```

**El frontend estará disponible en:** `http://localhost:5500`

## ✅ Verificar que funciona

1. Abre tu navegador y ve a: `http://localhost:5500`
2. Deberías ver la interfaz SuperApp
3. Si ve las opciones de Productos, Sucursales, Ventas = ¡Funciona!

## 🛠️ Troubleshooting

### ERROR: "Failed to delete target/classes"

Este error ocurre cuando los archivos están bloqueados por otro proceso.

**Solución rápida:**
```bash
# Ejecuta el script de limpieza:
.\limpiar-target.cmd
```

**O manualmente:**
1. Cierra **VS Code completamente**
2. Abre la carpeta `appsupermercado` en el Explorador
3. Elimina la carpeta `target`
4. Vuelve a ejecutar `start-backend.cmd`

### El frontend no carga datos

- Verifica que el backend está corriendo (http://localhost:8080)
- Abre la consola del navegador (F12) y busca errores en la pestaña "Network"

### Puerto 5500 ya está en uso

```bash
# Cambiar a puerto 8000:
cd frontend
python -m http.server 8000
# Luego accede a http://localhost:8000
```

### Puerto 8080 ya está en uso

Modifica en `appsupermercado/src/main/resources/application.properties`:

```properties
server.port=9090
```

Y actualiza la URL en `frontend/js/api.js`:

```javascript
BASE_URL: "http://localhost:9090";
```

## 📝 Estructura de carpetas

```
Prueba-Tec-Supermercado/
├── appsupermercado/       (Backend - Spring Boot)
│   ├── pom.xml
│   └── src/
├── frontend/              (Frontend - HTML/CSS/JS)
│   ├── index.html
│   ├── css/
│   └── js/
├── start-backend.cmd      (Script para iniciar backend - Batch)
├── start-backend.ps1      (Script para iniciar backend - PowerShell)
├── start-frontend.cmd     (Script para iniciar frontend - Batch)
├── start-frontend.ps1     (Script para iniciar frontend - PowerShell)
├── limpiar-target.cmd     (Script para limpiar errores de compilación)
└── verificar-requisitos.cmd (Verifica Java y Python)
```

## 📝 Scripts disponibles

| Script | Uso |
|--------|-----|
| `start-backend.cmd` | Inicia el backend (Batch - Windows) |
| `start-backend.ps1` | Inicia el backend (PowerShell - Windows) |
| `start-frontend.cmd` | Inicia el frontend (Batch - Windows) |
| `start-frontend.ps1` | Inicia el frontend (PowerShell - Windows) |
| `limpiar-target.cmd` | Limpia la carpeta target (resuelve "Failed to delete" error) |
| `verificar-requisitos.cmd` | Verifica que Java y Python estén instalados |

## 🔗 Endpoints disponibles

- **GET** `/api/productos` - Obtener todos los productos
- **GET** `/api/sucursales` - Obtener todas las sucursales
- **GET** `/api/ventas` - Obtener todas las ventas
- **POST** `/api/ventas` - Crear una nueva venta

Para más detalles, revisa los controladores en `appsupermercado/src/main/java/com/tecsuper/appsupermercado/controller/`
