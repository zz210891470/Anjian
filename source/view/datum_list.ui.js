/**
 * related to datum_list.ui
 * 资料库
 * @Author : kevinzhan
 * @Timestamp : 2018-08-09
 */
var app = sm("do_App");
var page = sm("do_Page");
ui("do_ALayout_2").on("touch",function(){
	app.closePage();
});
page.on("back",function(){
	app.closePage();
});

var datum_view = ui("do_ListView_1");
var datum_data = mm("do_ListData");
datum_view.bindItems(datum_data);