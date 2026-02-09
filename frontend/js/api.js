const API_URL = "http://localhost:8080";
let loadingCount = 0;

// Funciones de utilidad para UI
function showLoading() {
  loadingCount++;
  document.getElementById("loadingGlobal").classList.add("active");
}

function hideLoading() {
  loadingCount = Math.max(0, loadingCount - 1);
  if (loadingCount === 0) {
    document.getElementById("loadingGlobal").classList.remove("active");
  }
}

function showToast(type, title, message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Cliente API mejorado
async function apiFetch(url, options = {}) {
  showLoading();

  try {
    const res = await fetch(API_URL + url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    // Para DELETE que no devuelve contenido
    if (res.status === 204) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    showToast(
      "error",
      "Error de conexión",
      error.message || "No se pudo conectar con el servidor",
    );
    throw error;
  } finally {
    hideLoading();
  }
}

// Funciones específicas para cada recurso
const api = {
  // Productos
  getProductos: () => apiFetch("/api/productos"),
  getProductoById: (id) => apiFetch(`/api/productos/id/${id}`),
  getProductosByNombre: (nombre) => apiFetch(`/api/productos/nombre/${nombre}`),
  getProductosByCategoria: (categoria) =>
    apiFetch(`/api/productos/categoria/${categoria}`),
  getProductosByPrecio: (precio) => apiFetch(`/api/productos/precio/${precio}`),
  createProducto: (producto) =>
    apiFetch("/api/productos", {
      method: "POST",
      body: JSON.stringify(producto),
    }),
  updateProducto: (id, producto) =>
    apiFetch(`/api/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
    }),
  deleteProducto: (id) =>
    apiFetch(`/api/productos/${id}`, {
      method: "DELETE",
    }),

  // Sucursales
  getSucursales: () => apiFetch("/api/sucursales"),
  getSucursalById: (id) => apiFetch(`/api/sucursales/id/${id}`),
  createSucursal: (sucursal) =>
    apiFetch("/api/sucursales", {
      method: "POST",
      body: JSON.stringify(sucursal),
    }),
  updateSucursal: (id, sucursal) =>
    apiFetch(`/api/sucursales/${id}`, {
      method: "PUT",
      body: JSON.stringify(sucursal),
    }),
  deleteSucursal: (id) =>
    apiFetch(`/api/sucursales/${id}`, {
      method: "DELETE",
    }),

  // Ventas
  getVentas: () => apiFetch("/api/ventas"),
  getVentaById: (id) => apiFetch(`/api/ventas/id/${id}`),
  getVentasByFecha: (fecha) => apiFetch(`/api/ventas/fecha/${fecha}`),
  getVentasByEstado: (estado) => apiFetch(`/api/ventas/estado/${estado}`),
  createVenta: (venta) =>
    apiFetch("/api/ventas", {
      method: "POST",
      body: JSON.stringify(venta),
    }),
  updateVenta: (id, venta) =>
    apiFetch(`/api/ventas/${id}`, {
      method: "PUT",
      body: JSON.stringify(venta),
    }),
  anularVenta: (id) =>
    apiFetch(`/api/ventas/${id}`, {
      method: "DELETE",
    }),
};

// Función global para mostrar secciones
function mostrar(vista) {
  // Ocultar todas las vistas
  document
    .querySelectorAll(".vista")
    .forEach((v) => v.classList.remove("activa"));

  // Desactivar todos los botones de navegación
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // Activar la vista solicitada
  const vistaElement = document.getElementById(vista);
  if (vistaElement) {
    vistaElement.classList.add("activa");

    // Activar el botón correspondiente si existe
    const navBtn = Array.from(document.querySelectorAll(".nav-btn")).find(
      (btn) => btn.getAttribute("onclick")?.includes(`'${vista}'`),
    );
    if (navBtn) navBtn.classList.add("active");

    // Cargar datos específicos de la vista
    cargarDatosVista(vista);
  }
}

// Función para cerrar modales
function cerrarModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}
