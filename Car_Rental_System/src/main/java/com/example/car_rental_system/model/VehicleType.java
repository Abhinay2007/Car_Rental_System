package com.example.car_rental_system.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "vehicle_types")
public class VehicleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeId;

    @Column(nullable = false, length = 50)
    private String typeName;

    @Column(precision = 10, scale = 2)
    private BigDecimal dailyRate;

    @Column(precision = 10, scale = 2)
    private BigDecimal weeklyRate;

    @Column(precision = 10, scale = 2)
    private BigDecimal monthlyRate;

    // Constructors
    public VehicleType() {}

    // Getters & Setters
    public Long getTypeId() { return typeId; }

    public void setTypeId(Long typeId) { this.typeId = typeId; }

    public String getTypeName() { return typeName; }

    public void setTypeName(String typeName) { this.typeName = typeName; }

    public BigDecimal getDailyRate() { return dailyRate; }

    public void setDailyRate(BigDecimal dailyRate) { this.dailyRate = dailyRate; }

    public BigDecimal getWeeklyRate() { return weeklyRate; }

    public void setWeeklyRate(BigDecimal weeklyRate) { this.weeklyRate = weeklyRate; }

    public BigDecimal getMonthlyRate() { return monthlyRate; }

    public void setMonthlyRate(BigDecimal monthlyRate) { this.monthlyRate = monthlyRate; }
}