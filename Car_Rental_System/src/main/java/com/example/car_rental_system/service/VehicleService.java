package com.example.car_rental_system.service;

import com.example.car_rental_system.model.Vehicle;
import com.example.car_rental_system.repository.PaymentRepository;
import com.example.car_rental_system.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.car_rental_system.repository.RentalRepository;
import com.example.car_rental_system.repository.VehicleRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository repository;
    @Autowired
    private VehicleRepository vehicleRepo;
    @Autowired
    private RentalRepository rentalRepo;
    @Autowired
    private PaymentRepository paymentRepo;

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






    @Transactional
    public void delete(Long id) {

        // 🔥 STEP 1: delete payments FIRST
        paymentRepo.deleteByRental_Vehicle_VehicleId(id);

        // 🔥 STEP 2: delete rentals
        rentalRepo.deleteByVehicle_VehicleId(id);

        // 🔥 STEP 3: delete vehicle
        vehicleRepo.deleteById(id);
    }

    public List<Vehicle> getByLocation(Long locationId) {
        return vehicleRepo.findByLocation_LocationId(locationId);
    }

    public Vehicle update(Long id, Vehicle updated) {
        Vehicle vehicle = vehicleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setModel(updated.getModel());
        vehicle.setRegNumber(updated.getRegNumber());
        vehicle.setYear(updated.getYear());
        vehicle.setStatus(updated.getStatus());
        vehicle.setVehicleType(updated.getVehicleType());

        return vehicleRepo.save(vehicle);
    }
}