package com.example.car_rental_system.repository;

import com.example.car_rental_system.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // 🔥 Revenue report (GROUP BY month)
    @Query(value = """
        SELECT DATE_FORMAT(transaction_date, '%Y-%m') AS month,
               COUNT(payment_id) AS total_payments,
               SUM(amount) AS revenue
        FROM payments
        WHERE status = 'completed'
        GROUP BY month
        ORDER BY month DESC
    """, nativeQuery = true)
    List<Object[]> getMonthlyRevenue();
}