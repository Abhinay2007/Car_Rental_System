package com.example.car_rental_system.repository;

import com.example.car_rental_system.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByRegNumber(String regNumber);
}