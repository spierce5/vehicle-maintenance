package com.srd2.vehicleMaintenance.Schedule;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeUnitService {

    private final TimeUnitRepository timeUnitRepository;

    @Autowired
    public TimeUnitService(TimeUnitRepository timeUnitRepository) {
        this.timeUnitRepository = timeUnitRepository;
    }

    public List<TimeUnit> getTimeUnits(){
        return timeUnitRepository.findAll();
    }

    public Optional<TimeUnit> getTimeUnitById(Long unitId) {
        return timeUnitRepository.findById(unitId);
    }

    public void addNewTimeUnit(TimeUnit timeUnit) {
        Optional<TimeUnit> timeUnitOptional = timeUnitRepository
            .findTimeUnitById(timeUnit.getUnitId());
        if (timeUnitOptional.isPresent()) {
            throw new IllegalStateException("TimeUnit ID is taken");
        }
        timeUnitRepository.save(timeUnit);
    }

    public void deleteTimeUnit(Long unitId){
        
        boolean exists = timeUnitRepository.existsById(unitId);
        if (!exists) {
            throw new IllegalStateException(
                "TimeUnit with id " + unitId + " does not exist");
        }
        timeUnitRepository.deleteById(unitId);
    }

    @Transactional
    public void updateTimeUnit(Long typeId, String value, String description) {
        TimeUnit timeUnit = timeUnitRepository.findById(typeId)
            .orElseThrow(() -> new IllegalStateException(
                "TimeUnit with ID " + typeId + " does not exist")
            );

        if (value != null &&
            value.length() > 0 &&
            value.length() <= 50 &&
            !Objects.equals(timeUnit.getValue(), value)) {
                timeUnit.setValue(value);
            }
        if (description != null &&
            description.length() > 0 &&
            description.length() <= 50 &&
            !Objects.equals(timeUnit.getDescription(), description)) {
                timeUnit.setDescription(description);
            }
    }

    
}
