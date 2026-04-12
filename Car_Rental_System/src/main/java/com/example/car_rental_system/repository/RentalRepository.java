package com.example.car_rental_system.repository;

import com.example.car_rental_system.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findByVehicle_VehicleIdAndStatusIn(
            Long vehicleId, List<Rental.Status> statuses);
}