package com.example.car_rental_system.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    // 🔗 Rental relation (1:1)
    @OneToOne
    @JoinColumn(name = "rental_id", nullable = false, unique = true)
    private Rental rental;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(length = 50)
    private String method; // cash/card/UPI

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "transaction_date", updatable = false)
    private LocalDateTime transactionDate;

    public enum Status {
        pending,
        completed,
        failed
    }

    public Payment() {}

    @PrePersist
    protected void onCreate() {
        this.transactionDate = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getPaymentId() { return paymentId; }

    public Rental getRental() { return rental; }
    public void setRental(Rental rental) { this.rental = rental; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getTransactionDate() { return transactionDate; }
}