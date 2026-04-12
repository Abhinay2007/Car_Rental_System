package com.example.car_rental_system.service;

import com.example.car_rental_system.model.*;
import com.example.car_rental_system.repository.RentalRepository;
import com.example.car_rental_system.repository.VehicleRepository;
import com.example.car_rental_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepo;

    @Autowired
    private VehicleRepository vehicleRepo;

    @Autowired
    private UserRepository userRepo;

    public Rental bookRental(Long userId, Long vehicleId, Rental rental) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = vehicleRepo.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // 🚨 Availability check
        if (vehicle.getStatus() != Vehicle.Status.available) {
            throw new RuntimeException("Vehicle not available");
        }

        // Set relations
        rental.setUser(user);
        rental.setVehicle(vehicle);
        rental.setStatus(Rental.Status.active);

        // 💰 Price calculation
        long days = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getEndDate());

        BigDecimal rate = vehicle.getVehicleType().getDailyRate();
        BigDecimal total = rate.multiply(BigDecimal.valueOf(days));

        rental.setTotalAmount(total);

        // Update vehicle status
        vehicle.setStatus(Vehicle.Status.rented);
        vehicleRepo.save(vehicle);

        return rentalRepo.save(rental);
    }

    public Rental returnVehicle(Long rentalId, Rental rentalRequest) {

        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        rental.setActualReturn(rentalRequest.getActualReturn());
        rental.setStatus(Rental.Status.completed);

        // Update vehicle back to available
        Vehicle vehicle = rental.getVehicle();
        vehicle.setStatus(Vehicle.Status.available);
        vehicleRepo.save(vehicle);

        return rentalRepo.save(rental);
    }

    public List<Rental> getAll() {
        return rentalRepo.findAll();
    }
}