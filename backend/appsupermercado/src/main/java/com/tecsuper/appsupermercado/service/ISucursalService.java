package com.tecsuper.appsupermercado.service;

import java.util.List;

import com.tecsuper.appsupermercado.dto.SucursalDTO;

public interface ISucursalService {
  List<SucursalDTO> getSucursales();

  List<SucursalDTO> getFindByNombre(String nombre);

  List<SucursalDTO> getFindByDireccion(String direccion);

  SucursalDTO getFindByID(Long id);

  SucursalDTO createSucursal(SucursalDTO sucursalDTO);

  SucursalDTO deleteSucursal(Long id);

  SucursalDTO enableSucursal(Long id);

  SucursalDTO disableSucursal(Long id);

  SucursalDTO updateSucursal(Long id, SucursalDTO sucursalDTO);
}
