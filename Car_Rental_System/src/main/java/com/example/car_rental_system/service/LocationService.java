package com.example.car_rental_system.service;

import com.example.car_rental_system.model.Location;
import com.example.car_rental_system.repository.LocationRepository;
import com.example.car_rental_system.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository repository;

    @Autowired
    private LocationRepository locationRepo;   

    @Autowired
    private VehicleRepository vehicleRepo;

    public Location create(Location location) {
        return repository.save(location);
    }

    public List<Location> getAll() {
        return repository.findAll();
    }

    public Location getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));
    }

    public void delete(Long id) {

        boolean exists = vehicleRepo.existsByLocation_LocationId(id);

        if (exists) {
            throw new RuntimeException("Cannot delete: Location has vehicles");
        }

        locationRepo.deleteById(id);
    }
}