package com.tecsuper.appsupermercado.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.tecsuper.appsupermercado.enums.EstadoVenta;

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
public class VentaDTO {
  private Long id;
  private LocalDate fecha;
  private String estadoVenta;
  private Long sucursalId;
  private List<DetalleVentaDTO> detalle;
  private Double total;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
