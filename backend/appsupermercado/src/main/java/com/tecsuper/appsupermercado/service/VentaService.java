package com.tecsuper.appsupermercado.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tecsuper.appsupermercado.dto.VentaDTO;
import com.tecsuper.appsupermercado.enums.EstadoVenta;
import com.tecsuper.appsupermercado.exception.NotFoundException;
import com.tecsuper.appsupermercado.exception.IllegalArgumentException;
import com.tecsuper.appsupermercado.mapper.Mapper;
import com.tecsuper.appsupermercado.model.Sucursal;
import com.tecsuper.appsupermercado.model.Venta;
import com.tecsuper.appsupermercado.repository.ProductoRepository;
import com.tecsuper.appsupermercado.repository.SucursalRepository;
import com.tecsuper.appsupermercado.repository.VentaRepository;

@Service
public class VentaService implements IVentaService {
  @Autowired
  private VentaRepository ventaRepository;

  @Autowired
  private SucursalRepository sucursalRepository;

  @Autowired
  private ProductoRepository productoRepository;

  @Override
  public VentaDTO anularVenta(Long id) {
    Venta venta = ventaRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La venta con ID " + id + " no fue encontrada."));

    if (venta.getEstadoVenta() == EstadoVenta.ANULADA) {
      throw new IllegalArgumentException("La venta con ID " + id + " ya está anulada.");
    }
    venta.anular();
    return Mapper.toDTO(ventaRepository.save(venta));
  }

  @Override
  public VentaDTO getVentaFindByID(Long id) {
    Venta venta = ventaRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La venta con ID " + id + " no fue encontrada."));
    return Mapper.toDTO(venta);
  }

  @Override
  public List<VentaDTO> getVentasFindBySucursal(Long id) {
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + id + "no fue encontrada."));
    return ventaRepository.findBySucursal(sucursal).stream().map(Mapper::toDTO).toList();
  }

  @Override
  public List<VentaDTO> getVentasFindBySucursalAndFecha(Long id, LocalDate fDate) {
    Sucursal sucursal = sucursalRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La sucursal con ID " + id + " no fue encontrada."));
    if (fDate == null) {
      throw new IllegalArgumentException("La fecha no puede ser nula.");
    }
    if (ventaRepository.findBySucursalAndFecha(sucursal, fDate).isEmpty()) {
      throw new NotFoundException("No se encontraron ventas para la sucursal con ID " + id + " en la fecha " + fDate);
    }
    return ventaRepository.findBySucursalAndFecha(sucursal, fDate).stream().map(Mapper::toDTO).toList();
  }

  @Override
  public VentaDTO createVenta(VentaDTO ventaDTO) {
    if (ventaDTO == null) {
      throw new IllegalArgumentException("El objeto VentaDTO no puede ser nulo.");
    }
    if (ventaDTO.getSucursalId() == null) {
      throw new IllegalArgumentException("El ID de la sucursal no puede ser nulo.");
    }
    if (ventaDTO.getDetalle() == null || ventaDTO.getDetalle().isEmpty()) {
      throw new IllegalArgumentException("La lista de productos no puede ser nula o vacía.");
    }

    Sucursal sucursal = sucursalRepository.findById(ventaDTO.getSucursalId())
        .orElseThrow(
            () -> new NotFoundException("La sucursal con ID " + ventaDTO.getSucursalId() + " no fue encontrada."));

    Venta venta = Mapper.toEntity(ventaDTO, sucursal, productoRepository);
    return Mapper.toDTO(ventaRepository.save(venta));
  }

  @Override
  public List<VentaDTO> getVentas() {
    return ventaRepository.findAll().stream().map(Mapper::toDTO).toList();
  }

  @Override
  public List<VentaDTO> getVentasFindByEstado(EstadoVenta estadoVenta) {
    if (estadoVenta == null) {
      throw new IllegalArgumentException("El estado de venta no puede ser nulo.");
    }
    List<VentaDTO> vEstados = ventaRepository.findAll().stream()
        .filter(v -> v.getEstadoVenta() == estadoVenta)
        .map(Mapper::toDTO)
        .toList();
    if (vEstados.isEmpty()) {
      throw new NotFoundException("No se encontraron ventas con el estado: " + estadoVenta);
    }
    return vEstados;
  }

  @Override
  public List<VentaDTO> getVentasFindByFecha(LocalDate fDate) {
    if (fDate == null) {
      throw new IllegalArgumentException("La fecha no puede ser nula.");
    }
    List<VentaDTO> vFechas = ventaRepository.findAll().stream()
        .filter(v -> v.getFecha().isEqual(fDate))
        .map(Mapper::toDTO)
        .toList();
    if (vFechas.isEmpty()) {
      throw new NotFoundException("No se encontraron ventas para la fecha: " + fDate);
    }
    return vFechas;
  }

  @Override
  public VentaDTO updateVenta(Long id, VentaDTO ventaDTO) {
    Venta venta = ventaRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("La venta con ID " + id + " no existe."));

    if (ventaDTO.getFecha() != null) {
      venta.setFecha(ventaDTO.getFecha());
    }

    if (ventaDTO.getSucursalId() != null) {
      Sucursal sucursal = sucursalRepository.findById(ventaDTO.getSucursalId())
          .orElseThrow(() -> new NotFoundException("La Sucursal con ID " + ventaDTO.getSucursalId() + " no existe."));
      venta.setSucursal(sucursal);
    }

    return Mapper.toDTO(ventaRepository.save(venta));
  }

}
