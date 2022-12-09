package com.srd2.vehicleMaintenance.Schedule;

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
@RequestMapping(path = "api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<Schedule> getSchedules() {
        return scheduleService.getSchedules();
    }

    public List<Schedule> getDueSchedules() {
        return scheduleService.getDueSchedules();
    }

    @GetMapping(path = "{schedId}")
    public Schedule getTimeUnit(@PathVariable Long schedId) {
        return scheduleService.getScheduleById(schedId).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public void registerNewSchedule(@RequestBody Schedule schedule) {
        scheduleService.addNewSchedule(schedule);
    }

    @DeleteMapping(path = "{schedId}")
    public void deleteTimeUnit(@PathVariable("schedId") Long schedId) {
        scheduleService.deleteSchedule(schedId);
    }

    @PostMapping(path = "delete-schedules")
    public void deleteMultipleSchedules(@RequestBody List<Schedule> scheduleList) {
        for (Schedule schedule : scheduleList) {
            scheduleService.deleteSchedule(schedule.getSchedId());
        }
    }

    @PutMapping(path = "{schedId}")
    public ResponseEntity<?> updateSchedule(
            @PathVariable("schedId") Long schedId,
            @RequestBody Schedule schedule) {
        scheduleService.updateSchedule(schedId, schedule.getFrequency(), schedule.getActive(), schedule.getTask(),
                schedule.getTimeUnit(), schedule.getNextExecutionDate(), schedule.getLastExecutionDate(),
                schedule.getLastExecutionTime());
        return ResponseEntity.ok(schedule);
    }
}
