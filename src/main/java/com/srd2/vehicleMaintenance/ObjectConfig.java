package com.srd2.vehicleMaintenance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.srd2.vehicleMaintenance.Task.Task;
import com.srd2.vehicleMaintenance.Task.TaskRepository;
import com.srd2.vehicleMaintenance.Task.TaskType;
import com.srd2.vehicleMaintenance.Task.TaskTypeRepository;
import com.srd2.vehicleMaintenance.Vehicle.Vehicle;
import com.srd2.vehicleMaintenance.Vehicle.VehicleRepository;

@Configuration
public class ObjectConfig {

    Vehicle car1 = new Vehicle(
                "Julie's car",
                (short)2012,
                "Nissan",
                "Altima",
                "4 door sedan. Squeaky brakes"
            );
    Vehicle car2 = new Vehicle(
        "Sam's car",
        (short)2006,
        "Jeep",
        "Liberty",
        "Does not start"
    );
    Vehicle car3 = new Vehicle(
        "Red Lexus",
        (short)2021,
        "Lexus",
        "x3",
        "Unsubstatiated claim that it shakes when driving over 60MPH"
    );
    Vehicle car4 = new Vehicle(
        "Old Honda",
        (short)2012,
        "Honda",
        "CR-V",
        "Not currently insured for driving"
    );
    
    TaskType type1 = new TaskType("Preventative", "Routine maintenance to prevent mechanical issues", true);
    TaskType type2 = new TaskType("Repair", "Mechanical issue has occurred and needs to be repaired", true);
    TaskType type3 = new TaskType("Enhancement", "Adding new or improved vehicle feature", true);

    @Bean
    CommandLineRunner vehicleCommandLineRunner(VehicleRepository repository) {
        return args -> {
            repository.saveAll(List.of(car1, car2, car3, car4));
        };
    }

    @Bean
    CommandLineRunner taskTypeCommandLineRunner(TaskTypeRepository repository) {
        return args -> {            
            repository.saveAll(List.of(type1,type2,type3));
        };
    }

    @Bean
    CommandLineRunner taskCommandLineRunner(TaskRepository repository) {
        return args -> {
            Task task1 = new Task(
                LocalDate.now().minusDays(1),
                LocalDate.now().plusDays(7),
                "Change Oil",
                type1,
                car1,
                "Jack up car, open oil cap, place drain pan under oil pan, take out drain bolt...",
                "Use high-mileage oil."
            );
            Task task2 = new Task(
                LocalDate.now(),
                LocalDate.now().plusDays(6),
                "Change Oil",
                type2,
                car2,
                "Jack up car, open oil cap, place drain pan under oil pan, take out drain bolt...",
                "Use high-mileage oil."
            );
            Task task3 = new Task(
                LocalDate.now().minusDays(5),
                LocalDate.now().plusDays(14),
                "Check Tires",
                type1,
                car3,
                "Check tread, ensure no foreign objects or damage",
                "None"
            );
            Task task4 = new Task(
                LocalDate.now().minusDays(3),
                LocalDate.now().plusDays(8),
                "Replace Axel",
                type2,
                car4,
                "1. Watch YouTube\n2. Make repair",
                "Major damage to axel, needs immediate repair"
            );
            Task task5 = new Task(
                LocalDate.now().minusDays(9),
                LocalDate.now().plusDays(12),
                "Add Turbo",
                type3,
                car1,
                "1. Watch YouTube\n2. Make repair",
                "Major damage to axel, needs immediate repair"
            );

            repository.saveAll(List.of(task1, task2, task3, task4, task5));
        };
    }
}
