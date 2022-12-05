package com.srd2.vehicleMaintenance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VehicleMaintenanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleMaintenanceApplication.class, args);
	}

}
