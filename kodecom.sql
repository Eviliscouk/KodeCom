DROP TABLE IF EXISTS `Batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Batch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fileName` varchar(100) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `isComplete` bit(1) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Batch`
--


--
-- Table structure for table `Contractor`
--

DROP TABLE IF EXISTS `Contractor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contractor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `company_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `county` varchar(100) DEFAULT NULL,
  `postCode` varchar(15) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `utr` varchar(50) DEFAULT NULL,
  `tlcins` int(11) DEFAULT NULL,
  `payer_type` varchar(35) DEFAULT NULL,
  `notes` text,
  `fee` float(10,2) DEFAULT NULL,
  `deleted_datetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted` bit(1) DEFAULT NULL,
  `bankAccount` varchar(50) DEFAULT NULL,
  `bankSortCode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contractor`
--


--
-- Table structure for table `ContractorJobs`
--

DROP TABLE IF EXISTS `ContractorJobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContractorJobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `c_ID` int(11) DEFAULT NULL,
  `jobRef` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `isOpen` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContractorJobs`
--


--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `object_id` int(11) DEFAULT NULL,
  `object_type` varchar(35) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `doctype` varchar(35) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `notes` text,
  `content` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--


--
-- Table structure for table `Owner`
--

DROP TABLE IF EXISTS `Owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `owner_name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `county` varchar(100) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `telUK` varchar(15) DEFAULT NULL,
  `faxUK` varchar(15) DEFAULT NULL,
  `telOverseas` varchar(15) DEFAULT NULL,
  `faxOverseas` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Owner`
--


--
-- Table structure for table `Payroll`
--

DROP TABLE IF EXISTS `Payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contractor_id` int(11) DEFAULT NULL,
  `subcontractor_id` int(11) DEFAULT NULL,
  `week_ending` date DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `month_ending_date` date DEFAULT NULL,
  `deduction_rate` float(7,2) DEFAULT NULL,
  `vat_rate` float(5,2) DEFAULT NULL,
  `gross` float(15,2) DEFAULT NULL,
  `fee` float(10,2) DEFAULT NULL,
  `materials` int(11) DEFAULT NULL,
  `locked` tinyint(1) DEFAULT NULL,
  `jobId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18563 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payroll`


--
-- Table structure for table `SubContractor`
--

DROP TABLE IF EXISTS `SubContractor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubContractor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contractor_id` int(11) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `county` varchar(100) DEFAULT NULL,
  `postCode` varchar(15) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `utr` varchar(50) DEFAULT NULL,
  `nino` varchar(50) DEFAULT NULL,
  `companyRegNo` varchar(50) DEFAULT NULL,
  `verification_no` varchar(100) DEFAULT NULL,
  `deduction_rate` float(7,2) DEFAULT NULL,
  `vat_rate` float(5,2) DEFAULT NULL,
  `services` varchar(500) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `contract_recd` tinyint(1) DEFAULT NULL,
  `notes` text,
  `bankAccount` varchar(50) DEFAULT NULL,
  `bankSortCode` varchar(50) DEFAULT NULL,
  `currentJob` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubContractor`
--


--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_loggedIn_datetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `active` bit(1) DEFAULT b'1',
  `first_name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  `databaseId` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`


--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--



--
-- Table structure for table `tblPayrollDeductions`
--

DROP TABLE IF EXISTS `tblPayrollDeductions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblPayrollDeductions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payroll_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `amount` float(15,3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;


