-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.20 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para traveladmin
DROP DATABASE IF EXISTS `traveladmin`;
CREATE DATABASE IF NOT EXISTS `traveladmin` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `traveladmin`;


-- Volcando estructura para tabla traveladmin.bus
DROP TABLE IF EXISTS `bus`;
CREATE TABLE IF NOT EXISTS `bus` (
  `idbus` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `servicetype` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `price` double DEFAULT NULL,
  KEY `Índice 1` (`idbus`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla traveladmin.bus: ~9 rows (aproximadamente)
DELETE FROM `bus`;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` (`idbus`, `name`, `detail`, `servicetype`, `userid`, `price`) VALUES
	(1, 'chvea', '123', 1, 5, 123),
	(2, 'asd', 'asd', 1, 5, 1231),
	(3, 'cheheee', 'eeee', 2, 5, 123),
	(4, 'asd', 'asd', 1, 5, 123),
	(5, 'asd', 'asd', 3, 5, 123),
	(6, 'wer', 'wer', 1, 5, 123123),
	(7, 'chee', '123', 1, 5, 123),
	(8, 'Chev', '1111', 1, 5, 123),
	(9, 'asd', 'asd', 1, 5, 123),
	(10, 'Santander', 'Rio', 1, 5, 400);
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;


-- Volcando estructura para tabla traveladmin.bus_row
DROP TABLE IF EXISTS `bus_row`;
CREATE TABLE IF NOT EXISTS `bus_row` (
  `idrow` int(10) NOT NULL AUTO_INCREMENT,
  `idbus` int(10) NOT NULL,
  KEY `Índice 1` (`idrow`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla traveladmin.bus_row: ~25 rows (aproximadamente)
DELETE FROM `bus_row`;
/*!40000 ALTER TABLE `bus_row` DISABLE KEYS */;
INSERT INTO `bus_row` (`idrow`, `idbus`) VALUES
	(1, 3),
	(2, 4),
	(3, 5),
	(4, 6),
	(5, 7),
	(6, 7),
	(7, 7),
	(8, 7),
	(9, 7),
	(10, 8),
	(11, 8),
	(12, 8),
	(13, 8),
	(14, 8),
	(15, 8),
	(16, 9),
	(17, 9),
	(18, 9),
	(19, 9),
	(20, 10),
	(21, 10),
	(22, 10),
	(23, 10),
	(24, 10),
	(25, 10);
/*!40000 ALTER TABLE `bus_row` ENABLE KEYS */;


-- Volcando estructura para tabla traveladmin.bus_rows_info
DROP TABLE IF EXISTS `bus_rows_info`;
CREATE TABLE IF NOT EXISTS `bus_rows_info` (
  `idrowinfo` int(10) NOT NULL AUTO_INCREMENT,
  `type` int(10) NOT NULL,
  `chairnumber` int(10) DEFAULT NULL,
  `idrow` int(10) NOT NULL,
  KEY `Índice 1` (`idrowinfo`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla traveladmin.bus_rows_info: ~51 rows (aproximadamente)
DELETE FROM `bus_rows_info`;
/*!40000 ALTER TABLE `bus_rows_info` DISABLE KEYS */;
INSERT INTO `bus_rows_info` (`idrowinfo`, `type`, `chairnumber`, `idrow`) VALUES
	(1, 1, 16, 19),
	(2, 1, 1, 16),
	(3, 1, 2, 16),
	(4, 2, -1, 16),
	(5, 1, 3, 16),
	(6, 1, 4, 16),
	(7, 1, 5, 17),
	(8, 1, 6, 17),
	(9, 2, -1, 17),
	(10, 1, 7, 17),
	(11, 1, 8, 17),
	(12, 1, 9, 18),
	(13, 1, 10, 18),
	(14, 2, -1, 18),
	(15, 1, 11, 18),
	(16, 1, 12, 18),
	(17, 1, 13, 19),
	(18, 1, 14, 19),
	(19, 2, -1, 19),
	(20, 1, 15, 19),
	(21, 1, 16, 19),
	(22, 1, 1, 20),
	(23, 1, 2, 20),
	(24, 2, -1, 20),
	(25, 1, 3, 20),
	(26, 1, 4, 20),
	(27, 1, 5, 21),
	(28, 1, 6, 21),
	(29, 2, -1, 21),
	(30, 1, 7, 21),
	(31, 1, 8, 21),
	(32, 1, 9, 22),
	(33, 1, 10, 22),
	(34, 2, -1, 22),
	(35, 1, 11, 22),
	(36, 1, 12, 22),
	(37, 1, 13, 23),
	(38, 1, 14, 23),
	(39, 2, -1, 23),
	(40, 1, 15, 23),
	(41, 1, 16, 23),
	(42, 1, 17, 24),
	(43, 1, 18, 24),
	(44, 2, -1, 24),
	(45, 1, 19, 24),
	(46, 1, 20, 24),
	(47, 1, 21, 25),
	(48, 1, 22, 25),
	(49, 2, -1, 25),
	(50, 1, 23, 25),
	(51, 1, 24, 25);
/*!40000 ALTER TABLE `bus_rows_info` ENABLE KEYS */;


-- Volcando estructura para tabla traveladmin.log
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

-- Volcando datos para la tabla traveladmin.log: ~2 rows (aproximadamente)
DELETE FROM `log`;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` (`idLog`, `level`, `message`, `location`, `userId`, `currentDate`) VALUES
	(1, 1, 'SELECT * FROM user_provide WHERE email = \'a@a\'', 'Select', 0, '2015-01-29 19:58:15'),
	(2, 1, 'SELECT * FROM user_provide WHERE email = \'a@a\'', 'Select', 0, '2015-01-29 19:58:30');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;


-- Volcando estructura para tabla traveladmin.user
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

-- Volcando datos para la tabla traveladmin.user: ~0 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`iduser`, `name`, `password`, `email`, `sessionid`, `status`, `creationdate`, `type`) VALUES
	(5, 'Erwin BaderB', 'e10adc3949ba59abbe56e057f20f883e', 'a@a', '94fb9647e1a1d39e54dbcf423ed110ba', 1, '2015-02-03 11:58:12', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


-- Volcando estructura para tabla traveladmin.user_extra
DROP TABLE IF EXISTS `user_extra`;
CREATE TABLE IF NOT EXISTS `user_extra` (
  `iduserextra` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `fieldName` varchar(100) NOT NULL,
  `fieldValue` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `ispublic` int(10) NOT NULL,
  PRIMARY KEY (`iduserextra`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla traveladmin.user_extra: ~0 rows (aproximadamente)
DELETE FROM `user_extra`;
/*!40000 ALTER TABLE `user_extra` DISABLE KEYS */;
INSERT INTO `user_extra` (`iduserextra`, `iduser`, `fieldName`, `fieldValue`, `status`, `ispublic`) VALUES
	(3, 5, 'neuvodat', 'asd', 1, 1);
/*!40000 ALTER TABLE `user_extra` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
