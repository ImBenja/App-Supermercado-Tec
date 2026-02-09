package com.tecsuper.appsupermercado.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecsuper.appsupermercado.dto.ProductoDTO;
import com.tecsuper.appsupermercado.service.IProductoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
  @Autowired
  private IProductoService productoService;

  @GetMapping
  public ResponseEntity<List<ProductoDTO>> getProductos() {
    return ResponseEntity.ok(productoService.getProductos());
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<ProductoDTO> getProductoByID(@PathVariable Long id) {
    return ResponseEntity.ok(productoService.getProductoById(id));
  }

  @GetMapping("/nombre/{nombre}")
  public ResponseEntity<List<ProductoDTO>> getProductosByNombre(@PathVariable String nombre) {
    if (nombre == null || nombre.isBlank()) {
      return ResponseEntity.badRequest().build();
    }
    if (!nombre.equals(productoService.getProductosFindByName(nombre).stream().findFirst().orElseThrow().getNombre())) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(productoService.getProductosFindByName(nombre));
  }

  @GetMapping("/categoria/{categoria}")
  public ResponseEntity<List<ProductoDTO>> getProductosByCategoria(@PathVariable String categoria) {
    return ResponseEntity.ok(productoService.getProductosFindByCategoria(categoria));
  }

  @GetMapping("/precio/{precio}")
  public ResponseEntity<List<ProductoDTO>> getProductosByPrecio(@PathVariable Double precio) {
    return ResponseEntity.ok(productoService.getProductosFindByPrecio(precio));
  }

  @PostMapping
  public ResponseEntity<ProductoDTO> createProducto(@RequestBody ProductoDTO productoDTO) {
    ProductoDTO creado = productoService.createProducto(productoDTO);

    return ResponseEntity.created(URI.create("/api/productos" + creado.getId())).body(creado);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductoDTO> updateProducto(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
    return ResponseEntity.ok(productoService.updateProducto(id, productoDTO));
  }

  @PutMapping("/habilitar/{id}")
  public ResponseEntity<ProductoDTO> enableProducto(@PathVariable Long id) {
    return ResponseEntity.ok(productoService.enableProducto(id));
  }

  @PutMapping("/deshabilitar/{id}")
  public ResponseEntity<ProductoDTO> disableProducto(@PathVariable Long id) {
    return ResponseEntity.ok(productoService.disableProducto(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ProductoDTO> deleteProducto(@PathVariable Long id) {
    ProductoDTO productoEliminado = productoService.deleteProducto(id);
    if (productoEliminado == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(productoEliminado);
  }

}
