package com.example.car_rental_system.controller;

import com.example.car_rental_system.model.Payment;
import com.example.car_rental_system.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService service;

    // Process payment
    @PostMapping
    public Payment pay(@RequestParam Long rentalId,
                       @RequestBody Payment payment) {
        return service.processPayment(rentalId, payment);
    }

    // Get all payments
    @GetMapping
    public List<Payment> getAll() {
        return service.getAll();
    }

    // Revenue report
    @GetMapping("/revenue")
    public List<Object[]> revenue() {
        return service.getRevenueReport();
    }
}