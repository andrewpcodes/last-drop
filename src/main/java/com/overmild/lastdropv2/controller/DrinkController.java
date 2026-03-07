package com.overmild.lastdropv2.controller;

import com.overmild.lastdropv2.model.Drink;
import com.overmild.lastdropv2.service.DrinkService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        Drink drink = drinkService.getDrinkById(id);
        return ResponseEntity.ok(drink);
    }

    @PreAuthorize("hasAuthority('SCOPE_read.drinks')")
    @GetMapping(path = "/drinks", produces = "application/json")
    public ResponseEntity<List<Drink>> searchDrinks(@RequestParam(required = false) String name) {
        log.info("Received search request for drinks with name: {}", name);
        List<Drink> drinks = drinkService.searchDrinks(name);
        return ResponseEntity.ok(drinks);
    }

    @PreAuthorize("hasAuthority('SCOPE_create.drinks')")
    @PostMapping(path = "/drink", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Drink> createDrink(@Valid @RequestBody Drink drink) {
        log.info("Received request to create drink: {}", drink.getName());
        return ResponseEntity.ok(drinkService.createDrink(drink));
    }

    @PreAuthorize("hasAuthority('SCOPE_update.drinks')")
    @PutMapping(path = "/drink", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Drink> updateDrink(@Valid @RequestBody Drink drink) {
        log.info("Received request to update drink with ID: {}", drink.getId());
        return ResponseEntity.ok(drinkService.updateDrink(drink));
    }

    @PreAuthorize("hasAuthority('SCOPE_delete.drinks')")
    @DeleteMapping(path = "/drink")
    public ResponseEntity<Void> deleteDrink(@RequestParam UUID id) {
        log.info("Received request to delete drink with ID: {}", id);
        drinkService.deleteDrink(id);
        return ResponseEntity.noContent().build();
    }
}

