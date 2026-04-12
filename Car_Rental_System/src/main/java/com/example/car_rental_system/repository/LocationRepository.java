package com.example.car_rental_system.repository;

import com.example.car_rental_system.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}