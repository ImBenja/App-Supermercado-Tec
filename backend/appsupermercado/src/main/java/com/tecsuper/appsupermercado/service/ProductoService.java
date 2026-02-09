package com.tecsuper.appsupermercado.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tecsuper.appsupermercado.dto.ProductoDTO;
import com.tecsuper.appsupermercado.enums.EstadoProducto;
import com.tecsuper.appsupermercado.exception.NotFoundException;
import com.tecsuper.appsupermercado.exception.IllegalArgumentException;
import com.tecsuper.appsupermercado.mapper.Mapper;
import com.tecsuper.appsupermercado.model.Producto;
import com.tecsuper.appsupermercado.repository.ProductoRepository;

@Service
public class ProductoService implements IProductoService {
  @Autowired
  private ProductoRepository productoRepository;

  @Override
  public ProductoDTO createProducto(ProductoDTO productoDTO) {
    validateProductoDTO(productoDTO);
    Producto producto = Mapper.toEntity(productoDTO);

    return Mapper.toDTO(productoRepository.save(producto));
  }

  @Override
  public ProductoDTO getProductoById(Long id) {
    Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Producto con ID " + id + " no fue encontrado."));
    return Mapper.toDTO(producto);
  }

  @Override
  public ProductoDTO deleteProducto(Long id) {
    Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Producto con ID " + id + " no fue encontrado."));
    if (producto.getEstado() == EstadoProducto.DESCONTINUADO) {
      throw new IllegalArgumentException("El producto con ID " + id + " ya esta descontinuado.");
    }
    producto.descontinuado();
    return Mapper.toDTO(productoRepository.save(producto));
  }

  @Override
  public List<ProductoDTO> getProductos() {
    return productoRepository.findAll().stream().map(Mapper::toDTO).toList();
  }

  @Override
  public List<ProductoDTO> getProductosFindByCategoria(String categoria) {
    if (categoria == null || categoria.isBlank()) {
      throw new IllegalArgumentException("La Categoria no puede ser nula ni estar Vacia");
    }
    List<ProductoDTO> pCategorias = productoRepository.findAll().stream()
        .filter(p -> p.getCategoria() != null && p.getCategoria().equalsIgnoreCase(categoria))
        .map(Mapper::toDTO)
        .toList();
    if (pCategorias.isEmpty()) {
      throw new NotFoundException("No se encontro la Categoria: " + categoria.toUpperCase());
    }
    return pCategorias;
  }

  @Override
  public List<ProductoDTO> getProductosFindByName(String nombre) {
    if (nombre == null || nombre.isBlank()) {
      throw new IllegalArgumentException("El Nombre no puede ser nulo ni estar Vacio");
    }
    List<ProductoDTO> pNombres = productoRepository.findAll().stream()
        .filter(p -> p.getNombre() != null && p.getNombre().equalsIgnoreCase(nombre))
        .map(Mapper::toDTO)
        .toList();
    if (pNombres.isEmpty()) {
      throw new NotFoundException("No se encontro el Nombre: " + nombre.toUpperCase());
    }
    return pNombres;
  }

  @Override
  public List<ProductoDTO> getProductosFindByPrecio(Double precio) {
    if (precio == null || precio == 0) {
      throw new IllegalArgumentException("El Precio no puede ser nulo ni ser 0");
    }
    List<ProductoDTO> pPrecios = productoRepository.findAll().stream()
        .filter(p -> p.getPrecio() != null && p.getPrecio() == precio)
        .map(Mapper::toDTO)
        .toList();
    if (pPrecios.isEmpty()) {
      throw new NotFoundException("No se encontro el Precio: $" + precio);
    }
    return pPrecios;
  }

  @Override
  public ProductoDTO updateProducto(Long id, ProductoDTO productoDTO) {
    validateProductoDTO(productoDTO);
    if (id == null) {
      throw new NotFoundException("La ID " + id + " no existe");
    }
    Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Producto con ID " + id + " no encontrado"));

    producto.setNombre(productoDTO.getNombre());
    producto.setCategoria(productoDTO.getCategoria());
    producto.setPrecio(productoDTO.getPrecio());
    producto.setStock(productoDTO.getStock());
    return Mapper.toDTO(productoRepository.save(producto));
  }

  private void validateProductoDTO(ProductoDTO productoDTO) {
    if (productoDTO == null) {
      throw new IllegalArgumentException("El producto no puede ser nulo");
    }
  }

  @Override
  public ProductoDTO disableProducto(Long id) {
    Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Producto con ID " + id + " no fue encontrado."));
    if (producto.getEstado() == EstadoProducto.AGOTADO) {
      throw new IllegalArgumentException("El producto con ID " + id + " ya esta agotado.");
    }
    if (producto.getEstado() == EstadoProducto.DESCONTINUADO) {
      throw new IllegalArgumentException(
          "El producto con ID " + id + " se encuentra descontinuado y no puede ser deshabilitado.");
    }
    producto.agotado();
    return Mapper.toDTO(productoRepository.save(producto));
  }

  @Override
  public ProductoDTO enableProducto(Long id) {
    Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Producto con ID " + id + " no fue encontrado."));
    if (producto.getEstado() == EstadoProducto.DISPONIBLE) {
      throw new IllegalArgumentException("El producto con ID " + id + " ya esta disponible.");
    }
    if (producto.getEstado() == EstadoProducto.DESCONTINUADO) {
      throw new IllegalArgumentException(
          "El producto con ID " + id + " se encuentra descontinuado y no puede ser habilitado.");
    }
    producto.disponible();
    return Mapper.toDTO(productoRepository.save(producto));
  }

}
