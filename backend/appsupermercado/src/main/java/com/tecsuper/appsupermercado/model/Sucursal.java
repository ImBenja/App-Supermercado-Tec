package com.tecsuper.appsupermercado.model;

import java.time.LocalDateTime;

import com.tecsuper.appsupermercado.enums.EstadoSucursal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "sucursal")
public class Sucursal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "nombre")
  private String nombre;
  @Column(name = "direccion")
  private String direccion;
  @Column(name = "telefono")
  private String telefono;
  private EstadoSucursal estado;
  @Column(name = "fecha_creacion")
  private LocalDateTime creadoEn;
  @Column(name = "fecha_actualizacion")
  private LocalDateTime actualizadoEn;

  @PrePersist
  protected void onCreate() {
    creadoEn = LocalDateTime.now();
    actualizadoEn = LocalDateTime.now();
    estado = EstadoSucursal.DISPONIBLE;
  }

  @PreUpdate
  protected void onUpdate() {
    actualizadoEn = LocalDateTime.now();
  }

  public void eliminar() {
    this.estado = EstadoSucursal.ELIMINADA;
  }

  public void ponerEnMantenimiento() {
    this.estado = EstadoSucursal.EN_MANTENIMIENTO;
  }

  public void habilitar() {
    this.estado = EstadoSucursal.DISPONIBLE;
  }
}
