/**
 * related to person_page.ui
 * 个人中心页面
 * @Author : kevinzhan
 * @Timestamp : 2018-08-07
 */
var app = sm("do_App");
var page = sm("do_Page");
ui("do_ALayout_2").on("touch",function(){
	app.openPage("source://view/modify_password.ui");
});

var dialog = sm("do_Dialog");
ui("do_Button_1").on("touch",function(){
	dialog.open("source://view/pop_exit.ui", "", function(data, e) {


	});
});
page.on("back",function(){
	app.closePage();
});

