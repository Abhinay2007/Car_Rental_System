package com.example.car_rental_system.repository;

import com.example.car_rental_system.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // 🔥 Revenue report (GROUP BY month)

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'completed'")
    Double getTotalRevenue();

    @Query("""
        SELECT MONTH(p.transactionDate), SUM(p.amount)
        FROM Payment p
        WHERE p.status = 'completed'
        GROUP BY MONTH(p.transactionDate)
        ORDER BY MONTH(p.transactionDate)
        """)
    List<Object[]> getMonthlyRevenue();

    @Modifying
    @Transactional
    void deleteByRental_Vehicle_VehicleId(Long vehicleId);
}