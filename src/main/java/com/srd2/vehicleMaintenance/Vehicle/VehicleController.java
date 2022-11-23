package com.srd2.vehicleMaintenance.Vehicle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/vehicles")
public class VehicleController {
    
    private final VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getVehicles(){
        return vehicleService.getVehicles();
    }

    @GetMapping(path = "{vehicleId}")
    public Vehicle getVehicle(@PathVariable Long vehicleId){
        return vehicleService.getVehicleById(vehicleId).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping
    public void registerNewVehicle(@RequestBody Vehicle vehicle) {
        vehicleService.addNewVehicle(vehicle);
    }

    @DeleteMapping(path = "{vehicleId}")
    public void deleteVehicle(@PathVariable("vehicleId") Long vehicleId){
        vehicleService.deleteVehicle(vehicleId);
    }

    @PostMapping(path = "delete-vehicles")
    public void deleteMultipleVehicles(@RequestBody List<Vehicle> vehicles){
        for(Vehicle vehicle: vehicles){
            vehicleService.deleteVehicle(vehicle.getVehicleId());
        }
    }

    @PutMapping(path = "{vehicleId}")
    public ResponseEntity<?> updateVehicle(
            @PathVariable("vehicleId") Long vehicleId,
            @RequestBody Vehicle vehicle) {
        vehicleService.updateVehicle(vehicleId, vehicle.getDescription(), vehicle.getYear(), vehicle.getMake(), vehicle.getModel(), vehicle.getNotes());
        return ResponseEntity.ok(vehicle);
    }
}
