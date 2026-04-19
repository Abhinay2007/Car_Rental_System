package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.Location;
import com.example.car_rental_system.service.LocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:5174") // ✅ fix CORS for frontend
public class LocationController {

    @Autowired
    private LocationService service;

    // ✅ Create location
    @PostMapping
    public Location create(@RequestBody Location location) {
        return service.create(location);
    }

    // ✅ Get all locations (USED IN DROPDOWN)
    @GetMapping
    public List<Location> getAll() {
        return service.getAll();
    }

    // ✅ Get by ID
    @GetMapping("/{id}")
    public Location getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Delete location
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Location deleted successfully";
    }
}