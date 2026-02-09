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
public class SucursalDTO {
  private Long id;
  private String nombre;
  private String direccion;
  private String telefono;
  private String estado;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
