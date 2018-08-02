/**
 * related to munitcation.ui
 * 
 * @Author : Letme
 * @Timestamp : 2018-01-10
 */
var dojs = require("dojs");
dojs.style.css(ui("do_ALayout_1"), "pageTopbar");
var page = sm("do_Page");
var nf = sm("do_Notification");
var app = sm("do_App");
dojs.page.allowClose(ui("do_ALayout_2"));
var URL =require("url.ui");
//融云
var dataCache = sm("do_DataCache");
var token = dataCache.loadData("token");
dojs.core.p(token,"token");
var do_RongCloud = sm("do_RongCloud");
var appKey = "";
do_RongCloud.setTitleBarColor("009CFFFF");

//为do_SlideView_1listData添加初始化数据；
var listview = ui("do_ListView_1");
var listData = mm("do_ListData");
//绑定数据
listview.bindItems(listData);

//是否有下一页
var hasNextPage = true;
//页码
var page=1;
var status = 1;
var planName = "";
var planTypeId = "";

do_RongCloud.login(appKey, token,function(data, e) {
	do_RongCloud.setUserInfo("","source://image/anquan@3x.png",function(data,e){
		
	});
});
getAllData(page,status,planName,planTypeId,true,false);


function getAllData(page,status,planName,planTypeId,liston,isNeed) {
	if (isNeed) {
		needWaitting="needWaitting";
	} else {
		needWaitting=null;
	}
	dojs.http.ajax({
		//请求路径
		url:URL.url.getEmergency,
		//显示等待层 (详细参见script/do/defaultSetting/httpSetting.js中的配置)
		parent:needWaitting,
		//要发送到服务器的数据
		data:{
			page : page,
			status : status,
			planName : planName,
			planTypeId : planTypeId
		},
		success:function(data){
			listview.rebound();
			dojs.core.p(data, "success");
			if (data.code==200) {
				hasNextPage = data.data.hasNextPage;
				if (liston) {
					listData.removeAll();
				} else {

				}
				
				listData.addData(data.data.rows);
				listview.refreshItems();
			} else {
				dojs.core.toast(data.msg);
			}
		},
		tokenExist:function(data){
			URL.tokenExist("get_Emergency");
			dataCache.removeData("Set-Cookie");
		},
		error:function(data){
			dojs.core.error("服务器繁忙,请稍后");
		},
		//是否缓存上次结果 （为true的时候，在返回服务结果之前会先返回上次结果，一般用于改善数据查询的交互体验）
		cacheLastResult:true,
		//缓存失效时长（单位为毫秒，-1表示永远使用缓存，0表示每次都先用缓存后刷新）
		cacheExpires:3000
		});
	
}


listview.on("touch","","300",function(index, e) {
	var getIdex = listData.getOne(index);
	do_RongCloud.login(appKey, token,function(data, e) {
		do_RongCloud.openGroupConversation(getIdex.id, getIdex.plan_name, function(data, e) {
			
		});
	});
			
});
//下拉列表，刷新数据
listview.on("pull", function(data) {
	// 其中state=0：表示开始下拉headerview，；state=1：表示下拉headerview超过headerview的高度，触发一次这个事件；state=2：下拉超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2) {
		page = 1;
		getAllData(page,status,planName,planTypeId,true,false);
	}
});

//上拉列表，翻页数据
listview.on("push", function(data) {
	// 其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2) {
		page++;
		if (hasNextPage) {
			getAllData(page,status,planName,planTypeId,false,false);
		}else{
			listview.rebound();
			dojs.core.toast("没有更多内容了");
		}
	}
});

app.on("get_Emergency",  function(data, e) {
	if (data=="get_Emergency") {
		getAllData(page,status,planName,planTypeId,true,false);
	}
});