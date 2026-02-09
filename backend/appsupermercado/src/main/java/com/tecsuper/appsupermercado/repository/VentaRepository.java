package com.tecsuper.appsupermercado.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tecsuper.appsupermercado.model.Sucursal;
import com.tecsuper.appsupermercado.model.Venta;
import java.time.LocalDate;
import com.tecsuper.appsupermercado.enums.EstadoVenta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
  List<Venta> findByFecha(LocalDate fecha);

  List<Venta> findByEstadoVenta(EstadoVenta estadoVenta);

  List<Venta> findBySucursalAndFecha(Sucursal sucursal, LocalDate fDate);

  List<Venta> findBySucursal(Sucursal sucursal);
}
