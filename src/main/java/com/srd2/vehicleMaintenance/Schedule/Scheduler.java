package com.srd2.vehicleMaintenance.Schedule;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.srd2.vehicleMaintenance.Task.Task;
import com.srd2.vehicleMaintenance.Task.TaskService;
import com.srd2.vehicleMaintenance.Task.TaskTypeRepository;
import com.srd2.vehicleMaintenance.Task.*;

@Component
public class Scheduler {

    private static final Logger log = LoggerFactory.getLogger(Scheduler.class);
    private TaskService taskService;
    private TaskTypeRepository taskTypeRepository;
    private final ScheduleRepository scheduleRepository;
    private ScheduleController scheduleController;

    @Autowired
    public Scheduler(ScheduleRepository scheduleRepository, ScheduleController scheduleController) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleController = scheduleController;
    }

    @Autowired
    public void Task(TaskService taskService, TaskTypeRepository taskTypeRepository) {
        this.taskService = taskService;
        this.taskTypeRepository = taskTypeRepository;
    }

    @Scheduled(fixedRate = 30, timeUnit = TimeUnit.SECONDS)
    public void generateScheduledTasks() {
        /*
         * Retrieving active schedules and determining if task should be generated here
         * It would be better to add logic to query and only fetch schedules that are
         * active and due
         */
        List<Schedule> schedules = scheduleRepository.findByActiveTrue();
        TaskType taskType = taskTypeRepository.findTaskByValue("Preventative");
        String scheduleInfo = "";
        for (Schedule s : schedules) {

            if (s.getNextExecutionDate().compareTo(LocalDate.now()) <= 0) {

                scheduleInfo += "\nSchedule ID: " + s.getSchedId() + "\n" +
                        "Vehicle: " + s.getTask().getVehicle().getDescription() + "\n" +
                        "Task: " + s.getTask().getDescription() + "\n" +
                        "Frequency" + s.getFrequency() + " " + s.getTimeUnit().getValue().toLowerCase() + "(s)\n";

                Task newTask = new Task(
                        LocalDate.now(),
                        LocalDate.now().plusWeeks(1),
                        false,
                        s.getTask().getDescription(),
                        taskType,
                        s.getTask().getVehicle(),
                        s.getTask().getInstructions(),
                        s.getTask().getNotes());
                taskService.addNewTask(newTask);
                s.setLastExecutionDate(LocalDate.now());
                s.setLastExecutionTime(LocalTime.now());
                s.setNextExecutionDate(LocalDate.now().plusDays(s.getFrequency() * s.getTimeUnit().getDays()));
                scheduleController.updateSchedule(s.getSchedId(), s);
            }

        }
        log.info("Scheduling Tasks: " + scheduleInfo);

    }
}
