package com.srd2.vehicleMaintenance.Schedule;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeUnitRepository extends JpaRepository<TimeUnit, Long>{
    
    @Query("SELECT unit FROM TimeUnit unit WHERE unit.unitId = ?1")
    Optional<TimeUnit> findTimeUnitById(Long long1);
}
