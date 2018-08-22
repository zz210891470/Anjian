/**
 * related to notice_list.ui
 * 公告通知列表
 * @Author : kevinzhan
 * @Timestamp : 2018-08-09
 */
var app = sm("do_App");
var page = sm("do_Page");
var currentPage=1;
var keyword = "";
ui("do_ALayout_2").on("touch",function(){
	app.closePage();
});
page.on("back",function(){
	app.closePage();
});

var notice_view = ui("do_ListView_1");
var  notice_list = mm("do_ListData");
notice_view.bindItems(notice_list);

loadNotice(currentPage);

notice_view.on("pull",function(data){
	if (data.state == 2){
		refreshData();
		notice_view.rebound();
	}
});
notice_view.on("push",function(data){
	if (data.state == 2){
		nextPage();
		notice_view.rebound();
	}
});

ui("do_Button_1").on("touch",function(){
	 page.hideKeyboard();
	 keyword = ui("do_TextField_1").text;
	 currentPage=1;
	 notice_list.removeAll();
	 loadNotice();
	
});

function loadNotice(){
	deviceone.print("关键词:"+keyword);
	dojs.http.ajax({
		url:common.acessHost,
		data:{
			type:"getNoticeList",
			requestPage:currentPage,
			requestCount:10,
			lx:lx,
			appToken:apptoken,
			keyword:keyword
		},
		type:"POST",
		contentType:"application/x-www-form-urlencoded",
		success:function(data){
			
			if(data.Result==1){
				var nlist = data.NoticeList;
				deviceone.print(JSON.stringify(nlist));
				 var nt_arr=[];
				if(notice_list.getCount() == 1 && notice_list.getOne(0).template == 1){
						notice_list.removeAll();
				 }

				if (nlist.length == 0) {
					if (notice_list.getCount() == 0) {
						// 第一次加载
						var c = {
							template : 1
						}
						nt_arr.push(c);
					} else {
						nf.toast("暂无更多记录", 150, 300);
					}

				}else{
					    if(nlist.length == 0){
					    	nf.toast("暂无更多通知", 150,300);
					    	return;
					    }
						for(var i=0;i<nlist.length;i++){
							var notice = {
								"template":0,
								"topic":nlist[i].bt,
								"topic_date":nlist[i].lx+"      "+common.getYearToDay(nlist[i].sj),
								"notice_content":nlist[i].nr,
								"id":nlist[i].id
							}
							nt_arr.push(notice);
						} 
				 }

				notice_list.addData(nt_arr);
				notice_view.refreshItems();
			}else if(data.Result==2){
				app.closePageToID({data:"",id:"login"});
				nf.alert("该用户从其它地方登陆");
			}else{
				nf.toast("网络错误,请求失败",150,250);
			}
		},
		error:function(data){
			nf.toast("网络错误,请求失败",150,250);
		}
		
	});
}


//下拉刷新数据
function refreshData(){
	currentPage=1;
	notice_list.removeAll();
	loadNotice();
	
}
//上推加载下一页
function nextPage(){
	currentPage++;
	loadNotice();
}