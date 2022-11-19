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
@RequestMapping(path = "api/task-types")
public class TaskTypeController {
    
    private final TaskTypeService taskTypeService;

    @Autowired
    public TaskTypeController(TaskTypeService taskTypeService) {
        this.taskTypeService = taskTypeService;
    }

    @GetMapping
    public List<TaskType> getTaskTypes(){
        return taskTypeService.getTaskTypes();
    }

    @GetMapping(path = "{taskTypeId}")
    public TaskType getTaskType(@PathVariable Long taskTypeId){
        return taskTypeService.getTaskTypeById(taskTypeId).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping
    public void registerNewTaskType(@RequestBody TaskType taskType) {
        taskTypeService.addNewTaskType(taskType);
    }

    @DeleteMapping(path = "{taskTypeId}")
    public void deleteTaskType(@PathVariable("taskTypeId") Long taskTypeId){
        taskTypeService.deleteTaskType(taskTypeId);
    }

    @PutMapping(path = "{taskTypeId}")
    public ResponseEntity<?> updateTaskType(
            @PathVariable("taskTypeId") Long taskTypeId,
            @RequestBody TaskType taskType) {
        taskTypeService.updateTaskType(taskTypeId, taskType.getValue(), taskType.getDescription(), taskType.getActive());
        return ResponseEntity.ok(taskType);
    }
}
