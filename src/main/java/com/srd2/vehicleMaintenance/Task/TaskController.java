package com.srd2.vehicleMaintenance.Task;

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
@RequestMapping(path = "api/tasks")
public class TaskController {
    
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks(){
        return taskService.getTasks();
    }

    @GetMapping(path = "{taskId}")
    public Task getTask(@PathVariable Long taskId){
        return taskService.getTaskById(taskId).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping
    public void registerNewTask(@RequestBody Task task) {
        taskService.addNewTask(task);
    }

    @DeleteMapping(path = "{taskId}")
    public void deleteTask(@PathVariable("taskId") Long taskId){
        taskService.deleteTask(taskId);
    }

    @PutMapping(path = "{taskId}")
    public ResponseEntity<?> updateTask(
            @PathVariable("taskId") Long taskId,
            @RequestBody Task task) {
        taskService.updateTask(taskId, task.getDateEntered(), task.getDateDue(), task.getDescription(), task.getType(), task.getVehicle(), task.getInstructions(), task.getNotes());
        return ResponseEntity.ok(task);
    }
}
