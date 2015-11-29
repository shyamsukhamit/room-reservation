-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 07, 2015 at 11:20 PM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `room`
--

-- --------------------------------------------------------

--
-- Table structure for table `deleted`
--

CREATE TABLE IF NOT EXISTS `deleted` (
  `date` date NOT NULL,
  `slot` int(2) NOT NULL,
  `to_slot` int(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `school` varchar(20) NOT NULL,
  `purpose` varchar(500) NOT NULL,
  `key_benefits` varchar(500) NOT NULL,
  `no_aud` int(4) NOT NULL,
  `type` varchar(20) NOT NULL,
  `guest_name` varchar(100) NOT NULL,
  `guest_details` varchar(500) NOT NULL,
  `uniq` char(18) NOT NULL,
  `eventid` varchar(20) NOT NULL,
  PRIMARY KEY (`date`,`slot`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `date` date NOT NULL,
  `slot` int(2) NOT NULL,
  `to_slot` int(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `school` varchar(50) NOT NULL,
  `purpose` varchar(500) NOT NULL,
  `key_benefits` varchar(500) NOT NULL,
  `no_aud` int(4) NOT NULL,
  `type` varchar(20) NOT NULL,
  `guest_name` varchar(100) NOT NULL,
  `guest_details` varchar(500) NOT NULL,
  `uniq` char(18) NOT NULL,
  `eventid` varchar(20) NOT NULL,
  PRIMARY KEY (`date`,`slot`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `unconfirmed`
--

CREATE TABLE IF NOT EXISTS `unconfirmed` (
  `uniq` char(18) NOT NULL,
  `data` varchar(2000) NOT NULL,
  PRIMARY KEY (`uniq`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
