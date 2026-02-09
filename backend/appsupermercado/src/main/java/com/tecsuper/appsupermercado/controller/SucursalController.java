package com.tecsuper.appsupermercado.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecsuper.appsupermercado.dto.SucursalDTO;
import com.tecsuper.appsupermercado.service.ISucursalService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/sucursales")
public class SucursalController {
  @Autowired
  private ISucursalService sucursalService;

  @GetMapping
  public ResponseEntity<List<SucursalDTO>> getSucursales() {
    return ResponseEntity.ok(sucursalService.getSucursales());
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<SucursalDTO> getSucursalByID(@PathVariable Long id) {
    return ResponseEntity.ok(sucursalService.getFindByID(id));
  }

  @GetMapping("/nombre/{nombre}")
  public ResponseEntity<List<SucursalDTO>> getSucursalesByNombre(@PathVariable String nombre) {
    return ResponseEntity.ok(sucursalService.getFindByNombre(nombre));
  }

  @GetMapping("/direccion/{direccion}")
  public ResponseEntity<List<SucursalDTO>> getSucursalesByDireccion(@PathVariable String direccion) {
    return ResponseEntity.ok(sucursalService.getFindByDireccion(direccion));
  }

  @PostMapping
  public ResponseEntity<SucursalDTO> createSucursal(@RequestBody SucursalDTO sucursalDTO) {
    SucursalDTO created = sucursalService.createSucursal(sucursalDTO);
    return ResponseEntity.created(URI.create("/api/sucursales" + created.getId())).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<SucursalDTO> updateSucursal(@PathVariable Long id, @RequestBody SucursalDTO sucursalDTO) {
    return ResponseEntity.ok(sucursalService.updateSucursal(id, sucursalDTO));
  }

  @PutMapping("/habilitar/{id}")
  public ResponseEntity<SucursalDTO> enableSucursal(@PathVariable Long id) {
    return ResponseEntity.ok(sucursalService.enableSucursal(id));
  }

  @PutMapping("/deshabilitar/{id}")
  public ResponseEntity<SucursalDTO> disableSucursal(@PathVariable Long id) {
    return ResponseEntity.ok(sucursalService.disableSucursal(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<SucursalDTO> deleteSucursal(@PathVariable Long id) {
    SucursalDTO sucursalEliminada = sucursalService.deleteSucursal(id);
    if (sucursalEliminada != null) {
      return ResponseEntity.ok(sucursalEliminada);
    }
    return ResponseEntity.notFound().build();
  }

}
