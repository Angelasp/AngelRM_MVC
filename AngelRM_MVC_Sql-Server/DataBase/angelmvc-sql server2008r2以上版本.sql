USE [angelmvc]
GO
/****** Object:  Table [dbo].[t_fileinfo]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_fileinfo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[FileName] [nvarchar](200) NULL,
	[DownLoadLink] [nvarchar](200) NULL,
	[Remak] [nvarchar](max) NULL,
	[CreateDate] [datetime2](7) NULL,
	[CreateUserId] [int] NULL,
	[CreateUserName] [nvarchar](50) NULL,
	[ModifyDate] [datetime2](7) NULL,
	[ModifyUserId] [int] NULL,
	[ModifyUserName] [nvarchar](50) NULL,
 CONSTRAINT [PK__t_filein__3213E83F2A4B4B5E] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'记录代码 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N't_fileinfo', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N't_fileinfo', @level2type=N'COLUMN',@level2name=N'FileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'下载链接' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N't_fileinfo', @level2type=N'COLUMN',@level2name=N'DownLoadLink'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'备注' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N't_fileinfo', @level2type=N'COLUMN',@level2name=N'Remak'
GO
SET IDENTITY_INSERT [dbo].[t_fileinfo] ON
INSERT [dbo].[t_fileinfo] ([id], [FileName], [DownLoadLink], [Remak], [CreateDate], [CreateUserId], [CreateUserName], [ModifyDate], [ModifyUserId], [ModifyUserName]) VALUES (102, N'指标上报时间_指标负责人_联系电话.xlsx', N'UploadFiles/admin', NULL, CAST(0x0780F0C05CBC803D0B AS DateTime2), 1, N'admin', NULL, NULL, NULL)
INSERT [dbo].[t_fileinfo] ([id], [FileName], [DownLoadLink], [Remak], [CreateDate], [CreateUserId], [CreateUserName], [ModifyDate], [ModifyUserId], [ModifyUserName]) VALUES (103, N'联系电话.xlsx', N'UploadFiles/admin', NULL, CAST(0x0780F0C05CBC803D0B AS DateTime2), 1, N'admin', NULL, NULL, NULL)
INSERT [dbo].[t_fileinfo] ([id], [FileName], [DownLoadLink], [Remak], [CreateDate], [CreateUserId], [CreateUserName], [ModifyDate], [ModifyUserId], [ModifyUserName]) VALUES (104, N'指标负责人_联系电话.xlsx', N'UploadFiles/admin', NULL, CAST(0x0780F0C05CBC803D0B AS DateTime2), 1, N'admin', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[t_fileinfo] OFF
/****** Object:  Table [dbo].[city]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[city](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CITYNAME] [nvarchar](10) NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[city] ON
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (1, N'安徽')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (2, N'北京')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (3, N'福建')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (4, N'甘肃')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (5, N'广东')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (6, N'广西')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (7, N'贵州')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (8, N'海南')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (9, N'河北')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (10, N'河南')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (11, N'黑龙江')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (12, N'湖北')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (13, N'湖南')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (14, N'吉林')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (15, N'江苏')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (16, N'江西')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (17, N'辽宁')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (18, N'内蒙古')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (19, N'宁夏')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (20, N'青海')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (21, N'山东')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (22, N'山西')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (23, N'陕西')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (24, N'上海')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (25, N'四川')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (26, N'天津')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (27, N'西藏')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (28, N'新疆')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (29, N'云南')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (30, N'浙江')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (31, N'重庆')
INSERT [dbo].[city] ([ID], [CITYNAME]) VALUES (32, N'全网')
SET IDENTITY_INSERT [dbo].[city] OFF
/****** Object:  Table [dbo].[angel_sys_userrole]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_userrole](
	[userid] [int] NOT NULL,
	[roleid] [int] NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[angel_sys_userrole] ([userid], [roleid]) VALUES (1, 1)
INSERT [dbo].[angel_sys_userrole] ([userid], [roleid]) VALUES (5, 55)
INSERT [dbo].[angel_sys_userrole] ([userid], [roleid]) VALUES (6, 49)
INSERT [dbo].[angel_sys_userrole] ([userid], [roleid]) VALUES (7, 51)
INSERT [dbo].[angel_sys_userrole] ([userid], [roleid]) VALUES (8, 1)
/****** Object:  Table [dbo].[angel_sys_userofindicator]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_userofindicator](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[indicator_content] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F276EDEB3] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自动编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_userofindicator', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_userofindicator] ON
INSERT [dbo].[angel_sys_userofindicator] ([id], [userid], [indicator_content]) VALUES (313, 5, N'')
INSERT [dbo].[angel_sys_userofindicator] ([id], [userid], [indicator_content]) VALUES (315, 6, N'')
INSERT [dbo].[angel_sys_userofindicator] ([id], [userid], [indicator_content]) VALUES (316, 7, N'')
INSERT [dbo].[angel_sys_userofindicator] ([id], [userid], [indicator_content]) VALUES (318, 8, N'')
SET IDENTITY_INSERT [dbo].[angel_sys_userofindicator] OFF
/****** Object:  Table [dbo].[angel_sys_userdepartment]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_userdepartment](
	[userid] [int] NOT NULL,
	[roomid] [int] NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[angel_sys_userdepartment] ([userid], [roomid]) VALUES (5, 99)
INSERT [dbo].[angel_sys_userdepartment] ([userid], [roomid]) VALUES (6, 103)
INSERT [dbo].[angel_sys_userdepartment] ([userid], [roomid]) VALUES (7, 99)
INSERT [dbo].[angel_sys_userdepartment] ([userid], [roomid]) VALUES (8, 101)
/****** Object:  Table [dbo].[angel_sys_user]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](128) NULL,
	[password] [nvarchar](128) NULL,
	[isenabled] [nchar](1) NULL,
	[logincount] [int] NULL,
	[lastlogintime] [datetime2](7) NOT NULL,
	[createuser] [nvarchar](128) NULL,
	[createtime] [datetime2](7) NOT NULL,
	[updateuser] [nvarchar](50) NULL,
	[updatetime] [datetime2](7) NOT NULL,
	[cityid] [nvarchar](20) NULL,
 CONSTRAINT [PK__angel_sy__3213E83F24927208] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自动编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_user', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_user] ON
INSERT [dbo].[angel_sys_user] ([id], [username], [password], [isenabled], [logincount], [lastlogintime], [createuser], [createtime], [updateuser], [updatetime], [cityid]) VALUES (1, N'admin', N'123456', N'Y', 2076, CAST(0x071080B5859D6A410B AS DateTime2), N'admin', CAST(0x07806CEFBC938F370B AS DateTime2), N'admin', CAST(0x078024525F817B3E0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_user] ([id], [username], [password], [isenabled], [logincount], [lastlogintime], [createuser], [createtime], [updateuser], [updatetime], [cityid]) VALUES (5, N'angel', N'123456', N'Y', 468, CAST(0x0700F64268817B3E0B AS DateTime2), N'admin', CAST(0x078048CE8155A63B0B AS DateTime2), N'admin', CAST(0x0700F64268817B3E0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_user] ([id], [username], [password], [isenabled], [logincount], [lastlogintime], [createuser], [createtime], [updateuser], [updatetime], [cityid]) VALUES (6, N'ttttt', N'123456', N'N', 1, CAST(0x0780593290817B3E0B AS DateTime2), N'admin', CAST(0x07006CF378817B3E0B AS DateTime2), N'admin', CAST(0x0780593290817B3E0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_user] ([id], [username], [password], [isenabled], [logincount], [lastlogintime], [createuser], [createtime], [updateuser], [updatetime], [cityid]) VALUES (7, N'test123', N'123456', N'Y', 1, CAST(0x0780350E99579E400B AS DateTime2), N'admin', CAST(0x0780350E99579E400B AS DateTime2), N'', CAST(0x0780350E99579E400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_user] ([id], [username], [password], [isenabled], [logincount], [lastlogintime], [createuser], [createtime], [updateuser], [updatetime], [cityid]) VALUES (8, N'test33', N'123123', N'Y', 1, CAST(0x07A0E58A6C915C410B AS DateTime2), N'admin', CAST(0x07A0E58A6C915C410B AS DateTime2), N'admin', CAST(0x07405FFC72915C410B AS DateTime2), N'')
SET IDENTITY_INSERT [dbo].[angel_sys_user] OFF
/****** Object:  Table [dbo].[angel_sys_room]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_room](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[roomname] [nvarchar](128) NOT NULL,
	[remark] [nvarchar](4000) NULL,
	[isenabled] [nvarchar](2) NOT NULL,
	[createuser] [nvarchar](128) NOT NULL,
	[createtime] [datetime2](7) NOT NULL,
	[updateuser] [nvarchar](128) NULL,
	[updatetime] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F21B6055D] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'序列号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_room', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_room] ON
INSERT [dbo].[angel_sys_room] ([id], [roomname], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (99, N'网管中心', N'1', N'Y', N'admin', CAST(0x07804E6D127FEC3F0B AS DateTime2), N'admin', CAST(0x0700A982D9817A370B AS DateTime2))
INSERT [dbo].[angel_sys_room] ([id], [roomname], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (100, N'生产开发中心', N'2', N'Y', N'admin', CAST(0x07809AA80D7FEC3F0B AS DateTime2), N'admin', CAST(0x0700CCAE48877A370B AS DateTime2))
INSERT [dbo].[angel_sys_room] ([id], [roomname], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (101, N'研发部门', N'3', N'Y', N'admin', CAST(0x070004100D7FEC3F0B AS DateTime2), N'admin', CAST(0x0700BBCB55877A370B AS DateTime2))
INSERT [dbo].[angel_sys_room] ([id], [roomname], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (102, N'片区销售', N'4', N'Y', N'admin', CAST(0x0700D7DE0B7FEC3F0B AS DateTime2), N'admin', CAST(0x07805F8B5D877A370B AS DateTime2))
INSERT [dbo].[angel_sys_room] ([id], [roomname], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (103, N'售楼开发', N'5', N'Y', N'admin', CAST(0x078040460B7FEC3F0B AS DateTime2), N'admin', CAST(0x0700B80F6A877A370B AS DateTime2))
SET IDENTITY_INSERT [dbo].[angel_sys_room] OFF
/****** Object:  Table [dbo].[angel_sys_role]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rolename] [nvarchar](128) NOT NULL,
	[level] [int] NULL,
	[remark] [nvarchar](4000) NULL,
	[isenabled] [nvarchar](2) NOT NULL,
	[createuser] [nvarchar](128) NOT NULL,
	[createtime] [datetime2](7) NOT NULL,
	[updateuser] [nvarchar](128) NULL,
	[updatetime] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F1ED998B2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'序列号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_role', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_role] ON
INSERT [dbo].[angel_sys_role] ([id], [rolename], [level], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (1, N'超级管理员', 9, N'管理系统所有的资源信息', N'Y', N'admin', CAST(0x07008BC21A791A3F0B AS DateTime2), N'admin', CAST(0x07008283EC5D37370B AS DateTime2))
INSERT [dbo].[angel_sys_role] ([id], [rolename], [level], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (49, N'公司新闻', 1, N'公司新闻', N'Y', N'admin', CAST(0x070025C70F90743E0B AS DateTime2), N'admin', CAST(0x0780274F1B6137370B AS DateTime2))
INSERT [dbo].[angel_sys_role] ([id], [rolename], [level], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (51, N'销售部', 1, N'销售部', N'Y', N'admin', CAST(0x07009B772090743E0B AS DateTime2), N'admin', CAST(0x078021237F5C8E370B AS DateTime2))
INSERT [dbo].[angel_sys_role] ([id], [rolename], [level], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (54, N'其它角色', 3, N'其它角色', N'Y', N'admin', CAST(0x070079B13A90743E0B AS DateTime2), N'admin', CAST(0x07000B914F9670370B AS DateTime2))
INSERT [dbo].[angel_sys_role] ([id], [rolename], [level], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (55, N'数据管理员', 6, N'', N'Y', N'admin', CAST(0x0780D8BC017FEC3F0B AS DateTime2), N'admin', CAST(0x0700D52B8B9670370B AS DateTime2))
SET IDENTITY_INSERT [dbo].[angel_sys_role] OFF
/****** Object:  Table [dbo].[angel_sys_operationlog]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_operationlog](
	[id] [int] NOT NULL,
	[userid] [int] NOT NULL,
	[username] [nvarchar](128) NOT NULL,
	[roleid] [int] NOT NULL,
	[rolename] [nvarchar](128) NOT NULL,
	[logposition] [nvarchar](128) NULL,
	[operationtype] [nvarchar](128) NOT NULL,
	[operationparam] [nvarchar](max) NULL,
	[createuser] [nvarchar](128) NOT NULL,
	[createdate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F1BFD2C07] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (1, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'删除菜单信息编号为:(225)', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "删除菜单信息编号为:(225)"}]}', N'admin', CAST(0x070094014994EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (2, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《日常费用报销单-新版.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《日常费用报销单-新版.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0780BFCA04A588400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (3, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《日常费用报销单-新版.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《日常费用报销单-新版.xlsx》数据文件成功。"}]}', N'admin', CAST(0x070026A349A688400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (4, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:上传文件存档管理 菜单编号:239!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:上传文件存档管理 菜单编号:239!"}]}', N'admin', CAST(0x0700754CBE5289400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (5, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0700049D185A89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (6, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x07009A09E85A89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (7, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0780AAC0A95B89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (8, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0780F33FB95B89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (9, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0700191BED5B89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (10, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x070081A4F65B89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (11, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x07808078C55C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (12, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x0780C9F7D45C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (13, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x07008A05EB5C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (14, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x07008A05EB5C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (15, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x0780209EEB5C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (16, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x07803CECF95C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (17, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x07803CECF95C89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (18, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x07003182DE5E89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (19, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x07003182DE5E89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (20, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0780C71ADF5E89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (21, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x0700E28AF75E89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (22, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x0700E28AF75E89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (23, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x07807823F85E89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (24, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x078072AB205F89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (25, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x078072AB205F89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (26, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x078072AB205F89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (27, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0700176B285F89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (28, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x0700176B285F89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (29, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《test.txt》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《test.txt》数据文件成功。"}]}', N'admin', CAST(0x0780AD03295F89400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (30, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:文件上传 菜单编号:266!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:文件上传 菜单编号:266!"}]}', N'admin', CAST(0x0780CDA5D0A989400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (31, 1, N'admin', 1, N'超级管理员', N'系统管理-用户管理', N'新增：test123 用户 编号为:7!', N'{ "insert_log": [{ "logposition":"系统管理-用户管理","operationtype": "新增：test123 用户 编号为:7!"}]}', N'admin', CAST(0x0700CCA699579E400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (32, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:日志管理 菜单编号:151!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:日志管理 菜单编号:151!"}]}', N'admin', CAST(0x070087B44452C3400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (33, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:常用示例!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:常用示例!"}]}', N'admin', CAST(0x070077C61D8BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (34, 1, N'admin', 1, N'超级管理员', N'系统管理-角色管理', N'修改角色名称:超级管理员 角色编号:1!', N'{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "修改角色名称:超级管理员 角色编号:1!"}]}', N'admin', CAST(0x0700DF4F278BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (35, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:常用示例 菜单编号:267!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:常用示例 菜单编号:267!"}]}', N'admin', CAST(0x0700EABA428BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (36, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:系统管理 菜单编号:138!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:系统管理 菜单编号:138!"}]}', N'admin', CAST(0x0700F8E1498BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (37, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:数据存档 菜单编号:185!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:数据存档 菜单编号:185!"}]}', N'admin', CAST(0x0700606B538BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (38, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:文件上传 菜单编号:181!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:文件上传 菜单编号:181!"}]}', N'admin', CAST(0x07006E925A8BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (39, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:文件上传 菜单编号:266!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:文件上传 菜单编号:266!"}]}', N'admin', CAST(0x07005AF37B8BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (40, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:常用示例 菜单编号:267!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:常用示例 菜单编号:267!"}]}', N'admin', CAST(0x0780B277888BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (41, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:文件上传 菜单编号:266!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:文件上传 菜单编号:266!"}]}', N'admin', CAST(0x0700928F988BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (42, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:数据存档 菜单编号:185!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:数据存档 菜单编号:185!"}]}', N'admin', CAST(0x0780BDE2A38BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (43, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:系统管理 菜单编号:138!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:系统管理 菜单编号:138!"}]}', N'admin', CAST(0x0780ACFFB08BC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (44, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:文件上传 菜单编号:181!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:文件上传 菜单编号:181!"}]}', N'admin', CAST(0x07004706628CC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (45, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:邮件发送!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:邮件发送!"}]}', N'admin', CAST(0x07808D4F198EC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (46, 1, N'admin', 1, N'超级管理员', N'系统管理-角色管理', N'修改角色名称:超级管理员 角色编号:1!', N'{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "修改角色名称:超级管理员 角色编号:1!"}]}', N'admin', CAST(0x07004E5D2F8EC7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (47, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:二维码生成!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:二维码生成!"}]}', N'admin', CAST(0x0780C248DCB0C7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (48, 1, N'admin', 1, N'超级管理员', N'系统管理-角色管理', N'修改角色名称:超级管理员 角色编号:1!', N'{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "修改角色名称:超级管理员 角色编号:1!"}]}', N'admin', CAST(0x07802AD2E5B0C7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (49, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:打印测试!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:打印测试!"}]}', N'admin', CAST(0x07800F1792B7C7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (50, 1, N'admin', 1, N'超级管理员', N'系统管理-角色管理', N'修改角色名称:超级管理员 角色编号:1!', N'{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "修改角色名称:超级管理员 角色编号:1!"}]}', N'admin', CAST(0x07000E399CB7C7400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (51, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:电子签章!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:电子签章!"}]}', N'admin', CAST(0x0780079EC77BC8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (52, 1, N'admin', 1, N'超级管理员', N'系统管理-角色管理', N'修改角色名称:超级管理员 角色编号:1!', N'{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "修改角色名称:超级管理员 角色编号:1!"}]}', N'admin', CAST(0x07809C58D27BC8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (53, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:统计报表!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:统计报表!"}]}', N'admin', CAST(0x0780FAEA7088C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (54, 1, N'admin', 1, N'超级管理员', N'系统管理-角色管理', N'修改角色名称:超级管理员 角色编号:1!', N'{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "修改角色名称:超级管理员 角色编号:1!"}]}', N'admin', CAST(0x0700263E7C88C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (55, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:系统管理 菜单编号:138!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:系统管理 菜单编号:138!"}]}', N'admin', CAST(0x0780ABF38988C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (56, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:统计报表 菜单编号:272!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:统计报表 菜单编号:272!"}]}', N'admin', CAST(0x07004DF7A588C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (57, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:统计报表 菜单编号:272!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:统计报表 菜单编号:272!"}]}', N'admin', CAST(0x07808671B888C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (58, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:统计报表 菜单编号:272!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:统计报表 菜单编号:272!"}]}', N'admin', CAST(0x07000C27C688C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (59, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:文件上传 菜单编号:181!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:文件上传 菜单编号:181!"}]}', N'admin', CAST(0x070025B9E888C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (60, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:数据存档 菜单编号:185!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:数据存档 菜单编号:185!"}]}', N'admin', CAST(0x0700B7B70789C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (61, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'修改菜单名称:日期测试 菜单编号:224!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "修改菜单名称:日期测试 菜单编号:224!"}]}', N'admin', CAST(0x078075AA1397C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (62, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《1_null_28_test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《1_null_28_test.rar》数据文件成功。"}]}', N'admin', CAST(0x0780E0496B99C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (63, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《1_null_659_test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《1_null_659_test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0700ED927C99C8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (64, 1, N'admin', 1, N'超级管理员', N'采集甄核-多维数据采集-数据填报', N'导入《1_null_659_test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《1_null_659_test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0700D5B21E9AC8400B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (65, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'删除菜单信息编号为:(274)', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "删除菜单信息编号为:(274)"}]}', N'admin', CAST(0x07000A4AD08A6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (66, 1, N'admin', 1, N'超级管理员', N'系统管理-菜单管理', N'新增菜单名称:test!', N'{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "新增菜单名称:test!"}]}', N'admin', CAST(0x07805815868B6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (67, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x078029DA5D8C6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (68, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x0780E7B11B8E6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (69, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x07005094878E6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (70, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x0780FC02BF8E6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (71, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x0700A971F68E6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (72, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x0700478DF58F6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (73, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x070081606A906A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (74, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x07005C925D956A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (75, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x078038EE81956A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (76, 1, N'admin', 1, N'超级管理员', N'系统管理-日志管理-登录日志', N'导出报表', N'{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}', N'admin', CAST(0x0780AD19FF956A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (77, 1, N'admin', 1, N'超级管理员', N'数据填报', N'导入《1_angelasp_30_angelmvc.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《1_angelasp_30_angelmvc.rar》数据文件成功。"}]}', N'admin', CAST(0x0780A499009B6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (78, 1, N'admin', 1, N'超级管理员', N'数据填报', N'导入《1_angelasp_31_1_null_659_test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《1_angelasp_31_1_null_659_test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x0780A499009B6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (79, 1, N'admin', 1, N'超级管理员', N'数据填报', N'导入《1_angelasp_175_1_null_28_test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《1_angelasp_175_1_null_28_test.rar》数据文件成功。"}]}', N'admin', CAST(0x07003B32019B6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (80, 1, N'admin', 1, N'超级管理员', N'数据填报', N'导入《angelmvc.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《angelmvc.rar》数据文件成功。"}]}', N'admin', CAST(0x07009D9D959D6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (81, 1, N'admin', 1, N'超级管理员', N'数据填报', N'导入《test.xlsx》数据文件成功。', N'{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《test.xlsx》数据文件成功。"}]}', N'admin', CAST(0x07009D9D959D6A410B AS DateTime2))
INSERT [dbo].[angel_sys_operationlog] ([id], [userid], [username], [roleid], [rolename], [logposition], [operationtype], [operationparam], [createuser], [createdate]) VALUES (82, 1, N'admin', 1, N'超级管理员', N'数据填报', N'导入《test.rar》数据文件成功。', N'{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《test.rar》数据文件成功。"}]}', N'admin', CAST(0x07803336969D6A410B AS DateTime2))
/****** Object:  Table [dbo].[angel_sys_menusofroles]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_menusofroles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[roleid] [int] NOT NULL,
	[menuid] [int] NOT NULL,
	[isindex] [int] NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F1920BF5C] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自动编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_menusofroles', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_menusofroles] ON
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6235, 59, 174, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6236, 59, 175, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6237, 59, 195, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6238, 59, 176, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6239, 59, 144, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6240, 59, 198, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6241, 59, 202, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6242, 59, 227, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6243, 59, 213, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6244, 59, 146, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6245, 59, 217, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6246, 59, 177, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6247, 59, 169, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6248, 59, 214, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6249, 59, 215, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6250, 59, 216, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6251, 59, 178, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6252, 59, 165, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6253, 59, 166, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6254, 59, 181, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6255, 59, 159, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6256, 59, 182, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6257, 59, 155, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6258, 59, 208, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6259, 59, 209, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6260, 59, 156, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6261, 59, 190, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6262, 59, 203, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6263, 59, 224, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6264, 59, 185, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6265, 59, 162, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (6266, 59, 220, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7826, 55, 138, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7827, 55, 141, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7828, 55, 174, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7829, 55, 175, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7830, 55, 148, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7831, 55, 195, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7832, 55, 204, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7833, 55, 259, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7834, 55, 176, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7835, 55, 144, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7836, 55, 163, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7837, 55, 198, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7838, 55, 202, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7839, 55, 227, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7840, 55, 210, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7841, 55, 221, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7842, 55, 228, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7843, 55, 230, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7844, 55, 211, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7845, 55, 212, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7846, 55, 225, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7847, 55, 213, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7848, 55, 145, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (7849, 55, 146, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8004, 49, 138, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8005, 49, 174, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8006, 49, 176, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8007, 49, 233, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8008, 49, 236, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8009, 49, 240, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8010, 49, 210, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8011, 49, 228, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8012, 49, 251, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8013, 49, 213, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8014, 49, 235, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8015, 51, 174, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8016, 51, 176, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8017, 51, 233, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8018, 51, 213, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8019, 51, 235, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8079, 54, 138, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8080, 54, 151, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8081, 54, 153, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8082, 54, 206, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8083, 54, 201, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8084, 54, 205, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8085, 54, 207, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8086, 54, 174, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8087, 54, 175, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8088, 54, 148, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8089, 54, 195, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8090, 54, 204, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8091, 54, 176, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8092, 54, 144, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8093, 54, 163, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8094, 54, 198, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8095, 54, 202, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8096, 54, 227, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8097, 54, 233, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8098, 54, 236, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8099, 54, 237, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8100, 54, 239, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8101, 54, 240, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8102, 54, 210, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8103, 54, 221, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8104, 54, 228, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8105, 54, 230, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8106, 54, 211, 0)
GO
print 'Processed 100 total records'
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8107, 54, 212, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8108, 54, 225, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8109, 54, 231, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8110, 54, 251, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8111, 54, 213, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8112, 54, 145, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8113, 54, 146, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8114, 54, 234, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8115, 54, 235, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8116, 54, 232, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8117, 54, 177, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8118, 54, 169, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8119, 54, 214, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8120, 54, 215, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8121, 54, 216, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8122, 54, 178, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8123, 54, 165, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8124, 54, 166, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8125, 54, 181, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8126, 54, 159, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8127, 54, 182, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8128, 54, 155, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8129, 54, 208, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8130, 54, 209, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8131, 54, 156, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8132, 54, 190, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8133, 54, 203, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8134, 54, 224, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8135, 54, 185, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8136, 54, 162, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8137, 54, 220, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8233, 1, 138, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8234, 1, 139, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8235, 1, 140, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8236, 1, 141, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8237, 1, 151, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8238, 1, 153, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8239, 1, 206, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8240, 1, 201, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8241, 1, 205, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8242, 1, 181, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8243, 1, 224, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8244, 1, 257, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8245, 1, 266, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8246, 1, 185, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8247, 1, 239, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8248, 1, 258, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8249, 1, 267, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8250, 1, 268, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8251, 1, 269, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8252, 1, 270, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8253, 1, 271, 0)
INSERT [dbo].[angel_sys_menusofroles] ([id], [roleid], [menuid], [isindex]) VALUES (8254, 1, 272, 0)
SET IDENTITY_INSERT [dbo].[angel_sys_menusofroles] OFF
/****** Object:  Table [dbo].[angel_sys_menu]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_menu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[menuname] [nvarchar](128) NOT NULL,
	[parentid] [int] NOT NULL,
	[remark] [nvarchar](4000) NULL,
	[orderid] [int] NOT NULL,
	[menuicon] [nvarchar](128) NULL,
	[menuurl] [nvarchar](128) NULL,
	[isvisible] [nchar](1) NULL,
	[isenabled] [nchar](1) NULL,
	[createuser] [nvarchar](50) NOT NULL,
	[createtime] [datetime2](7) NOT NULL,
	[updateuser] [nvarchar](50) NULL,
	[updatetime] [datetime2](7) NOT NULL,
	[menucode] [nvarchar](18) NULL,
 CONSTRAINT [PK__angel_sy__3213E83F164452B1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'id自动编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_menu', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_menu] ON
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (138, N'系统管理', 0, N'系统管理', 4, N'fa fa-gear', N'#', N'Y', N'Y', N'admin', CAST(0x0700155B8988C8400B AS DateTime2), N'admin', CAST(0x0700155B8988C8400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (139, N'菜单管理', 138, N'菜单管理', 1, N'defultico', N'/SysManager/MenuManager', N'Y', N'Y', N'admin', CAST(0x0700EFE8DE93743E0B AS DateTime2), N'admin', CAST(0x078057CB4A9435370B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (140, N'用户管理', 138, N'用户管理', 2, N'defultico', N'/SysManager/UserManager', N'Y', N'Y', N'admin', CAST(0x07808581DF93743E0B AS DateTime2), N'admin', CAST(0x0700BE765E9435370B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (141, N'角色管理', 138, N'角色管理', 3, N'defultico', N'/SysManager/RoleManager', N'Y', N'Y', N'admin', CAST(0x07001C1AE093743E0B AS DateTime2), N'admin', CAST(0x070080626A9435370B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (143, N'数据模板管理', 175, N'数据模板管理', 8, N'defultico', N'/datacollection/datatemplate', N'N', N'Y', N'admin', CAST(0x0780DFE3E193743E0B AS DateTime2), N'admin', CAST(0x07805608A3A09D3D0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (151, N'日志管理', 138, N'日志管理', 4, N'fa fa-file-text', N'#', N'Y', N'Y', N'admin', CAST(0x07005A834352C3400B AS DateTime2), N'admin', CAST(0x07005A834352C3400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (153, N'登陆日志', 151, N'登陆日志', 2, N'defultico', N'/SysManager/LoginLogManager', N'Y', N'Y', N'admin', CAST(0x0700767CE293743E0B AS DateTime2), N'admin', CAST(0x07002F450E874F370B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (157, N'欢迎', 131, N'欢迎', 1, N'defultico', N'/welcome/welcome', N'N', N'N', N'admin', CAST(0x0700000AE68737370B AS DateTime2), N'admin', CAST(0x0700000AE68737370B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (181, N'文件上传', 0, N'文件上传', 1, N'fa fa-jsfiddle', N'#', N'Y', N'Y', N'admin', CAST(0x0700F887E788C8400B AS DateTime2), N'admin', CAST(0x0700F887E788C8400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (185, N'数据存档', 0, N'数据存档', 2, N'fa fa-file-word-o', N'111', N'Y', N'Y', N'admin', CAST(0x0780201F0789C8400B AS DateTime2), N'admin', CAST(0x0780201F0789C8400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (201, N'下载列表管理', 138, N'下载列表管理', 5, N'defultico', N'/sysmanager/downloadlistmanager', N'Y', N'Y', N'admin', CAST(0x07808FE0D390743E0B AS DateTime2), N'admin', CAST(0x07808FE0D390743E0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (205, N'部门管理', 138, N'部门管理', 3, N'defultico', N'/sysmanager/departmentmanager', N'Y', N'Y', N'admin', CAST(0x07804A86F581EC3F0B AS DateTime2), N'admin', CAST(0x07804A86F581EC3F0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (206, N'操作日志', 151, N'操作日志', 3, N'defultico', N'/sysmanager/operlogmanager', N'Y', N'Y', N'admin', CAST(0x0700E943D69289370B AS DateTime2), N'admin', CAST(0x0700E943D69289370B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (212, N'数据导出', 230, N'导出网络业务投诉详表', 3, N'defultico', N'/datacollection/exportcomplaint', N'Y', N'Y', N'admin', CAST(0x078093A8E693743E0B AS DateTime2), N'admin', CAST(0x0780564973801C3E0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (224, N'日期测试', 181, N'日期测试', 6, N'defultico', N'/datacollection/complaintanalysis', N'Y', N'Y', N'admin', CAST(0x078048791297C8400B AS DateTime2), N'admin', CAST(0x078048791297C8400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (239, N'上传文件存档管理', 185, N'上传文件存档管理', 239, N'defultico', N'/datacollection/filebak', N'Y', N'Y', N'admin', CAST(0x0700481BBD5289400B AS DateTime2), N'admin', CAST(0x0700481BBD5289400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (240, N'填报数据导出', 176, N'', 240, N'defultico', N'/DataCollection/CollectReportsGP', N'Y', N'Y', N'admin', CAST(0x07801A3CEA93743E0B AS DateTime2), N'admin', CAST(0x070066FA8555373E0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (257, N'编辑器测试', 181, N'编辑器测试', 200, N'defultico', N'/provincereport/jdcollect', N'Y', N'Y', N'admin', CAST(0x07007B079D8AEC3F0B AS DateTime2), N'admin', CAST(0x07007B079D8AEC3F0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (258, N'组织结构', 185, N'组织结构', 151, N'fa fa-file-excel-o', N'/provincereport/organization', N'Y', N'Y', N'admin', CAST(0x0700FF0EA2771A3F0B AS DateTime2), N'admin', CAST(0x0700FF0EA2771A3F0B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (266, N'文件上传', 181, N'文件上传', 1, N'fa fa-area-chart', N'/datacollection/dataimport', N'Y', N'Y', N'admin', CAST(0x0780FBF6978BC7400B AS DateTime2), N'admin', CAST(0x0780FBF6978BC7400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (267, N'常用示例', 0, N'常用示例', 5, N'fa fa-wrench', N'#', N'Y', N'Y', N'admin', CAST(0x07808546878BC7400B AS DateTime2), N'admin', CAST(0x07808546878BC7400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (268, N'邮件发送', 267, N'邮件发送', 1, N'fa fa-file-text', N'/SendMail/Index', N'Y', N'Y', N'admin', CAST(0x0700F7B6188EC7400B AS DateTime2), N'', CAST(0x0700F7B6188EC7400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (269, N'二维码生成', 267, N'二维码生成', 2, N'fa fa-file-picture-o', N'/BarCode/', N'Y', N'Y', N'admin', CAST(0x07002CB0DBB0C7400B AS DateTime2), N'', CAST(0x07002CB0DBB0C7400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (270, N'打印测试', 267, N'打印测试', 3, N'fa fa-file-pdf-o', N'/Print/', N'Y', N'Y', N'admin', CAST(0x0700797E91B7C7400B AS DateTime2), N'', CAST(0x0700797E91B7C7400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (271, N'电子签章', 267, N'电子签章', 4, N'fa fa-file-text-o', N'/Electronicchapter/', N'Y', N'Y', N'admin', CAST(0x0780DA6CC67BC8400B AS DateTime2), N'', CAST(0x0780DA6CC67BC8400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (272, N'统计报表', 0, N'统计报表', 3, N'fa fa-bar-chart', N'#', N'Y', N'Y', N'admin', CAST(0x0700DFF5C488C8400B AS DateTime2), N'admin', CAST(0x0700DFF5C488C8400B AS DateTime2), N'')
INSERT [dbo].[angel_sys_menu] ([id], [menuname], [parentid], [remark], [orderid], [menuicon], [menuurl], [isvisible], [isenabled], [createuser], [createtime], [updateuser], [updatetime], [menucode]) VALUES (275, N'test', 0, N'22222', 1, N'fa fa-pie-chart', N'11111', N'Y', N'Y', N'admin', CAST(0x07D05ADF828B6A410B AS DateTime2), N'', CAST(0x07D05ADF828B6A410B AS DateTime2), N'')
SET IDENTITY_INSERT [dbo].[angel_sys_menu] OFF
/****** Object:  Table [dbo].[angel_sys_loginlog]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_loginlog](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[username] [nvarchar](128) NOT NULL,
	[roleid] [int] NOT NULL,
	[rolename] [nvarchar](128) NOT NULL,
	[clientip] [nvarchar](128) NULL,
	[logintime] [datetime2](7) NOT NULL,
	[createuser] [nvarchar](128) NOT NULL,
	[createtime] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F1367E606] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'系统编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_loginlog', @level2type=N'COLUMN',@level2name=N'id'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_loginlog] ON
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9295, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780B1D3EA91EC3F0B AS DateTime2), N'admin', CAST(0x0780B1D3EA91EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9296, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780775AD893EC3F0B AS DateTime2), N'admin', CAST(0x0780775AD893EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9297, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078087129A96EC3F0B AS DateTime2), N'admin', CAST(0x078087129A96EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9298, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700396332A4EC3F0B AS DateTime2), N'admin', CAST(0x0700396332A4EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9299, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780BE1840A4EC3F0B AS DateTime2), N'admin', CAST(0x0780BE1840A4EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9300, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700D9B2CDB9EC3F0B AS DateTime2), N'admin', CAST(0x0700D9B2CDB9EC3F0B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9301, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07006B4FDB8772400B AS DateTime2), N'admin', CAST(0x07006B4FDB8772400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9302, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078095FE488E72400B AS DateTime2), N'admin', CAST(0x078095FE488E72400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9303, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078076408A8981400B AS DateTime2), N'admin', CAST(0x078076408A8981400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9304, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x070023DCF28A81400B AS DateTime2), N'admin', CAST(0x070023DCF28A81400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9305, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07001289C75182400B AS DateTime2), N'admin', CAST(0x07001289C75182400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9306, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780AF299E6C84400B AS DateTime2), N'admin', CAST(0x0780AF299E6C84400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9307, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x070084D3D68084400B AS DateTime2), N'admin', CAST(0x070084D3D68084400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9308, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700EC10A58584400B AS DateTime2), N'admin', CAST(0x0700EC10A58584400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9309, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07800A2AC68E84400B AS DateTime2), N'admin', CAST(0x07800A2AC68E84400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9310, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x070036BBE58287400B AS DateTime2), N'admin', CAST(0x070036BBE58287400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9311, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780CC53E68287400B AS DateTime2), N'admin', CAST(0x0780CC53E68287400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9312, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x070063ECE68287400B AS DateTime2), N'admin', CAST(0x070063ECE68287400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9313, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780BE2CDF8288400B AS DateTime2), N'admin', CAST(0x0780BE2CDF8288400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9314, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780F5518F8A88400B AS DateTime2), N'admin', CAST(0x0780F5518F8A88400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9315, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700B98C4E579E400B AS DateTime2), N'admin', CAST(0x0700B98C4E579E400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9316, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07804F254F579E400B AS DateTime2), N'admin', CAST(0x07804F254F579E400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9317, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780B0DE1E599E400B AS DateTime2), N'admin', CAST(0x0780B0DE1E599E400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9318, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700E347277B9E400B AS DateTime2), N'admin', CAST(0x0700E347277B9E400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9319, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078035F1C5B5C2400B AS DateTime2), N'admin', CAST(0x078035F1C5B5C2400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9320, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780DC4088B6C2400B AS DateTime2), N'admin', CAST(0x0780DC4088B6C2400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9321, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700FA99BDB7C2400B AS DateTime2), N'admin', CAST(0x0700FA99BDB7C2400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9322, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780357859B9C2400B AS DateTime2), N'admin', CAST(0x0780357859B9C2400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9323, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07002028B6BAC2400B AS DateTime2), N'admin', CAST(0x07002028B6BAC2400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9324, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078076A3204FC3400B AS DateTime2), N'admin', CAST(0x078076A3204FC3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9325, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700CD1D0650C3400B AS DateTime2), N'admin', CAST(0x0700CD1D0650C3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9326, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700A822C853C3400B AS DateTime2), N'admin', CAST(0x0700A822C853C3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9327, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07001CC9B154C3400B AS DateTime2), N'admin', CAST(0x07001CC9B154C3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9328, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078014CD4657C3400B AS DateTime2), N'admin', CAST(0x078014CD4657C3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9329, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780086CDA8AC7400B AS DateTime2), N'admin', CAST(0x0780086CDA8AC7400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9330, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700CC35DC8AC7400B AS DateTime2), N'admin', CAST(0x0700CC35DC8AC7400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9331, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07003182DE5EC8400B AS DateTime2), N'admin', CAST(0x07003182DE5EC8400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9332, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07808BFF2E6BC8400B AS DateTime2), N'admin', CAST(0x07808BFF2E6BC8400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9333, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700B4CEEA87C8400B AS DateTime2), N'admin', CAST(0x0700B4CEEA87C8400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9334, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078052707D8AC8400B AS DateTime2), N'admin', CAST(0x078052707D8AC8400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9335, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780134AEAAFC8400B AS DateTime2), N'admin', CAST(0x0780134AEAAFC8400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9336, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07009434F26CC9400B AS DateTime2), N'admin', CAST(0x07009434F26CC9400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9337, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700C165F36CC9400B AS DateTime2), N'admin', CAST(0x0700C165F36CC9400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9338, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07002698DE8AE2400B AS DateTime2), N'admin', CAST(0x07002698DE8AE2400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9339, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07008DF97279E3400B AS DateTime2), N'admin', CAST(0x07008DF97279E3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9340, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07007A398A7BE3400B AS DateTime2), N'admin', CAST(0x07007A398A7BE3400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9341, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07809DD7EDA3E4400B AS DateTime2), N'admin', CAST(0x07809DD7EDA3E4400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9342, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x070023D4435BFC400B AS DateTime2), N'admin', CAST(0x070023D4435BFC400B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9343, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780B2886B7E03410B AS DateTime2), N'admin', CAST(0x0780B2886B7E03410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9344, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700BE309B705C410B AS DateTime2), N'admin', CAST(0x0700BE309B705C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9345, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780C6FA187D5C410B AS DateTime2), N'admin', CAST(0x0780C6FA187D5C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9346, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07807006C77D5C410B AS DateTime2), N'admin', CAST(0x07807006C77D5C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9347, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07807CAA3A825C410B AS DateTime2), N'admin', CAST(0x07807CAA3A825C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9348, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078043898A825C410B AS DateTime2), N'admin', CAST(0x078043898A825C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9349, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780D805818E5C410B AS DateTime2), N'admin', CAST(0x0780D805818E5C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9350, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0700903936915C410B AS DateTime2), N'admin', CAST(0x0700903936915C410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9351, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07009DB1347C5D410B AS DateTime2), N'admin', CAST(0x07009DB1347C5D410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9352, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780607B367C5D410B AS DateTime2), N'admin', CAST(0x0780607B367C5D410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9353, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x070073B2CF8C5D410B AS DateTime2), N'admin', CAST(0x070073B2CF8C5D410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9354, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780F9920E8A6A410B AS DateTime2), N'admin', CAST(0x0780F9920E8A6A410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9355, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x078026C40F8A6A410B AS DateTime2), N'admin', CAST(0x078026C40F8A6A410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9356, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x07809054849D6A410B AS DateTime2), N'admin', CAST(0x07809054849D6A410B AS DateTime2))
INSERT [dbo].[angel_sys_loginlog] ([id], [userid], [username], [roleid], [rolename], [clientip], [logintime], [createuser], [createtime]) VALUES (9357, 1, N'admin', 1, N'超级管理员', N'::1', CAST(0x0780BD85859D6A410B AS DateTime2), N'admin', CAST(0x0780BD85859D6A410B AS DateTime2))
SET IDENTITY_INSERT [dbo].[angel_sys_loginlog] OFF
/****** Object:  Table [dbo].[angel_sys_department]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_sys_department](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[dname] [nvarchar](128) NULL,
	[level] [nvarchar](100) NULL,
	[parent_id] [int] NULL,
	[seq] [int] NULL,
	[remark] [nvarchar](4000) NULL,
	[isenabled] [nvarchar](2) NOT NULL,
	[createuser] [nvarchar](128) NOT NULL,
	[createtime] [datetime2](7) NOT NULL,
	[updateuser] [nvarchar](128) NULL,
	[updatetime] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__angel_sy__3213E83F108B795B] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'序列号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'部门名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'dname'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'部门级别' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'level'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'父级别ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'parent_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'排序号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'备注' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否可以用' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'isenabled'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建者' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'createuser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'createtime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改者' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'updateuser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_sys_department', @level2type=N'COLUMN',@level2name=N'updatetime'
GO
SET IDENTITY_INSERT [dbo].[angel_sys_department] ON
INSERT [dbo].[angel_sys_department] ([id], [dname], [level], [parent_id], [seq], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (1, N'销售部', N'0', 0, 1, N'销售部', N'Y', N'admin', CAST(0x0780824F4383EC3F0B AS DateTime2), N'admin', CAST(0x0700A982D9817A370B AS DateTime2))
INSERT [dbo].[angel_sys_department] ([id], [dname], [level], [parent_id], [seq], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (2, N'研发部', N'0', 0, 1, N'研发部', N'Y', N'admin', CAST(0x0780DCB14583EC3F0B AS DateTime2), N'admin', CAST(0x0700CCAE48877A370B AS DateTime2))
INSERT [dbo].[angel_sys_department] ([id], [dname], [level], [parent_id], [seq], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (3, N'后勤部', N'0', 0, 1, N'后勤部', N'Y', N'admin', CAST(0x0700A07B4783EC3F0B AS DateTime2), N'admin', CAST(0x0700BBCB55877A370B AS DateTime2))
INSERT [dbo].[angel_sys_department] ([id], [dname], [level], [parent_id], [seq], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (4, N'网络部', N'0', 0, 1, N'网络部', N'Y', N'admin', CAST(0x0780D1462A83EC3F0B AS DateTime2), N'admin', CAST(0x07805F8B5D877A370B AS DateTime2))
INSERT [dbo].[angel_sys_department] ([id], [dname], [level], [parent_id], [seq], [remark], [isenabled], [createuser], [createtime], [updateuser], [updatetime]) VALUES (6, N'销售一部', N'0,1', 1, 1, N'销售一部', N'Y', N'admin', CAST(0x07804CCB7489EC3F0B AS DateTime2), N'admin', CAST(0x0700B80F6A877A370B AS DateTime2))
SET IDENTITY_INSERT [dbo].[angel_sys_department] OFF
/****** Object:  Table [dbo].[angel_filedata_bak]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_filedata_bak](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[FileName] [nvarchar](200) NULL,
	[SysName] [nvarchar](200) NULL,
	[Type] [nvarchar](1) NOT NULL,
	[CreateDate] [datetime2](7) NULL,
	[CreateUserId] [int] NULL,
	[CreateUserName] [nvarchar](50) NULL,
 CONSTRAINT [PK__angel_fi__3213E83F0DAF0CB0] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'记录代码 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_filedata_bak', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'上传文件名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_filedata_bak', @level2type=N'COLUMN',@level2name=N'FileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'系统定义名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'angel_filedata_bak', @level2type=N'COLUMN',@level2name=N'SysName'
GO
SET IDENTITY_INSERT [dbo].[angel_filedata_bak] ON
INSERT [dbo].[angel_filedata_bak] ([id], [FileName], [SysName], [Type], [CreateDate], [CreateUserId], [CreateUserName]) VALUES (2520, N'angelmvc.rar', N'1_angelasp_110_angelmvc.rar', N'1', CAST(0x07009D9D959D6A410B AS DateTime2), 1, N'admin')
INSERT [dbo].[angel_filedata_bak] ([id], [FileName], [SysName], [Type], [CreateDate], [CreateUserId], [CreateUserName]) VALUES (2521, N'test.xlsx', N'1_angelasp_599_test.xlsx', N'1', CAST(0x07009D9D959D6A410B AS DateTime2), 1, N'admin')
INSERT [dbo].[angel_filedata_bak] ([id], [FileName], [SysName], [Type], [CreateDate], [CreateUserId], [CreateUserName]) VALUES (2522, N'test.rar', N'1_angelasp_118_test.rar', N'1', CAST(0x07803336969D6A410B AS DateTime2), 1, N'admin')
SET IDENTITY_INSERT [dbo].[angel_filedata_bak] OFF
/****** Object:  Table [dbo].[angel_downloadlist]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_downloadlist](
	[userid] [int] NOT NULL,
	[username] [nvarchar](128) NULL,
	[filename] [nvarchar](128) NULL,
	[isenabled] [nchar](1) NULL,
	[createuser] [nvarchar](128) NULL,
	[createtime] [datetime2](7) NOT NULL,
	[downloadhref] [nvarchar](128) NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[angel_downloadlist] ([userid], [username], [filename], [isenabled], [createuser], [createtime], [downloadhref]) VALUES (1, N'admin', N'test.rar', N'1', N'admin', CAST(0x07B007EDB79D6A410B AS DateTime2), N'/InPut/DownBackupFile?filename=test.rar&sysfilename=1_angelasp_118_test.rar')
INSERT [dbo].[angel_downloadlist] ([userid], [username], [filename], [isenabled], [createuser], [createtime], [downloadhref]) VALUES (1, N'admin', N'test.rar', N'1', N'admin', CAST(0x0730763EBE9D6A410B AS DateTime2), N'/InPut/DownBackupFile?filename=test.rar&sysfilename=1_angelasp_118_test.rar')
INSERT [dbo].[angel_downloadlist] ([userid], [username], [filename], [isenabled], [createuser], [createtime], [downloadhref]) VALUES (1, N'admin', N'test.rar', N'1', N'admin', CAST(0x07D02428309E6A410B AS DateTime2), N'/InPut/DownBackupFile?filename=test.rar&sysfilename=1_angelasp_118_test.rar')
INSERT [dbo].[angel_downloadlist] ([userid], [username], [filename], [isenabled], [createuser], [createtime], [downloadhref]) VALUES (1, N'admin', N'angelmvc.rar', N'1', N'admin', CAST(0x07F05444419E6A410B AS DateTime2), N'/InPut/DownBackupFile?filename=angelmvc.rar&sysfilename=1_angelasp_110_angelmvc.rar')
/****** Object:  Table [dbo].[angel_city]    Script Date: 08/06/2020 18:58:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[angel_city](
	[PRONAME] [nvarchar](50) NULL,
	[CITYNAME] [nvarchar](50) NULL,
	[CITY_NO] [nvarchar](50) NULL,
	[CAPITALCITY] [int] NULL
) ON [PRIMARY]
GO
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'北京', N'北京市', N'010', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'上海', N'上海市', N'021', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'天津', N'天津市', N'022', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'重庆', N'重庆市', N'023', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广东', N'广州市', N'020', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'四川', N'成都市', N'028', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'岳阳市', N'0730', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江苏', N'南京市', N'025', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'衢州市', N'0570', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'昭通市', N'0870', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'韶关市', N'0751', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'涪陵市', N'0810', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖南', N'长沙市', N'0731', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'无锡市', N'0510', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'浙江', N'杭州市', N'0571', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'云南', N'昆明市', N'0871', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'惠州市', N'0752', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'湘潭市', N'0732', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'镇江市', N'0511', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'湖州市', N'0572', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'大理市', N'0872', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'梅州市', N'0753', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'攀枝花', N'0812', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'株州市', N'0733', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江苏', N'苏州市', N'0512', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'嘉兴市', N'0573', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'云南', N'红河市', N'0873', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'汕头市', N'0754', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'自贡市', N'0813', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖南', N'衡阳市', N'0734', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南通市', N'0513', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'浙江', N'宁波市', N'0574', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'云南', N'曲靖市', N'0874', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广东', N'深圳市', N'0755', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'永川市', N'0814', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'郴州市', N'0735', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'扬州市', N'0514', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'绍兴市', N'0575', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'保山市', N'0875', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'珠海市', N'0756', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'四川', N'绵阳市', N'0816', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖南', N'常德市', N'0736', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'盐城市', N'0515', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'台州市', N'0576', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'文山市', N'0876', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'佛山市', N'0757', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南充市', N'0817', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'益阳市', N'0737', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'徐州市', N'0516', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'浙江', N'温州市', N'0577', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玉溪市', N'0877', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'肇庆市', N'0758', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'达县市', N'0818', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'娄底市', N'0738', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮阴市', N'0517', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'丽水市', N'0578', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'楚雄市', N'0878', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'湛江市', N'0759', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'万县市', N'0819', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'邵阳市', N'0739', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮安市', N'0517', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'金华市', N'0579', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'思茅市', N'0879', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'中山市', N'0760', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'遂宁市', N'0825', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'吉首市', N'0743', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'连云港', N'0518', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'舟山市', N'0580', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'景洪市', N'0691', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'河源市', N'0762', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'广安市', N'0826', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'张家界', N'0744', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'常州市', N'0519', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'潞西市', N'0692', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'清远市', N'0763', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'巴中市', N'0827', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'怀化市', N'0745', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泰州市', N'0523', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'滁州市', N'0550', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'东川市', N'0881', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'顺德市', N'0765', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泸州市', N'0830', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'永州冷', N'0746', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'安徽', N'合肥市', N'0551', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临沧市', N'0883', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'云浮市', N'0766', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宜宾市', N'0831', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'防城港', N'0770', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'安徽', N'蚌埠市', N'0552', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'六库市', N'0886', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'潮州市', N'0768', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'四川', N'内江市', N'0832', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'忻州市', N'0350', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广西', N'南宁市', N'0771', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'芜湖市', N'0553', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'中甸市', N'0887', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'东莞市', N'0769', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'乐山市', N'0833', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山西', N'太原市', N'0351', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广西', N'柳州市', N'0772', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮南市', N'0554', 0)
GO
print 'Processed 100 total records'
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'丽江市', N'0888', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'汕尾市', N'0660', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'西昌市', N'0834', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山西', N'大同市', N'0352', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'桂林市', N'0773', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'马鞍山', N'0555', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'潮阳市', N'0661', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'雅安市', N'0835', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阳泉市', N'0353', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'梧州市', N'0774', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安庆市', N'0556', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'吉林', N'长春市', N'0431', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阳江市', N'0662', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'康定市', N'0836', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'榆次市', N'0354', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玉林市', N'0775', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宿州市', N'0557', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'吉林', N'吉林市', N'0432', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'揭西市', N'0663', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'马尔康', N'0837', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'长治市', N'0355', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'百色市', N'0776', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阜阳市', N'0558', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'延吉市', N'0433', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'德阳市', N'0838', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'晋城市', N'0356', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'钦州市', N'0777', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黄山市', N'0559', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'四平市', N'0434', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'青海', N'西宁市', N'0971', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'广元市', N'0839', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临汾市', N'0357', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'河池市', N'0778', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮北市', N'0561', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'通化市', N'0435', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'海东市', N'0972', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泸州市', N'0840', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'离石市', N'0358', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'北海市', N'0779', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铜陵市', N'0562', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'白城市', N'0436', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'同仁市', N'0973', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'运城市', N'0359', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宣城市', N'0563', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'辽源市', N'0437', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'共和市', N'0974', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'儋州市', N'0890', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'宁夏', N'银川市', N'0951', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'六安市', N'0564', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'松原市', N'0438', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玛沁市', N'0975', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'海南', N'海口市', N'0898', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'拉萨市', N'0891', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'宁夏', N'石嘴山', N'0952', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'巢湖市', N'0565', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'浑江市', N'0439', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玉树市', N'0976', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'海南', N'三亚市', N'0899', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'日喀则', N'0892', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'吴忠市', N'0953', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'贵池市', N'0566', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'珲春市', N'0440', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'德令哈', N'0977', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'山南市', N'0893', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'固原市', N'0954', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'新余市', N'0790', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖北', N'武汉市', N'027', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'商丘市', N'0370', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'陕西', N'西安市', N'029', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'贵州', N'贵阳市', N'0851', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'辽宁', N'沈阳市', N'024', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江西', N'南昌市', N'0791', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖北', N'襄阳市', N'0710', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河南', N'郑州市', N'0371', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'咸阳市', N'0910', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'贵州', N'遵义市', N'0852', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铁岭市', N'0410', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江西', N'九江市', N'0792', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鄂州市', N'0711', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安阳市', N'0372', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'延安市', N'0911', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安顺市', N'0853', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'辽宁', N'大连市', N'0411', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'上饶市', N'0793', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'孝感市', N'0712', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'新乡市', N'0373', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'榆林市', N'0912', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'都均市', N'0854', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鞍山市', N'0412', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临川市', N'0794', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黄州市', N'0713', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'许昌市', N'0374', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'渭南市', N'0913', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'凯里市', N'0855', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'抚顺市', N'0413', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宜春市', N'0795', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黄石市', N'0714', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'平顶山', N'0375', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'商洛市', N'0914', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铜仁市', N'0856', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'本溪市', N'0414', 0)
GO
print 'Processed 200 total records'
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'吉安市', N'0796', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'咸宁市', N'0715', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'信阳市', N'0376', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安康市', N'0915', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'毕节市', N'0857', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'丹东市', N'0415', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'赣州市', N'0797', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'荆沙市', N'0716', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南阳市', N'0377', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'汉中市', N'0916', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'六盘水', N'0858', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'锦州市', N'0416', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'景德镇', N'0798', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宜昌市', N'0717', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'开封市', N'0378', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'陕西', N'宝鸡市', N'0917', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'兴义市', N'0859', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'营口市', N'0417', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'萍乡市', N'0799', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'恩施市', N'0718', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河南', N'洛阳市', N'0379', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铜川市', N'0919', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阜新市', N'0418', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鹰潭市', N'0701', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'十堰市', N'0719', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'焦作市', N'0391', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'海拉尔', N'0470', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'辽阳市', N'0419', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'随枣市', N'0722', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鹤壁市', N'0392', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'邯郸市', N'0310', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'朝阳市', N'0421', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临夏市', N'0930', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'荆门市', N'0724', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'濮阳市', N'0393', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河北', N'石家庄', N'0311', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'内蒙古', N'包头市', N'0472', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'盘锦市', N'0427', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'甘肃', N'兰州市', N'0931', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'江汉市', N'0728', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'周口市', N'0394', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河北', N'保定市', N'0312', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'乌海市', N'0473', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'葫芦岛', N'0429', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'定西市', N'0932', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'漯河市', N'0395', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'张家口', N'0313', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'集宁市', N'0474', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'平凉市', N'0933', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阿城市', N'0450', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'驻马店', N'0396', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'承德市', N'0314', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'通辽市', N'0475', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'菏泽市', N'0530', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'西峰市', N'0934', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'黑龙江', N'哈尔滨', N'0451', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'三门峡', N'0398', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'唐山市', N'0315', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'赤峰市', N'0476', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山东', N'济南市', N'0531', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'武威市', N'0935', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'廊坊市', N'0316', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'东胜市', N'0477', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山东', N'青岛市', N'0532', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'张掖市', N'0936', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'牡丹江', N'0453', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'福建', N'福州市', N'0591', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'沧州市', N'0317', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临河市', N'0478', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淄博市', N'0533', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'酒泉市', N'0937', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'佳木斯', N'0454', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'福建', N'厦门市', N'0592', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'衡水市', N'0318', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'德州市', N'0534', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'甘肃', N'天水市', N'0938', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'绥化市', N'0455', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宁德市', N'0593', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'邢台市', N'0319', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'兰浩特', N'0482', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'烟台市', N'0535', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'甘南州', N'0941', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黑河市', N'0456', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'莆田市', N'0594', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'秦皇岛', N'0335', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮坊市', N'0536', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'白银市', N'0943', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泉州市', N'0595', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'济宁市', N'0537', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'伊春市', N'0458', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'晋江市', N'0595', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泰安市', N'0538', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'大庆市', N'0459', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'漳州市', N'0596', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临沂市', N'0539', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'龙岩市', N'0597', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'三明市', N'0598', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南平市', N'0599', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'加格达奇', N'0457', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阿拉善左旗', N'0483', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'锡林浩特', N'0479', 0)
GO
print 'Processed 300 total records'
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'黑龙江', N'齐齐哈尔', N'0452', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'内蒙古', N'呼和浩特', N'0471', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'青海', N'格尔木', N'0979', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'北京', N'北京市', N'10', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'上海', N'上海市', N'21', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'天津', N'天津市', N'22', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'重庆', N'重庆市', N'23', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广东', N'广州市', N'20', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'四川', N'成都市', N'28', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'岳阳市', N'730', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江苏', N'南京市', N'25', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'衢州市', N'570', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'昭通市', N'870', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'韶关市', N'751', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'涪陵市', N'810', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖南', N'长沙市', N'731', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'无锡市', N'510', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'浙江', N'杭州市', N'571', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'云南', N'昆明市', N'871', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'惠州市', N'752', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'湘潭市', N'732', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'镇江市', N'511', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'湖州市', N'572', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'大理市', N'872', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'梅州市', N'753', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'攀枝花', N'812', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'株州市', N'733', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江苏', N'苏州市', N'512', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'嘉兴市', N'573', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'云南', N'红河市', N'873', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'汕头市', N'754', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'自贡市', N'813', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖南', N'衡阳市', N'734', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南通市', N'513', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'浙江', N'宁波市', N'574', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'云南', N'曲靖市', N'874', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广东', N'深圳市', N'755', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'永川市', N'814', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'郴州市', N'735', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'扬州市', N'514', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'绍兴市', N'575', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'保山市', N'875', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'珠海市', N'756', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'四川', N'绵阳市', N'816', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖南', N'常德市', N'736', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'盐城市', N'515', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'台州市', N'576', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'文山市', N'876', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'佛山市', N'757', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南充市', N'817', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'益阳市', N'737', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'徐州市', N'516', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'浙江', N'温州市', N'577', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玉溪市', N'877', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'肇庆市', N'758', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'达县市', N'818', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'娄底市', N'738', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮阴市', N'517', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'丽水市', N'578', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'楚雄市', N'878', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'湛江市', N'759', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'万县市', N'819', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'邵阳市', N'739', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮安市', N'517', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'金华市', N'579', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'思茅市', N'879', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'中山市', N'760', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'遂宁市', N'825', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'吉首市', N'743', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'连云港', N'518', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'舟山市', N'580', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'景洪市', N'691', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'河源市', N'762', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'广安市', N'826', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'张家界', N'744', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'常州市', N'519', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'潞西市', N'692', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'清远市', N'763', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'巴中市', N'827', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'怀化市', N'745', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泰州市', N'523', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'滁州市', N'550', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'东川市', N'881', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'顺德市', N'765', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泸州市', N'830', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'永州冷', N'746', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'安徽', N'合肥市', N'551', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临沧市', N'883', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'云浮市', N'766', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宜宾市', N'831', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'防城港', N'770', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'安徽', N'蚌埠市', N'552', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'六库市', N'886', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'潮州市', N'768', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'四川', N'内江市', N'832', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'忻州市', N'350', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广西', N'南宁市', N'771', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'芜湖市', N'553', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'中甸市', N'887', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'东莞市', N'769', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'乐山市', N'833', 0)
GO
print 'Processed 400 total records'
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山西', N'太原市', N'351', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'广西', N'柳州市', N'772', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮南市', N'554', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'丽江市', N'888', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'汕尾市', N'660', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'西昌市', N'834', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山西', N'大同市', N'352', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'桂林市', N'773', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'马鞍山', N'555', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'潮阳市', N'661', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'雅安市', N'835', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阳泉市', N'353', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'梧州市', N'774', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安庆市', N'556', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'吉林', N'长春市', N'431', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阳江市', N'662', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'康定市', N'836', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'榆次市', N'354', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玉林市', N'775', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宿州市', N'557', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'吉林', N'吉林市', N'432', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'揭西市', N'663', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'马尔康', N'837', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'长治市', N'355', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'百色市', N'776', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阜阳市', N'558', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'延吉市', N'433', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'德阳市', N'838', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'晋城市', N'356', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'钦州市', N'777', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黄山市', N'559', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'四平市', N'434', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'青海', N'西宁市', N'971', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'广元市', N'839', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临汾市', N'357', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'河池市', N'778', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮北市', N'561', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'通化市', N'435', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'海东市', N'972', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泸州市', N'840', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'离石市', N'358', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'北海市', N'779', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铜陵市', N'562', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'白城市', N'436', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'同仁市', N'973', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'运城市', N'359', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宣城市', N'563', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'辽源市', N'437', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'共和市', N'974', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'儋州市', N'890', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'宁夏', N'银川市', N'951', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'六安市', N'564', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'松原市', N'438', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玛沁市', N'975', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'海南', N'海口市', N'89801', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'拉萨市', N'891', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'宁夏', N'石嘴山', N'952', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'巢湖市', N'565', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'浑江市', N'439', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'玉树市', N'976', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'海南', N'三亚市', N'89802', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'日喀则', N'892', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'吴忠市', N'953', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'贵池市', N'566', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'珲春市', N'440', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'德令哈', N'977', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'山南市', N'893', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'固原市', N'954', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'新余市', N'790', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖北', N'武汉市', N'27', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'商丘市', N'370', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'陕西', N'西安市', N'29', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'贵州', N'贵阳市', N'851', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'辽宁', N'沈阳市', N'24', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江西', N'南昌市', N'791', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'湖北', N'襄阳市', N'710', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河南', N'郑州市', N'371', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'咸阳市', N'910', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'贵州', N'遵义市', N'852', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铁岭市', N'410', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'江西', N'九江市', N'792', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鄂州市', N'711', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安阳市', N'372', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'延安市', N'911', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安顺市', N'853', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'辽宁', N'大连市', N'411', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'上饶市', N'793', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'孝感市', N'712', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'新乡市', N'373', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'榆林市', N'912', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'都均市', N'854', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鞍山市', N'412', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临川市', N'794', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黄州市', N'713', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'许昌市', N'374', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'渭南市', N'913', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'凯里市', N'855', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'抚顺市', N'413', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宜春市', N'795', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黄石市', N'714', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'平顶山', N'375', 0)
GO
print 'Processed 500 total records'
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'商洛市', N'914', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铜仁市', N'856', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'本溪市', N'414', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'吉安市', N'796', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'咸宁市', N'715', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'信阳市', N'376', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'安康市', N'915', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'毕节市', N'857', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'丹东市', N'415', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'赣州市', N'797', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'荆沙市', N'716', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南阳市', N'377', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'汉中市', N'916', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'六盘水', N'858', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'锦州市', N'416', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'景德镇', N'798', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宜昌市', N'717', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'开封市', N'378', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'陕西', N'宝鸡市', N'917', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'兴义市', N'859', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'营口市', N'417', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'萍乡市', N'799', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'恩施市', N'718', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河南', N'洛阳市', N'379', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'铜川市', N'919', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阜新市', N'418', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鹰潭市', N'701', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'十堰市', N'719', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'焦作市', N'391', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'海拉尔', N'470', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'辽阳市', N'419', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'随枣市', N'722', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'鹤壁市', N'392', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'邯郸市', N'310', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'朝阳市', N'421', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临夏市', N'930', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'荆门市', N'724', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'濮阳市', N'393', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河北', N'石家庄', N'311', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'内蒙古', N'包头市', N'472', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'盘锦市', N'427', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'甘肃', N'兰州市', N'931', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'江汉市', N'728', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'周口市', N'394', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'河北', N'保定市', N'312', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'乌海市', N'473', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'葫芦岛', N'429', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'定西市', N'932', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'漯河市', N'395', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'张家口', N'313', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'集宁市', N'474', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'平凉市', N'933', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阿城市', N'450', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'驻马店', N'396', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'承德市', N'314', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'通辽市', N'475', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'菏泽市', N'530', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'西峰市', N'934', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'黑龙江', N'哈尔滨', N'451', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'三门峡', N'398', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'唐山市', N'315', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'赤峰市', N'476', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山东', N'济南市', N'531', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'武威市', N'935', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'廊坊市', N'316', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'东胜市', N'477', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'山东', N'青岛市', N'532', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'张掖市', N'936', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'牡丹江', N'453', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'福建', N'福州市', N'591', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'沧州市', N'317', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临河市', N'478', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淄博市', N'533', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'酒泉市', N'937', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'佳木斯', N'454', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'福建', N'厦门市', N'592', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'衡水市', N'318', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'德州市', N'534', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'甘肃', N'天水市', N'938', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'绥化市', N'455', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'宁德市', N'593', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'邢台市', N'319', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'兰浩特', N'482', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'烟台市', N'535', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'甘南州', N'941', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'黑河市', N'456', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'莆田市', N'594', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'秦皇岛', N'335', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'淮坊市', N'536', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'白银市', N'943', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泉州市', N'595', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'济宁市', N'537', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'伊春市', N'458', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'晋江市', N'595', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'泰安市', N'538', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'大庆市', N'459', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'漳州市', N'596', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'临沂市', N'539', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'龙岩市', N'597', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'三明市', N'598', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'南平市', N'599', 0)
GO
print 'Processed 600 total records'
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'加格达奇', N'457', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'阿拉善左旗', N'483', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (NULL, N'锡林浩特', N'479', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'黑龙江', N'齐齐哈尔', N'452', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'内蒙古', N'呼和浩特', N'471', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'青海', N'格尔木', N'979', 0)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'海南', N'海口市', N'089801', 1)
INSERT [dbo].[angel_city] ([PRONAME], [CITYNAME], [CITY_NO], [CAPITALCITY]) VALUES (N'海南', N'三亚市', N'089802', 0)
