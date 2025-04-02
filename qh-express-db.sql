/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : qh-express-db

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 09/08/2023 18:03:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件名称',
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件存储名称',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件类型',
  `size` int(11) NULL DEFAULT NULL COMMENT '文件大小',
  `suffix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件后缀',
  `path` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文件路径',
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文件表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('597002e0-9d7b-46ba-969f-7855cd064f79', '11329209171995139576-(1).png', '1673941753896-11329209171995139576-(1).png', 'image/png', 2562379, 'png', 'upload/2023-01-17/1673941753896-11329209171995139576-(1).png', '2023-01-17 15:49:13', '2023-01-17 15:49:13');
INSERT INTO `file` VALUES ('8293acd4-9c59-470b-86e9-16d3475bd1dd', 'avatar.jpg', '1689907163636-avatar.jpg', 'image/jpeg', 428124, 'jpg', 'upload/2023-07-21\\1689907163636-avatar.jpg', '2023-07-21 10:39:23', '2023-07-21 10:39:23');
INSERT INTO `file` VALUES ('c1528056-03e0-45fd-9c50-470e8d0dbd87', '0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg', '1689933193590-0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg', 'image/jpeg', 13571, 'jpeg', 'upload/2023-07-21\\1689933193590-0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg', '2023-07-21 17:53:13', '2023-07-21 17:53:13');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` int(11) NOT NULL COMMENT '菜单类型 1.一级菜单 2.子菜单 3.按钮/权限',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '前端组件',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '访问路径',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `sortno` int(11) NULL DEFAULT NULL COMMENT '排序',
  `hidden` tinyint(1) NULL DEFAULT NULL COMMENT '隐藏路由',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `perms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限字符',
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '父级id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('06ebb884-3348-4e65-840d-7dce839d7e31', 2, '角色管理', '/role/index', 'role', 'el-icon-s-custom', 2, 0, '2023-08-09 14:57:05', '2023-08-09 14:58:36', NULL, '0');
INSERT INTO `menu` VALUES ('22b912e6-2b33-4c80-8db1-8c31a9f41b46', 1, '菜单管理', '/menu/index', 'menu', 'el-icon-menu', 3, 0, '2023-01-10 17:46:10', '2023-08-09 14:57:39', NULL, '0');
INSERT INTO `menu` VALUES ('765c3841-551f-44fd-a830-de8230ea1601', 1, '用户管理', '/user/index', 'user', 'el-icon-user', 1, 0, '2023-01-10 17:45:42', '2023-07-19 11:20:12', NULL, '0');
INSERT INTO `menu` VALUES ('8543d8bf-8fdf-4199-95e5-ea593b443b17', 2, '2', NULL, '2', NULL, 1, 0, '2023-08-09 17:28:01', '2023-08-09 17:28:01', NULL, 'f0cb11ce-11bf-409a-862c-c21b4326eccb');
INSERT INTO `menu` VALUES ('b7e54af3-d886-4d78-bcd2-ed32bccd35f6', 1, '文件管理', '/file/index', 'file', 'el-icon-folder-opened', 4, 0, '2023-01-13 17:19:11', '2023-08-09 14:57:43', NULL, '0');
INSERT INTO `menu` VALUES ('f0cb11ce-11bf-409a-862c-c21b4326eccb', 2, '1', '1', '1', '1', 1, 0, '2023-08-09 17:15:44', '2023-08-09 17:15:44', NULL, '765c3841-551f-44fd-a830-de8230ea1601');
INSERT INTO `menu` VALUES ('ff24a056-858d-437e-85bf-d9e0b2801e61', 1, '个人信息', '/userInfo/index', 'userInfo', NULL, 1, 1, '2023-07-25 15:04:27', '2023-07-25 15:04:27', NULL, '0');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rolename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `perms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限字符',
  `sortno` int(11) NULL DEFAULT NULL COMMENT '排序',
  `status` int(11) NULL DEFAULT NULL COMMENT '角色状态( 0 正常 1 停用)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('452070e5-dda8-485f-b45b-ac47910238a9', '1', '1', 1, NULL, '2023-08-09 18:00:17', '2023-08-09 18:00:17');
INSERT INTO `role` VALUES ('7da40d6e-cf5f-4f98-a75f-afad65cb46ba', '超级管理员', 'admin', 1, NULL, '2023-08-09 15:04:28', '2023-08-09 15:04:28');
INSERT INTO `role` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', '1', '1', 1, NULL, '2023-08-09 18:01:29', '2023-08-09 18:01:29');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色ID',
  `menu_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色和菜单关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', '06ebb884-3348-4e65-840d-7dce839d7e31');
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', '22b912e6-2b33-4c80-8db1-8c31a9f41b46');
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', '765c3841-551f-44fd-a830-de8230ea1601');
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', '8543d8bf-8fdf-4199-95e5-ea593b443b17');
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', 'b7e54af3-d886-4d78-bcd2-ed32bccd35f6');
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', 'f0cb11ce-11bf-409a-862c-c21b4326eccb');
INSERT INTO `role_menu` VALUES ('ed39e500-75a4-4a34-b6d8-202fd83fe367', 'ff24a056-858d-437e-85bf-d9e0b2801e61');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名称',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('15fbd8cf-9acf-4e0c-87b6-14b6376ac214', '111', '$2b$10$wcyPycPAh0b0616SGAq07OgR1st3OqnAiTrd0iuSHSnIC2tZnNUgi', '2023-07-20 10:55:50', '2023-07-26 17:20:54');
INSERT INTO `user` VALUES ('1e25c5c7-3ce3-4647-944f-adc292c1b9d5', 'admin', '$2b$10$jm4PDgPvjj2JIGbUsMre6OS405mK5A4Iox8WmzcopoVuCPBjDG0VS', '2022-09-29 13:42:31', '2023-07-21 10:39:25');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `userid` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户id',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '头像',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `phone` int(11) NULL DEFAULT NULL COMMENT '手机号',
  `wechat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信号',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('15fbd8cf-9acf-4e0c-87b6-14b6376ac214', 'upload/2023-07-21\\1689933193590-0b5f3b487eb8dd6d3232a4d1940ad1dd.jpeg', '大人', 333, '444', '2023-07-20 10:55:50', '2023-07-21 17:53:16');
INSERT INTO `userinfo` VALUES ('1e25c5c7-3ce3-4647-944f-adc292c1b9d5', 'upload/2023-07-21\\1689907163636-avatar.jpg', '超级管理员', NULL, NULL, '2023-07-21 10:01:26', '2023-07-21 10:39:25');

SET FOREIGN_KEY_CHECKS = 1;
