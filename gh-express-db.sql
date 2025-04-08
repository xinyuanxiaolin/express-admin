-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: gh-express-db
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `filename` varchar(255) DEFAULT NULL COMMENT '文件存储名称',
  `type` varchar(255) DEFAULT NULL COMMENT '文件类型',
  `size` int(11) DEFAULT NULL COMMENT '文件大小',
  `suffix` varchar(255) DEFAULT NULL COMMENT '文件后缀',
  `path` longtext COMMENT '文件路径',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='文件表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES ('597002e0-9d7b-46ba-969f-7855cd064f79','11329209171995139576-(1).png','1673941753896-11329209171995139576-(1).png','image/png',2562379,'png','upload/2023-01-17/1673941753896-11329209171995139576-(1).png','2023-01-17 15:49:13','2023-01-17 15:49:13'),('5f6b32c5-8ce5-4164-9bf9-3eac45e1b75b','logo2.png','1744099059729-logo2.png','image/png',31136,'png','upload/2025-04-08\\1744099059729-logo2.png','2025-04-08 15:57:39','2025-04-08 15:57:39'),('8293acd4-9c59-470b-86e9-16d3475bd1dd','avatar.jpg','1689907163636-avatar.jpg','image/jpeg',428124,'jpg','upload/2023-07-21\\1689907163636-avatar.jpg','2023-07-21 10:39:23','2023-07-21 10:39:23'),('8b82a1fa-abf5-4b5b-ba5a-8c952b9aad8a','logo4.png','1744099090279-logo4.png','image/png',13115,'png','upload/2025-04-08\\1744099090279-logo4.png','2025-04-08 15:58:10','2025-04-08 15:58:10'),('c1528056-03e0-45fd-9c50-470e8d0dbd87','0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg','1689933193590-0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg','image/jpeg',13571,'jpeg','upload/2023-07-21\\1689933193590-0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg','2023-07-21 17:53:13','2023-07-21 17:53:13'),('c7cc788f-0527-4271-93f1-420f4f843e4e','æ°å»ºåºåå¹´æºèç½ç»å·¥ä½å®¤(ä¸ªä½å·¥åæ·).jpg','1744098022619-æ°å»ºåºåå¹´æºèç½ç»å·¥ä½å®¤(ä¸ªä½å·¥åæ·).jpg','image/jpeg',198630,'jpg','upload/2025-04-08\\1744098022619-æ°å»ºåºåå¹´æºèç½ç»å·¥ä½å®¤(ä¸ªä½å·¥åæ·).jpg','2025-04-08 15:40:22','2025-04-08 15:40:22'),('f54e892b-42c5-4f02-84b7-e791053d9850','éå±±æ¹åºç§çµäºå¨ç½ç»ä¿¡æ¯å·¥ä½å®¤(ä¸ªä½å·¥åæ·).jpg','1744097985700-éå±±æ¹åºç§çµäºå¨ç½ç»ä¿¡æ¯å·¥ä½å®¤(ä¸ªä½å·¥åæ·).jpg','image/jpeg',1292299,'jpg','upload/2025-04-08\\1744097985700-éå±±æ¹åºç§çµäºå¨ç½ç»ä¿¡æ¯å·¥ä½å®¤(ä¸ªä½å·¥åæ·).jpg','2025-04-08 15:39:45','2025-04-08 15:39:45');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` int(11) NOT NULL COMMENT '菜单类型 1.一级菜单 2.子菜单 3.按钮/权限',
  `name` varchar(255) NOT NULL COMMENT '菜单名称',
  `component` varchar(255) DEFAULT NULL COMMENT '前端组件',
  `url` varchar(255) DEFAULT NULL COMMENT '访问路径',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `sortno` int(11) DEFAULT NULL COMMENT '排序',
  `hidden` tinyint(1) DEFAULT NULL COMMENT '隐藏路由',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `perms` varchar(255) DEFAULT NULL COMMENT '权限字符',
  `parent_id` varchar(255) DEFAULT '0' COMMENT '父级id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES ('06ebb884-3348-4e65-840d-7dce839d7e31',2,'角色管理','/role/index','role','el-icon-s-custom',2,0,'2023-08-09 14:57:05','2025-04-08 15:54:07','admin','0'),('22b912e6-2b33-4c80-8db1-8c31a9f41b46',2,'菜单管理','/menu/index','menu','el-icon-menu',3,0,'2023-01-10 17:46:10','2025-04-08 15:54:17','admin','0'),('765c3841-551f-44fd-a830-de8230ea1601',2,'用户管理','/user/index','user','el-icon-user',1,0,'2023-01-10 17:45:42','2025-04-08 15:52:55','admin','0'),('b7e54af3-d886-4d78-bcd2-ed32bccd35f6',2,'文件管理','/file/index','file','el-icon-folder-opened',4,0,'2023-01-13 17:19:11','2025-04-08 15:54:23','admin','0'),('ff24a056-858d-437e-85bf-d9e0b2801e61',2,'个人信息','/userInfo/index','userInfo',NULL,1,1,'2023-07-25 15:04:27','2025-04-08 16:08:23',NULL,'0');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rolename` varchar(255) NOT NULL COMMENT '角色名称',
  `perms` varchar(255) DEFAULT NULL COMMENT '权限字符',
  `sortno` int(11) DEFAULT NULL COMMENT '排序',
  `status` int(11) DEFAULT '0' COMMENT '角色状态( 0 正常 1 停用)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('7da40d6e-cf5f-4f98-a75f-afad65cb46ba','超级管理员','admin',1,0,'2023-08-09 15:04:28','2025-04-08 15:55:56'),('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','普通用户','ab',1,0,'2025-04-08 15:10:05','2025-04-08 16:10:42');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_menu`
--

DROP TABLE IF EXISTS `role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_menu` (
  `role_id` varchar(36) NOT NULL COMMENT '角色ID',
  `menu_id` varchar(36) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='角色和菜单关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_menu`
--

LOCK TABLES `role_menu` WRITE;
/*!40000 ALTER TABLE `role_menu` DISABLE KEYS */;
INSERT INTO `role_menu` VALUES ('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','06ebb884-3348-4e65-840d-7dce839d7e31'),('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','22b912e6-2b33-4c80-8db1-8c31a9f41b46'),('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','765c3841-551f-44fd-a830-de8230ea1601'),('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','82e6881f-0497-4ee7-8ea1-23d5327f9c12'),('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','b7e54af3-d886-4d78-bcd2-ed32bccd35f6'),('9adb3190-dfb9-4bcb-91ff-d9a84d5e253e','ff24a056-858d-437e-85bf-d9e0b2801e61');
/*!40000 ALTER TABLE `role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL COMMENT '用户名称',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1e25c5c7-3ce3-4647-944f-adc292c1b9d5','admin','$2b$10$jm4PDgPvjj2JIGbUsMre6OS405mK5A4Iox8WmzcopoVuCPBjDG0VS','2022-09-29 13:42:31','2023-07-21 10:39:25'),('9c3ee17f-b97f-4e4a-b0db-3e01d2b6eb8f','test1','$2b$10$f0ojimELaxbxNlrmtQmYD.9P7Mbfca/NbO8eG3YAIjUmIh4Vsv/JG','2025-04-08 15:57:41','2025-04-08 16:01:44');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户ID',
  `role_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色中间表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('1e25c5c7-3ce3-4647-944f-adc292c1b9d5','7da40d6e-cf5f-4f98-a75f-afad65cb46ba'),('9c3ee17f-b97f-4e4a-b0db-3e01d2b6eb8f','9adb3190-dfb9-4bcb-91ff-d9a84d5e253e');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `userid` char(255) NOT NULL COMMENT '用户id',
  `avatar` text COMMENT '头像',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `phone` int(11) DEFAULT NULL COMMENT '手机号',
  `wechat` varchar(255) DEFAULT NULL COMMENT '微信号',
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('15fbd8cf-9acf-4e0c-87b6-14b6376ac214','upload/2023-07-21\\1689933193590-0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg','大人',333,'444'),('1e25c5c7-3ce3-4647-944f-adc292c1b9d5','upload/2025-04-08\\abb.png','超级管理员',NULL,NULL),('9c3ee17f-b97f-4e4a-b0db-3e01d2b6eb8f','upload/2025-04-08\\1744099090279-logo4.png','测试1',123,'123');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gh-express-db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08 16:21:15
