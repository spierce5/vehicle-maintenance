package com.srd2.vehicleMaintenance.Vehicle;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table
public class Vehicle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;
    private String description;
    private Short year;
    private String make;
    private String model;
    private String notes;
    @Transient
    private Integer age;    

    public Vehicle(){

    }

    public Vehicle(String description) {
        
        this.description = description;
    }

    public Vehicle(String description, Short year) {
        
        this.description = description;
        this.year = year;
    }

    public Vehicle(String description, Short year, String make, String model) {        
        this.description = description;
        this.year = year;
        this.make = make;
        this.model = model;
    }

    public Vehicle(String description, Short year, String make, String model, String notes) {        
        this.description = description;
        this.year = year;
        this.make = make;
        this.model = model;
        this.notes = notes;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Short getYear() {
        return year;
    }

    public void setYear(Short year) {
        this.year = year;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public Integer getAge() {
        return LocalDate.now().getYear() - this.year;
    }

    @Override
    public String toString() {
        return "Vehicle [Id: " + vehicleId + ", Description: " + description + "]";
    }  
    
}
