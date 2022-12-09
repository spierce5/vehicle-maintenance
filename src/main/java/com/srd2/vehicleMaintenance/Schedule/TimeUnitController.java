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
@RequestMapping(path = "api/time-units")
public class TimeUnitController {

    private final TimeUnitService timeUnitService;

    @Autowired
    public TimeUnitController(TimeUnitService timeUnitService) {
        this.timeUnitService = timeUnitService;
    }

    @GetMapping
    public List<TimeUnit> getTimeUnits() {
        return timeUnitService.getTimeUnits();
    }

    @GetMapping(path = "{unitId}")
    public TimeUnit getTimeUnit(@PathVariable Long unitId) {
        return timeUnitService.getTimeUnitById(unitId).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public void registerNewTimeUnit(@RequestBody TimeUnit timeUnit) {
        timeUnitService.addNewTimeUnit(timeUnit);
    }

    @DeleteMapping(path = "{unitId}")
    public void deleteTimeUnit(@PathVariable("unitId") Long unitId) {
        timeUnitService.deleteTimeUnit(unitId);
    }

    @PutMapping(path = "{unitId}")
    public ResponseEntity<?> updateTimeUnit(
            @PathVariable("unitId") Long unitId,
            @RequestBody TimeUnit timeUnit) {
        timeUnitService.updateTimeUnit(unitId, timeUnit.getValue(), timeUnit.getDescription(), timeUnit.getDays());
        return ResponseEntity.ok(timeUnit);
    }
}
