// Variables globales
let productos = [];
let productosFiltrados = [];
let currentPage = 1;
const itemsPerPage = 10;

// Función para cargar productos
async function cargarProductos() {
  try {
    productos = await api.getProductos();
    productosFiltrados = [...productos];
    renderProductos();
    actualizarContador();
    actualizarCategorias();
    actualizarDashboard();
    showToast("success", "Éxito", "Productos cargados correctamente");
  } catch (error) {
    showToast("error", "Error", "No se pudieron cargar los productos");
  }
}

// Renderizar productos en la tabla
function renderProductos() {
  const tbody = document.querySelector("#tablaProductos tbody");
  if (!tbody) return;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productosPagina = productosFiltrados.slice(start, end);

  if (productosPagina.length === 0) {
    tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-box-open"></i>
                        <p>No hay productos disponibles</p>
                    </div>
                </td>
            </tr>
        `;
    return;
  }

  tbody.innerHTML = productosPagina
    .map(
      (producto) => `
        <tr>
            <td>#${producto.id}</td>
            <td>
                <div class="product-info">
                    <strong>${producto.nombre}</strong>
                </div>
            </td>
            <td>
                <span class="badge-category">${producto.categoria || "Sin categoría"}</span>
            </td>
            <td>
                <span class="price">$${producto.precio?.toFixed(2) || "0.00"}</span>
            </td>
            <td>
                <div class="stock-info">
                    <span class="stock-badge ${getStockClass(producto.stock)}">
                        ${producto.stock || 0}
                    </span>
                    ${producto.stock < 10 ? '<i class="fas fa-exclamation-triangle text-warning"></i>' : ""}
                </div>
            </td>
            <td>
                <span class="status-badge ${producto.stock > 0 ? "status-active" : "status-inactive"}">
                    ${producto.stock > 0 ? "DISPONIBLE" : "AGOTADO"}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editarProducto(${producto.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="eliminarProducto(${producto.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `,
    )
    .join("");
}

// Función para determinar la clase del stock
function getStockClass(stock) {
  if (stock < 10) return "stock-low";
  if (stock < 50) return "stock-medium";
  return "stock-high";
}

// Actualizar contador de productos
function actualizarContador() {
  const countElement = document.getElementById("productos-count");
  if (countElement) {
    countElement.textContent = productosFiltrados.length;
  }

  const currentPageElement = document.getElementById("current-page");
  if (currentPageElement) {
    currentPageElement.textContent = currentPage;
  }
}

// Actualizar lista de categorías
function actualizarCategorias() {
  const categorias = [
    ...new Set(productos.map((p) => p.categoria).filter(Boolean)),
  ];
  const select = document.getElementById("filter-categoria");
  const datalist = document.getElementById("categorias-list");

  if (select) {
    let options = '<option value="">Todas las categorías</option>';
    categorias.forEach((cat) => {
      options += `<option value="${cat}">${cat}</option>`;
    });
    select.innerHTML = options;
  }

  if (datalist) {
    let options = "";
    categorias.forEach((cat) => {
      options += `<option value="${cat}">`;
    });
    datalist.innerHTML = options;
  }
}

// Filtrar productos
function filtrarProductos() {
  const searchTerm =
    document.getElementById("search-producto")?.value.toLowerCase() || "";
  const categoria = document.getElementById("filter-categoria")?.value || "";
  const stockFilter = document.getElementById("filter-stock")?.value || "";
  const precioMin =
    parseFloat(document.getElementById("precio-min")?.value) || 0;
  const precioMax =
    parseFloat(document.getElementById("precio-max")?.value) || Infinity;

  productosFiltrados = productos.filter((producto) => {
    // Filtro por búsqueda
    const matchesSearch =
      !searchTerm || producto.nombre.toLowerCase().includes(searchTerm);

    // Filtro por categoría
    const matchesCategoria = !categoria || producto.categoria === categoria;

    // Filtro por precio
    const matchesPrecio =
      producto.precio >= precioMin && producto.precio <= precioMax;

    // Filtro por stock
    let matchesStock = true;
    if (stockFilter === "bajo") {
      matchesStock = producto.stock < 10;
    } else if (stockFilter === "medio") {
      matchesStock = producto.stock >= 10 && producto.stock <= 50;
    } else if (stockFilter === "alto") {
      matchesStock = producto.stock > 50;
    }

    return matchesSearch && matchesCategoria && matchesPrecio && matchesStock;
  });

  currentPage = 1;
  renderProductos();
  actualizarContador();
}

// Resetear filtros
function resetFiltros() {
  document.getElementById("search-producto").value = "";
  document.getElementById("filter-categoria").value = "";
  document.getElementById("filter-stock").value = "";
  document.getElementById("precio-min").value = "";
  document.getElementById("precio-max").value = "";

  productosFiltrados = [...productos];
  currentPage = 1;
  renderProductos();
  actualizarContador();
}

// Cambiar página
function cambiarPagina(direction) {
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const newPage = currentPage + direction;

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderProductos();
    actualizarContador();
  }
}

// Abrir modal para nuevo producto
function abrirModalProducto(producto = null) {
  const modal = document.getElementById("modalProducto");
  const titulo = document.getElementById("modal-titulo");
  const form = document.getElementById("formProducto");

  form.reset();

  if (producto) {
    // Modo edición
    titulo.textContent = "Editar Producto";
    document.getElementById("producto-id").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("categoria").value = producto.categoria || "";
    document.getElementById("precio").value = producto.precio || "";
    document.getElementById("stock").value = producto.stock || "";
  } else {
    // Modo creación
    titulo.textContent = "Nuevo Producto";
    document.getElementById("producto-id").value = "";
  }

  modal.classList.add("active");
  document.getElementById("nombre").focus();
}

// Guardar producto (crear o actualizar)
document
  .getElementById("formProducto")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const productoId = document.getElementById("producto-id").value;
    const productoData = {
      nombre: document.getElementById("nombre").value,
      categoria: document.getElementById("categoria").value,
      precio: parseFloat(document.getElementById("precio").value),
      stock: parseInt(document.getElementById("stock").value),
    };

    try {
      if (productoId) {
        // Actualizar producto existente
        await api.updateProducto(productoId, productoData);
        showToast("success", "Éxito", "Producto actualizado correctamente");
      } else {
        // Crear nuevo producto
        await api.createProducto(productoData);
        showToast("success", "Éxito", "Producto creado correctamente");
      }

      // Cerrar modal y recargar productos
      cerrarModal("modalProducto");
      await cargarProductos();
    } catch (error) {
      showToast("error", "Error", "No se pudo guardar el producto");
    }
  });

// Editar producto
async function editarProducto(id) {
  try {
    const producto = await api.getProductoById(id);
    abrirModalProducto(producto);
  } catch (error) {
    showToast("error", "Error", "No se pudo cargar el producto");
  }
}

// Eliminar producto
async function eliminarProducto(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) {
    return;
  }

  try {
    await api.deleteProducto(id);
    showToast("success", "Éxito", "Producto eliminado correctamente");
    await cargarProductos();
  } catch (error) {
    showToast("error", "Error", "No se pudo eliminar el producto");
  }
}

// Actualizar dashboard con datos de productos
function actualizarDashboard() {
  // Total productos
  const totalProductos = document.getElementById("total-productos");
  if (totalProductos) totalProductos.textContent = productos.length;

  // Stock bajo
  const stockBajo = productos.filter((p) => p.stock < 10).length;
  const stockBajoElement = document.getElementById("stock-bajo");
  if (stockBajoElement) stockBajoElement.textContent = stockBajo;

  // Actualizar lista de stock bajo
  actualizarListaStockBajo();
}

// Actualizar lista de productos con stock bajo
function actualizarListaStockBajo() {
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
                <button class="btn-icon" onclick="abrirModalProducto(${producto.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("");
}

// Cargar datos cuando se muestra la vista de productos
function cargarDatosVista(vista) {
  if (vista === "productos") {
    cargarProductos();
  }
}

// Estilos adicionales para productos
const style = document.createElement("style");
style.textContent = `
    .badge-category {
        background: var(--gray-100);
        color: var(--gray-700);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .price {
        font-weight: 600;
        color: var(--primary);
    }
    
    .stock-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .stock-badge {
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        font-weight: 600;
    }
    
    .stock-low {
        background: rgba(239, 68, 68, 0.1);
        color: var(--danger);
    }
    
    .stock-medium {
        background: rgba(245, 158, 11, 0.1);
        color: var(--warning);
    }
    
    .stock-high {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
    }
    
    .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
        display: inline-block;
    }
    
    .status-active {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
    }
    
    .status-inactive {
        background: rgba(239, 68, 68, 0.1);
        color: var(--danger);
    }
    
    .text-center {
        text-align: center;
    }
    
    .empty-state {
        padding: 2rem;
        text-align: center;
        color: var(--gray-400);
    }
    
    .empty-state i {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .text-warning {
        color: var(--warning);
    }
`;
document.head.appendChild(style);

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Configurar búsqueda en tiempo real
  const searchInput = document.getElementById("search-producto");
  if (searchInput) {
    searchInput.addEventListener("input", filtrarProductos);
  }

  // Configurar filtros
  const filterCategoria = document.getElementById("filter-categoria");
  const filterStock = document.getElementById("filter-stock");
  const precioMin = document.getElementById("precio-min");
  const precioMax = document.getElementById("precio-max");

  if (filterCategoria)
    filterCategoria.addEventListener("change", filtrarProductos);
  if (filterStock) filterStock.addEventListener("change", filtrarProductos);
  if (precioMin) precioMin.addEventListener("input", filtrarProductos);
  if (precioMax) precioMax.addEventListener("input", filtrarProductos);

  // Si estamos en la vista de productos, cargarlos
  if (document.getElementById("productos").classList.contains("activa")) {
    cargarProductos();
  }
});
