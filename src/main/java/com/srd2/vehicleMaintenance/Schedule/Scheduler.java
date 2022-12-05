package com.srd2.vehicleMaintenance.Schedule;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {

    private static final Logger log = LoggerFactory.getLogger(Scheduler.class);
    private final ScheduleRepository scheduleRepository;

    @Autowired
    public Scheduler(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Scheduled(fixedRate = 30, timeUnit = TimeUnit.SECONDS)
    public void reportCurrentTime() {
        List<Schedule> schedules = scheduleRepository.findByActiveTrue();
        String scheduleInfo = "";
        for (Schedule s : schedules) {
            scheduleInfo += "\nSchedule ID: " + s.getSchedId() + "\n" +
                    "Vehicle: " + s.getTask().getVehicle().getDescription() + "\n" +
                    "Task: " + s.getTask().getDescription() + "\n" +
                    "Frequency" + s.getFrequency() + " " + s.getTimeUnit().getValue().toLowerCase() + "(s)\n";
        }
        log.info("Scheduling Tasks: " + scheduleInfo);
    }
}
