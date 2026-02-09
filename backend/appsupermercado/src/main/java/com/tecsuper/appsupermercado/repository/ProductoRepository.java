package com.tecsuper.appsupermercado.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tecsuper.appsupermercado.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
  List<Producto> findByNombre(String nombre);

  List<Producto> findByPrecio(Double precio);

  List<Producto> findByCategoria(String categoria);
}