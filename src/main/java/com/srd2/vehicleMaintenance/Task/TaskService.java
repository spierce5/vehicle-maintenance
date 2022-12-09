package com.srd2.vehicleMaintenance.Task;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srd2.vehicleMaintenance.Vehicle.Vehicle;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long taskId) {
        return taskRepository.findById(taskId);
    }

    public void addNewTask(Task task) {
        Optional<Task> taskOptional = taskRepository
                .findTaskById(task.getTaskId());
        if (taskOptional.isPresent()) {
            throw new IllegalStateException("Task ID is taken");
        }
        if (!Objects.equals(task.getType().getValue(), "Template") && task.getDateDue() == null) {
            throw new IllegalStateException(
                    "Due date cannot be null when task is not a template. Given Type: " + task.getType().getValue());
        }
        task.setDateEntered(LocalDate.now());
        taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {

        boolean exists = taskRepository.existsById(taskId);
        if (!exists) {
            throw new IllegalStateException(
                    "Task with id " + taskId + " does not exist");
        }
        taskRepository.deleteById(taskId);
    }

    @Transactional
    public void updateTask(Long taskId, LocalDate dateEntered, LocalDate dateDue, Boolean complete, String description,
            TaskType type, Vehicle vehicle, String instructions, String notes) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException(
                        "Task with ID " + taskId + " does not exist"));

        if (description != null &&
                description.length() > 0 &&
                !Objects.equals(task.getDescription(), description)) {
            task.setDescription(description);
        }

        if (dateDue != null &&
                !Objects.equals(task.getDateDue(), dateDue)) {
            task.setDateDue(dateDue);
        }

        if (complete != null &&
                !Objects.equals(task.getComplete(), complete)) {
            task.setComplete(complete);
        }

        if (type != null &&
                !Objects.equals(task.getType(), type)) {
            task.setType(type);
        }
        if (vehicle != null &&
                !Objects.equals(task.getVehicle(), vehicle)) {
            task.setVehicle(vehicle);
        }
        if (notes != null &&
                notes.length() > 0 &&
                !Objects.equals(task.getNotes(), notes)) {
            task.setNotes(notes);
        }

        if (instructions != null &&
                instructions.length() > 0 &&
                !Objects.equals(task.getInstructions(), instructions)) {
            task.setInstructions(instructions);
        }
    }

}
