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

            for(String s: List.of(  "MINUTE",
                                    "HOUR",
                                    "DAY",
                                    "WEEK",
                                    "MONTH",
                                    "QUARTER",
                                    "YEAR"
                                )) {
                TimeUnit unit = new TimeUnit(s, "N/A");
                units.add(unit);
            }
            
            repository.saveAll(units);
        };
    }
    
}
