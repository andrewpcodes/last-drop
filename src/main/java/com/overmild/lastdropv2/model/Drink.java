package com.overmild.lastdropv2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "drinks")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"imageUris", "ingredients", "instructions"})
@ToString(exclude = {"imageUris", "ingredients", "instructions"})
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String name;

    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> imageUris;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "drink")
    private Set<Ingredient> ingredients;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "drink")
    private Set<Instruction> instructions;
}
