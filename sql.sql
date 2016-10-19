# ************************************************************
# Sequel Pro SQL dump
# Version 4541
# Author URL: http://vishnudevarajan.com
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
# Author: Vishnu Prakash Devarajan
# Host: 127.0.0.1 (MySQL 5.5.50-0+deb8u1)
# Database: Test_database
# Generation Time: 2016-10-19 22:44:56 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table test
# ------------------------------------------------------------

DROP TABLE IF EXISTS `test`;

CREATE TABLE `test` (
  `sequence` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `when` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data` varchar(128) DEFAULT '',
  `token` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;

INSERT INTO `test` (`sequence`, `when`, `data`, `token`)
VALUES
	(1,'0000-00-00 00:00:00','ALL: Shouldn\'t Show','ABC1234'),
	(2,'0000-00-00 00:00:00','ALL: Shouldn\'t Show','ABC1234'),
	(3,'0000-00-00 00:00:00','ALL: Shouldn\'t Show','ABC1234'),
	(4,'0000-00-00 00:00:00','ALL: Shouldn\'t Show','ALL'),
	(5,'0000-00-00 00:00:00','ABC1235: Shouldn\'t Show','ABC1235'),
	(6,'0000-00-00 00:00:00','ALL: Here','ALL'),
	(7,'0000-00-00 00:00:00','ABC1234: Thanks','ABC1234'),
	(8,'0000-00-00 00:00:00','ALL: Message for all Users','ALL'),
	(9,'2016-10-20 10:47:09','ABC1235: This is a new message','ABC1235'),
	(10,'2016-10-20 10:47:43','ABC1234: This is another message','ABC1234'),
	(11,'2016-10-20 10:48:14','ALL: Thanks for listening','ALL');

/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
