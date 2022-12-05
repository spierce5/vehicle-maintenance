package com.srd2.vehicleMaintenance;

import java.time.LocalDate;
import java.time.LocalTime;
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
import com.srd2.vehicleMaintenance.Schedule.Schedule;
import com.srd2.vehicleMaintenance.Schedule.ScheduleRepository;
import com.srd2.vehicleMaintenance.Schedule.TimeUnit;
import com.srd2.vehicleMaintenance.Schedule.TimeUnitRepository;

@Configuration
public class ObjectConfig {

        Vehicle car1 = new Vehicle(
                        "Julie's car",
                        (short) 2012,
                        "Nissan",
                        "Altima",
                        "4 door sedan. Squeaky brakes");
        Vehicle car2 = new Vehicle(
                        "Sam's car",
                        (short) 2006,
                        "Jeep",
                        "Liberty",
                        "Does not start");
        Vehicle car3 = new Vehicle(
                        "Red Lexus",
                        (short) 2021,
                        "Lexus",
                        "x3",
                        "Unsubstatiated claim that it shakes when driving over 60MPH");
        Vehicle car4 = new Vehicle(
                        "Old Honda",
                        (short) 2012,
                        "Honda",
                        "CR-V",
                        "Not currently insured for driving");

        TaskType type1 = new TaskType("Preventative", "Routine maintenance to prevent mechanical issues", true);
        TaskType type2 = new TaskType("Repair", "Mechanical issue has occurred and needs to be repaired", true);
        TaskType type3 = new TaskType("Enhancement", "Adding new or improved vehicle feature", true);
        TaskType type4 = new TaskType("Template", "Template for scheduling preventative maintenance", true);

        TimeUnit hour = new TimeUnit("HOUR", "N/A", 1, "HOURS");
        TimeUnit day = new TimeUnit("DAY", "N/A", 24, "DAYS");
        TimeUnit week = new TimeUnit("WEEK", "N/A", 168, "DAYS");
        TimeUnit month = new TimeUnit("MONTH", "N/A", 720, "DAYS");
        TimeUnit quarter = new TimeUnit("QUARTER", "N/A", 2184, "DAYS");
        TimeUnit year = new TimeUnit("YEAR", "N/A", 8760, "DAYS");

        Task task1 = new Task(
                        LocalDate.now().minusDays(1),
                        LocalDate.now().plusDays(7),
                        "Change Oil",
                        type1,
                        car1,
                        "Jack up car, open oil cap, place drain pan under oil pan, take out drain bolt...",
                        "Use high-mileage oil.");
        Task task2 = new Task(
                        LocalDate.now(),
                        LocalDate.now().plusDays(6),
                        "Change Oil",
                        type2,
                        car2,
                        "Jack up car, open oil cap, place drain pan under oil pan, take out drain bolt...",
                        "Use high-mileage oil.");
        Task task3 = new Task(
                        LocalDate.now().minusDays(5),
                        LocalDate.now().plusDays(14),
                        "Check Tires",
                        type1,
                        car3,
                        "Check tread, ensure no foreign objects or damage",
                        "None");
        Task task4 = new Task(
                        LocalDate.now().minusDays(3),
                        LocalDate.now().plusDays(8),
                        "Replace Axel",
                        type2,
                        car4,
                        "1. Watch YouTube\n2. Make repair",
                        "Major damage to axel, needs immediate repair");
        Task task5 = new Task(
                        LocalDate.now().minusDays(9),
                        LocalDate.now().plusDays(12),
                        "Add Turbo",
                        type3,
                        car1,
                        "1. Watch YouTube\n2. Make repair",
                        "Major damage to axel, needs immediate repair");
        Task template1 = new Task(
                        LocalDate.now().minusDays(100),
                        "6 month Oil Change",
                        type4,
                        car1,
                        "Jack up car, open oil cap, place drain pan under oil pan, take out drain bolt...",
                        "Use high-mileage oil.");
        Task template2 = new Task(
                        LocalDate.now().minusDays(100),
                        "Check Tires",
                        type4,
                        car1,
                        "Check Tire PSI and ensure it is within the required range. Add air if not.",
                        "Range may not be specified. If not, fill to within 5 PSI of tire's max PSI");

        @Bean
        CommandLineRunner vehicleCommandLineRunner(VehicleRepository repository) {
                return args -> {
                        repository.saveAll(List.of(car1, car2, car3, car4));
                };
        }

        @Bean
        CommandLineRunner taskTypeCommandLineRunner(TaskTypeRepository repository) {
                return args -> {
                        repository.saveAll(List.of(type1, type2, type3, type4));
                };
        }

        @Bean
        CommandLineRunner taskCommandLineRunner(TaskRepository repository) {
                return args -> {

                        repository.saveAll(List.of(task1, task2, task3, task4, task5, template1, template2));
                };
        }

        @Bean
        CommandLineRunner timeUnitCommandLineRunner(TimeUnitRepository repository) {
                return args -> {

                        repository.saveAll(List.of(hour, day, week, month, quarter, year));
                };
        }

        @Bean
        CommandLineRunner scheduleCommandLineRunner(ScheduleRepository repository) {
                return args -> {
                        Schedule sched1 = new Schedule(
                                        6,
                                        true,
                                        month,
                                        template1,
                                        LocalDate.now(),
                                        LocalTime.now());
                        Schedule sched2 = new Schedule(
                                        2,
                                        true,
                                        week,
                                        template2,
                                        LocalDate.now(),
                                        LocalTime.now());

                        repository.saveAll(List.of(sched1, sched2));
                };
        }
}
