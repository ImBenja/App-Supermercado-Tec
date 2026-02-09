package com.tecsuper.appsupermercado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tecsuper.appsupermercado.model.Sucursal;
import java.util.List;

@Repository
public interface SucursalRepository extends JpaRepository<Sucursal, Long> {
  List<Sucursal> findByNombre(String nombre);

  List<Sucursal> findByDireccion(String direccion);
}
