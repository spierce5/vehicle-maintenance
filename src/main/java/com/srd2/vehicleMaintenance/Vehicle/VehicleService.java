package com.srd2.vehicleMaintenance.Vehicle;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getVehicles(){
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long vehicleId) {
        return vehicleRepository.findById(vehicleId);
    }

    public void addNewVehicle(Vehicle vehicle) {
        Optional<Vehicle> vehicleOptional = vehicleRepository
            .findVehicleById(vehicle.getVehicleId());
        if (vehicleOptional.isPresent()) {
            throw new IllegalStateException("Vehicle ID is taken");
        }
        if(vehicle.getDescription() == ""){
            throw new IllegalStateException("Description is a required field.");
        }
        if(vehicle.getMake() == ""){
            throw new IllegalStateException("Make is a required field.");
        }
        if(vehicle.getModel() == ""){
            throw new IllegalStateException("Model is a required field.");
        }
        if(vehicle.getYear() == null){
            throw new IllegalStateException("Year is a required field.");
        }
        vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long vehicleId){
        
        boolean exists = vehicleRepository.existsById(vehicleId);
        if (!exists) {
            throw new IllegalStateException(
                "Vehicle with id " + vehicleId + " does not exist");
        }
        vehicleRepository.deleteById(vehicleId);
    }

    @Transactional
    public void updateVehicle(Long vehicleId, String description, Short year, String make, String model, String notes) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
            .orElseThrow(() -> new IllegalStateException(
                "Vehicle with ID " + vehicleId + " does not exist")
            );

        if (description != null &&
            description.length() > 0 &&
            !Objects.equals(vehicle.getDescription(), description)) {
                vehicle.setDescription(description);
            }
                
        if (make != null &&
            make.length() > 0 &&
            !Objects.equals(vehicle.getMake(), make)) {
                vehicle.setMake(make);
            }
        if (year != null) {
            if(year > LocalDate.now().getYear()){
                throw new IllegalStateException("Year cannot be in the future");
            }
            else if(year < 1886){
                throw new IllegalStateException("First motorized vehicle was invented in 1886. Year cannot be lower than this.");
            }
            vehicle.setYear(year);
        }
        if (model != null &&
            model.length() > 0 &&
            !Objects.equals(vehicle.getModel(), model)) {
                vehicle.setModel(model);
            }
        if (notes != null &&
            notes.length() > 0 &&
            !Objects.equals(vehicle.getNotes(), notes)) {
                vehicle.setNotes(notes);
            }
    }

    
}
