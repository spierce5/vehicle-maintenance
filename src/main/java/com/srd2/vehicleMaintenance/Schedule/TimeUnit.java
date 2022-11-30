package com.srd2.vehicleMaintenance.Schedule;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Table
@Entity
public class TimeUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unitId;
    private String value;
    private String description;
    /*
     * All time units will be defined in hours. This is the smallest reasonable
     * measurement. Unit type will store either days or hours.
     * If unit type is days, the number of days will be converted on the frontend to
     * hours and vice-versa for display.
     */
    private Integer hours;
    private String unitType;

    public TimeUnit() {
    }

    public TimeUnit(String value, String description, Integer hours, String unitType) {
        this.value = value;
        this.description = description;
        this.hours = hours;
        this.unitType = unitType;
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

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public Integer getDays() {
        if (Objects.equals(unitType, "DAYS") &&
                hours % 24 == 0) {
            return hours / 24;
        } else {
            return -1;
        }
    }

    public void setDays(Integer days) {
        if (Objects.equals(unitType, "DAYS") &&
                days > 0) {
            this.hours = days * 24;
        }
    }

    public String getUnitType() {
        return unitType;
    }

    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
