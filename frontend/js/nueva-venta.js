// Variables globales para nueva venta
let productosParaVenta = [];
let sucursalesParaVenta = [];
let carrito = [];
let sucursalSeleccionada = null;

// Función para inicializar nueva venta
async function inicializarNuevaVenta() {
  try {
    // Cargar productos y sucursales
    [productosParaVenta, sucursalesParaVenta] = await Promise.all([
      api.getProductos(),
      api.getSucursales(),
    ]);

    // Renderizar productos disponibles
    renderProductosDisponibles();

    // Cargar select de sucursales
    cargarSelectSucursales();

    // Establecer fecha actual
    const fechaInput = document.getElementById("venta-fecha");
    if (fechaInput) {
      fechaInput.value = new Date().toISOString().split("T")[0];
    }

    // Inicializar carrito vacío
    carrito = [];
    renderCarrito();
    actualizarTotales();

    showToast("success", "Listo", "Sistema de ventas cargado correctamente");
  } catch (error) {
    showToast(
      "error",
      "Error",
      "No se pudieron cargar los datos para la venta",
    );
  }
}

// Renderizar productos disponibles
function renderProductosDisponibles(productosFiltrados = null) {
  const grid = document.getElementById("productos-venta");
  if (!grid) return;

  const productosMostrar = productosFiltrados || productosParaVenta;

  if (productosMostrar.length === 0) {
    grid.innerHTML = `
            <div class="empty-products">
                <i class="fas fa-box-open"></i>
                <p>No hay productos disponibles</p>
            </div>
        `;
    return;
  }

  grid.innerHTML = productosMostrar
    .map((producto) => {
      const enCarrito = carrito.find(
        (item) => item.producto.id === producto.id,
      );
      const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
      const stockDisponible = producto.stock - cantidadEnCarrito;

      return `
            <div class="product-card ${stockDisponible <= 0 ? "disabled" : ""}">
                <div class="product-header">
                    <h4>${producto.nombre}</h4>
                    <span class="product-category">${producto.categoria}</span>
                </div>
                
                <div class="product-price">
                    $${producto.precio?.toFixed(2) || "0.00"}
                </div>
                
                <div class="product-stock">
                    <i class="fas fa-cubes"></i>
                    <span>Stock: ${stockDisponible}</span>
                </div>
                
                <div class="product-actions">
                    ${
                      stockDisponible > 0
                        ? `
                        <div class="quantity-controls">
                            <button class="btn-icon" onclick="disminuirCantidad(${producto.id})" 
                                    ${cantidadEnCarrito <= 0 ? "disabled" : ""}>
                                <i class="fas fa-minus"></i>
                            </button>
                            
                            <span class="quantity">${cantidadEnCarrito}</span>
                            
                            <button class="btn-icon" onclick="aumentarCantidad(${producto.id})"
                                    ${stockDisponible <= 0 ? "disabled" : ""}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                        <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${producto.id})"
                                ${stockDisponible <= 0 ? "disabled" : ""}>
                            <i class="fas fa-cart-plus"></i> Agregar
                        </button>
                    `
                        : `
                        <span class="text-danger">Agotado</span>
                    `
                    }
                </div>
            </div>
        `;
    })
    .join("");
}

// Cargar select de sucursales
function cargarSelectSucursales() {
  const select = document.getElementById("venta-sucursal");
  if (!select || sucursalesParaVenta.length === 0) return;

  select.innerHTML = '<option value="">Seleccionar sucursal...</option>';
  sucursalesParaVenta.forEach((sucursal) => {
    select.innerHTML += `<option value="${sucursal.id}">${sucursal.nombre}</option>`;
  });

  // Agregar evento de cambio
  select.addEventListener("change", function () {
    if (this.value) {
      sucursalSeleccionada = parseInt(this.value); // Convertir a número
    } else {
      sucursalSeleccionada = null;
    }
  });
}

// Buscar productos
function buscarProductosVenta() {
  const searchTerm =
    document.getElementById("search-venta")?.value.toLowerCase() || "";

  if (!searchTerm) {
    renderProductosDisponibles();
    return;
  }

  const productosFiltrados = productosParaVenta.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm) ||
      producto.categoria.toLowerCase().includes(searchTerm),
  );

  renderProductosDisponibles(productosFiltrados);
}

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
  const producto = productosParaVenta.find((p) => p.id === productoId);
  if (!producto) return;

  const itemEnCarrito = carrito.find((item) => item.producto.id === productoId);

  if (itemEnCarrito) {
    // Verificar stock disponible
    const stockDisponible = producto.stock - itemEnCarrito.cantidad;
    if (stockDisponible > 0) {
      itemEnCarrito.cantidad++;
    } else {
      showToast(
        "warning",
        "Stock insuficiente",
        "No hay suficiente stock disponible",
      );
      return;
    }
  } else {
    // Verificar stock
    if (producto.stock > 0) {
      carrito.push({
        producto: producto,
        cantidad: 1,
        precioUnitario: producto.precio,
      });
    } else {
      showToast("warning", "Stock insuficiente", "Producto agotado");
      return;
    }
  }

  renderCarrito();
  renderProductosDisponibles();
  actualizarTotales();
  showToast("success", "Carrito", "Producto agregado al carrito");
}

// Aumentar cantidad de un producto
function aumentarCantidad(productoId) {
  const item = carrito.find((item) => item.producto.id === productoId);
  const producto = productosParaVenta.find((p) => p.id === productoId);

  if (item && producto) {
    const stockDisponible = producto.stock - item.cantidad;
    if (stockDisponible > 0) {
      item.cantidad++;
      renderCarrito();
      renderProductosDisponibles();
      actualizarTotales();
    } else {
      showToast(
        "warning",
        "Stock insuficiente",
        "No hay más unidades disponibles",
      );
    }
  }
}

// Disminuir cantidad de un producto
function disminuirCantidad(productoId) {
  const itemIndex = carrito.findIndex(
    (item) => item.producto.id === productoId,
  );

  if (itemIndex !== -1) {
    const item = carrito[itemIndex];

    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      carrito.splice(itemIndex, 1);
    }

    renderCarrito();
    renderProductosDisponibles();
    actualizarTotales();
  }
}

// Remover producto del carrito
function removerDelCarrito(productoId) {
  const itemIndex = carrito.findIndex(
    (item) => item.producto.id === productoId,
  );

  if (itemIndex !== -1) {
    carrito.splice(itemIndex, 1);
    renderCarrito();
    renderProductosDisponibles();
    actualizarTotales();
    showToast("info", "Carrito", "Producto removido del carrito");
  }
}

// Renderizar carrito
function renderCarrito() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  if (carrito.length === 0) {
    container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>El carrito está vacío</p>
                <p class="text-muted">Agrega productos para continuar</p>
            </div>
        `;
    return;
  }

  container.innerHTML = carrito
    .map((item) => {
      const subtotal = item.cantidad * item.precioUnitario;

      return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.producto.nombre}</h4>
                    <div class="cart-item-details">
                        <span>${item.cantidad} x $${item.precioUnitario.toFixed(2)}</span>
                        <span class="cart-item-subtotal">$${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="btn-icon" onclick="disminuirCantidad(${item.producto.id})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.cantidad}</span>
                        <button class="btn-icon" onclick="aumentarCantidad(${item.producto.id})"
                                ${item.producto.stock <= item.cantidad ? "disabled" : ""}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <button class="btn-icon text-danger" onclick="removerDelCarrito(${item.producto.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    })
    .join("");
}

// Actualizar totales
function actualizarTotales() {
  const subtotal = carrito.reduce(
    (sum, item) => sum + item.cantidad * item.precioUnitario,
    0,
  );

  // Por ahora solo subtotal, podrías agregar impuestos, descuentos, etc.
  const total = subtotal;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total-venta").textContent = total.toFixed(2);
}

// Limpiar carrito
function limpiarCarrito() {
  if (carrito.length === 0) return;

  if (
    !confirm(
      "¿Estás seguro de vaciar el carrito? Esta acción no se puede deshacer.",
    )
  ) {
    return;
  }

  carrito = [];
  renderCarrito();
  renderProductosDisponibles();
  actualizarTotales();
  showToast("info", "Carrito", "Carrito vaciado");
}

// Finalizar venta
async function finalizarVenta() {
  // Validaciones
  const sucursalSelect = document.getElementById("venta-sucursal");
  const fechaInput = document.getElementById("venta-fecha");

  if (!sucursalSelect || !sucursalSelect.value) {
    showToast("error", "Validación", "Selecciona una sucursal");
    sucursalSelect?.focus();
    return;
  }

  if (carrito.length === 0) {
    showToast("error", "Validación", "El carrito está vacío");
    return;
  }

  if (!fechaInput || !fechaInput.value) {
    showToast("error", "Validación", "Selecciona una fecha");
    return;
  }

  // Verificar stock disponible
  const erroresStock = [];
  carrito.forEach((item) => {
    const producto = productosParaVenta.find((p) => p.id === item.producto.id);
    if (producto && item.cantidad > producto.stock) {
      erroresStock.push(`${producto.nombre} (Stock: ${producto.stock})`);
    }
  });

  if (erroresStock.length > 0) {
    showToast(
      "error",
      "Stock insuficiente",
      `Los siguientes productos no tienen suficiente stock: ${erroresStock.join(", ")}`,
    );
    return;
  }

  // Preparar datos de la venta - **ESTA ES LA PARTE IMPORTANTE**
  const ventaData = {
    fecha: fechaInput.value,
    sucursalID: parseInt(sucursalSelect.value), // ← Convertir explícitamente a número
    total: parseFloat(document.getElementById("total-venta").textContent),
    detalle: carrito.map((item) => ({
      productoID: item.producto.id,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      subtotal: item.cantidad * item.precioUnitario,
    })),
  };

  console.log("Datos a enviar a la API:", ventaData); // Para debug

  try {
    // Crear la venta
    const ventaCreada = await api.createVenta(ventaData);

    showToast(
      "success",
      "Éxito",
      `Venta #${ventaCreada.id} creada correctamente`,
    );

    // Mostrar resumen
    mostrarResumenVenta(ventaCreada);

    // Limpiar carrito y recargar datos
    carrito = [];
    renderCarrito();
    actualizarTotales();

    // Recargar productos para actualizar stock
    await inicializarNuevaVenta();
  } catch (error) {
    console.error("Error completo creando venta:", error);

    // Mostrar mensaje de error más específico
    if (error.message.includes("400")) {
      showToast(
        "error",
        "Error de validación",
        "Revise los datos de la venta (sucursal ID, productos, etc.)",
      );
    } else {
      showToast(
        "error",
        "Error",
        "No se pudo crear la venta: " + error.message,
      );
    }
  }
}

// Mostrar resumen de venta creada
function mostrarResumenVenta(venta) {
  const modal = document.createElement("div");
  modal.id = "modalResumenVenta";
  modal.className = "modal";

  const detallesHTML =
    venta.detalle
      ?.map(
        (detalle) => `
        <div class="detalle-producto">
            <span>${detalle.productoNombre || "Producto"}</span>
            <span>${detalle.cantidad} x $${detalle.precioUnitario?.toFixed(2)}</span>
            <span class="detalle-subtotal">$${detalle.subtotal?.toFixed(2)}</span>
        </div>
    `,
      )
      .join("") || "";

  modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3><i class="fas fa-check-circle text-success"></i> Venta Completada</h3>
                <button class="modal-close" onclick="cerrarModal('modalResumenVenta')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="resumen-header">
                    <h4>Venta #${venta.id} - ${venta.fecha}</h4>
                    <p>Sucursal: ${sucursalSeleccionada.nombre}</p>
                </div>
                
                <div class="resumen-detalles">
                    <h5>Productos:</h5>
                    ${detallesHTML}
                </div>
                
                <div class="resumen-total">
                    <h3>TOTAL: $${venta.total?.toFixed(2)}</h3>
                </div>
                
                <div class="resumen-acciones">
                    <button class="btn btn-secondary" onclick="cerrarModal('modalResumenVenta')">
                        Continuar
                    </button>
                    <button class="btn btn-primary" onclick="imprimirTicket(${venta.id})">
                        <i class="fas fa-print"></i> Imprimir Ticket
                    </button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  modal.classList.add("active");
}

// Imprimir ticket (simulado)
function imprimirTicket(ventaId) {
  showToast(
    "info",
    "Impresión",
    `Ticket de venta #${ventaId} enviado a impresión`,
  );
  cerrarModal("modalResumenVenta");
}

// Cargar datos cuando se muestra la vista de nueva venta
function cargarDatosVista(vista) {
  if (vista === "nueva-venta") {
    inicializarNuevaVenta();
  }
}

// Estilos adicionales para nueva venta
const nuevaVentaStyle = document.createElement("style");
nuevaVentaStyle.textContent = `
    .sale-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
        padding: 1rem;
        background: var(--gray-50);
        border-radius: var(--radius);
    }
    
    .sale-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .sale-field label {
        font-weight: 600;
        color: var(--gray-700);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .sale-field select,
    .sale-field input {
        padding: 0.625rem;
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-sm);
        font-family: 'Inter', sans-serif;
    }
    
    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        max-height: 500px;
        overflow-y: auto;
        padding: 1rem;
    }
    
    .product-card {
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: var(--radius);
        padding: 1rem;
        transition: var(--transition);
    }
    
    .product-card:hover {
        border-color: var(--primary);
        box-shadow: var(--shadow);
    }
    
    .product-card.disabled {
        opacity: 0.6;
        pointer-events: none;
    }
    
    .product-header {
        margin-bottom: 0.75rem;
    }
    
    .product-header h4 {
        color: var(--gray-800);
        margin: 0;
        font-size: 1rem;
    }
    
    .product-category {
        display: inline-block;
        background: var(--gray-100);
        color: var(--gray-600);
        padding: 0.125rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        margin-top: 0.25rem;
    }
    
    .product-price {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .product-stock {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--gray-600);
        margin-bottom: 1rem;
    }
    
    .product-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-controls .btn-icon {
        width: 2rem;
        height: 2rem;
        background: var(--gray-100);
    }
    
    .quantity {
        min-width: 2rem;
        text-align: center;
        font-weight: 600;
    }
    
    .btn-sm {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .cart-item:last-child {
        border-bottom: none;
    }
    
    .cart-item-info {
        flex: 1;
    }
    
    .cart-item-info h4 {
        margin: 0;
        color: var(--gray-800);
        font-size: 1rem;
    }
    
    .cart-item-details {
        display: flex;
        justify-content: space-between;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: var(--gray-600);
    }
    
    .cart-item-subtotal {
        font-weight: 600;
        color: var(--primary);
    }
    
    .cart-item-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .empty-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: var(--gray-400);
    }
    
    .empty-products i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .text-danger {
        color: var(--danger) !important;
    }
    
    .text-muted {
        color: var(--gray-500);
        font-size: 0.875rem;
    }
    
    .resumen-header {
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .resumen-header h4 {
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .resumen-detalles {
        margin-bottom: 1.5rem;
    }
    
    .resumen-detalles h5 {
        color: var(--gray-700);
        margin-bottom: 1rem;
    }
    
    .resumen-detalles .detalle-producto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--gray-100);
    }
    
    .resumen-total {
        text-align: center;
        background: var(--gray-50);
        padding: 1rem;
        border-radius: var(--radius);
        margin-bottom: 1.5rem;
    }
    
    .resumen-acciones {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
`;
document.head.appendChild(nuevaVentaStyle);

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Configurar búsqueda en nueva venta
  const searchInput = document.getElementById("search-venta");
  if (searchInput) {
    searchInput.addEventListener("input", buscarProductosVenta);
  }

  // Si estamos en la vista de nueva venta, inicializar
  if (document.getElementById("nueva-venta").classList.contains("activa")) {
    inicializarNuevaVenta();
  }
});
