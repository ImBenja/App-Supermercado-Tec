package com.tecsuper.appsupermercado.dto;

import java.time.LocalDateTime;

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
public class DetalleVentaDTO {
  private Long id;
  private Long productoId;
  private String productoNombre;
  private Integer cantidad;
  private Double precioUnitario;
  private Double subtotal;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
