package com.example.car_rental_system.service;

import com.example.car_rental_system.model.*;
import com.example.car_rental_system.repository.PaymentRepository;
import com.example.car_rental_system.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private RentalRepository rentalRepo;

    public Payment processPayment(Long rentalId, Payment payment) {

        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        // Amount auto from rental
        payment.setRental(rental);
        payment.setAmount(rental.getTotalAmount());
        payment.setStatus(Payment.Status.completed);

        return paymentRepo.save(payment);
    }

    public List<Payment> getAll() {
        return paymentRepo.findAll();
    }

    public List<Object[]> getRevenueReport() {
        return paymentRepo.getMonthlyRevenue();
    }
}