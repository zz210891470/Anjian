/**
 * related to main_page.ui 主界面工作区域
 * 
 * @Author : kevinzhan
 * @Timestamp : 2018-08-07
 */
var cn = require("common");
var dojs = require("dojs");
var nf =sm("do_Notification");
var grid_view = ui("do_GridView_1");
var notice_view = ui("do_ListView_1");
var notice_data = mm("do_ListData");
notice_view.bindItems(notice_data);

var task_view = ui("do_ListView_2");
var task_data = mm("do_ListData");
task_view.bindItems(task_data);
var notice_arr = [];

var task_arr = [ {
	template : 0,
	topic : "七月半放假通知"
}, {
	template : 0,
	topic : "八月半放假通知"
}, {
	template : 0,
	topic : "九月半放假通知"
} ];
task_data.addData(task_arr);
task_view.refreshItems();

dojs.http.ajax({
	url : cn.anJianHost+"Task/searchNoticeTask",
	data : {

		userName : "admin",
	},
	type : "GET",
	contentType : "application/x-www-form-urlencoded",
	success : function(data) {
		
		if (data.result == 1) {
			var notice_list = data.notice;
			var task_list = data.task;
			for (var i = 0; i < notice_list.length; i++) {
				var n = {
						template : 0,
						topic : notice_list[i].notice_topic,
						rq : notice_list[i].notice_createtime
				}
				notice_arr.push(n);
			}
			notice_data.addData(notice_arr);
			notice_view.refreshItems();
		} else {
			nf.toast("网络错误,请求失败", 150, 250);
		}
	},
	error : function(data) {
		nf.toast("网络错误,请求失败", 150, 250);
	}
});



var app = sm("do_App");
grid_view.items = [ {
	"template" : 0,
	"img" : "source://image/检查.png",
	"text" : "检查管理",
	"flag" : 1
}, {
	"template" : 0,
	"img" : "source://image/企业档案.png",
	"text" : "企业档案",
	"flag" : 2
}, {
	"template" : 0,
	"img" : "source://image/案件.png",
	"text" : "案件管理",
	"flag" : 3
}, {
	"template" : 0,
	"img" : "source://image/资料库.png",
	"text" : "资料库",
	"flag" : 4
}, {
	"template" : 0,
	"img" : "source://image/法律法规.png",
	"text" : "法律法规",
	"flag" : 5
},

{
	"template" : 0,
	"img" : "source://image/统计.png",
	"text" : "统计",
	"flag" : 6
} ];

grid_view.on("touch", function(data) {
	switch (data) {
	case 0:
		app.openPage("source://view/check_list.ui");
		break;
	case 1:
		app.openPage("source://view/file_list.ui");
		break;
	case 2:
		app.openPage("source://view/case_list.ui");
		break;
	case 3:
		app.openPage("source://view/datum_list.ui");
		break;
	case 4:
		app.openPage("source://view/law_rules.ui");
		break;
	case 5:
		app.openPage("source://view/count.ui");
		break;
	default:
		break;
	}
});

ui("do_Button_1").on("touch",function(){
	app.openPage("source://view/notice_list.ui");
});

ui("do_Button_2").on("touch",function(){
	app.openPage("source://view/task_list.ui");
});

