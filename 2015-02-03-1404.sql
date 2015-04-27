-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.20 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for traveladmin
DROP DATABASE IF EXISTS `traveladmin`;
CREATE DATABASE IF NOT EXISTS `traveladmin` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `traveladmin`;


-- Dumping structure for table traveladmin.log
DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `idLog` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL DEFAULT '1',
  `message` text NOT NULL,
  `location` varchar(50) DEFAULT 'no location',
  `userId` int(11) DEFAULT '-1',
  `currentDate` datetime NOT NULL,
  PRIMARY KEY (`idLog`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table traveladmin.log: ~2 rows (approximately)
DELETE FROM `log`;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` (`idLog`, `level`, `message`, `location`, `userId`, `currentDate`) VALUES
	(1, 1, 'SELECT * FROM user_provide WHERE email = \'a@a\'', 'Select', 0, '2015-01-29 19:58:15'),
	(2, 1, 'SELECT * FROM user_provide WHERE email = \'a@a\'', 'Select', 0, '2015-01-29 19:58:30');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;


-- Dumping structure for table traveladmin.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `iduser` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sessionid` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(10) NOT NULL,
  `creationdate` datetime NOT NULL,
  `type` int(10) NOT NULL,
  KEY `Index 1` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table traveladmin.user: ~1 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`iduser`, `name`, `password`, `email`, `sessionid`, `status`, `creationdate`, `type`) VALUES
	(5, 'Erwin Bader', 'e10adc3949ba59abbe56e057f20f883e', 'a@a', '8a5d5b9117e49b7f8ed49761489c2c8a', 1, '2015-02-03 11:58:12', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


-- Dumping structure for table traveladmin.user_extra
DROP TABLE IF EXISTS `user_extra`;
CREATE TABLE IF NOT EXISTS `user_extra` (
  `iduserextra` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `fieldName` varchar(100) NOT NULL,
  `fieldValue` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `ispublic` int(10) NOT NULL,
  PRIMARY KEY (`iduserextra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table traveladmin.user_extra: ~0 rows (approximately)
DELETE FROM `user_extra`;
/*!40000 ALTER TABLE `user_extra` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_extra` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
