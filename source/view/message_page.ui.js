/**
 * related to message_page.ui
 * 消息页面
 * @Author : kevinzhan
 * @Timestamp : 2018-08-07
 */
var rongyun = sm("do_RongCloud");
var page = sm("do_Page");
var nf = sm("do_Notification");
var data = rongyun.getLatestMessage();
/*rongyun.openConversationList(function(data, e) {
	});*/
//zs
var token = "adQ3ckaKd5YIooZVJXVwRt6UlkfSGrMsmUvcZG1asALNYbtAGocuSB2P8xJvbD/hTiBuYfbWRJ0=";
//ls
//var token = "/x45ppnWcJsArLYIxSVsP96UlkfSGrMsmUvcZG1asAKpNhzmN6WJUJ1EQ9ramJqBSpn7X1P6IYA=";
var appKey = "n19jmcy5n8vr9";
rongyun.login(appKey, token,function(data, e) {
/*	rongyun.openConversation({userId:"ls", title:"source图片",   headPortrait:"source://view/SM/do_RongCloud/test/1.png"}, function(data, e) {
	});*/

});


rongyun.openConversationList(function(data, e) {
});

page.on("loaded",function(){

});