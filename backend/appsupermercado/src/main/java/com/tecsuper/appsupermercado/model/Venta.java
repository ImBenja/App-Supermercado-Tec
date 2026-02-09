package com.tecsuper.appsupermercado.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.tecsuper.appsupermercado.enums.EstadoVenta;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "venta")
public class Venta {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "fecha_venta")
  private LocalDate fecha;
  @Column(name = "estado_venta")
  private EstadoVenta estadoVenta;
  @Column(name = "total")
  private Double total;
  @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinColumn(name = "sucursal_id")
  private Sucursal sucursal;
  @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<DetalleVenta> detalle = new ArrayList<>();
  @Column(name = "fecha_creacion")
  private LocalDateTime creadoEn;
  @Column(name = "fecha_actualizacion")
  private LocalDateTime actualizadoEn;

  @PrePersist
  protected void onCreate() {
    creadoEn = LocalDateTime.now();
    actualizadoEn = LocalDateTime.now();
    estadoVenta = EstadoVenta.REGISTRADA;
  }

  @PreUpdate
  protected void onUpdate() {
    actualizadoEn = LocalDateTime.now();
  }

  public void anular() {
    this.estadoVenta = EstadoVenta.ANULADA;
  }

  public Double total() {
    return detalle.stream().mapToDouble(DetalleVenta::getSubtotal).sum();
  }

  public void controlDeStock() {
    for (DetalleVenta item : detalle) {
      item.controlDeStock();
    }
  }
}
