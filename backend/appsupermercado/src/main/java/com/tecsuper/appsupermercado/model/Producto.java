package com.tecsuper.appsupermercado.model;

import java.time.LocalDateTime;

import com.tecsuper.appsupermercado.enums.EstadoProducto;

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
@Table(name = "producto")
public class Producto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "nombre")
  private String nombre;
  @Column(name = "categoria")
  private String categoria;
  @Column(name = "precio")
  private Double precio;
  @Column(name = "stock")
  private Integer stock;
  private EstadoProducto estado;
  @Column(name = "fecha_creacion")
  private LocalDateTime creadoEn;
  @Column(name = "fecha_actualizacion")
  private LocalDateTime actualizadoEn;

  @PrePersist
  protected void onCreate() {
    creadoEn = LocalDateTime.now();
    actualizadoEn = LocalDateTime.now();
    estado = EstadoProducto.DISPONIBLE;
  }

  @PreUpdate
  protected void onUpdate() {
    actualizadoEn = LocalDateTime.now();
  }

  public void agotado() {
    this.estado = EstadoProducto.AGOTADO;
  }

  public void disponible() {
    this.estado = EstadoProducto.DISPONIBLE;
  }

  public void descontinuado() {
    this.estado = EstadoProducto.DESCONTINUADO;
  }
}
