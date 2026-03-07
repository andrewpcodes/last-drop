package com.overmild.lastdropv2.service;

import com.overmild.lastdropv2.exception.RepositoryException;
import com.overmild.lastdropv2.model.Drink;
import com.overmild.lastdropv2.repository.DrinkRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DrinkService {

    private final DrinkRepository drinkRepository;

    @Transactional
    public Drink createDrink(Drink drink) {
        return drinkRepository.save(drink);
    }

    @Transactional(readOnly = true)
    public List<Drink> searchDrinks(String name) {
        if (name == null || name.isBlank()) {
            return drinkRepository.findAll();
        }
        return drinkRepository.findByNameContainingIgnoreCase(name);
    }

    @Transactional(readOnly = true)
    public Drink getDrinkById(UUID id) {
        return drinkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Drink not found with ID: " + id));
    }

    @Transactional
    public Drink updateDrink(Drink drink) {
        if (drink.getId() == null || !drinkRepository.existsById(drink.getId())) {
            throw new EntityNotFoundException("Drink not found with ID: " + drink.getId());
        }
        return drinkRepository.save(drink);
    }

    @Transactional
    public void deleteDrink(UUID id) {
        try {
            drinkRepository.deleteById(id);
        } catch (Exception e) {
            throw new RepositoryException("Error deleting drink with ID: " + id, e);
        }
    }
}
