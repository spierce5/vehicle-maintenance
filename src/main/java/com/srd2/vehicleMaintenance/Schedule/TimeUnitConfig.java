package com.srd2.vehicleMaintenance.Schedule;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TimeUnitConfig {
    
    @Bean
    CommandLineRunner commandLineRunnerTimeUnit(TimeUnitRepository repository) {
        return args -> {

            List<TimeUnit> units = new ArrayList<TimeUnit>();

            units.add(new TimeUnit("HOUR", "N/A", 1, "HOURS"));
            units.add(new TimeUnit("DAY", "N/A", 24, "DAYS"));
            units.add(new TimeUnit("WEEK", "N/A", 168, "DAYS"));
            units.add(new TimeUnit("MONTH", "N/A", 720, "DAYS"));
            units.add(new TimeUnit("QUARTER", "N/A", 2184, "DAYS"));
            units.add(new TimeUnit("YEAR", "N/A", 8760, "DAYS"));
            
            
            repository.saveAll(units);
        };
    }
    
}

