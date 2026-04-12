package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.VehicleType;
import com.example.car_rental_system.service.VehicleTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicle-types")
public class VehicleTypeController {

    @Autowired
    private VehicleTypeService service;

    // Create type
    @PostMapping
    public VehicleType create(@RequestBody VehicleType type) {
        return service.create(type);
    }

    // Get all types
    @GetMapping
    public List<VehicleType> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public VehicleType getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Vehicle type deleted";
    }
}