package com.srd2.vehicleMaintenance.Vehicle;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>{
    
    @Query("SELECT s FROM Vehicle s WHERE s.vehicleId = ?1")
    Optional<Vehicle> findVehicleById(Long long1);
}
