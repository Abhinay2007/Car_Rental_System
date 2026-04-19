package com.example.car_rental_system.repository;

import com.example.car_rental_system.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findByVehicle_VehicleIdAndStatusIn(
            Long vehicleId, List<Rental.Status> statuses);

    // ✅ NEW (IMPORTANT)
    List<Rental> findByUser_UserId(Long userId);

    @Query("""
        SELECT r.status, COUNT(r)
        FROM Rental r
        GROUP BY r.status
        """)
        List<Object[]> getStatusStats();

    @Modifying
    @Transactional
    void deleteByVehicle_VehicleId(Long vehicleId);
}