package com.srd2.vehicleMaintenance.Task;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskTypeService {

    private final TaskTypeRepository taskTypeRepository;

    @Autowired
    public TaskTypeService(TaskTypeRepository taskTypeRepository) {
        this.taskTypeRepository = taskTypeRepository;
    }

    public List<TaskType> getTaskTypes(){
        return taskTypeRepository.findAll();
    }

    public Optional<TaskType> getTaskTypeById(Long taskTypeId) {
        return taskTypeRepository.findById(taskTypeId);
    }

    public void addNewTaskType(TaskType taskType) {
        Optional<TaskType> taskTypeOptional = taskTypeRepository
            .findTaskTypeById(taskType.getTypeId());
        if (taskTypeOptional.isPresent()) {
            throw new IllegalStateException("TaskType ID is taken");
        }
        taskTypeRepository.save(taskType);
    }

    public void deleteTaskType(Long taskTypeId){
        
        boolean exists = taskTypeRepository.existsById(taskTypeId);
        if (!exists) {
            throw new IllegalStateException(
                "TaskType with id " + taskTypeId + " does not exist");
        }
        taskTypeRepository.deleteById(taskTypeId);
    }

    @Transactional
    public void updateTaskType(Long typeId, String value, String description, Boolean active) {
        TaskType taskType = taskTypeRepository.findById(typeId)
            .orElseThrow(() -> new IllegalStateException(
                "TaskType with ID " + typeId + " does not exist")
            );

        if (value != null &&
            value.length() > 0 &&
            value.length() <= 20) {
            if(!Objects.equals(taskType.getValue(), value)) {
                taskType.setValue(value);
            }
            } else {
                throw new IllegalStateException("Value must be 1-20 characters.");
            }
        if (description != null &&
            description.length() > 0 &&
            description.length() <= 75) {
            if (!Objects.equals(taskType.getDescription(), description)) {
                taskType.setDescription(description);
            }
            } else {
                throw new IllegalStateException("Value must be 1-75 characters.");
            }
        if (active != null){
            if(!Objects.equals(taskType.getActive(), active)) {
                taskType.setActive(active);
            } 
        } else {
            throw new IllegalStateException("An error occurred");
        }
    }

    
}
