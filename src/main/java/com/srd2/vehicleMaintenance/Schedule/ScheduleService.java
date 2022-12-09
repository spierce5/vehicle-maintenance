package com.srd2.vehicleMaintenance.Schedule;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srd2.vehicleMaintenance.Task.Task;

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

    public List<Schedule> getDueSchedules() {
        return scheduleRepository.findByActiveTrue();
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
    public void updateSchedule(Long schedId, Integer frequency, Boolean active, Task task, TimeUnit timeUnit,
            LocalDate nextExecutionDate, LocalDate lastExecutionDate, LocalTime lastExecutionTime) {
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
        if (task != null &&
                !Objects.equals(schedule.getTask(), task)) {
            if (Objects.equals(task.getType().getValue(), "Template")) {
                schedule.setTask(task);
            } else {
                throw new IllegalStateException(
                        "Task must have type Template to be scheduled. The type for the given task was "
                                + task.getType().getValue());
            }
        }
        if (timeUnit != null &&
                !Objects.equals(schedule.getTimeUnit(), timeUnit)) {
            schedule.setTimeUnit(timeUnit);
        }
        if (nextExecutionDate != null &&
                !Objects.equals(schedule.getNextExecutionDate(), nextExecutionDate) &&
                nextExecutionDate.isAfter(LocalDate.now())) {
            schedule.setNextExecutionDate(nextExecutionDate);
        }
        if (lastExecutionDate != null &&
                !Objects.equals(schedule.getLastExecutionDate(), lastExecutionDate) &&
                lastExecutionDate.isAfter(LocalDate.now().minusDays(1))) {
            schedule.setLastExecutionDate(lastExecutionDate);
        }
        if (lastExecutionTime != null &&
                !Objects.equals(schedule.getLastExecutionTime(), lastExecutionTime) &&
                lastExecutionTime.isAfter(LocalTime.now().minusMinutes(2))) {
            schedule.setLastExecutionTime(lastExecutionTime);
        }

    }

}
