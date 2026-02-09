package com.tecsuper.appsupermercado.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "detalle_venta")
public class DetalleVenta {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "cantidad")
  private Integer cantidad;
  @Column(name = "precio")
  private Double precioUnitario;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "venta_id")
  private Venta venta;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "producto_id")
  private Producto producto;
  @Column(name = "subtotal")
  private Double subtotal;
  @Column(name = "fecha_creacion")
  private LocalDateTime creadoEn;
  @Column(name = "fecha_actualizacion")
  private LocalDateTime actualizadoEn;

  @PrePersist
  protected void onCreate() {
    creadoEn = LocalDateTime.now();
    actualizadoEn = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    actualizadoEn = LocalDateTime.now();
  }

  public Double subTotal() {
    return precioUnitario * cantidad;
  }

  public void controlDeStock() {
    if (producto.getStock() < cantidad) {
      throw new IllegalArgumentException("No hay suficiente stock para el producto: " + producto.getNombre());
    }
    producto.setStock(producto.getStock() - cantidad);
  }
}
