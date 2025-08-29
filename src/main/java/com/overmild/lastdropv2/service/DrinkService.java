package com.overmild.lastdropv2.service;

import com.overmild.lastdropv2.excpetion.RepositoryException;
import com.overmild.lastdropv2.model.Drink;
import com.overmild.lastdropv2.repository.DrinkRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DrinkService {

    private final DrinkRepository drinkRepository;

    public Drink createDrink(Drink drink) {
        return drinkRepository.save(drink);
    }

    public Drink getDrinkById(UUID id) {
        return drinkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Drink not found with ID: " + id));
    }

    public Drink updateDrink(Drink drink) {
        if (drink.getId() == null || !drinkRepository.existsById(drink.getId())) {
            throw new EntityNotFoundException("Drink not found with ID: " + drink.getId());
        }
        return drinkRepository.save(drink);
    }

    public void deleteDrink(UUID id) {
        try {
            drinkRepository.deleteById(id);
        } catch (Exception e) {
            throw new RepositoryException("Error deleting drink with ID: " + id, e);
        }
    }
}
