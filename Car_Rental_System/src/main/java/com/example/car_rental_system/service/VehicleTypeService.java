package com.example.car_rental_system.service;

import com.example.car_rental_system.model.VehicleType;
import com.example.car_rental_system.repository.VehicleTypeRepository;
import com.example.car_rental_system.repository.VehicleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleTypeService {

    @Autowired
    private VehicleTypeRepository typeRepo;

    @Autowired
    private VehicleRepository vehicleRepo;

    // CREATE
    public VehicleType create(VehicleType type) {
        return typeRepo.save(type);
    }

    // GET ALL
    public List<VehicleType> getAll() {
        return typeRepo.findAll();
    }
    public VehicleType getById(Long id) {
        return typeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle Type not found"));
    }
    // DELETE (SAFE)
    public void delete(Long id) {

        boolean exists = vehicleRepo.existsByVehicleType_TypeId(id);

        if (exists) {
            throw new RuntimeException("Cannot delete: Type used in vehicles 🚫");
        }

        typeRepo.deleteById(id);
    }
}