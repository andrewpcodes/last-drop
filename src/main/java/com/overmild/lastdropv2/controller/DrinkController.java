package com.overmild.lastdropv2.controller;

import com.overmild.lastdropv2.model.Drink;
import com.overmild.lastdropv2.service.DrinkService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@AllArgsConstructor
@RestController
public class DrinkController {

    DrinkService drinkService;

    @PreAuthorize("hasAuthority('SCOPE_read.drinks')")
    @GetMapping(path = "/drink", produces = "application/json")
    public ResponseEntity<Drink> getDrink(@RequestParam UUID id) {
        log.info("Received request for drink with ID: {}", id);

        try {
            Drink drink = drinkService.getDrinkById(id);
            return ResponseEntity.ok().body(drink);
        } catch (EntityNotFoundException e) {
            log.error("Drink not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Unexpected error retrieving drink with ID {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_create.drinks')")
    @PostMapping(path = "/drink", consumes = "application/json", produces = "application/json")
    public Drink createDrink(@RequestBody Drink drink) {
        log.info("Received request for drink: {}", drink.getName());
        return drinkService.createDrink(drink);
    }

    @PreAuthorize("hasAuthority('SCOPE_update.drinks')")
    @PostMapping(path = "/drink/update", consumes = "application/json", produces = "application/json")
    public Drink updateDrink(@RequestBody Drink drink) {
        log.info("Received request to update drink with ID: {}", drink.getId());
        return drinkService.updateDrink(drink);
    }

    @PreAuthorize("hasAuthority('SCOPE_delete.drinks')")
    @DeleteMapping(path = "/drink/delete")
    public void deleteDrink(@RequestParam UUID id) {
        log.info("Received request to delete drink with ID: {}", id);
        drinkService.deleteDrink(id);
    }
}
