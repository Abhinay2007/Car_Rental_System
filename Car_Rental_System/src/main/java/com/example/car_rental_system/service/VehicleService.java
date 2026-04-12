package com.example.car_rental_system.service;

import com.example.car_rental_system.model.Vehicle;
import com.example.car_rental_system.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository repository;

    public Vehicle create(Vehicle vehicle) {

        repository.findByRegNumber(vehicle.getRegNumber()).ifPresent(v -> {
            throw new RuntimeException("Vehicle already exists");
        });

        return repository.save(vehicle);
    }

    public List<Vehicle> getAll() {
        return repository.findAll();
    }

    public Vehicle getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}