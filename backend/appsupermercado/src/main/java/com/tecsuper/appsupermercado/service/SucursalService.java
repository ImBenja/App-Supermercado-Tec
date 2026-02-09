package com.tecsuper.appsupermercado.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tecsuper.appsupermercado.dto.SucursalDTO;
import com.tecsuper.appsupermercado.enums.EstadoSucursal;
import com.tecsuper.appsupermercado.exception.NotFoundException;
import com.tecsuper.appsupermercado.mapper.Mapper;
import com.tecsuper.appsupermercado.model.Sucursal;
import com.tecsuper.appsupermercado.repository.SucursalRepository;
import com.tecsuper.appsupermercado.exception.IllegalArgumentException;

@Service
public class SucursalService implements ISucursalService {
  @Autowired
  private SucursalRepository sucursalRepository;

  @Override
  public SucursalDTO createSucursal(SucursalDTO sucursalDTO) {
    validateSucursalDTO(sucursalDTO);
    Sucursal sucursal = Mapper.toEntity(sucursalDTO);
    return Mapper.toDTO(sucursalRepository.save(sucursal));
  }

  @Override
  public SucursalDTO getFindByID(Long id) {
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + id + " no fue encontrada."));
    return Mapper.toDTO(sucursal);
  }

  @Override
  public SucursalDTO deleteSucursal(Long id) {
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + id + " no fue encontrada."));
    if (sucursal.getEstado() == EstadoSucursal.ELIMINADA) {
      throw new IllegalArgumentException("La Sucursal con ID " + id + " ya fue eliminada.");
    }
    sucursal.eliminar();
    return Mapper.toDTO(sucursalRepository.save(sucursal));
  }

  @Override
  public List<SucursalDTO> getFindByDireccion(String direccion) {
    if (direccion == null || direccion.isBlank()) {
      throw new IllegalArgumentException("La direccion no puede ser nula ni estar Vacia");
    }
    List<SucursalDTO> sDirecciones = sucursalRepository.findAll().stream()
        .filter(s -> s.getDireccion() != null && s.getDireccion().equalsIgnoreCase(direccion))
        .map(Mapper::toDTO)
        .toList();
    if (sDirecciones.isEmpty()) {
      throw new NotFoundException("No se encontraron sucursales con la Direccion: " + direccion.toUpperCase());
    }
    return sDirecciones;
  }

  @Override
  public List<SucursalDTO> getFindByNombre(String nombre) {
    if (nombre == null || nombre.isBlank()) {
      throw new IllegalArgumentException(
          "El nombre no puede ser nulo ni estar Vacio.");
    }

    List<SucursalDTO> sucursales = sucursalRepository.findAll().stream()
        .filter(s -> s.getNombre() != null && s.getNombre().equalsIgnoreCase(nombre))
        .map(Mapper::toDTO)
        .toList();
    if (sucursales.isEmpty()) {
      throw new NotFoundException("No se encontraron sucursales con el Nombre: " + nombre.toUpperCase());
    }
    return sucursales;
  }

  @Override
  public List<SucursalDTO> getSucursales() {
    return sucursalRepository.findAll().stream().map(Mapper::toDTO).toList();
  }

  @Override
  public SucursalDTO updateSucursal(Long id, SucursalDTO sucursalDTO) {
    validateSucursalDTO(sucursalDTO);
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + id + " no fue encontrada."));

    sucursal.setNombre(sucursalDTO.getNombre());
    sucursal.setDireccion(sucursalDTO.getDireccion());
    sucursal.setTelefono(sucursalDTO.getTelefono());
    return Mapper.toDTO(sucursalRepository.save(sucursal));
  }

  private void validateSucursalDTO(SucursalDTO sucursalDTO) {
    if (sucursalDTO == null) {
      throw new IllegalArgumentException("La sucursal no puede estar null");
    }
  }

  @Override
  public SucursalDTO disableSucursal(Long id) {
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + id + " no fue encontrada."));
    if (sucursal.getEstado() == EstadoSucursal.EN_MANTENIMIENTO) {
      throw new IllegalArgumentException("La Sucursal con ID " + id + " ya está en mantenimiento.");
    }
    if (sucursal.getEstado() == EstadoSucursal.ELIMINADA) {
      throw new IllegalArgumentException(
          "La Sucursal con ID " + id + " fue eliminada y no puede ser puesta en mantenimiento.");
    }
    sucursal.ponerEnMantenimiento();
    return Mapper.toDTO(sucursalRepository.save(sucursal));
  }

  @Override
  public SucursalDTO enableSucursal(Long id) {
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + id + " no fue encontrada."));
    if (sucursal.getEstado() == EstadoSucursal.DISPONIBLE) {
      throw new IllegalArgumentException("La Sucursal con ID " + id + " ya está disponible.");
    }
    if (sucursal.getEstado() == EstadoSucursal.ELIMINADA) {
      throw new IllegalArgumentException("La Sucursal con ID " + id + " fue eliminada y no puede ser habilitada.");
    }
    sucursal.habilitar();
    return Mapper.toDTO(sucursalRepository.save(sucursal));
  }

}
