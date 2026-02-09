package com.tecsuper.appsupermercado.service;

import java.util.List;

import com.tecsuper.appsupermercado.dto.ProductoDTO;

public interface IProductoService {
  List<ProductoDTO> getProductos();

  List<ProductoDTO> getProductosFindByName(String nombre);

  List<ProductoDTO> getProductosFindByPrecio(Double precio);

  List<ProductoDTO> getProductosFindByCategoria(String categoria);

  ProductoDTO getProductoById(Long id);

  ProductoDTO createProducto(ProductoDTO productoDTO);

  ProductoDTO updateProducto(Long id, ProductoDTO productoDTO);

  ProductoDTO deleteProducto(Long id);

  ProductoDTO enableProducto(Long id);

  ProductoDTO disableProducto(Long id);
}
