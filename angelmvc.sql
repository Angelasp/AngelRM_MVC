/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50022
 Source Host           : localhost:3306
 Source Schema         : angelmvc

 Target Server Type    : MySQL
 Target Server Version : 50022
 File Encoding         : 65001

 Date: 21/07/2019 21:30:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for angel_city
-- ----------------------------
DROP TABLE IF EXISTS `angel_city`;
CREATE TABLE `angel_city`  (
  `PRONAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CITYNAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CITY_NO` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CAPITALCITY` int(11) 
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_city
-- ----------------------------
INSERT INTO `angel_city` VALUES ('北京', '北京市', '010', 1);
INSERT INTO `angel_city` VALUES ('上海', '上海市', '021', 1);
INSERT INTO `angel_city` VALUES ('天津', '天津市', '022', 1);
INSERT INTO `angel_city` VALUES ('重庆', '重庆市', '023', 1);
INSERT INTO `angel_city` VALUES ('广东', '广州市', '020', 1);
INSERT INTO `angel_city` VALUES ('四川', '成都市', '028', 1);
INSERT INTO `angel_city` VALUES (NULL, '岳阳市', '0730', 0);
INSERT INTO `angel_city` VALUES ('江苏', '南京市', '025', 1);
INSERT INTO `angel_city` VALUES (NULL, '衢州市', '0570', 0);
INSERT INTO `angel_city` VALUES (NULL, '昭通市', '0870', 0);
INSERT INTO `angel_city` VALUES (NULL, '韶关市', '0751', 0);
INSERT INTO `angel_city` VALUES (NULL, '涪陵市', '0810', 0);
INSERT INTO `angel_city` VALUES ('湖南', '长沙市', '0731', 1);
INSERT INTO `angel_city` VALUES (NULL, '无锡市', '0510', 0);
INSERT INTO `angel_city` VALUES ('浙江', '杭州市', '0571', 1);
INSERT INTO `angel_city` VALUES ('云南', '昆明市', '0871', 1);
INSERT INTO `angel_city` VALUES (NULL, '惠州市', '0752', 0);
INSERT INTO `angel_city` VALUES (NULL, '湘潭市', '0732', 0);
INSERT INTO `angel_city` VALUES (NULL, '镇江市', '0511', 0);
INSERT INTO `angel_city` VALUES (NULL, '湖州市', '0572', 0);
INSERT INTO `angel_city` VALUES (NULL, '大理市', '0872', 0);
INSERT INTO `angel_city` VALUES (NULL, '梅州市', '0753', 0);
INSERT INTO `angel_city` VALUES (NULL, '攀枝花', '0812', 0);
INSERT INTO `angel_city` VALUES (NULL, '株州市', '0733', 0);
INSERT INTO `angel_city` VALUES ('江苏', '苏州市', '0512', 0);
INSERT INTO `angel_city` VALUES (NULL, '嘉兴市', '0573', 0);
INSERT INTO `angel_city` VALUES ('云南', '红河市', '0873', 0);
INSERT INTO `angel_city` VALUES (NULL, '汕头市', '0754', 0);
INSERT INTO `angel_city` VALUES (NULL, '自贡市', '0813', 0);
INSERT INTO `angel_city` VALUES ('湖南', '衡阳市', '0734', 0);
INSERT INTO `angel_city` VALUES (NULL, '南通市', '0513', 0);
INSERT INTO `angel_city` VALUES ('浙江', '宁波市', '0574', 0);
INSERT INTO `angel_city` VALUES ('云南', '曲靖市', '0874', 0);
INSERT INTO `angel_city` VALUES ('广东', '深圳市', '0755', 0);
INSERT INTO `angel_city` VALUES (NULL, '永川市', '0814', 0);
INSERT INTO `angel_city` VALUES (NULL, '郴州市', '0735', 0);
INSERT INTO `angel_city` VALUES (NULL, '扬州市', '0514', 0);
INSERT INTO `angel_city` VALUES (NULL, '绍兴市', '0575', 0);
INSERT INTO `angel_city` VALUES (NULL, '保山市', '0875', 0);
INSERT INTO `angel_city` VALUES (NULL, '珠海市', '0756', 0);
INSERT INTO `angel_city` VALUES ('四川', '绵阳市', '0816', 0);
INSERT INTO `angel_city` VALUES ('湖南', '常德市', '0736', 0);
INSERT INTO `angel_city` VALUES (NULL, '盐城市', '0515', 0);
INSERT INTO `angel_city` VALUES (NULL, '台州市', '0576', 0);
INSERT INTO `angel_city` VALUES (NULL, '文山市', '0876', 0);
INSERT INTO `angel_city` VALUES (NULL, '佛山市', '0757', 0);
INSERT INTO `angel_city` VALUES (NULL, '南充市', '0817', 0);
INSERT INTO `angel_city` VALUES (NULL, '益阳市', '0737', 0);
INSERT INTO `angel_city` VALUES (NULL, '徐州市', '0516', 0);
INSERT INTO `angel_city` VALUES ('浙江', '温州市', '0577', 0);
INSERT INTO `angel_city` VALUES (NULL, '玉溪市', '0877', 0);
INSERT INTO `angel_city` VALUES (NULL, '肇庆市', '0758', 0);
INSERT INTO `angel_city` VALUES (NULL, '达县市', '0818', 0);
INSERT INTO `angel_city` VALUES (NULL, '娄底市', '0738', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮阴市', '0517', 0);
INSERT INTO `angel_city` VALUES (NULL, '丽水市', '0578', 0);
INSERT INTO `angel_city` VALUES (NULL, '楚雄市', '0878', 0);
INSERT INTO `angel_city` VALUES (NULL, '湛江市', '0759', 0);
INSERT INTO `angel_city` VALUES (NULL, '万县市', '0819', 0);
INSERT INTO `angel_city` VALUES (NULL, '邵阳市', '0739', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮安市', '0517', 0);
INSERT INTO `angel_city` VALUES (NULL, '金华市', '0579', 0);
INSERT INTO `angel_city` VALUES (NULL, '思茅市', '0879', 0);
INSERT INTO `angel_city` VALUES (NULL, '中山市', '0760', 0);
INSERT INTO `angel_city` VALUES (NULL, '遂宁市', '0825', 0);
INSERT INTO `angel_city` VALUES (NULL, '吉首市', '0743', 0);
INSERT INTO `angel_city` VALUES (NULL, '连云港', '0518', 0);
INSERT INTO `angel_city` VALUES (NULL, '舟山市', '0580', 0);
INSERT INTO `angel_city` VALUES (NULL, '景洪市', '0691', 0);
INSERT INTO `angel_city` VALUES (NULL, '河源市', '0762', 0);
INSERT INTO `angel_city` VALUES (NULL, '广安市', '0826', 0);
INSERT INTO `angel_city` VALUES (NULL, '张家界', '0744', 0);
INSERT INTO `angel_city` VALUES (NULL, '常州市', '0519', 0);
INSERT INTO `angel_city` VALUES (NULL, '潞西市', '0692', 0);
INSERT INTO `angel_city` VALUES (NULL, '清远市', '0763', 0);
INSERT INTO `angel_city` VALUES (NULL, '巴中市', '0827', 0);
INSERT INTO `angel_city` VALUES (NULL, '怀化市', '0745', 0);
INSERT INTO `angel_city` VALUES (NULL, '泰州市', '0523', 0);
INSERT INTO `angel_city` VALUES (NULL, '滁州市', '0550', 0);
INSERT INTO `angel_city` VALUES (NULL, '东川市', '0881', 0);
INSERT INTO `angel_city` VALUES (NULL, '顺德市', '0765', 0);
INSERT INTO `angel_city` VALUES (NULL, '泸州市', '0830', 0);
INSERT INTO `angel_city` VALUES (NULL, '永州冷', '0746', 0);
INSERT INTO `angel_city` VALUES ('安徽', '合肥市', '0551', 1);
INSERT INTO `angel_city` VALUES (NULL, '临沧市', '0883', 0);
INSERT INTO `angel_city` VALUES (NULL, '云浮市', '0766', 0);
INSERT INTO `angel_city` VALUES (NULL, '宜宾市', '0831', 0);
INSERT INTO `angel_city` VALUES (NULL, '防城港', '0770', 0);
INSERT INTO `angel_city` VALUES ('安徽', '蚌埠市', '0552', 0);
INSERT INTO `angel_city` VALUES (NULL, '六库市', '0886', 0);
INSERT INTO `angel_city` VALUES (NULL, '潮州市', '0768', 0);
INSERT INTO `angel_city` VALUES ('四川', '内江市', '0832', 0);
INSERT INTO `angel_city` VALUES (NULL, '忻州市', '0350', 0);
INSERT INTO `angel_city` VALUES ('广西', '南宁市', '0771', 1);
INSERT INTO `angel_city` VALUES (NULL, '芜湖市', '0553', 0);
INSERT INTO `angel_city` VALUES (NULL, '中甸市', '0887', 0);
INSERT INTO `angel_city` VALUES (NULL, '东莞市', '0769', 0);
INSERT INTO `angel_city` VALUES (NULL, '乐山市', '0833', 0);
INSERT INTO `angel_city` VALUES ('山西', '太原市', '0351', 1);
INSERT INTO `angel_city` VALUES ('广西', '柳州市', '0772', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮南市', '0554', 0);
INSERT INTO `angel_city` VALUES (NULL, '丽江市', '0888', 0);
INSERT INTO `angel_city` VALUES (NULL, '汕尾市', '0660', 0);
INSERT INTO `angel_city` VALUES (NULL, '西昌市', '0834', 0);
INSERT INTO `angel_city` VALUES ('山西', '大同市', '0352', 0);
INSERT INTO `angel_city` VALUES (NULL, '桂林市', '0773', 0);
INSERT INTO `angel_city` VALUES (NULL, '马鞍山', '0555', 0);
INSERT INTO `angel_city` VALUES (NULL, '潮阳市', '0661', 0);
INSERT INTO `angel_city` VALUES (NULL, '雅安市', '0835', 0);
INSERT INTO `angel_city` VALUES (NULL, '阳泉市', '0353', 0);
INSERT INTO `angel_city` VALUES (NULL, '梧州市', '0774', 0);
INSERT INTO `angel_city` VALUES (NULL, '安庆市', '0556', 0);
INSERT INTO `angel_city` VALUES ('吉林', '长春市', '0431', 1);
INSERT INTO `angel_city` VALUES (NULL, '阳江市', '0662', 0);
INSERT INTO `angel_city` VALUES (NULL, '康定市', '0836', 0);
INSERT INTO `angel_city` VALUES (NULL, '榆次市', '0354', 0);
INSERT INTO `angel_city` VALUES (NULL, '玉林市', '0775', 0);
INSERT INTO `angel_city` VALUES (NULL, '宿州市', '0557', 0);
INSERT INTO `angel_city` VALUES ('吉林', '吉林市', '0432', 0);
INSERT INTO `angel_city` VALUES (NULL, '揭西市', '0663', 0);
INSERT INTO `angel_city` VALUES (NULL, '马尔康', '0837', 0);
INSERT INTO `angel_city` VALUES (NULL, '长治市', '0355', 0);
INSERT INTO `angel_city` VALUES (NULL, '百色市', '0776', 0);
INSERT INTO `angel_city` VALUES (NULL, '阜阳市', '0558', 0);
INSERT INTO `angel_city` VALUES (NULL, '延吉市', '0433', 0);
INSERT INTO `angel_city` VALUES (NULL, '德阳市', '0838', 0);
INSERT INTO `angel_city` VALUES (NULL, '晋城市', '0356', 0);
INSERT INTO `angel_city` VALUES (NULL, '钦州市', '0777', 0);
INSERT INTO `angel_city` VALUES (NULL, '黄山市', '0559', 0);
INSERT INTO `angel_city` VALUES (NULL, '四平市', '0434', 0);
INSERT INTO `angel_city` VALUES ('青海', '西宁市', '0971', 1);
INSERT INTO `angel_city` VALUES (NULL, '广元市', '0839', 0);
INSERT INTO `angel_city` VALUES (NULL, '临汾市', '0357', 0);
INSERT INTO `angel_city` VALUES (NULL, '河池市', '0778', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮北市', '0561', 0);
INSERT INTO `angel_city` VALUES (NULL, '通化市', '0435', 0);
INSERT INTO `angel_city` VALUES (NULL, '海东市', '0972', 0);
INSERT INTO `angel_city` VALUES (NULL, '泸州市', '0840', 0);
INSERT INTO `angel_city` VALUES (NULL, '离石市', '0358', 0);
INSERT INTO `angel_city` VALUES (NULL, '北海市', '0779', 0);
INSERT INTO `angel_city` VALUES (NULL, '铜陵市', '0562', 0);
INSERT INTO `angel_city` VALUES (NULL, '白城市', '0436', 0);
INSERT INTO `angel_city` VALUES (NULL, '同仁市', '0973', 0);
INSERT INTO `angel_city` VALUES (NULL, '运城市', '0359', 0);
INSERT INTO `angel_city` VALUES (NULL, '宣城市', '0563', 0);
INSERT INTO `angel_city` VALUES (NULL, '辽源市', '0437', 0);
INSERT INTO `angel_city` VALUES (NULL, '共和市', '0974', 0);
INSERT INTO `angel_city` VALUES (NULL, '儋州市', '0890', 0);
INSERT INTO `angel_city` VALUES ('宁夏', '银川市', '0951', 1);
INSERT INTO `angel_city` VALUES (NULL, '六安市', '0564', 0);
INSERT INTO `angel_city` VALUES (NULL, '松原市', '0438', 0);
INSERT INTO `angel_city` VALUES (NULL, '玛沁市', '0975', 0);
INSERT INTO `angel_city` VALUES ('海南', '海口市', '0898', 1);
INSERT INTO `angel_city` VALUES (NULL, '拉萨市', '0891', 0);
INSERT INTO `angel_city` VALUES ('宁夏', '石嘴山', '0952', 0);
INSERT INTO `angel_city` VALUES (NULL, '巢湖市', '0565', 0);
INSERT INTO `angel_city` VALUES (NULL, '浑江市', '0439', 0);
INSERT INTO `angel_city` VALUES (NULL, '玉树市', '0976', 0);
INSERT INTO `angel_city` VALUES ('海南', '三亚市', '0899', 0);
INSERT INTO `angel_city` VALUES (NULL, '日喀则', '0892', 0);
INSERT INTO `angel_city` VALUES (NULL, '吴忠市', '0953', 0);
INSERT INTO `angel_city` VALUES (NULL, '贵池市', '0566', 0);
INSERT INTO `angel_city` VALUES (NULL, '珲春市', '0440', 0);
INSERT INTO `angel_city` VALUES (NULL, '德令哈', '0977', 0);
INSERT INTO `angel_city` VALUES (NULL, '山南市', '0893', 0);
INSERT INTO `angel_city` VALUES (NULL, '固原市', '0954', 0);
INSERT INTO `angel_city` VALUES (NULL, '新余市', '0790', 0);
INSERT INTO `angel_city` VALUES ('湖北', '武汉市', '027', 1);
INSERT INTO `angel_city` VALUES (NULL, '商丘市', '0370', 0);
INSERT INTO `angel_city` VALUES ('陕西', '西安市', '029', 1);
INSERT INTO `angel_city` VALUES ('贵州', '贵阳市', '0851', 1);
INSERT INTO `angel_city` VALUES ('辽宁', '沈阳市', '024', 1);
INSERT INTO `angel_city` VALUES ('江西', '南昌市', '0791', 1);
INSERT INTO `angel_city` VALUES ('湖北', '襄阳市', '0710', 0);
INSERT INTO `angel_city` VALUES ('河南', '郑州市', '0371', 1);
INSERT INTO `angel_city` VALUES (NULL, '咸阳市', '0910', 0);
INSERT INTO `angel_city` VALUES ('贵州', '遵义市', '0852', 0);
INSERT INTO `angel_city` VALUES (NULL, '铁岭市', '0410', 0);
INSERT INTO `angel_city` VALUES ('江西', '九江市', '0792', 0);
INSERT INTO `angel_city` VALUES (NULL, '鄂州市', '0711', 0);
INSERT INTO `angel_city` VALUES (NULL, '安阳市', '0372', 0);
INSERT INTO `angel_city` VALUES (NULL, '延安市', '0911', 0);
INSERT INTO `angel_city` VALUES (NULL, '安顺市', '0853', 0);
INSERT INTO `angel_city` VALUES ('辽宁', '大连市', '0411', 0);
INSERT INTO `angel_city` VALUES (NULL, '上饶市', '0793', 0);
INSERT INTO `angel_city` VALUES (NULL, '孝感市', '0712', 0);
INSERT INTO `angel_city` VALUES (NULL, '新乡市', '0373', 0);
INSERT INTO `angel_city` VALUES (NULL, '榆林市', '0912', 0);
INSERT INTO `angel_city` VALUES (NULL, '都均市', '0854', 0);
INSERT INTO `angel_city` VALUES (NULL, '鞍山市', '0412', 0);
INSERT INTO `angel_city` VALUES (NULL, '临川市', '0794', 0);
INSERT INTO `angel_city` VALUES (NULL, '黄州市', '0713', 0);
INSERT INTO `angel_city` VALUES (NULL, '许昌市', '0374', 0);
INSERT INTO `angel_city` VALUES (NULL, '渭南市', '0913', 0);
INSERT INTO `angel_city` VALUES (NULL, '凯里市', '0855', 0);
INSERT INTO `angel_city` VALUES (NULL, '抚顺市', '0413', 0);
INSERT INTO `angel_city` VALUES (NULL, '宜春市', '0795', 0);
INSERT INTO `angel_city` VALUES (NULL, '黄石市', '0714', 0);
INSERT INTO `angel_city` VALUES (NULL, '平顶山', '0375', 0);
INSERT INTO `angel_city` VALUES (NULL, '商洛市', '0914', 0);
INSERT INTO `angel_city` VALUES (NULL, '铜仁市', '0856', 0);
INSERT INTO `angel_city` VALUES (NULL, '本溪市', '0414', 0);
INSERT INTO `angel_city` VALUES (NULL, '吉安市', '0796', 0);
INSERT INTO `angel_city` VALUES (NULL, '咸宁市', '0715', 0);
INSERT INTO `angel_city` VALUES (NULL, '信阳市', '0376', 0);
INSERT INTO `angel_city` VALUES (NULL, '安康市', '0915', 0);
INSERT INTO `angel_city` VALUES (NULL, '毕节市', '0857', 0);
INSERT INTO `angel_city` VALUES (NULL, '丹东市', '0415', 0);
INSERT INTO `angel_city` VALUES (NULL, '赣州市', '0797', 0);
INSERT INTO `angel_city` VALUES (NULL, '荆沙市', '0716', 0);
INSERT INTO `angel_city` VALUES (NULL, '南阳市', '0377', 0);
INSERT INTO `angel_city` VALUES (NULL, '汉中市', '0916', 0);
INSERT INTO `angel_city` VALUES (NULL, '六盘水', '0858', 0);
INSERT INTO `angel_city` VALUES (NULL, '锦州市', '0416', 0);
INSERT INTO `angel_city` VALUES (NULL, '景德镇', '0798', 0);
INSERT INTO `angel_city` VALUES (NULL, '宜昌市', '0717', 0);
INSERT INTO `angel_city` VALUES (NULL, '开封市', '0378', 0);
INSERT INTO `angel_city` VALUES ('陕西', '宝鸡市', '0917', 0);
INSERT INTO `angel_city` VALUES (NULL, '兴义市', '0859', 0);
INSERT INTO `angel_city` VALUES (NULL, '营口市', '0417', 0);
INSERT INTO `angel_city` VALUES (NULL, '萍乡市', '0799', 0);
INSERT INTO `angel_city` VALUES (NULL, '恩施市', '0718', 0);
INSERT INTO `angel_city` VALUES ('河南', '洛阳市', '0379', 0);
INSERT INTO `angel_city` VALUES (NULL, '铜川市', '0919', 0);
INSERT INTO `angel_city` VALUES (NULL, '阜新市', '0418', 0);
INSERT INTO `angel_city` VALUES (NULL, '鹰潭市', '0701', 0);
INSERT INTO `angel_city` VALUES (NULL, '十堰市', '0719', 0);
INSERT INTO `angel_city` VALUES (NULL, '焦作市', '0391', 0);
INSERT INTO `angel_city` VALUES (NULL, '海拉尔', '0470', 0);
INSERT INTO `angel_city` VALUES (NULL, '辽阳市', '0419', 0);
INSERT INTO `angel_city` VALUES (NULL, '随枣市', '0722', 0);
INSERT INTO `angel_city` VALUES (NULL, '鹤壁市', '0392', 0);
INSERT INTO `angel_city` VALUES (NULL, '邯郸市', '0310', 0);
INSERT INTO `angel_city` VALUES (NULL, '朝阳市', '0421', 0);
INSERT INTO `angel_city` VALUES (NULL, '临夏市', '0930', 0);
INSERT INTO `angel_city` VALUES (NULL, '荆门市', '0724', 0);
INSERT INTO `angel_city` VALUES (NULL, '濮阳市', '0393', 0);
INSERT INTO `angel_city` VALUES ('河北', '石家庄', '0311', 1);
INSERT INTO `angel_city` VALUES ('内蒙古', '包头市', '0472', 0);
INSERT INTO `angel_city` VALUES (NULL, '盘锦市', '0427', 0);
INSERT INTO `angel_city` VALUES ('甘肃', '兰州市', '0931', 1);
INSERT INTO `angel_city` VALUES (NULL, '江汉市', '0728', 0);
INSERT INTO `angel_city` VALUES (NULL, '周口市', '0394', 0);
INSERT INTO `angel_city` VALUES ('河北', '保定市', '0312', 0);
INSERT INTO `angel_city` VALUES (NULL, '乌海市', '0473', 0);
INSERT INTO `angel_city` VALUES (NULL, '葫芦岛', '0429', 0);
INSERT INTO `angel_city` VALUES (NULL, '定西市', '0932', 0);
INSERT INTO `angel_city` VALUES (NULL, '漯河市', '0395', 0);
INSERT INTO `angel_city` VALUES (NULL, '张家口', '0313', 0);
INSERT INTO `angel_city` VALUES (NULL, '集宁市', '0474', 0);
INSERT INTO `angel_city` VALUES (NULL, '平凉市', '0933', 0);
INSERT INTO `angel_city` VALUES (NULL, '阿城市', '0450', 0);
INSERT INTO `angel_city` VALUES (NULL, '驻马店', '0396', 0);
INSERT INTO `angel_city` VALUES (NULL, '承德市', '0314', 0);
INSERT INTO `angel_city` VALUES (NULL, '通辽市', '0475', 0);
INSERT INTO `angel_city` VALUES (NULL, '菏泽市', '0530', 0);
INSERT INTO `angel_city` VALUES (NULL, '西峰市', '0934', 0);
INSERT INTO `angel_city` VALUES ('黑龙江', '哈尔滨', '0451', 1);
INSERT INTO `angel_city` VALUES (NULL, '三门峡', '0398', 0);
INSERT INTO `angel_city` VALUES (NULL, '唐山市', '0315', 0);
INSERT INTO `angel_city` VALUES (NULL, '赤峰市', '0476', 0);
INSERT INTO `angel_city` VALUES ('山东', '济南市', '0531', 1);
INSERT INTO `angel_city` VALUES (NULL, '武威市', '0935', 0);
INSERT INTO `angel_city` VALUES (NULL, '廊坊市', '0316', 0);
INSERT INTO `angel_city` VALUES (NULL, '东胜市', '0477', 0);
INSERT INTO `angel_city` VALUES ('山东', '青岛市', '0532', 0);
INSERT INTO `angel_city` VALUES (NULL, '张掖市', '0936', 0);
INSERT INTO `angel_city` VALUES (NULL, '牡丹江', '0453', 0);
INSERT INTO `angel_city` VALUES ('福建', '福州市', '0591', 1);
INSERT INTO `angel_city` VALUES (NULL, '沧州市', '0317', 0);
INSERT INTO `angel_city` VALUES (NULL, '临河市', '0478', 0);
INSERT INTO `angel_city` VALUES (NULL, '淄博市', '0533', 0);
INSERT INTO `angel_city` VALUES (NULL, '酒泉市', '0937', 0);
INSERT INTO `angel_city` VALUES (NULL, '佳木斯', '0454', 0);
INSERT INTO `angel_city` VALUES ('福建', '厦门市', '0592', 0);
INSERT INTO `angel_city` VALUES (NULL, '衡水市', '0318', 0);
INSERT INTO `angel_city` VALUES (NULL, '德州市', '0534', 0);
INSERT INTO `angel_city` VALUES ('甘肃', '天水市', '0938', 0);
INSERT INTO `angel_city` VALUES (NULL, '绥化市', '0455', 0);
INSERT INTO `angel_city` VALUES (NULL, '宁德市', '0593', 0);
INSERT INTO `angel_city` VALUES (NULL, '邢台市', '0319', 0);
INSERT INTO `angel_city` VALUES (NULL, '兰浩特', '0482', 0);
INSERT INTO `angel_city` VALUES (NULL, '烟台市', '0535', 0);
INSERT INTO `angel_city` VALUES (NULL, '甘南州', '0941', 0);
INSERT INTO `angel_city` VALUES (NULL, '黑河市', '0456', 0);
INSERT INTO `angel_city` VALUES (NULL, '莆田市', '0594', 0);
INSERT INTO `angel_city` VALUES (NULL, '秦皇岛', '0335', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮坊市', '0536', 0);
INSERT INTO `angel_city` VALUES (NULL, '白银市', '0943', 0);
INSERT INTO `angel_city` VALUES (NULL, '泉州市', '0595', 0);
INSERT INTO `angel_city` VALUES (NULL, '济宁市', '0537', 0);
INSERT INTO `angel_city` VALUES (NULL, '伊春市', '0458', 0);
INSERT INTO `angel_city` VALUES (NULL, '晋江市', '0595', 0);
INSERT INTO `angel_city` VALUES (NULL, '泰安市', '0538', 0);
INSERT INTO `angel_city` VALUES (NULL, '大庆市', '0459', 0);
INSERT INTO `angel_city` VALUES (NULL, '漳州市', '0596', 0);
INSERT INTO `angel_city` VALUES (NULL, '临沂市', '0539', 0);
INSERT INTO `angel_city` VALUES (NULL, '龙岩市', '0597', 0);
INSERT INTO `angel_city` VALUES (NULL, '三明市', '0598', 0);
INSERT INTO `angel_city` VALUES (NULL, '南平市', '0599', 0);
INSERT INTO `angel_city` VALUES (NULL, '加格达奇', '0457', 0);
INSERT INTO `angel_city` VALUES (NULL, '阿拉善左旗', '0483', 0);
INSERT INTO `angel_city` VALUES (NULL, '锡林浩特', '0479', 0);
INSERT INTO `angel_city` VALUES ('黑龙江', '齐齐哈尔', '0452', 0);
INSERT INTO `angel_city` VALUES ('内蒙古', '呼和浩特', '0471', 1);
INSERT INTO `angel_city` VALUES ('青海', '格尔木', '0979', 0);
INSERT INTO `angel_city` VALUES ('北京', '北京市', '10', 1);
INSERT INTO `angel_city` VALUES ('上海', '上海市', '21', 1);
INSERT INTO `angel_city` VALUES ('天津', '天津市', '22', 1);
INSERT INTO `angel_city` VALUES ('重庆', '重庆市', '23', 1);
INSERT INTO `angel_city` VALUES ('广东', '广州市', '20', 1);
INSERT INTO `angel_city` VALUES ('四川', '成都市', '28', 1);
INSERT INTO `angel_city` VALUES (NULL, '岳阳市', '730', 0);
INSERT INTO `angel_city` VALUES ('江苏', '南京市', '25', 1);
INSERT INTO `angel_city` VALUES (NULL, '衢州市', '570', 0);
INSERT INTO `angel_city` VALUES (NULL, '昭通市', '870', 0);
INSERT INTO `angel_city` VALUES (NULL, '韶关市', '751', 0);
INSERT INTO `angel_city` VALUES (NULL, '涪陵市', '810', 0);
INSERT INTO `angel_city` VALUES ('湖南', '长沙市', '731', 1);
INSERT INTO `angel_city` VALUES (NULL, '无锡市', '510', 0);
INSERT INTO `angel_city` VALUES ('浙江', '杭州市', '571', 1);
INSERT INTO `angel_city` VALUES ('云南', '昆明市', '871', 1);
INSERT INTO `angel_city` VALUES (NULL, '惠州市', '752', 0);
INSERT INTO `angel_city` VALUES (NULL, '湘潭市', '732', 0);
INSERT INTO `angel_city` VALUES (NULL, '镇江市', '511', 0);
INSERT INTO `angel_city` VALUES (NULL, '湖州市', '572', 0);
INSERT INTO `angel_city` VALUES (NULL, '大理市', '872', 0);
INSERT INTO `angel_city` VALUES (NULL, '梅州市', '753', 0);
INSERT INTO `angel_city` VALUES (NULL, '攀枝花', '812', 0);
INSERT INTO `angel_city` VALUES (NULL, '株州市', '733', 0);
INSERT INTO `angel_city` VALUES ('江苏', '苏州市', '512', 0);
INSERT INTO `angel_city` VALUES (NULL, '嘉兴市', '573', 0);
INSERT INTO `angel_city` VALUES ('云南', '红河市', '873', 0);
INSERT INTO `angel_city` VALUES (NULL, '汕头市', '754', 0);
INSERT INTO `angel_city` VALUES (NULL, '自贡市', '813', 0);
INSERT INTO `angel_city` VALUES ('湖南', '衡阳市', '734', 0);
INSERT INTO `angel_city` VALUES (NULL, '南通市', '513', 0);
INSERT INTO `angel_city` VALUES ('浙江', '宁波市', '574', 0);
INSERT INTO `angel_city` VALUES ('云南', '曲靖市', '874', 0);
INSERT INTO `angel_city` VALUES ('广东', '深圳市', '755', 0);
INSERT INTO `angel_city` VALUES (NULL, '永川市', '814', 0);
INSERT INTO `angel_city` VALUES (NULL, '郴州市', '735', 0);
INSERT INTO `angel_city` VALUES (NULL, '扬州市', '514', 0);
INSERT INTO `angel_city` VALUES (NULL, '绍兴市', '575', 0);
INSERT INTO `angel_city` VALUES (NULL, '保山市', '875', 0);
INSERT INTO `angel_city` VALUES (NULL, '珠海市', '756', 0);
INSERT INTO `angel_city` VALUES ('四川', '绵阳市', '816', 0);
INSERT INTO `angel_city` VALUES ('湖南', '常德市', '736', 0);
INSERT INTO `angel_city` VALUES (NULL, '盐城市', '515', 0);
INSERT INTO `angel_city` VALUES (NULL, '台州市', '576', 0);
INSERT INTO `angel_city` VALUES (NULL, '文山市', '876', 0);
INSERT INTO `angel_city` VALUES (NULL, '佛山市', '757', 0);
INSERT INTO `angel_city` VALUES (NULL, '南充市', '817', 0);
INSERT INTO `angel_city` VALUES (NULL, '益阳市', '737', 0);
INSERT INTO `angel_city` VALUES (NULL, '徐州市', '516', 0);
INSERT INTO `angel_city` VALUES ('浙江', '温州市', '577', 0);
INSERT INTO `angel_city` VALUES (NULL, '玉溪市', '877', 0);
INSERT INTO `angel_city` VALUES (NULL, '肇庆市', '758', 0);
INSERT INTO `angel_city` VALUES (NULL, '达县市', '818', 0);
INSERT INTO `angel_city` VALUES (NULL, '娄底市', '738', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮阴市', '517', 0);
INSERT INTO `angel_city` VALUES (NULL, '丽水市', '578', 0);
INSERT INTO `angel_city` VALUES (NULL, '楚雄市', '878', 0);
INSERT INTO `angel_city` VALUES (NULL, '湛江市', '759', 0);
INSERT INTO `angel_city` VALUES (NULL, '万县市', '819', 0);
INSERT INTO `angel_city` VALUES (NULL, '邵阳市', '739', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮安市', '517', 0);
INSERT INTO `angel_city` VALUES (NULL, '金华市', '579', 0);
INSERT INTO `angel_city` VALUES (NULL, '思茅市', '879', 0);
INSERT INTO `angel_city` VALUES (NULL, '中山市', '760', 0);
INSERT INTO `angel_city` VALUES (NULL, '遂宁市', '825', 0);
INSERT INTO `angel_city` VALUES (NULL, '吉首市', '743', 0);
INSERT INTO `angel_city` VALUES (NULL, '连云港', '518', 0);
INSERT INTO `angel_city` VALUES (NULL, '舟山市', '580', 0);
INSERT INTO `angel_city` VALUES (NULL, '景洪市', '691', 0);
INSERT INTO `angel_city` VALUES (NULL, '河源市', '762', 0);
INSERT INTO `angel_city` VALUES (NULL, '广安市', '826', 0);
INSERT INTO `angel_city` VALUES (NULL, '张家界', '744', 0);
INSERT INTO `angel_city` VALUES (NULL, '常州市', '519', 0);
INSERT INTO `angel_city` VALUES (NULL, '潞西市', '692', 0);
INSERT INTO `angel_city` VALUES (NULL, '清远市', '763', 0);
INSERT INTO `angel_city` VALUES (NULL, '巴中市', '827', 0);
INSERT INTO `angel_city` VALUES (NULL, '怀化市', '745', 0);
INSERT INTO `angel_city` VALUES (NULL, '泰州市', '523', 0);
INSERT INTO `angel_city` VALUES (NULL, '滁州市', '550', 0);
INSERT INTO `angel_city` VALUES (NULL, '东川市', '881', 0);
INSERT INTO `angel_city` VALUES (NULL, '顺德市', '765', 0);
INSERT INTO `angel_city` VALUES (NULL, '泸州市', '830', 0);
INSERT INTO `angel_city` VALUES (NULL, '永州冷', '746', 0);
INSERT INTO `angel_city` VALUES ('安徽', '合肥市', '551', 1);
INSERT INTO `angel_city` VALUES (NULL, '临沧市', '883', 0);
INSERT INTO `angel_city` VALUES (NULL, '云浮市', '766', 0);
INSERT INTO `angel_city` VALUES (NULL, '宜宾市', '831', 0);
INSERT INTO `angel_city` VALUES (NULL, '防城港', '770', 0);
INSERT INTO `angel_city` VALUES ('安徽', '蚌埠市', '552', 0);
INSERT INTO `angel_city` VALUES (NULL, '六库市', '886', 0);
INSERT INTO `angel_city` VALUES (NULL, '潮州市', '768', 0);
INSERT INTO `angel_city` VALUES ('四川', '内江市', '832', 0);
INSERT INTO `angel_city` VALUES (NULL, '忻州市', '350', 0);
INSERT INTO `angel_city` VALUES ('广西', '南宁市', '771', 1);
INSERT INTO `angel_city` VALUES (NULL, '芜湖市', '553', 0);
INSERT INTO `angel_city` VALUES (NULL, '中甸市', '887', 0);
INSERT INTO `angel_city` VALUES (NULL, '东莞市', '769', 0);
INSERT INTO `angel_city` VALUES (NULL, '乐山市', '833', 0);
INSERT INTO `angel_city` VALUES ('山西', '太原市', '351', 1);
INSERT INTO `angel_city` VALUES ('广西', '柳州市', '772', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮南市', '554', 0);
INSERT INTO `angel_city` VALUES (NULL, '丽江市', '888', 0);
INSERT INTO `angel_city` VALUES (NULL, '汕尾市', '660', 0);
INSERT INTO `angel_city` VALUES (NULL, '西昌市', '834', 0);
INSERT INTO `angel_city` VALUES ('山西', '大同市', '352', 0);
INSERT INTO `angel_city` VALUES (NULL, '桂林市', '773', 0);
INSERT INTO `angel_city` VALUES (NULL, '马鞍山', '555', 0);
INSERT INTO `angel_city` VALUES (NULL, '潮阳市', '661', 0);
INSERT INTO `angel_city` VALUES (NULL, '雅安市', '835', 0);
INSERT INTO `angel_city` VALUES (NULL, '阳泉市', '353', 0);
INSERT INTO `angel_city` VALUES (NULL, '梧州市', '774', 0);
INSERT INTO `angel_city` VALUES (NULL, '安庆市', '556', 0);
INSERT INTO `angel_city` VALUES ('吉林', '长春市', '431', 1);
INSERT INTO `angel_city` VALUES (NULL, '阳江市', '662', 0);
INSERT INTO `angel_city` VALUES (NULL, '康定市', '836', 0);
INSERT INTO `angel_city` VALUES (NULL, '榆次市', '354', 0);
INSERT INTO `angel_city` VALUES (NULL, '玉林市', '775', 0);
INSERT INTO `angel_city` VALUES (NULL, '宿州市', '557', 0);
INSERT INTO `angel_city` VALUES ('吉林', '吉林市', '432', 0);
INSERT INTO `angel_city` VALUES (NULL, '揭西市', '663', 0);
INSERT INTO `angel_city` VALUES (NULL, '马尔康', '837', 0);
INSERT INTO `angel_city` VALUES (NULL, '长治市', '355', 0);
INSERT INTO `angel_city` VALUES (NULL, '百色市', '776', 0);
INSERT INTO `angel_city` VALUES (NULL, '阜阳市', '558', 0);
INSERT INTO `angel_city` VALUES (NULL, '延吉市', '433', 0);
INSERT INTO `angel_city` VALUES (NULL, '德阳市', '838', 0);
INSERT INTO `angel_city` VALUES (NULL, '晋城市', '356', 0);
INSERT INTO `angel_city` VALUES (NULL, '钦州市', '777', 0);
INSERT INTO `angel_city` VALUES (NULL, '黄山市', '559', 0);
INSERT INTO `angel_city` VALUES (NULL, '四平市', '434', 0);
INSERT INTO `angel_city` VALUES ('青海', '西宁市', '971', 1);
INSERT INTO `angel_city` VALUES (NULL, '广元市', '839', 0);
INSERT INTO `angel_city` VALUES (NULL, '临汾市', '357', 0);
INSERT INTO `angel_city` VALUES (NULL, '河池市', '778', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮北市', '561', 0);
INSERT INTO `angel_city` VALUES (NULL, '通化市', '435', 0);
INSERT INTO `angel_city` VALUES (NULL, '海东市', '972', 0);
INSERT INTO `angel_city` VALUES (NULL, '泸州市', '840', 0);
INSERT INTO `angel_city` VALUES (NULL, '离石市', '358', 0);
INSERT INTO `angel_city` VALUES (NULL, '北海市', '779', 0);
INSERT INTO `angel_city` VALUES (NULL, '铜陵市', '562', 0);
INSERT INTO `angel_city` VALUES (NULL, '白城市', '436', 0);
INSERT INTO `angel_city` VALUES (NULL, '同仁市', '973', 0);
INSERT INTO `angel_city` VALUES (NULL, '运城市', '359', 0);
INSERT INTO `angel_city` VALUES (NULL, '宣城市', '563', 0);
INSERT INTO `angel_city` VALUES (NULL, '辽源市', '437', 0);
INSERT INTO `angel_city` VALUES (NULL, '共和市', '974', 0);
INSERT INTO `angel_city` VALUES (NULL, '儋州市', '890', 0);
INSERT INTO `angel_city` VALUES ('宁夏', '银川市', '951', 1);
INSERT INTO `angel_city` VALUES (NULL, '六安市', '564', 0);
INSERT INTO `angel_city` VALUES (NULL, '松原市', '438', 0);
INSERT INTO `angel_city` VALUES (NULL, '玛沁市', '975', 0);
INSERT INTO `angel_city` VALUES ('海南', '海口市', '89801', 1);
INSERT INTO `angel_city` VALUES (NULL, '拉萨市', '891', 0);
INSERT INTO `angel_city` VALUES ('宁夏', '石嘴山', '952', 0);
INSERT INTO `angel_city` VALUES (NULL, '巢湖市', '565', 0);
INSERT INTO `angel_city` VALUES (NULL, '浑江市', '439', 0);
INSERT INTO `angel_city` VALUES (NULL, '玉树市', '976', 0);
INSERT INTO `angel_city` VALUES ('海南', '三亚市', '89802', 0);
INSERT INTO `angel_city` VALUES (NULL, '日喀则', '892', 0);
INSERT INTO `angel_city` VALUES (NULL, '吴忠市', '953', 0);
INSERT INTO `angel_city` VALUES (NULL, '贵池市', '566', 0);
INSERT INTO `angel_city` VALUES (NULL, '珲春市', '440', 0);
INSERT INTO `angel_city` VALUES (NULL, '德令哈', '977', 0);
INSERT INTO `angel_city` VALUES (NULL, '山南市', '893', 0);
INSERT INTO `angel_city` VALUES (NULL, '固原市', '954', 0);
INSERT INTO `angel_city` VALUES (NULL, '新余市', '790', 0);
INSERT INTO `angel_city` VALUES ('湖北', '武汉市', '27', 1);
INSERT INTO `angel_city` VALUES (NULL, '商丘市', '370', 0);
INSERT INTO `angel_city` VALUES ('陕西', '西安市', '29', 1);
INSERT INTO `angel_city` VALUES ('贵州', '贵阳市', '851', 1);
INSERT INTO `angel_city` VALUES ('辽宁', '沈阳市', '24', 1);
INSERT INTO `angel_city` VALUES ('江西', '南昌市', '791', 1);
INSERT INTO `angel_city` VALUES ('湖北', '襄阳市', '710', 0);
INSERT INTO `angel_city` VALUES ('河南', '郑州市', '371', 1);
INSERT INTO `angel_city` VALUES (NULL, '咸阳市', '910', 0);
INSERT INTO `angel_city` VALUES ('贵州', '遵义市', '852', 0);
INSERT INTO `angel_city` VALUES (NULL, '铁岭市', '410', 0);
INSERT INTO `angel_city` VALUES ('江西', '九江市', '792', 0);
INSERT INTO `angel_city` VALUES (NULL, '鄂州市', '711', 0);
INSERT INTO `angel_city` VALUES (NULL, '安阳市', '372', 0);
INSERT INTO `angel_city` VALUES (NULL, '延安市', '911', 0);
INSERT INTO `angel_city` VALUES (NULL, '安顺市', '853', 0);
INSERT INTO `angel_city` VALUES ('辽宁', '大连市', '411', 0);
INSERT INTO `angel_city` VALUES (NULL, '上饶市', '793', 0);
INSERT INTO `angel_city` VALUES (NULL, '孝感市', '712', 0);
INSERT INTO `angel_city` VALUES (NULL, '新乡市', '373', 0);
INSERT INTO `angel_city` VALUES (NULL, '榆林市', '912', 0);
INSERT INTO `angel_city` VALUES (NULL, '都均市', '854', 0);
INSERT INTO `angel_city` VALUES (NULL, '鞍山市', '412', 0);
INSERT INTO `angel_city` VALUES (NULL, '临川市', '794', 0);
INSERT INTO `angel_city` VALUES (NULL, '黄州市', '713', 0);
INSERT INTO `angel_city` VALUES (NULL, '许昌市', '374', 0);
INSERT INTO `angel_city` VALUES (NULL, '渭南市', '913', 0);
INSERT INTO `angel_city` VALUES (NULL, '凯里市', '855', 0);
INSERT INTO `angel_city` VALUES (NULL, '抚顺市', '413', 0);
INSERT INTO `angel_city` VALUES (NULL, '宜春市', '795', 0);
INSERT INTO `angel_city` VALUES (NULL, '黄石市', '714', 0);
INSERT INTO `angel_city` VALUES (NULL, '平顶山', '375', 0);
INSERT INTO `angel_city` VALUES (NULL, '商洛市', '914', 0);
INSERT INTO `angel_city` VALUES (NULL, '铜仁市', '856', 0);
INSERT INTO `angel_city` VALUES (NULL, '本溪市', '414', 0);
INSERT INTO `angel_city` VALUES (NULL, '吉安市', '796', 0);
INSERT INTO `angel_city` VALUES (NULL, '咸宁市', '715', 0);
INSERT INTO `angel_city` VALUES (NULL, '信阳市', '376', 0);
INSERT INTO `angel_city` VALUES (NULL, '安康市', '915', 0);
INSERT INTO `angel_city` VALUES (NULL, '毕节市', '857', 0);
INSERT INTO `angel_city` VALUES (NULL, '丹东市', '415', 0);
INSERT INTO `angel_city` VALUES (NULL, '赣州市', '797', 0);
INSERT INTO `angel_city` VALUES (NULL, '荆沙市', '716', 0);
INSERT INTO `angel_city` VALUES (NULL, '南阳市', '377', 0);
INSERT INTO `angel_city` VALUES (NULL, '汉中市', '916', 0);
INSERT INTO `angel_city` VALUES (NULL, '六盘水', '858', 0);
INSERT INTO `angel_city` VALUES (NULL, '锦州市', '416', 0);
INSERT INTO `angel_city` VALUES (NULL, '景德镇', '798', 0);
INSERT INTO `angel_city` VALUES (NULL, '宜昌市', '717', 0);
INSERT INTO `angel_city` VALUES (NULL, '开封市', '378', 0);
INSERT INTO `angel_city` VALUES ('陕西', '宝鸡市', '917', 0);
INSERT INTO `angel_city` VALUES (NULL, '兴义市', '859', 0);
INSERT INTO `angel_city` VALUES (NULL, '营口市', '417', 0);
INSERT INTO `angel_city` VALUES (NULL, '萍乡市', '799', 0);
INSERT INTO `angel_city` VALUES (NULL, '恩施市', '718', 0);
INSERT INTO `angel_city` VALUES ('河南', '洛阳市', '379', 0);
INSERT INTO `angel_city` VALUES (NULL, '铜川市', '919', 0);
INSERT INTO `angel_city` VALUES (NULL, '阜新市', '418', 0);
INSERT INTO `angel_city` VALUES (NULL, '鹰潭市', '701', 0);
INSERT INTO `angel_city` VALUES (NULL, '十堰市', '719', 0);
INSERT INTO `angel_city` VALUES (NULL, '焦作市', '391', 0);
INSERT INTO `angel_city` VALUES (NULL, '海拉尔', '470', 0);
INSERT INTO `angel_city` VALUES (NULL, '辽阳市', '419', 0);
INSERT INTO `angel_city` VALUES (NULL, '随枣市', '722', 0);
INSERT INTO `angel_city` VALUES (NULL, '鹤壁市', '392', 0);
INSERT INTO `angel_city` VALUES (NULL, '邯郸市', '310', 0);
INSERT INTO `angel_city` VALUES (NULL, '朝阳市', '421', 0);
INSERT INTO `angel_city` VALUES (NULL, '临夏市', '930', 0);
INSERT INTO `angel_city` VALUES (NULL, '荆门市', '724', 0);
INSERT INTO `angel_city` VALUES (NULL, '濮阳市', '393', 0);
INSERT INTO `angel_city` VALUES ('河北', '石家庄', '311', 1);
INSERT INTO `angel_city` VALUES ('内蒙古', '包头市', '472', 0);
INSERT INTO `angel_city` VALUES (NULL, '盘锦市', '427', 0);
INSERT INTO `angel_city` VALUES ('甘肃', '兰州市', '931', 1);
INSERT INTO `angel_city` VALUES (NULL, '江汉市', '728', 0);
INSERT INTO `angel_city` VALUES (NULL, '周口市', '394', 0);
INSERT INTO `angel_city` VALUES ('河北', '保定市', '312', 0);
INSERT INTO `angel_city` VALUES (NULL, '乌海市', '473', 0);
INSERT INTO `angel_city` VALUES (NULL, '葫芦岛', '429', 0);
INSERT INTO `angel_city` VALUES (NULL, '定西市', '932', 0);
INSERT INTO `angel_city` VALUES (NULL, '漯河市', '395', 0);
INSERT INTO `angel_city` VALUES (NULL, '张家口', '313', 0);
INSERT INTO `angel_city` VALUES (NULL, '集宁市', '474', 0);
INSERT INTO `angel_city` VALUES (NULL, '平凉市', '933', 0);
INSERT INTO `angel_city` VALUES (NULL, '阿城市', '450', 0);
INSERT INTO `angel_city` VALUES (NULL, '驻马店', '396', 0);
INSERT INTO `angel_city` VALUES (NULL, '承德市', '314', 0);
INSERT INTO `angel_city` VALUES (NULL, '通辽市', '475', 0);
INSERT INTO `angel_city` VALUES (NULL, '菏泽市', '530', 0);
INSERT INTO `angel_city` VALUES (NULL, '西峰市', '934', 0);
INSERT INTO `angel_city` VALUES ('黑龙江', '哈尔滨', '451', 1);
INSERT INTO `angel_city` VALUES (NULL, '三门峡', '398', 0);
INSERT INTO `angel_city` VALUES (NULL, '唐山市', '315', 0);
INSERT INTO `angel_city` VALUES (NULL, '赤峰市', '476', 0);
INSERT INTO `angel_city` VALUES ('山东', '济南市', '531', 1);
INSERT INTO `angel_city` VALUES (NULL, '武威市', '935', 0);
INSERT INTO `angel_city` VALUES (NULL, '廊坊市', '316', 0);
INSERT INTO `angel_city` VALUES (NULL, '东胜市', '477', 0);
INSERT INTO `angel_city` VALUES ('山东', '青岛市', '532', 0);
INSERT INTO `angel_city` VALUES (NULL, '张掖市', '936', 0);
INSERT INTO `angel_city` VALUES (NULL, '牡丹江', '453', 0);
INSERT INTO `angel_city` VALUES ('福建', '福州市', '591', 1);
INSERT INTO `angel_city` VALUES (NULL, '沧州市', '317', 0);
INSERT INTO `angel_city` VALUES (NULL, '临河市', '478', 0);
INSERT INTO `angel_city` VALUES (NULL, '淄博市', '533', 0);
INSERT INTO `angel_city` VALUES (NULL, '酒泉市', '937', 0);
INSERT INTO `angel_city` VALUES (NULL, '佳木斯', '454', 0);
INSERT INTO `angel_city` VALUES ('福建', '厦门市', '592', 0);
INSERT INTO `angel_city` VALUES (NULL, '衡水市', '318', 0);
INSERT INTO `angel_city` VALUES (NULL, '德州市', '534', 0);
INSERT INTO `angel_city` VALUES ('甘肃', '天水市', '938', 0);
INSERT INTO `angel_city` VALUES (NULL, '绥化市', '455', 0);
INSERT INTO `angel_city` VALUES (NULL, '宁德市', '593', 0);
INSERT INTO `angel_city` VALUES (NULL, '邢台市', '319', 0);
INSERT INTO `angel_city` VALUES (NULL, '兰浩特', '482', 0);
INSERT INTO `angel_city` VALUES (NULL, '烟台市', '535', 0);
INSERT INTO `angel_city` VALUES (NULL, '甘南州', '941', 0);
INSERT INTO `angel_city` VALUES (NULL, '黑河市', '456', 0);
INSERT INTO `angel_city` VALUES (NULL, '莆田市', '594', 0);
INSERT INTO `angel_city` VALUES (NULL, '秦皇岛', '335', 0);
INSERT INTO `angel_city` VALUES (NULL, '淮坊市', '536', 0);
INSERT INTO `angel_city` VALUES (NULL, '白银市', '943', 0);
INSERT INTO `angel_city` VALUES (NULL, '泉州市', '595', 0);
INSERT INTO `angel_city` VALUES (NULL, '济宁市', '537', 0);
INSERT INTO `angel_city` VALUES (NULL, '伊春市', '458', 0);
INSERT INTO `angel_city` VALUES (NULL, '晋江市', '595', 0);
INSERT INTO `angel_city` VALUES (NULL, '泰安市', '538', 0);
INSERT INTO `angel_city` VALUES (NULL, '大庆市', '459', 0);
INSERT INTO `angel_city` VALUES (NULL, '漳州市', '596', 0);
INSERT INTO `angel_city` VALUES (NULL, '临沂市', '539', 0);
INSERT INTO `angel_city` VALUES (NULL, '龙岩市', '597', 0);
INSERT INTO `angel_city` VALUES (NULL, '三明市', '598', 0);
INSERT INTO `angel_city` VALUES (NULL, '南平市', '599', 0);
INSERT INTO `angel_city` VALUES (NULL, '加格达奇', '457', 0);
INSERT INTO `angel_city` VALUES (NULL, '阿拉善左旗', '483', 0);
INSERT INTO `angel_city` VALUES (NULL, '锡林浩特', '479', 0);
INSERT INTO `angel_city` VALUES ('黑龙江', '齐齐哈尔', '452', 0);
INSERT INTO `angel_city` VALUES ('内蒙古', '呼和浩特', '471', 1);
INSERT INTO `angel_city` VALUES ('青海', '格尔木', '979', 0);
INSERT INTO `angel_city` VALUES ('海南', '海口市', '089801', 1);
INSERT INTO `angel_city` VALUES ('海南', '三亚市', '089802', 0);

-- ----------------------------
-- Table structure for angel_downloadlist
-- ----------------------------
DROP TABLE IF EXISTS `angel_downloadlist`;
CREATE TABLE `angel_downloadlist`  (
  `userid` int(11),
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `filename` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isenabled` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `downloadhref` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_downloadlist
-- ----------------------------
INSERT INTO `angel_downloadlist` VALUES (1, 'admin', 'test20171108221619.xlsx', '1', 'admin', '2017-11-08 22:16:19', '/Down/Index?filename=test20171108221619.xlsx');
INSERT INTO `angel_downloadlist` VALUES (1, 'admin', 'test20171109_0924.zip', '1', 'admin', '2017-11-09 09:24:50', '/Down/Index?filename=test20171109_0924.zip');

-- ----------------------------
-- Table structure for angel_sys_department
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_department`;
CREATE TABLE `angel_sys_department`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列号',
  `dname` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '部门名称',
  `level` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门级别',
  `parent_id` int(11) COMMENT '父级别ID',
  `seq` int(255) COMMENT '排序号',
  `remark` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `isenabled` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '是否可以用',
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '创建者',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改者',
  `updatetime` timestamp  COMMENT '修改日期',
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 131 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_department
-- ----------------------------
INSERT INTO `angel_sys_department` VALUES (1, '销售部', '0', 0, 1, '销售部', 'Y', 'admin', '2019-07-21 15:39:37', 'admin', '2013-08-19 15:29:30');
INSERT INTO `angel_sys_department` VALUES (2, '研发部', '0', 0, 1, '研发部', 'Y', 'admin', '2019-07-21 15:39:41', 'admin', '2013-08-19 16:08:24');
INSERT INTO `angel_sys_department` VALUES (3, '后勤部', '0', 0, 1, '后勤部', 'Y', 'admin', '2019-07-21 15:39:44', 'admin', '2013-08-19 16:08:46');
INSERT INTO `angel_sys_department` VALUES (4, '网络部', '0', 0, 1, '网络部', 'Y', 'admin', '2019-07-21 15:38:55', 'admin', '2013-08-19 16:08:59');
INSERT INTO `angel_sys_department` VALUES (6, '销售一部', '0,1', 1, 1, '销售一部', 'Y', 'admin', '2019-07-21 16:23:57', 'admin', '2013-08-19 16:09:20');

-- ----------------------------
-- Table structure for angel_sys_loginlog
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_loginlog`;
CREATE TABLE `angel_sys_loginlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统编号',
  `userid` int(11),
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `roleid` int(11),
  `rolename` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `clientip` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `logintime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createtime` datetime,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9300 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_loginlog
-- ----------------------------
INSERT INTO `angel_sys_loginlog` VALUES (1, 1, 'admin', 1, '超级管理员', '::1', '2019-07-21 17:24:31', 'admin', '2019-07-21 17:24:31');

-- ----------------------------
-- Table structure for angel_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_menu`;
CREATE TABLE `angel_sys_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id自动编号',
  `menuname` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `parentid` int(11),
  `remark` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `orderid` int(11),
  `menuicon` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `menuurl` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isvisible` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isenabled` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createuser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateuser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updatetime` timestamp ,
  `menucode` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 278 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_menu
-- ----------------------------
INSERT INTO `angel_sys_menu` VALUES (138, '系统管理', 0, '系统管理', 5, 'fa fa-gear', '#', 'Y', 'Y', 'admin', '2019-07-11 18:59:38', 'admin', '2019-07-11 18:59:38', '');
INSERT INTO `angel_sys_menu` VALUES (139, '菜单管理', 138, '菜单管理', 1, 'defultico', '/SysManager/MenuManager', 'Y', 'Y', 'admin', '2018-07-10 17:38:30', 'admin', '2013-06-11 17:41:31', '');
INSERT INTO `angel_sys_menu` VALUES (140, '用户管理', 138, '用户管理', 2, 'defultico', '/SysManager/UserManager', 'Y', 'Y', 'admin', '2018-07-10 17:38:31', 'admin', '2013-06-11 17:42:04', '');
INSERT INTO `angel_sys_menu` VALUES (141, '角色管理', 138, '角色管理', 3, 'defultico', '/SysManager/RoleManager', 'Y', 'Y', 'admin', '2018-07-10 17:38:32', 'admin', '2013-06-11 17:42:24', '');
INSERT INTO `angel_sys_menu` VALUES (143, '数据模板管理', 175, '数据模板管理', 8, 'defultico', '/datacollection/datatemplate', 'N', 'Y', 'admin', '2018-07-10 17:38:35', 'admin', '2017-12-07 19:09:53', '');
INSERT INTO `angel_sys_menu` VALUES (151, '日志管理', 138, '日志管理', 4, 'fa fa-file-text', '#', 'Y', 'Y', 'admin', '2019-07-11 19:12:08', 'admin', '2019-07-11 19:12:08', '');
INSERT INTO `angel_sys_menu` VALUES (153, '登陆日志', 151, '登陆日志', 2, 'defultico', '/SysManager/LoginLogManager', 'Y', 'Y', 'admin', '2018-07-10 17:38:36', 'admin', '2013-07-07 16:06:46', '');
INSERT INTO `angel_sys_menu` VALUES (157, '欢迎', 131, '欢迎', 1, 'defultico', '/welcome/welcome', 'N', 'N', 'admin', '2013-06-13 16:12:48', 'admin', '2013-06-13 16:12:48', '');
INSERT INTO `angel_sys_menu` VALUES (181, '文件上传', 0, '文件上传', 3, 'defultico', '111', 'Y', 'Y', 'admin', '2019-07-21 17:13:55', 'admin', '2019-07-21 17:13:55', '');
INSERT INTO `angel_sys_menu` VALUES (185, '数据存档', 0, '数据存档', 4, 'fa fa-jsfiddle', '111', 'Y', 'Y', 'admin', '2019-07-21 17:20:39', 'admin', '2019-07-21 17:20:39', '');
INSERT INTO `angel_sys_menu` VALUES (201, '下载列表管理', 138, '下载列表管理', 5, 'defultico', '/sysmanager/downloadlistmanager', 'Y', 'Y', 'admin', '2018-07-10 17:16:43', 'admin', '2018-07-10 17:16:43', '');
INSERT INTO `angel_sys_menu` VALUES (205, '部门管理', 138, '部门管理', 3, 'defultico', '/sysmanager/departmentmanager', 'Y', 'Y', 'admin', '2019-07-21 15:30:17', 'admin', '2019-07-21 15:30:17', '');
INSERT INTO `angel_sys_menu` VALUES (206, '操作日志', 151, '操作日志', 3, 'defultico', '/sysmanager/operlogmanager', 'Y', 'Y', 'admin', '2013-09-03 17:31:06', 'admin', '2013-09-03 17:31:06', '');
INSERT INTO `angel_sys_menu` VALUES (212, '数据导出', 230, '导出网络业务投诉详表', 3, 'defultico', '/datacollection/exportcomplaint', 'Y', 'Y', 'admin', '2018-07-10 17:38:43', 'admin', '2018-04-13 15:19:29', '');
INSERT INTO `angel_sys_menu` VALUES (224, '投诉分析', 181, '投诉', 6, 'defultico', '/datacollection/complaintanalysis', 'Y', 'Y', 'admin', '2018-07-10 17:38:45', 'admin', '2018-03-19 13:47:21', '');
INSERT INTO `angel_sys_menu` VALUES (239, '上传文件存档管理', 185, '', 239, 'defultico', '/datacollection/filebak3', 'Y', 'Y', 'admin', '2018-07-10 17:38:48', 'admin', '2018-07-10 17:29:25', '');
INSERT INTO `angel_sys_menu` VALUES (240, '填报数据导出', 176, '', 240, 'defultico', '/DataCollection/CollectReportsGP', 'Y', 'Y', 'admin', '2018-07-10 17:38:49', 'admin', '2018-05-10 10:12:12', '');
INSERT INTO `angel_sys_menu` VALUES (257, '编辑器测试', 181, '编辑器测试', 200, 'defultico', '/provincereport/jdcollect', 'Y', 'Y', 'admin', '2019-07-21 16:32:14', 'admin', '2019-07-21 16:32:14', '');
INSERT INTO `angel_sys_menu` VALUES (258, '组织结构', 185, '组织结构', 151, 'fa fa-file-excel-o', '/provincereport/organization', 'Y', 'Y', 'admin', '2018-12-23 14:16:22', 'admin', '2018-12-23 14:16:22', '');
INSERT INTO `angel_sys_menu` VALUES (266, 'excel文件上传', 181, 'excel文件上传', 1, 'fa fa-area-chart', '/uploadfile/DataImport', 'Y', 'Y', 'admin', '2019-07-21 16:48:53', 'admin', '2019-07-21 16:48:53', '');

-- ----------------------------
-- Table structure for angel_sys_menusofroles
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_menusofroles`;
CREATE TABLE `angel_sys_menusofroles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动编号',
  `roleid` int(11),
  `menuid` int(11),
  `isindex` int(11),
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8392 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_menusofroles
-- ----------------------------
INSERT INTO `angel_sys_menusofroles` VALUES (6235, 59, 174, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6236, 59, 175, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6237, 59, 195, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6238, 59, 176, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6239, 59, 144, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6240, 59, 198, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6241, 59, 202, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6242, 59, 227, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6243, 59, 213, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6244, 59, 146, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6245, 59, 217, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6246, 59, 177, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6247, 59, 169, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6248, 59, 214, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6249, 59, 215, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6250, 59, 216, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6251, 59, 178, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6252, 59, 165, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6253, 59, 166, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6254, 59, 181, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6255, 59, 159, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6256, 59, 182, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6257, 59, 155, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6258, 59, 208, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6259, 59, 209, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6260, 59, 156, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6261, 59, 190, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6262, 59, 203, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6263, 59, 224, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6264, 59, 185, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6265, 59, 162, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (6266, 59, 220, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7826, 55, 138, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7827, 55, 141, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7828, 55, 174, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7829, 55, 175, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7830, 55, 148, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7831, 55, 195, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7832, 55, 204, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7833, 55, 259, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7834, 55, 176, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7835, 55, 144, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7836, 55, 163, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7837, 55, 198, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7838, 55, 202, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7839, 55, 227, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7840, 55, 210, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7841, 55, 221, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7842, 55, 228, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7843, 55, 230, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7844, 55, 211, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7845, 55, 212, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7846, 55, 225, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7847, 55, 213, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7848, 55, 145, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (7849, 55, 146, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8004, 49, 138, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8005, 49, 174, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8006, 49, 176, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8007, 49, 233, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8008, 49, 236, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8009, 49, 240, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8010, 49, 210, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8011, 49, 228, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8012, 49, 251, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8013, 49, 213, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8014, 49, 235, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8015, 51, 174, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8016, 51, 176, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8017, 51, 233, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8018, 51, 213, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8019, 51, 235, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8079, 54, 138, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8080, 54, 151, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8081, 54, 153, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8082, 54, 206, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8083, 54, 201, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8084, 54, 205, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8085, 54, 207, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8086, 54, 174, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8087, 54, 175, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8088, 54, 148, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8089, 54, 195, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8090, 54, 204, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8091, 54, 176, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8092, 54, 144, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8093, 54, 163, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8094, 54, 198, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8095, 54, 202, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8096, 54, 227, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8097, 54, 233, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8098, 54, 236, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8099, 54, 237, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8100, 54, 239, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8101, 54, 240, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8102, 54, 210, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8103, 54, 221, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8104, 54, 228, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8105, 54, 230, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8106, 54, 211, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8107, 54, 212, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8108, 54, 225, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8109, 54, 231, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8110, 54, 251, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8111, 54, 213, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8112, 54, 145, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8113, 54, 146, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8114, 54, 234, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8115, 54, 235, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8116, 54, 232, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8117, 54, 177, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8118, 54, 169, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8119, 54, 214, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8120, 54, 215, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8121, 54, 216, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8122, 54, 178, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8123, 54, 165, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8124, 54, 166, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8125, 54, 181, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8126, 54, 159, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8127, 54, 182, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8128, 54, 155, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8129, 54, 208, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8130, 54, 209, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8131, 54, 156, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8132, 54, 190, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8133, 54, 203, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8134, 54, 224, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8135, 54, 185, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8136, 54, 162, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8137, 54, 220, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8375, 1, 138, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8376, 1, 139, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8377, 1, 140, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8378, 1, 141, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8379, 1, 151, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8380, 1, 153, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8381, 1, 206, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8382, 1, 201, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8383, 1, 205, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8384, 1, 181, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8385, 1, 224, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8386, 1, 257, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8387, 1, 266, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8388, 1, 185, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8389, 1, 225, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8390, 1, 239, 0);
INSERT INTO `angel_sys_menusofroles` VALUES (8391, 1, 258, 0);

-- ----------------------------
-- Table structure for angel_sys_operationlog
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_operationlog`;
CREATE TABLE `angel_sys_operationlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) ,
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `roleid` int(11),
  `rolename` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `logposition` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `operationtype` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `operationparam` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_operationlog
-- ----------------------------
INSERT INTO `angel_sys_operationlog` VALUES (1, 1, 'admin', 1, '超级管理员', '系统管理-菜单管理', '删除菜单信息编号为:(225)', '{ \"insert_log\": [{ \"logposition\":\"系统管理-菜单管理\",\"operationtype\": \"删除菜单信息编号为:(225)\"}]}', 'admin', '2019-07-21 17:41:28');

-- ----------------------------
-- Table structure for angel_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_role`;
CREATE TABLE `angel_sys_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列号',
  `rolename` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `level` int(11),
  `remark` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isenabled` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_role
-- ----------------------------
INSERT INTO `angel_sys_role` VALUES (1, '超级管理员', 9, '管理系统所有的资源信息', 'Y', 'admin', '2018-12-23 14:26:54', 'admin', '2013-06-13 11:12:20');
INSERT INTO `angel_sys_role` VALUES (49, '公司新闻', 1, '公司新闻', 'Y', 'admin', '2018-07-10 17:11:14', 'admin', '2013-06-13 11:35:07');
INSERT INTO `angel_sys_role` VALUES (51, '销售部', 1, '销售部', 'Y', 'admin', '2018-07-10 17:11:42', 'admin', '2013-09-08 11:02:07');
INSERT INTO `angel_sys_role` VALUES (54, '其它角色', 3, '其它角色', 'Y', 'admin', '2018-07-10 17:12:26', 'admin', '2013-08-09 17:55:58');
INSERT INTO `angel_sys_role` VALUES (55, '数据管理员', 6, '', 'Y', 'admin', '2019-07-21 15:09:09', 'admin', '2013-08-09 17:57:38');

-- ----------------------------
-- Table structure for angel_sys_room
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_room`;
CREATE TABLE `angel_sys_room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列号',
  `roomname` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `remark` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isenabled` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updatetime` timestamp ,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_room
-- ----------------------------
INSERT INTO `angel_sys_room` VALUES (99, '网管中心', '1', 'Y', 'admin', '2019-07-21 15:09:37', 'admin', '2013-08-19 15:29:30');
INSERT INTO `angel_sys_room` VALUES (100, '生产开发中心', '2', 'Y', 'admin', '2019-07-21 15:09:29', 'admin', '2013-08-19 16:08:24');
INSERT INTO `angel_sys_room` VALUES (101, '研发部门', '3', 'Y', 'admin', '2019-07-21 15:09:28', 'admin', '2013-08-19 16:08:46');
INSERT INTO `angel_sys_room` VALUES (102, '片区销售', '4', 'Y', 'admin', '2019-07-21 15:09:26', 'admin', '2013-08-19 16:08:59');
INSERT INTO `angel_sys_room` VALUES (103, '售楼开发', '5', 'Y', 'admin', '2019-07-21 15:09:25', 'admin', '2013-08-19 16:09:20');

-- ----------------------------
-- Table structure for angel_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_user`;
CREATE TABLE `angel_sys_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动编号',
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isenabled` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `logincount` int(11) ,
  `lastlogintime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createuser` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createtime` timestamp ,
  `updateuser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updatetime` timestamp ,
  `cityid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_user
-- ----------------------------
INSERT INTO `angel_sys_user` VALUES (1, 'admin', '123456', 'Y', 2018, '2019-07-21 19:35:45', 'admin', '2013-09-09 17:37:33', 'admin', '2018-07-17 15:26:05', '');
INSERT INTO `angel_sys_user` VALUES (5, 'angel', '123456', 'Y', 468, '2018-07-17 15:26:20', 'admin', '2016-07-22 10:12:05', 'admin', '2018-07-17 15:26:20', '');
INSERT INTO `angel_sys_user` VALUES (6, 'ttttt', '123456', 'N', 1, '2018-07-17 15:27:27', 'admin', '2018-07-17 15:26:48', 'admin', '2018-07-17 15:27:27', '');

-- ----------------------------
-- Table structure for angel_sys_userdepartment
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_userdepartment`;
CREATE TABLE `angel_sys_userdepartment`  (
  `userid` int(11) ,
  `roomid` int(11)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_userdepartment
-- ----------------------------
INSERT INTO `angel_sys_userdepartment` VALUES (5, 99);
INSERT INTO `angel_sys_userdepartment` VALUES (6, 103);

-- ----------------------------
-- Table structure for angel_sys_userofindicator
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_userofindicator`;
CREATE TABLE `angel_sys_userofindicator`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动编号',
  `userid` int(11),
  `indicator_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 316 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_userofindicator
-- ----------------------------
INSERT INTO `angel_sys_userofindicator` VALUES (313, 5, '');
INSERT INTO `angel_sys_userofindicator` VALUES (315, 6, '');

-- ----------------------------
-- Table structure for angel_sys_userrole
-- ----------------------------
DROP TABLE IF EXISTS `angel_sys_userrole`;
CREATE TABLE `angel_sys_userrole`  (
  `userid` int(11),
  `roleid` int(11)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of angel_sys_userrole
-- ----------------------------
INSERT INTO `angel_sys_userrole` VALUES (1, 1);
INSERT INTO `angel_sys_userrole` VALUES (5, 55);
INSERT INTO `angel_sys_userrole` VALUES (6, 49);

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `ID` int(11) NULL DEFAULT NULL,
  `CITYNAME` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES (1, '安徽');
INSERT INTO `city` VALUES (2, '北京');
INSERT INTO `city` VALUES (3, '福建');
INSERT INTO `city` VALUES (4, '甘肃');
INSERT INTO `city` VALUES (5, '广东');
INSERT INTO `city` VALUES (6, '广西');
INSERT INTO `city` VALUES (7, '贵州');
INSERT INTO `city` VALUES (8, '海南');
INSERT INTO `city` VALUES (9, '河北');
INSERT INTO `city` VALUES (10, '河南');
INSERT INTO `city` VALUES (11, '黑龙江');
INSERT INTO `city` VALUES (12, '湖北');
INSERT INTO `city` VALUES (13, '湖南');
INSERT INTO `city` VALUES (14, '吉林');
INSERT INTO `city` VALUES (15, '江苏');
INSERT INTO `city` VALUES (16, '江西');
INSERT INTO `city` VALUES (17, '辽宁');
INSERT INTO `city` VALUES (18, '内蒙古');
INSERT INTO `city` VALUES (19, '宁夏');
INSERT INTO `city` VALUES (20, '青海');
INSERT INTO `city` VALUES (21, '山东');
INSERT INTO `city` VALUES (22, '山西');
INSERT INTO `city` VALUES (23, '陕西');
INSERT INTO `city` VALUES (24, '上海');
INSERT INTO `city` VALUES (25, '四川');
INSERT INTO `city` VALUES (26, '天津');
INSERT INTO `city` VALUES (27, '西藏');
INSERT INTO `city` VALUES (28, '新疆');
INSERT INTO `city` VALUES (29, '云南');
INSERT INTO `city` VALUES (30, '浙江');
INSERT INTO `city` VALUES (31, '重庆');
INSERT INTO `city` VALUES (32, '全网');

-- ----------------------------
-- Table structure for t_fileinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_fileinfo`;
CREATE TABLE `t_fileinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录代码 ',
  `FileName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `DownLoadLink` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '下载链接',
  `Remak` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `CreateDate` datetime NULL DEFAULT NULL,
  `CreateUserId` int(4) ,
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ModifyDate` datetime NULL DEFAULT NULL,
  `ModifyUserId` int(4) ,
  `ModifyUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 105 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_fileinfo
-- ----------------------------
INSERT INTO `t_fileinfo` VALUES (102, '指标上报时间_指标负责人_联系电话.xlsx', 'UploadFiles/admin', NULL, '2017-11-08 22:28:21', 1, 'admin', NULL, NULL, NULL);
INSERT INTO `t_fileinfo` VALUES (103, '联系电话.xlsx', 'UploadFiles/admin', NULL, '2017-11-08 22:28:21', 1, 'admin', NULL, NULL, NULL);
INSERT INTO `t_fileinfo` VALUES (104, '指标负责人_联系电话.xlsx', 'UploadFiles/admin', NULL, '2017-11-08 22:28:21', 1, 'admin', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
