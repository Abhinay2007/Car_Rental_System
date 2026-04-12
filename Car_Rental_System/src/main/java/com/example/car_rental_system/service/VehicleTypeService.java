package com.example.car_rental_system.service;

import com.example.car_rental_system.model.VehicleType;
import com.example.car_rental_system.repository.VehicleTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleTypeService {

    @Autowired
    private VehicleTypeRepository repository;

    public VehicleType create(VehicleType type) {
        return repository.save(type);
    }

    public List<VehicleType> getAll() {
        return repository.findAll();
    }

    public VehicleType getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle type not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}