/**
 * related to pop_exit.ui
 * 
 * @Author : 13559106115
 * @Timestamp : 2018-03-31
 */
var dialog = sm("do_Dialog");
var global = sm("do_Global");
var cancel_button = ui("do_Button_1");
cancel_button.on("touch", function() {
	dialog.close();
});

var ok_button = ui("do_Button_2");
ok_button.on("touch", function() {
	global.exit();
});