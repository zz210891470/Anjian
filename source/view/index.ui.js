/**
 * @Author : kevinzhan
 * @Timestamp : 2018-07-27
 */
var nf = sm("do_Notification");
var btn_hello = ui("btn_hello");

btn_hello.on("touch", function() {
	nf.alert("Hello World !!!!!");
});

