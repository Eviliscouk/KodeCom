mysql -u "paygenie_payG" -p "paygenie_Paygenie" < "Paygenie Subcontractor Records.sql"

mysql -u "paygenie_payG" -p "paygenie_KodeCom" < "insert-contractor_kodecom.sql"

insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (2,'TA', 'Tarbrook Design & Build Ltd',1); 

insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (3,'AR', 'A&R',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (3,'CC', 'Comprehensive Carpentry Services',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (3,'HP', 'H20 Plumbing',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (3,'RE', 'Regents',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (3,'RM', 'RM Brickworks',1);

insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'CM', 'CM Construction & Civil Engineering Ltd',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'DB', 'Dennis B Building Limted',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'FB', 'Foley Building Contracts',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'FW', 'Formworks',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'JF', 'J Young & Sons Ltd',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'KJ', 'KJR',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'SM', 'Smythe Decorations Limited',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'TC', 'Texo Construction',1);
insert into ContractorJobs (c_ID,jobRef,description, isOpen) values (4,'TS', 'Texo Scaffolding',1);

