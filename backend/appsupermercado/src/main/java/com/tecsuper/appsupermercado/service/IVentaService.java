package com.tecsuper.appsupermercado.service;

import java.time.LocalDate;
import java.util.List;

import com.tecsuper.appsupermercado.dto.VentaDTO;
import com.tecsuper.appsupermercado.enums.EstadoVenta;

public interface IVentaService {
  List<VentaDTO> getVentas();

  List<VentaDTO> getVentasFindByFecha(LocalDate fDate);

  List<VentaDTO> getVentasFindByEstado(EstadoVenta estadoVenta);

  List<VentaDTO> getVentasFindBySucursalAndFecha(Long id, LocalDate fDate);

  List<VentaDTO> getVentasFindBySucursal(Long id);

  VentaDTO getVentaFindByID(Long id);

  VentaDTO createVenta(VentaDTO ventaDTO);

  VentaDTO updateVenta(Long id, VentaDTO ventaDTO);

  VentaDTO anularVenta(Long id);
}
