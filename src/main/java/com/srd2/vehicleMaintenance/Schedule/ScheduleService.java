package com.srd2.vehicleMaintenance.Schedule;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Schedule> getSchedules() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getScheduleById(Long schedId) {
        return scheduleRepository.findById(schedId);
    }

    public void addNewSchedule(Schedule schedule) {
        Optional<Schedule> scheduleOptional = scheduleRepository
                .findScheduleById(schedule.getSchedId());
        if (scheduleOptional.isPresent()) {
            throw new IllegalStateException("Schedule ID is taken");
        }
        scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long schedId) {

        boolean exists = scheduleRepository.existsById(schedId);
        if (!exists) {
            throw new IllegalStateException(
                    "Schedule with id " + schedId + " does not exist");
        }
        scheduleRepository.deleteById(schedId);
    }

    @Transactional
    public void updateSchedule(Long schedId, Integer frequency, Boolean active, TimeUnit timeUnit) {
        Schedule schedule = scheduleRepository.findById(schedId)
                .orElseThrow(() -> new IllegalStateException(
                        "Schedule with ID " + schedId + " does not exist"));

        if (frequency != null &&
                frequency > 0 &&
                !Objects.equals(schedule.getFrequency(), frequency)) {
            schedule.setFrequency(frequency);
        }
        if (active != null &&
                !Objects.equals(schedule.getActive(), active)) {
            schedule.setActive(active);
        }
        if (timeUnit != null &&
                !Objects.equals(schedule.getTimeUnit(), timeUnit)) {
            schedule.setTimeUnit(timeUnit);
        }

    }

}
