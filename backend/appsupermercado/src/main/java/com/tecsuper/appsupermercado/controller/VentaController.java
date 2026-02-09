package com.tecsuper.appsupermercado.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecsuper.appsupermercado.dto.VentaDTO;
import com.tecsuper.appsupermercado.enums.EstadoVenta;
import com.tecsuper.appsupermercado.service.IVentaService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {
  @Autowired
  private IVentaService ventaService;

  @GetMapping
  public ResponseEntity<List<VentaDTO>> getVentas() {
    return ResponseEntity.ok(ventaService.getVentas());
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<VentaDTO> getVentaByID(@PathVariable Long id) {
    return ResponseEntity.ok(ventaService.getVentaFindByID(id));
  }

  @GetMapping("/fecha/{fecha}")
  public ResponseEntity<List<VentaDTO>> getVentasByFecha(@PathVariable LocalDate fecha) {
    return ResponseEntity.ok(ventaService.getVentasFindByFecha(fecha));
  }

  @GetMapping("/estado/{estado}")
  public ResponseEntity<List<VentaDTO>> getVentasByEstado(@PathVariable EstadoVenta estado) {
    return ResponseEntity.ok(ventaService.getVentasFindByEstado(estado));
  }

  @GetMapping("/sucursal/{sucursalId}")
  public ResponseEntity<List<VentaDTO>> getVentasBySucursal(@PathVariable Long sucursalId) {
    return ResponseEntity.ok(ventaService.getVentasFindBySucursal(sucursalId));
  }

  @GetMapping(params = { "id", "fecha" })
  public ResponseEntity<List<VentaDTO>> getVentasBySucursalAndFecha(@RequestParam Long id,
      @RequestParam LocalDate fecha) {
    return ResponseEntity.ok(ventaService.getVentasFindBySucursalAndFecha(id, fecha));
  }

  @PostMapping
  public ResponseEntity<VentaDTO> createVenta(@RequestBody VentaDTO ventaDTO) {
    VentaDTO created = ventaService.createVenta(ventaDTO);
    return ResponseEntity.created(URI.create("/api/ventas" + created.getId())).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<VentaDTO> updateVenta(@PathVariable Long id, @RequestBody VentaDTO ventaDTO) {
    return ResponseEntity.ok(ventaService.updateVenta(id, ventaDTO));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<VentaDTO> anularVenta(@PathVariable Long id) {
    VentaDTO ventaAnulada = ventaService.anularVenta(id);
    return ResponseEntity.ok(ventaAnulada);
  }

}
