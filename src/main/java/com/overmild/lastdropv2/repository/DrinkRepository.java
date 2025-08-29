package com.overmild.lastdropv2.repository;

import com.overmild.lastdropv2.model.Drink;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface DrinkRepository extends CrudRepository<Drink, UUID> {}
