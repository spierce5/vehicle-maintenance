package com.srd2.vehicleMaintenance.Task;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Long>{
   
    @Query("SELECT type FROM TaskType type WHERE type.typeId = ?1")
    Optional<TaskType> findTaskTypeById(Long long1);
}
