create table Owner(
id int primary key auto_increment,
dated timestamp default current_timestamp,
owner_name varchar(100),
address varchar(100),
town varchar(100),
county varchar(100),
postcode varchar(10),
country varchar(100),
telUK varchar(15),
faxUK varchar(15),
telOverseas varchar(15),
faxOverseas varchar(15)

);

create table Contractor(

id int primary key ,
dated timestamp default current_timestamp,
deleted_datetime timestamp ,
deleted bit,
company_name varchar(100),
first_name varchar(100),
surname varchar(100),
address varchar(100),
town varchar(100),
county varchar(100),
postCode varchar(15),
phone varchar(15),
mobile varchar(15),
fax varchar(15),
email varchar(100),
utr varchar(50),
tlcins int,
payer_type varchar(35),
fee float(7,2),
notes text

);

create table Payroll
(
id int primary key auto_increment,
dated timestamp default current_timestamp,
contractor_id int,
subcontractor_id int,
week_ending date,
payment_date date,
month_ending_date date,
deduction_rate float(7,2),
vat_rate float(5,2),
gross float(15,2),
fee float(10,2),
materials int,
locked bool

);


create table SubContractor(
id int primary key auto_increment,
dated timestamp default current_timestamp,
contractor_id int,
company_name varchar(100),
first_name varchar(100),
surname varchar(100),
address varchar(100),
town varchar(100),
county varchar(100),
postCode varchar(15),
phone varchar(15),
mobile varchar(15),
fax varchar(15),
email varchar(100),
utr varchar(50),
nino varchar(50),
verification_no varchar(100),
deduction_rate float(7,2),
vat_rate float(5,2),
services varchar(500),
active bool,
contract_recd bool,
notes text
);

create table Documents
(
id int primary key auto_increment,
dated timestamp default current_timestamp,
object_id int,
object_type varchar(35), 
display_name varchar(100),
doctype varchar(35),
link varchar(255),
notes text,
content blob
);
go
CREATE TABLE tblPayrollDeductions (
id int primary key AUTO_INCREMENT, 
dated timestamp default current_timestamp,
payroll_id INT NOT NULL, 
description VARCHAR(255),
amount float(15,3) NOT NULL
);