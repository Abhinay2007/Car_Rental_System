package com.example.car_rental_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    @Column(nullable = false, unique = true, length = 20)
    private String regNumber;

    @Column(nullable = false, length = 100)
    private String model;

    @Column(nullable = false)
    private int year;

    // Relation with VehicleType
    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private VehicleType vehicleType;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public enum Status {
        available,
        rented,
        maintenance
    }

    @Column(name = "image_url")
    private String imageUrl;

    public Vehicle() {}

    // Getters & Setters

    public Long getVehicleId() { return vehicleId; }

    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getRegNumber() { return regNumber; }

    public void setRegNumber(String regNumber) { this.regNumber = regNumber; }

    public String getModel() { return model; }

    public void setModel(String model) { this.model = model; }

    public int getYear() { return year; }

    public void setYear(int year) { this.year = year; }

    public VehicleType getVehicleType() { return vehicleType; }

    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public Location getLocation() { return location; }

    public void setLocation(Location location) { this.location = location; }

    public Status getStatus() { return status; }

    public void setStatus(Status status) { this.status = status; }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}