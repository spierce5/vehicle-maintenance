package com.srd2.vehicleMaintenance.Schedule;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Entity
public class TimeUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unitId;
    private String value;
    private String description;
    /*
     * All time units will be defined in days. This is the smallest reasonable
     * measurement. Unit type will store either days or hours.
     * If unit type is days, the number of days will be converted on the frontend to
     * hours and vice-versa for display.
     */
    private Integer days;

    public TimeUnit() {
    }

    public TimeUnit(String value, String description, Integer days) {
        this.value = value;
        this.description = description;
        this.days = days;
    }

    public Long getUnitId() {
        return unitId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
