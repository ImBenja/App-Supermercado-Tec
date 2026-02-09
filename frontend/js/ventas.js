// Variables globales para ventas
let ventas = [];
let ventasFiltradas = [];
let sucursalesParaVentas = [];

// Función para cargar ventas
async function cargarVentas() {
  try {
    // Cargar ventas y sucursales
    [ventas, sucursalesParaVentas] = await Promise.all([
      api.getVentas(),
      api.getSucursales(),
    ]);

    ventasFiltradas = [...ventas];
    renderVentas();
    actualizarContadorVentas();
    actualizarDashboardVentas();
    cargarFiltrosVentas();

    showToast("success", "Éxito", "Ventas cargadas correctamente");
  } catch (error) {
    showToast("error", "Error", "No se pudieron cargar las ventas");
  }
}

// Renderizar ventas en la tabla
function renderVentas() {
  const tbody = document.querySelector("#tablaVentas tbody");
  if (!tbody) return;

  if (ventasFiltradas.length === 0) {
    tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-receipt"></i>
                        <p>No hay ventas registradas</p>
                    </div>
                </td>
            </tr>
        `;
    return;
  }

  // Ordenar por fecha más reciente primero
  const ventasOrdenadas = [...ventasFiltradas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha),
  );

  tbody.innerHTML = ventasOrdenadas
    .map((venta) => {
      const sucursal = sucursalesParaVentas.find(
        (s) => s.id === venta.sucursalID,
      );
      const estadoClass =
        venta.estadoVenta === "ANULADA" ? "status-inactive" : "status-active";
      const estadoText =
        venta.estadoVenta === "ANULADA" ? "ANULADA" : "REGISTRADA";

      // Contar productos
      const cantidadProductos = venta.detalle?.length || 0;

      return `
            <tr>
                <td>#${venta.id}</td>
                <td>${venta.fecha || "N/A"}</td>
                <td>${sucursal ? sucursal.nombre : "N/A"}</td>
                <td>${cantidadProductos} productos</td>
                <td>
                    <span class="price">$${venta.total?.toFixed(2) || "0.00"}</span>
                </td>
                <td>
                    <span class="status-badge ${estadoClass}">
                        ${estadoText}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="verDetalleVenta(${venta.id})" title="Ver detalle">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${
                          venta.estadoVenta !== "ANULADA"
                            ? `
                            <button class="btn-icon" onclick="anularVenta(${venta.id})" title="Anular venta">
                                <i class="fas fa-ban"></i>
                            </button>
                        `
                            : ""
                        }
                        <button class="btn-icon" onclick="exportarVenta(${venta.id})" title="Exportar">
                            <i class="fas fa-file-export"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    })
    .join("");
}

// Cargar filtros para ventas
function cargarFiltrosVentas() {
  // Cargar select de sucursales si existe
  const sucursalSelect = document.getElementById("filter-sucursal-ventas");
  if (sucursalSelect && sucursalesParaVentas.length > 0) {
    let options = '<option value="">Todas las sucursales</option>';
    sucursalesParaVentas.forEach((sucursal) => {
      options += `<option value="${sucursal.id}">${sucursal.nombre}</option>`;
    });
    sucursalSelect.innerHTML = options;
  }

  // Establecer fechas por defecto (últimos 30 días)
  const fechaDesde = document.getElementById("fecha-desde");
  const fechaHasta = document.getElementById("fecha-hasta");

  if (fechaDesde) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - 30);
    fechaDesde.value = fecha.toISOString().split("T")[0];
  }

  if (fechaHasta) {
    fechaHasta.value = new Date().toISOString().split("T")[0];
  }
}

// Filtrar ventas
function filtrarVentas() {
  const fechaDesde = document.getElementById("fecha-desde")?.value;
  const fechaHasta = document.getElementById("fecha-hasta")?.value;
  const estado = document.getElementById("filter-estado")?.value;
  const sucursalId = document.getElementById("filter-sucursal-ventas")?.value;

  ventasFiltradas = ventas.filter((venta) => {
    // Filtro por fecha
    let matchesFecha = true;
    if (fechaDesde && venta.fecha < fechaDesde) {
      matchesFecha = false;
    }
    if (fechaHasta && venta.fecha > fechaHasta) {
      matchesFecha = false;
    }

    // Filtro por estado
    const matchesEstado = !estado || venta.estadoVenta === estado;

    // Filtro por sucursal
    const matchesSucursal = !sucursalId || venta.sucursalID == sucursalId;

    return matchesFecha && matchesEstado && matchesSucursal;
  });

  renderVentas();
  actualizarContadorVentas();
}

// Actualizar contador de ventas
function actualizarContadorVentas() {
  const countElement = document.getElementById("ventas-count");
  if (countElement) {
    countElement.textContent = ventasFiltradas.length;
  }
}

// Ver detalle de venta
async function verDetalleVenta(id) {
  try {
    const venta = await api.getVentaById(id);
    const sucursal = sucursalesParaVentas.find(
      (s) => s.id === venta.sucursalID,
    );

    // Crear modal de detalle
    let modal = document.getElementById("modalDetalleVenta");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modalDetalleVenta";
      modal.className = "modal";
      document.body.appendChild(modal);
    }

    // Formatear detalles de productos
    const detallesHTML =
      venta.detalle
        ?.map(
          (detalle) => `
            <div class="detalle-producto">
                <div class="detalle-info">
                    <strong>${detalle.productoNombre || "Producto"}</strong>
                    <div class="detalle-subinfo">
                        <span>${detalle.cantidad} x $${detalle.precioUnitario?.toFixed(2)}</span>
                        <span class="detalle-subtotal">$${detalle.subtotal?.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `,
        )
        .join("") || "<p>No hay detalles disponibles</p>";

    modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3><i class="fas fa-receipt"></i> Detalle de Venta #${venta.id}</h3>
                    <button class="modal-close" onclick="cerrarModal('modalDetalleVenta')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="venta-info">
                        <div class="info-row">
                            <span class="info-label">Fecha:</span>
                            <span class="info-value">${venta.fecha}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Sucursal:</span>
                            <span class="info-value">${sucursal ? sucursal.nombre : "N/A"}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Estado:</span>
                            <span class="status-badge ${venta.estadoVenta === "ANULADA" ? "status-inactive" : "status-active"}">
                                ${venta.estadoVenta || "REGISTRADA"}
                            </span>
                        </div>
                    </div>
                    
                    <div class="venta-detalles">
                        <h4><i class="fas fa-box"></i> Productos</h4>
                        ${detallesHTML}
                    </div>
                    
                    <div class="venta-total">
                        <div class="total-row">
                            <span>TOTAL:</span>
                            <span class="total-amount">$${venta.total?.toFixed(2) || "0.00"}</span>
                        </div>
                    </div>
                    
                    ${
                      venta.estadoVenta !== "ANULADA"
                        ? `
                        <div class="venta-acciones">
                            <button class="btn btn-danger" onclick="anularVentaDesdeModal(${venta.id})">
                                <i class="fas fa-ban"></i> Anular Venta
                            </button>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
        `;

    modal.classList.add("active");
  } catch (error) {
    showToast("error", "Error", "No se pudo cargar el detalle de la venta");
  }
}

// Anular venta desde la tabla
async function anularVenta(id) {
  if (
    !confirm(
      "¿Estás seguro de anular esta venta? Esta acción no se puede deshacer.",
    )
  ) {
    return;
  }

  try {
    await api.anularVenta(id);
    showToast("success", "Éxito", "Venta anulada correctamente");
    await cargarVentas();
  } catch (error) {
    showToast("error", "Error", "No se pudo anular la venta");
  }
}

// Anular venta desde el modal
function anularVentaDesdeModal(id) {
  cerrarModal("modalDetalleVenta");
  anularVenta(id);
}

// Exportar venta a PDF (simulado)
function exportarVenta(id) {
  showToast("info", "Exportar", "Función de exportación en desarrollo");
  // Aquí podrías implementar la exportación real a PDF
}

// Exportar todas las ventas filtradas
function exportarVentas() {
  if (ventasFiltradas.length === 0) {
    showToast("warning", "Exportar", "No hay ventas para exportar");
    return;
  }

  // Crear CSV simple (podrías usar una librería para PDF)
  let csv = "ID,Fecha,Sucursal,Total,Estado\n";

  ventasFiltradas.forEach((venta) => {
    const sucursal = sucursalesParaVentas.find(
      (s) => s.id === venta.sucursalID,
    );
    csv += `${venta.id},${venta.fecha},${sucursal ? sucursal.nombre : "N/A"},${venta.total},${venta.estadoVenta}\n`;
  });

  // Descargar archivo
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ventas_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  showToast("success", "Exportar", "Ventas exportadas correctamente");
}

// Actualizar dashboard con datos de ventas
function actualizarDashboardVentas() {
  // Ventas de hoy
  const hoy = new Date().toISOString().split("T")[0];
  const ventasHoy = ventas.filter((v) => v.fecha === hoy);
  const ventasHoyElement = document.getElementById("ventas-hoy");
  const totalHoyElement = document.getElementById("total-hoy");

  if (ventasHoyElement) ventasHoyElement.textContent = ventasHoy.length;
  if (totalHoyElement) {
    const totalHoy = ventasHoy.reduce((sum, v) => sum + (v.total || 0), 0);
    totalHoyElement.textContent = totalHoy.toFixed(2);
  }

  // Actualizar últimas ventas
  actualizarUltimasVentasDashboard();
}

// Actualizar últimas ventas en dashboard
function actualizarUltimasVentasDashboard() {
  const ultimasVentas = ventas.slice(0, 5); // Últimas 5 ventas
  const tbody = document.getElementById("ultimas-ventas");

  if (!tbody) return;

  if (ultimasVentas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No hay ventas recientes</td></tr>';
    return;
  }

  tbody.innerHTML = ultimasVentas
    .map((venta) => {
      const sucursal = sucursalesParaVentas.find(
        (s) => s.id === venta.sucursalID,
      );
      const estadoClass =
        venta.estadoVenta === "ANULADA" ? "status-inactive" : "status-active";

      return `
            <tr>
                <td>#${venta.id}</td>
                <td>${venta.fecha}</td>
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
}

// Cargar datos cuando se muestra la vista de ventas
function cargarDatosVista(vista) {
  if (vista === "ventas") {
    cargarVentas();
  }
}

// Estilos adicionales para ventas
const ventasStyle = document.createElement("style");
ventasStyle.textContent = `
    .date-range {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .date-range input {
        padding: 0.5rem;
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-sm);
        font-family: 'Inter', sans-serif;
    }
    
    .venta-info {
        background: var(--gray-50);
        border-radius: var(--radius);
        padding: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }
    
    .info-row:last-child {
        margin-bottom: 0;
    }
    
    .info-label {
        font-weight: 600;
        color: var(--gray-600);
    }
    
    .info-value {
        color: var(--gray-800);
        font-weight: 500;
    }
    
    .venta-detalles {
        margin-bottom: 1.5rem;
    }
    
    .venta-detalles h4 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: var(--gray-700);
    }
    
    .detalle-producto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .detalle-producto:last-child {
        border-bottom: none;
    }
    
    .detalle-info {
        flex: 1;
    }
    
    .detalle-subinfo {
        display: flex;
        justify-content: space-between;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: var(--gray-600);
    }
    
    .detalle-subtotal {
        font-weight: 600;
        color: var(--gray-800);
    }
    
    .venta-total {
        background: var(--primary);
        color: white;
        padding: 1rem;
        border-radius: var(--radius);
        margin-bottom: 1.5rem;
    }
    
    .total-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 600;
    }
    
    .venta-acciones {
        text-align: center;
        padding-top: 1.5rem;
        border-top: 1px solid var(--gray-200);
    }
`;
document.head.appendChild(ventasStyle);

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Configurar filtros de ventas
  const fechaDesde = document.getElementById("fecha-desde");
  const fechaHasta = document.getElementById("fecha-hasta");
  const filterEstado = document.getElementById("filter-estado");
  const filterSucursal = document.getElementById("filter-sucursal-ventas");

  if (fechaDesde) fechaDesde.addEventListener("change", filtrarVentas);
  if (fechaHasta) fechaHasta.addEventListener("change", filtrarVentas);
  if (filterEstado) filterEstado.addEventListener("change", filtrarVentas);
  if (filterSucursal) filterSucursal.addEventListener("change", filtrarVentas);

  // Si estamos en la vista de ventas, cargarlas
  if (document.getElementById("ventas").classList.contains("activa")) {
    cargarVentas();
  }
});
