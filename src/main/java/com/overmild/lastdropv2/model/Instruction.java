package com.overmild.lastdropv2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "instructions")
public class Instruction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="drink_id", nullable=false)
    private Drink drink;

    @NotBlank
    private String instruction;

    @NotNull
    private Integer stepNumber;

    private String imageUri;
}
