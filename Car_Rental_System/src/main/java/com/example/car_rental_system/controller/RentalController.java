package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.Rental;
import com.example.car_rental_system.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService service;

    // Book vehicle
    @PostMapping("/book")
    public Rental book(@RequestParam Long userId,
                       @RequestParam Long vehicleId,
                       @RequestBody Rental rental) {
        return service.bookRental(userId, vehicleId, rental);
    }

    // Return vehicle
    @PutMapping("/{id}/return")
    public Rental returnVehicle(@PathVariable Long id,
                                @RequestBody Rental rental) {
        return service.returnVehicle(id, rental);
    }

    // Get all rentals
    @GetMapping
    public List<Rental> getAll() {
        return service.getAll();
    }
}