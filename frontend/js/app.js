// Función para actualizar la fecha actual
function actualizarFecha() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    dateElement.textContent = now.toLocaleDateString("es-ES", options);
  }
}

// Función para cargar datos específicos de cada vista
async function cargarDatosVista(vista) {
  switch (vista) {
    case "dashboard":
      await cargarDashboardData();
      break;
    case "productos":
      // La vista de productos ya tiene su propio cargado
      break;
    case "sucursales":
      // La vista de sucursales cargará sus datos
      break;
    case "ventas":
      // La vista de ventas cargará sus datos
      break;
    case "nueva-venta":
      // La vista de nueva venta cargará sus datos
      break;
  }
}

// Función para cargar datos del dashboard
async function cargarDashboardData() {
  try {
    // Cargar productos para estadísticas
    const productos = await api.getProductos();
    document.getElementById("total-productos").textContent = productos.length;

    const stockBajo = productos.filter((p) => p.stock < 10).length;
    document.getElementById("stock-bajo").textContent = stockBajo;

    // Cargar sucursales
    const sucursales = await api.getSucursales();
    document.getElementById("total-sucursales").textContent = sucursales.length;

    // Cargar ventas de hoy
    const hoy = new Date().toISOString().split("T")[0];
    const ventas = await api.getVentasByFecha(hoy);
    document.getElementById("ventas-hoy").textContent = ventas.length;

    const totalHoy = ventas.reduce((sum, v) => sum + (v.total || 0), 0);
    document.getElementById("total-hoy").textContent = totalHoy.toFixed(2);

    // Actualizar últimas ventas
    actualizarUltimasVentas();

    // Actualizar lista de stock bajo
    actualizarListaStockBajoDashboard(productos);
  } catch (error) {
    console.error("Error cargando dashboard:", error);
    showToast(
      "error",
      "Error",
      "No se pudieron cargar los datos del dashboard",
    );
  }
}

// Actualizar últimas ventas en el dashboard
async function actualizarUltimasVentas() {
  try {
    const ventas = await api.getVentas();
    const ultimasVentas = ventas.slice(0, 5); // Últimas 5 ventas

    const tbody = document.getElementById("ultimas-ventas");
    if (!tbody) return;

    if (ultimasVentas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">No hay ventas recientes</td></tr>';
      return;
    }

    // Cargar sucursales para mostrar nombres
    const sucursales = await api.getSucursales();

    tbody.innerHTML = ultimasVentas
      .map((venta) => {
        const sucursal = sucursales.find((s) => s.id === venta.sucursalID);
        const estadoClass =
          venta.estadoVenta === "ANULADA" ? "status-inactive" : "status-active";

        return `
                <tr>
                    <td>#${venta.id}</td>
                    <td>${venta.fecha || "N/A"}</td>
                    <td>${sucursal ? sucursal.nombre : "N/A"}</td>
                    <td>$${venta.total?.toFixed(2) || "0.00"}</td>
                    <td>
                        <span class="status-badge ${estadoClass}">
                            ${venta.estadoVenta || "REGISTRADA"}
                        </span>
                    </td>
                </tr>
            `;
      })
      .join("");
  } catch (error) {
    console.error("Error cargando últimas ventas:", error);
  }
}

// Actualizar lista de stock bajo en el dashboard
function actualizarListaStockBajoDashboard(productos) {
  const productosBajoStock = productos.filter((p) => p.stock < 10);
  const tbody = document.getElementById("stock-bajo-list");

  if (!tbody) return;

  if (productosBajoStock.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4">No hay productos con stock bajo</td></tr>';
    return;
  }

  tbody.innerHTML = productosBajoStock
    .slice(0, 5)
    .map(
      (producto) => `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td><span class="stock-badge stock-low">${producto.stock}</span></td>
            <td>
                <button class="btn-icon" onclick="mostrar('productos')">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("");
}

// Integración de todos los módulos
document.addEventListener("DOMContentLoaded", () => {
  // Cargar funciones de cada vista
  window.cargarDatosVista = function (vista) {
    switch (vista) {
      case "dashboard":
        cargarDashboardData();
        break;
      case "productos":
        if (typeof cargarProductos === "function") {
          cargarProductos();
        }
        break;
      case "sucursales":
        if (typeof cargarSucursales === "function") {
          cargarSucursales();
        }
        break;
      case "ventas":
        if (typeof cargarVentas === "function") {
          cargarVentas();
        }
        break;
      case "nueva-venta":
        if (typeof inicializarNuevaVenta === "function") {
          inicializarNuevaVenta();
        }
        break;
    }
  };

  // Inicializar fecha actual
  actualizarFecha();

  // Cargar datos iniciales del dashboard
  if (document.getElementById("dashboard").classList.contains("activa")) {
    cargarDashboardData();
  }
});
