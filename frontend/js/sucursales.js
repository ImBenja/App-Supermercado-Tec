// Variables globales para sucursales
let sucursales = [];
let sucursalesFiltradas = [];

// Función para cargar sucursales
async function cargarSucursales() {
  try {
    sucursales = await api.getSucursales();
    sucursalesFiltradas = [...sucursales];
    renderSucursales();
    actualizarContadorSucursales();
    actualizarDashboardSucursales();
    showToast("success", "Éxito", "Sucursales cargadas correctamente");
  } catch (error) {
    showToast("error", "Error", "No se pudieron cargar las sucursales");
  }
}

// Renderizar sucursales en la vista de tarjetas
function renderSucursales() {
  const grid = document.getElementById("sucursales-grid");
  if (!grid) return;

  if (sucursalesFiltradas.length === 0) {
    grid.innerHTML = `
            <div class="empty-state-card">
                <i class="fas fa-store-slash"></i>
                <h3>No hay sucursales registradas</h3>
                <p>Crea tu primera sucursal para comenzar</p>
                <button class="btn btn-primary" onclick="abrirModalSucursal()">
                    <i class="fas fa-plus"></i> Nueva Sucursal
                </button>
            </div>
        `;
    return;
  }

  grid.innerHTML = sucursalesFiltradas
    .map(
      (sucursal) => `
        <div class="sucursal-card">
            <div class="sucursal-header">
                <div class="sucursal-icon">
                    <i class="fas fa-store"></i>
                </div>
                <div class="sucursal-info">
                    <h3>${sucursal.nombre}</h3>
                    <span class="sucursal-id">ID: #${sucursal.id}</span>
                </div>
                <div class="sucursal-actions">
                    <button class="btn-icon" onclick="editarSucursal(${sucursal.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="eliminarSucursal(${sucursal.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="sucursal-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <span class="detail-label">Dirección</span>
                        <span class="detail-value">${sucursal.direccion || "No especificada"}</span>
                    </div>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <span class="detail-label">Teléfono</span>
                        <span class="detail-value">${sucursal.telefono || "No especificado"}</span>
                    </div>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <div>
                        <span class="detail-label">Registrada</span>
                        <span class="detail-value">${formatearFecha(sucursal.createdAt)}</span>
                    </div>
                </div>
            </div>
            
            <div class="sucursal-footer">
                <button class="btn btn-outline" onclick="verVentasSucursal(${sucursal.id})">
                    <i class="fas fa-receipt"></i> Ver Ventas
                </button>
                <button class="btn btn-primary" onclick="irANuevaVenta(${sucursal.id})">
                    <i class="fas fa-cash-register"></i> Nueva Venta
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

// Formatear fecha
function formatearFecha(fechaString) {
  if (!fechaString) return "N/A";
  try {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES");
  } catch {
    return fechaString;
  }
}

// Filtrar sucursales
function filtrarSucursales() {
  const searchTerm =
    document.getElementById("search-sucursal")?.value.toLowerCase() || "";

  sucursalesFiltradas = sucursales.filter((sucursal) => {
    const matchesSearch =
      !searchTerm ||
      sucursal.nombre.toLowerCase().includes(searchTerm) ||
      sucursal.direccion?.toLowerCase().includes(searchTerm) ||
      sucursal.telefono?.toLowerCase().includes(searchTerm);

    return matchesSearch;
  });

  renderSucursales();
  actualizarContadorSucursales();
}

// Actualizar contador de sucursales
function actualizarContadorSucursales() {
  const countElement = document.getElementById("total-sucursales");
  if (countElement) {
    countElement.textContent = sucursales.length;
  }
}

// Abrir modal para nueva sucursal
function abrirModalSucursal(sucursal = null) {
  // Crear modal dinámicamente si no existe
  let modal = document.getElementById("modalSucursal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalSucursal";
    modal.className = "modal";
    modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-store"></i> <span id="modal-sucursal-titulo">Nueva Sucursal</span></h3>
                    <button class="modal-close" onclick="cerrarModal('modalSucursal')">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="formSucursal">
                        <input type="hidden" id="sucursal-id">
                        
                        <div class="form-group">
                            <label for="sucursal-nombre"><i class="fas fa-tag"></i> Nombre *</label>
                            <input type="text" id="sucursal-nombre" required placeholder="Ej: Sucursal Centro">
                        </div>
                        
                        <div class="form-group">
                            <label for="sucursal-direccion"><i class="fas fa-map-marker-alt"></i> Dirección *</label>
                            <input type="text" id="sucursal-direccion" required placeholder="Ej: Av. Principal 123">
                        </div>
                        
                        <div class="form-group">
                            <label for="sucursal-telefono"><i class="fas fa-phone"></i> Teléfono</label>
                            <input type="tel" id="sucursal-telefono" placeholder="Ej: 351-1234567">
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="cerrarModal('modalSucursal')">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Guardar Sucursal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    document.body.appendChild(modal);

    // Configurar el formulario
    document
      .getElementById("formSucursal")
      .addEventListener("submit", guardarSucursal);
  }

  const titulo = document.getElementById("modal-sucursal-titulo");
  const form = document.getElementById("formSucursal");

  form.reset();

  if (sucursal) {
    // Modo edición
    titulo.textContent = "Editar Sucursal";
    document.getElementById("sucursal-id").value = sucursal.id;
    document.getElementById("sucursal-nombre").value = sucursal.nombre || "";
    document.getElementById("sucursal-direccion").value =
      sucursal.direccion || "";
    document.getElementById("sucursal-telefono").value =
      sucursal.telefono || "";
  } else {
    // Modo creación
    titulo.textContent = "Nueva Sucursal";
    document.getElementById("sucursal-id").value = "";
  }

  modal.classList.add("active");
  document.getElementById("sucursal-nombre").focus();
}

// Guardar sucursal (crear o actualizar)
async function guardarSucursal(e) {
  e.preventDefault();

  const sucursalId = document.getElementById("sucursal-id").value;
  const sucursalData = {
    nombre: document.getElementById("sucursal-nombre").value,
    direccion: document.getElementById("sucursal-direccion").value,
    telefono: document.getElementById("sucursal-telefono").value,
  };

  try {
    if (sucursalId) {
      // Actualizar sucursal existente
      await api.updateSucursal(sucursalId, sucursalData);
      showToast("success", "Éxito", "Sucursal actualizada correctamente");
    } else {
      // Crear nueva sucursal
      await api.createSucursal(sucursalData);
      showToast("success", "Éxito", "Sucursal creada correctamente");
    }

    // Cerrar modal y recargar sucursales
    cerrarModal("modalSucursal");
    await cargarSucursales();
  } catch (error) {
    showToast("error", "Error", "No se pudo guardar la sucursal");
  }
}

// Editar sucursal
async function editarSucursal(id) {
  try {
    const sucursal = await api.getSucursalById(id);
    abrirModalSucursal(sucursal);
  } catch (error) {
    showToast("error", "Error", "No se pudo cargar la sucursal");
  }
}

// Eliminar sucursal
async function eliminarSucursal(id) {
  if (
    !confirm(
      "¿Estás seguro de eliminar esta sucursal? Esta acción no se puede deshacer.",
    )
  ) {
    return;
  }

  try {
    await api.deleteSucursal(id);
    showToast("success", "Éxito", "Sucursal eliminada correctamente");
    await cargarSucursales();
  } catch (error) {
    showToast("error", "Error", "No se pudo eliminar la sucursal");
  }
}

// Ver ventas de una sucursal
async function verVentasSucursal(id) {
  mostrar("ventas");

  // Establecer filtro de sucursal
  setTimeout(() => {
    const sucursalSelect = document.getElementById("filter-sucursal-ventas");
    if (sucursalSelect) {
      sucursalSelect.value = id;
      filtrarVentas();
    }
  }, 500);
}

// Ir a nueva venta con sucursal pre-seleccionada
function irANuevaVenta(sucursalId) {
  mostrar("nueva-venta");

  // Establecer sucursal seleccionada
  setTimeout(() => {
    const sucursalSelect = document.getElementById("venta-sucursal");
    if (sucursalSelect) {
      sucursalSelect.value = sucursalId;
    }
  }, 500);
}

// Actualizar dashboard con datos de sucursales
function actualizarDashboardSucursales() {
  const totalSucursales = document.getElementById("total-sucursales");
  if (totalSucursales) {
    totalSucursales.textContent = sucursales.length;
  }
}

// Cargar datos cuando se muestra la vista de sucursales
function cargarDatosVista(vista) {
  if (vista === "sucursales") {
    cargarSucursales();
  }
}

// Estilos adicionales para sucursales
const sucursalesStyle = document.createElement("style");
sucursalesStyle.textContent = `
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }
    
    .sucursal-card {
        background: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        transition: var(--transition);
    }
    
    .sucursal-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
    }
    
    .sucursal-header {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
    }
    
    .sucursal-icon {
        width: 3rem;
        height: 3rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-right: 1rem;
    }
    
    .sucursal-info {
        flex: 1;
    }
    
    .sucursal-info h3 {
        margin: 0;
        font-size: 1.25rem;
        color: white;
    }
    
    .sucursal-id {
        font-size: 0.875rem;
        opacity: 0.9;
    }
    
    .sucursal-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .sucursal-actions .btn-icon {
        color: white;
        background: rgba(255, 255, 255, 0.2);
    }
    
    .sucursal-actions .btn-icon:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .sucursal-details {
        padding: 1.5rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .detail-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
    }
    
    .detail-item i {
        width: 2rem;
        color: var(--primary);
        font-size: 1.25rem;
    }
    
    .detail-label {
        display: block;
        font-size: 0.75rem;
        color: var(--gray-500);
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .detail-value {
        display: block;
        color: var(--gray-700);
        font-weight: 500;
    }
    
    .sucursal-footer {
        padding: 1rem 1.5rem;
        background: var(--gray-50);
        border-top: 1px solid var(--gray-200);
        display: flex;
        justify-content: space-between;
    }
    
    .btn-outline {
        background: transparent;
        border: 1px solid var(--gray-300);
        color: var(--gray-700);
    }
    
    .btn-outline:hover {
        background: var(--gray-100);
    }
    
    .empty-state-card {
        grid-column: 1 / -1;
        background: white;
        border-radius: var(--radius);
        padding: 3rem;
        text-align: center;
        box-shadow: var(--shadow);
    }
    
    .empty-state-card i {
        font-size: 4rem;
        color: var(--gray-300);
        margin-bottom: 1rem;
    }
    
    .empty-state-card h3 {
        color: var(--gray-700);
        margin-bottom: 0.5rem;
    }
    
    .empty-state-card p {
        color: var(--gray-500);
        margin-bottom: 1.5rem;
    }
`;
document.head.appendChild(sucursalesStyle);

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Configurar búsqueda de sucursales
  const searchInput = document.getElementById("search-sucursal");
  if (searchInput) {
    searchInput.addEventListener("input", filtrarSucursales);
  }

  // Si estamos en la vista de sucursales, cargarlas
  if (document.getElementById("sucursales").classList.contains("activa")) {
    cargarSucursales();
  }
});
