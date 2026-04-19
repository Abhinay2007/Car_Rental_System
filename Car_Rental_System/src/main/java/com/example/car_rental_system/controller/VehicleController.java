package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.Vehicle;
import com.example.car_rental_system.service.VehicleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:5174") // ✅ fix CORS globally
public class VehicleController {

    @Autowired
    private VehicleService service;

    // CREATE VEHICLE
    @PostMapping
    public Vehicle create(@RequestBody Vehicle vehicle) {
        return service.create(vehicle);
    }

    // GET ALL / FILTER BY LOCATION
    @GetMapping
    public List<Vehicle> getVehicles(
            @RequestParam(required = false) Long locationId) {

        if (locationId != null) {
            return service.getByLocation(locationId);
        }

        return service.getAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Vehicle getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // UPDATE VEHICLE
    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id,
                                 @RequestBody Vehicle updated) {
        return service.update(id, updated);
    }

    // DELETE VEHICLE (SAFE)
    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {
        service.delete(id);
        return "Vehicle deleted successfully 🚗";
    }
}