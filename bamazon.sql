-- MySQL dump 10.13  Distrib 5.7.21, for osx10.13 (x86_64)
--
-- Host: localhost    Database: bamazon
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `bamazon`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bamazon`;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `item_id` int(30) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `department_name` varchar(30) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(30) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_id` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Garbanzo Beans','Canned Goods',3.29,349),(2,'5 lb. Bag of Rice','Pantry Essentials',12.99,694),(3,'Walnuts','Self-stable Goods',7.99,22),(4,'Sesame Seeds','Spices',4.75,10),(5,'Frozen Peas and Carrots','Frozen Vegetables',6.90,300),(6,'Frozen Cauliflower','Frozen Vegetables',4.30,207),(7,'Black Beans','Canned Goods',2.99,457),(8,'Cayenne Pepper','Spices',5.69,32),(9,'Penne Pasta','Self-stable Goods',4.99,345),(10,'2 lb. Bag of Rice','Pantry Essentials',7.69,389);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-15 22:24:58

-- added column to products after creation and added values

ALTER TABLE products ADD product_sales DECIMAL(30,2) DEFAULT 0;

-- add grocery ids to the product table

ALTER TABLE products Add department_id integer;

ALTER TABLE products Add FOREIGN KEY (department_id) REFERENCES departments(department_id);

update products SET department_id = 1 where department_name = "Canned Goods";

update products SET department_id = 2 where department_name = "Pantry Essentials";

update products SET department_id = 3 where department_name = "Frozen Vegetables";

update products SET department_id = 4 where department_name = "Spices";

update products SET department_id = 5 where department_name = "Shelf-Stable Goods";

-- department table

DROP TABLE IF EXISTS "departments";

CREATE TABLE departments (
	department_id int(30) not null AUTO_INCREMENT,
	department_name varchar(30) DEFAULT NULL,
	over_head_costs decimal(30,2) DEFAULT NULL,
	primary key(department_id)
);

INSERT INTO departments(department_name, over_head_costs) VALUES ("Canned Goods", 3453), ("Pantry Essentials", 4322), ("Frozen Vegetables", 12200), ("Spices", 9000);

INSERT INTO departments(department_name, over_head_costs) VALUES ("Shelf-Stable Goods", 34889);
