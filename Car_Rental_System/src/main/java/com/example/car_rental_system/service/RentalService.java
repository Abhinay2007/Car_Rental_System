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

        // 🔹 Get user
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔹 Get vehicle
        Vehicle vehicle = vehicleRepo.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // 🔥 CHECK DATE OVERLAP (IMPORTANT)
        List<Rental> activeRentals =
                rentalRepo.findByVehicle_VehicleIdAndStatusIn(
                        vehicleId,
                        List.of(Rental.Status.active, Rental.Status.pending)
                );

        for (Rental r : activeRentals) {

            boolean isOverlap =
                    !(rental.getEndDate().isBefore(r.getStartDate()) ||
                            rental.getStartDate().isAfter(r.getEndDate()));

            if (isOverlap) {
                throw new RuntimeException("Vehicle already booked for selected dates");
            }
        }

        // 🔹 Set relations
        rental.setUser(user);
        rental.setVehicle(vehicle);
        rental.setStatus(Rental.Status.active);

        // 🔹 Calculate price
        long days = java.time.temporal.ChronoUnit.DAYS
                .between(rental.getStartDate(), rental.getEndDate());

        java.math.BigDecimal rate = vehicle.getVehicleType().getDailyRate();
        java.math.BigDecimal total = rate.multiply(java.math.BigDecimal.valueOf(days));

        rental.setTotalAmount(total);

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

    public List<Rental> getByUserId(Long userId) {
        return rentalRepo.findByUser_UserId(userId);
    }


}