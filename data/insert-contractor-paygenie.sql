insert into Contractor (company_name ,first_name ,surname ,address ,town ,county ,postCode ,phone ,mobile ,fax ,email ,utr ,tlcins ,fee, payer_type)  values('Tarbrook Design & Build Ltd','Sherman','Webb','Hainualt House Billet Road','Romford','Essex','RM6 5SX','2085989380','','','','1973718006','10','0','Gross Payer')
insert into Contractor (company_name ,first_name ,surname ,address ,town ,county ,postCode ,phone ,mobile ,fax ,email ,utr ,tlcins ,fee, payer_type)  values('CRT Interiors Ltd','','','Lake Forest House Forest Road','Ilford','Essex','IG6 3HJ','0208 114 8150','','','','6881200172','0','10','Gross Payer')
insert into Contractor (company_name ,first_name ,surname ,address ,town ,county ,postCode ,phone ,mobile ,fax ,email ,utr ,tlcins ,fee, payer_type)  values('Maxform','','','Lake Forest House Forest Road','Ilford','Essex','IG6 3HJ','0208 114 8150','','','','2506022482','0','10','Gross Payer')


select * from SubContractor where currentJob = 0;