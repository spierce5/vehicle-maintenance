drop table if exists schedule;
drop table if exists maint_task;
drop table if exists vehicle;
drop table if exists task_type;
drop table if exists fd_time_unit;

create table fd_time_unit(
    unit_id serial primary key,
    description varchar(10)
);

create table vehicle(
    vehicle_id varchar(6) primary key,
    description varchar(50),
    year smallint,
    make varchar(50),
    model varchar(50),
    notes text
);

create table task_type(
    type_id varchar(6) primary key,
    description varchar(50),
    active bool
);

create table maint_task(
    task_id serial primary key,
    date_entered date,
    date_due date,
    description varchar(100),
    instructions text,
    notes text,
    type_id varchar(6) references task_type(type_id) not null,
    vehicle varchar(6) references vehicle(vehicle_id) not null
);

create table schedule(
    sched_id serial primary key,
    frequency integer not null,
    active bool,
    unit_id integer references fd_time_unit(unit_id) not null,
    task integer references maint_task(task_id) not null
);