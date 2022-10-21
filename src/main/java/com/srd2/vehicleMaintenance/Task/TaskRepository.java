package com.srd2.vehicleMaintenance.Task;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
   
    @Query("SELECT t FROM Task t WHERE t.taskId = ?1")
    Optional<Task> findTaskById(Long long1);
}
