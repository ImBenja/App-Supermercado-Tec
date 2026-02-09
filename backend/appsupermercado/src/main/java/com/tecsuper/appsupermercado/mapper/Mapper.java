package com.tecsuper.appsupermercado.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.tecsuper.appsupermercado.dto.DetalleVentaDTO;
import com.tecsuper.appsupermercado.dto.ProductoDTO;
import com.tecsuper.appsupermercado.dto.SucursalDTO;
import com.tecsuper.appsupermercado.dto.VentaDTO;
import com.tecsuper.appsupermercado.enums.EstadoVenta;
import com.tecsuper.appsupermercado.exception.NotFoundException;
import com.tecsuper.appsupermercado.model.DetalleVenta;
import com.tecsuper.appsupermercado.model.Producto;
import com.tecsuper.appsupermercado.model.Sucursal;
import com.tecsuper.appsupermercado.model.Venta;
import com.tecsuper.appsupermercado.repository.ProductoRepository;

@Component
public class Mapper {

  // MAPEO DE PRODUCTO A PRODUCTO DTO
  public static ProductoDTO toDTO(Producto producto) {
    if (producto == null)
      return null;

    return ProductoDTO.builder()
        .id(producto.getId())
        .nombre(producto.getNombre())
        .categoria(producto.getCategoria())
        .precio(producto.getPrecio())
        .stock(producto.getStock())
        .estado(String.valueOf(producto.getEstado()))
        .createdAt(producto.getCreadoEn())
        .updatedAt(producto.getActualizadoEn())
        .build();
  }

  // MAPEO DE PRODUCTO DTO A PRODUCTO
  public static Producto toEntity(ProductoDTO productoDTO) {
    if (productoDTO == null)
      return null;

    return Producto.builder()
        .id(productoDTO.getId())
        .nombre(productoDTO.getNombre())
        .categoria(productoDTO.getCategoria())
        .precio(productoDTO.getPrecio())
        .stock(productoDTO.getStock())
        .build();
  }

  // MAPEO DE SUCURSAL A SUCURSAL DTO
  public static SucursalDTO toDTO(Sucursal sucursal) {
    if (sucursal == null)
      return null;

    return SucursalDTO.builder()
        .id(sucursal.getId())
        .nombre(sucursal.getNombre())
        .direccion(sucursal.getDireccion())
        .telefono(sucursal.getTelefono())
        .estado(String.valueOf(sucursal.getEstado()))
        .createdAt(sucursal.getCreadoEn())
        .updatedAt(sucursal.getActualizadoEn())
        .build();
  }

  // MAPEO DE SUCURSAL DTO A SUCURSAL
  public static Sucursal toEntity(SucursalDTO sucursalDTO) {
    if (sucursalDTO == null)
      return null;

    return Sucursal.builder()
        .id(sucursalDTO.getId())
        .nombre(sucursalDTO.getNombre())
        .direccion(sucursalDTO.getDireccion())
        .telefono(sucursalDTO.getTelefono())
        .build();
  }

  // MAPEO DE VENTA A VENTA DTO
  public static VentaDTO toDTO(Venta venta) {
    if (venta == null)
      return null;

    List<DetalleVentaDTO> detalle = venta.getDetalle() != null ? venta.getDetalle().stream()
        .map(det -> DetalleVentaDTO.builder()
            .id(det.getId())
            .productoId(det.getProducto().getId())
            .productoNombre(det.getProducto().getNombre())
            .cantidad(det.getCantidad())
            .precioUnitario(det.getProducto().getPrecio())
            .subtotal(det.getProducto().getPrecio() * det.getCantidad())
            .createdAt(det.getCreadoEn())
            .updatedAt(det.getActualizadoEn())
            .build())
        .collect(Collectors.toList()) : new ArrayList<>();

    return VentaDTO.builder()
        .id(venta.getId())
        .estadoVenta(String.valueOf(venta.getEstadoVenta()))
        .fecha(venta.getFecha())
        .sucursalId(venta.getSucursal().getId())
        .detalle(detalle)
        .total(detalle.stream().mapToDouble(DetalleVentaDTO::getSubtotal).sum())
        .createdAt(venta.getCreadoEn())
        .updatedAt(venta.getActualizadoEn())
        .build();
  }

  // MAPEO DE VENTA DTO A VENTA
  public static Venta toEntity(VentaDTO ventaDTO, Sucursal sucursalCompleta, ProductoRepository productoRepository) {
    if (ventaDTO == null)
      return null;

    if (sucursalCompleta == null)
      throw new NotFoundException("La sucursal no puede ser nula.");

    Venta venta = Venta.builder()
        .id(ventaDTO.getId())
        .estadoVenta(EstadoVenta.REGISTRADA)
        .fecha(ventaDTO.getFecha())
        .sucursal(sucursalCompleta)
        .build();

    if (ventaDTO.getDetalle() != null) {
      List<DetalleVenta> detalle = ventaDTO.getDetalle().stream()
          .map(det -> {
            Producto productoCompleto = productoRepository.findById(det.getProductoId())
                .orElseThrow(
                    () -> new NotFoundException("El producto con ID " + det.getProductoId() + " no fue encontrado."));

            return DetalleVenta.builder()
                .id(det.getId())
                .producto(productoCompleto)
                .cantidad(det.getCantidad())
                .precioUnitario(productoCompleto.getPrecio())
                .subtotal(productoCompleto.getPrecio() * det.getCantidad())
                .venta(venta)
                .build();
          })
          .collect(Collectors.toList());
      venta.setDetalle(detalle);
      venta.setTotal(detalle.stream().mapToDouble(DetalleVenta::getSubtotal).sum());

    }
    // Control de stock
    venta.controlDeStock();

    return venta;
  }
}
