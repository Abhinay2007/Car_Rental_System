package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.Rental;
import com.example.car_rental_system.service.RentalService;
import com.example.car_rental_system.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService service;

    //  Book vehicle (JWT-based user)
    @PostMapping("/book")
    public Rental book(HttpServletRequest request,
                       @RequestParam Long vehicleId,
                       @RequestBody Rental rental) {

        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);

        Long userId = JwtUtil.getUserIdFromToken(token);

        return service.bookRental(userId, vehicleId, rental);
    }

    //  Return vehicle
    @PutMapping("/{id}/return")
    public Rental returnVehicle(@PathVariable Long id,
                                @RequestBody Rental rental) {
        return service.returnVehicle(id, rental);
    }

    // (Optional) all rentals (admin use)
    @GetMapping
    public List<Rental> getAll() {
        return service.getAll();
    }

    // NEW: get only current user's rentals
    @GetMapping("/my")
    public List<Rental> getMyRentals(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);

        Long userId = JwtUtil.getUserIdFromToken(token);

        return service.getByUserId(userId);
    }
}