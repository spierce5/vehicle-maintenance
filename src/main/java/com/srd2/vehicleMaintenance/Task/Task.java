package com.srd2.vehicleMaintenance.Task;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.srd2.vehicleMaintenance.Vehicle.Vehicle;

@Entity
@Table
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taskId;
    private LocalDate dateEntered;
    private LocalDate dateDue;
    private String description;
    private String instructions;
    private String notes;
    @ManyToOne
    @JoinColumn(name="type_id")
    private TaskType type;
    @ManyToOne
    @JoinColumn(name="vehicle")
    private Vehicle vehicle;

    public Task(){
        
    }

    public Task(LocalDate dateEntered, LocalDate dateDue, String description, 
            TaskType type, Vehicle vehicle) {
        this.dateEntered = dateEntered;
        this.dateDue = dateDue;
        this.description = description;
        this.type = type;
        this.vehicle = vehicle;
    }

    public Task(LocalDate dateEntered, LocalDate dateDue, String description,
            TaskType type, Vehicle vehicle, String instructions, String notes) {
        this.dateEntered = dateEntered;
        this.dateDue = dateDue;
        this.description = description;
        this.instructions = instructions;
        this.notes = notes;
        this.type = type;
        this.vehicle = vehicle;
    }

    public long getTaskId() {
        return taskId;
    }

    public LocalDate getDateEntered() {
        return dateEntered;
    }

    public void setDateEntered(LocalDate dateEntered) {
        this.dateEntered = dateEntered;
    }

    public LocalDate getDateDue() {
        return dateDue;
    }

    public void setDateDue(LocalDate dateDue) {
        this.dateDue = dateDue;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

}
