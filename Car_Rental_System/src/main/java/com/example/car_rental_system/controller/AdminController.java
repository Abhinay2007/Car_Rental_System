package com.example.car_rental_system.controller;

import com.example.car_rental_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private VehicleRepository vehicleRepo;

    @Autowired
    private RentalRepository rentalRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaymentRepository paymentRepo;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalVehicles", vehicleRepo.count());
        data.put("totalRentals", rentalRepo.count());
        data.put("totalUsers", userRepo.count());

        // revenue from payments
        Double revenue = paymentRepo.getTotalRevenue();
        data.put("totalRevenue", revenue != null ? revenue : 0);

        return data;
    }

    @GetMapping("/revenue-chart")
    public List<Map<String, Object>> getRevenueChart() {

        List<Object[]> data = paymentRepo.getMonthlyRevenue();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("month", row[0]);
            map.put("revenue", row[1]);
            result.add(map);
        }

        return result;
    }

    @GetMapping("/status-chart")
    public List<Map<String, Object>> getStatusChart() {

        List<Object[]> data = rentalRepo.getStatusStats();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("name", row[0].toString());
            map.put("value", row[1]);
            result.add(map);
        }

        return result;
    }
}