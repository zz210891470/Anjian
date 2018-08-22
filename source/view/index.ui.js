/**
 * @Author : kevinzhan
 * @Timestamp : 2018-07-27
 */

var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
/*var do_RongCloud = sm("do_RongCloud");
//zs
var token = "adQ3ckaKd5YIooZVJXVwRt6UlkfSGrMsmUvcZG1asALNYbtAGocuSB2P8xJvbD/hTiBuYfbWRJ0=";
var appKey = "n19jmcy5n8vr9";
do_RongCloud.login(appKey, token,function(data, e) {
	do_RongCloud.openGroupConversation(1, "群聊", function(data, e) {
		
	});
});
*/
var viewShow = ui("do_ViewShower_1");
ui("do_ALayout_2").on("touch",function(){
	ui("do_ImageView_1").source = "source://image/message_blue.png";
	ui("do_Label_2").fontColor = "0080FFFF";
	ui("do_ImageView_2").source = "source://image/work_white.png";
	ui("do_Label_3").fontColor = "C0C0C0FF";
	ui("do_ImageView_3").source = "source://image/linkman_white.png";
	ui("do_Label_4").fontColor = "C0C0C0FF";
	ui("do_ImageView_4").source = "source://image/user_white.png";
	ui("do_Label_5").fontColor = "C0C0C0FF";

	viewShow.showView("message_page");
	
});
ui("do_ALayout_3").on("touch",function(){
	ui("do_ImageView_1").source = "source://image/message_white.png";
	ui("do_Label_2").fontColor = "C0C0C0FF";
	ui("do_ImageView_2").source = "source://image/work_blue.png";
	ui("do_Label_3").fontColor = "0080FFFF";
	ui("do_ImageView_3").source = "source://image/linkman_white.png";
	ui("do_Label_4").fontColor = "C0C0C0FF";
	ui("do_ImageView_4").source = "source://image/user_white.png";
	ui("do_Label_5").fontColor = "C0C0C0FF";
	viewShow.showView("main_page");
});
ui("do_ALayout_4").on("touch",function(){
	ui("do_ImageView_1").source = "source://image/message_white.png";
	ui("do_Label_2").fontColor = "C0C0C0FF";
	ui("do_ImageView_2").source = "source://image/work_white.png";
	ui("do_Label_3").fontColor = "C0C0C0FF";
	ui("do_ImageView_3").source = "source://image/linkman_blue.png";
	ui("do_Label_4").fontColor = "0080FFFF";
	ui("do_ImageView_4").source = "source://image/user_white.png";
	ui("do_Label_5").fontColor = "C0C0C0FF";
	viewShow.showView("phonebook_page");
});
ui("do_ALayout_5").on("touch",function(){
	ui("do_ImageView_1").source = "source://image/message_white.png";
	ui("do_Label_2").fontColor = "C0C0C0FF";
	ui("do_ImageView_2").source = "source://image/work_white.png";
	ui("do_Label_3").fontColor = "C0C0C0FF";
	ui("do_ImageView_3").source = "source://image/linkman_white.png";
	ui("do_Label_4").fontColor = "C0C0C0FF";
	ui("do_ImageView_4").source = "source://image/user_blue.png";
	ui("do_Label_5").fontColor = "0080FFFF";
	viewShow.showView("person_page");
});
viewShow.addViews([
    {id : "message_page", path : "source://view/message_page.ui"},
    {id : "main_page", path : "source://view/main_page.ui"},
    {id : "phonebook_page", path : "source://view/phonebook_page.ui"},
    {id : "person_page", path : "source://view/person_page.ui"}

]);
viewShow.showView("main_page");
var dialog = sm("do_Dialog");
page.on("back",function(){
	dialog.open("source://view/pop_exit.ui", "", function(data, e) {

	});
});
