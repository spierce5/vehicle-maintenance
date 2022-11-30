package com.srd2.vehicleMaintenance.Schedule;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.srd2.vehicleMaintenance.Task.Task;

@Entity
@Table
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schedId;
    private Integer frequency;
    private Boolean active;
    @ManyToOne
    @JoinColumn(name = "unit_id")
    private TimeUnit timeUnit;
    @ManyToOne
    @JoinColumn(name = "task_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Task task;

    /*
     * TODO:: Need Last Execution, Next Execution
     */

    public Schedule() {

    }

    public Schedule(Integer frequency, Boolean active, TimeUnit timeUnit, Task task) {
        this.frequency = frequency;
        this.active = active;
        this.timeUnit = timeUnit;
        this.task = task;
    }

    public Long getSchedId() {
        return schedId;
    }

    public Integer getFrequency() {
        return frequency;
    }

    public void setFrequency(Integer frequency) {
        this.frequency = frequency;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public TimeUnit getTimeUnit() {
        return timeUnit;
    }

    public void setTimeUnit(TimeUnit timeUnit) {
        this.timeUnit = timeUnit;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

}
