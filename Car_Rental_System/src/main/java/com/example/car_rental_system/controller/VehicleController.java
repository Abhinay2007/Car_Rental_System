package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.Vehicle;
import com.example.car_rental_system.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService service;

    // Create vehicle
    @PostMapping
    public Vehicle create(@RequestBody Vehicle vehicle) {
        return service.create(vehicle);
    }

    // Get all vehicles
    @GetMapping
    public List<Vehicle> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Vehicle getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Vehicle deleted";
    }
}