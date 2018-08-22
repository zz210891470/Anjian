/**
 * related to issue_detail.ui
 * 
 * @Author : 13559106115
 * @Timestamp : 2018-03-25
 */
var app = sm("do_App");
var dojs = require("dojs");
var cn = require("common");
var storage = sm("do_DataCache");
var nf = sm("do_Notification");
var page = sm("do_Page");
var user = storage.loadData("user");
var apptoken = user.appToken;
var id = page.getData();
var yhlx = user.yhlx;

var pageFlag = "普通";
var reply_list = ui("do_ListView_1");
var reply_data = mm("do_ListData");
reply_list.bindItems(reply_data);
getQuestion();
function getQuestion(){
	dojs.http.ajax({
		url:cn.acessHost,
		data:{
			type:"getQuestion",
			id:id,
		    appToken:apptoken

		},
		type:"POST",
		contentType:"application/x-www-form-urlencoded",
		success:function(data){
			if(data.Result==1){
				
				var question = data.QuestionList[0];
				var replys = data.ReplyList;
				ui("do_Label_2").text=question.xmmc;
				ui("do_Label_5").text="    "+question.czwt;
		
				if(question.zt=="审核通过"||(yhlx=="县重点办"&&question.zt=="待审核")){
					ui("do_ALayout_13").visible=true;
				}

				if(yhlx=="县重点办"&&question.zt=="待审核"){
					ui("do_ALayout_9").visible=true;
					//ui("do_ALayout_5").visible=false;
					ui("do_ALayout_10").visible=false;
					pageFlag="重点审核";
				}else if(yhlx=="查询用户"&&question.zt=="审核通过"){
					ui("do_ALayout_11").visible=true;
					ui("do_ALayout_10").visible=false;
					pageFlag="领导批示";
				}else if(question.zt=="待审核"){
					ui("do_ALayout_5").visible=false;
					ui("do_ALayout_10").visible=false;
				}else if(question.zt=="审核不通过"){
					ui("do_ALayout_10").visible=false;
				}
				var reply_arr = [];
				for(var i=0;i<replys.length;i++){
					var r ={
						topic:replys[i].fknr,
						rq:cn.getYearToDay(replys[i].fksj),
						yhm:replys[i].yhm	
					}
					reply_arr.push(r);
				}
				reply_data.addData(reply_arr);
				reply_list.refreshItems();
			}else if(data.Result==2){
				app.closePageToID({data:"",id:"login"});
				nf.alert("该用户从其它地方登陆");
			}
		},
		error:function(data){
			nf.toast("网络错误,请求失败");
		}
		
	});
}


ui("do_ALayout_2").on("touch",function(){
	app.closePage();
});
ui("do_LinearLayout_1").on("touch",function(){
	page.hideKeyboard();
});
ui("do_ALayout_12").on("touch",function(){
	app.openPage("source://view/check_dep.ui");
});


var btn = ui("do_Button_1");
var btn1 = ui("do_Button_2");
btn.on("touch",function(){
	if(btn.bgColor=="#FFFFFFFF"){
		btn.bgColor="#16AF9FFF";
		btn1.bgColor = "#FFFFFFFF";
	}else{
		btn.bgColor="#FFFFFFFF";
		btn1.bgColor = "#FFFFFFFF";
	}

})
btn1.on("touch",function(){
	if(btn1.bgColor=="#FFFFFFFF"){
		btn1.bgColor="#16AF9FFF";
		btn.bgColor = "#FFFFFFFF";
	}else{
		btn.bgColor="#FFFFFFFF";
		btn1.bgColor = "#FFFFFFFF";
	}
});
var names = "";
var fbyhs = "";
page.on("result",function(data){
	
	for(var i=0;i<data.length;i++){
		if(i==data.length-1){
			names += data[i].name;
			fbyhs += data[i].username;
		}else{
			names += data[i].name+",";
			fbyhs += data[i].username+",";
		}

	}
ui("do_Label_15").text=names;
});


ui("do_ALayout_13").on("touch",function(){
  if(pageFlag=="普通"){
		var fknr = ui("do_TextBox_2").text;
		if(fknr==""){
			nf.toast("请输入反馈内容");
			return;
		}
		saveReply(fknr,"");
  }else if(pageFlag=="重点审核"){
	  	var auditReuslt = "";//审核结果
		var bc = btn.bgColor;
		var bc1 = btn1.bgColor;
		if(bc=="#FFFFFFFF"&&bc1=="#FFFFFFFF"){
			nf.toast("请选择审核结果");
			return;
		}else{
			if(bc=="#FFFFFFFF"){
				auditReuslt = "审核不通过";
			}else{
				auditReuslt = "审核通过";
			}
			
		}
		var opnion = ui("do_TextField_1").text;//审核意见
		saveAudit(auditReuslt,opnion);
  }else{
		var pishi =  ui("do_TextBox_3").text;
		saveReply(pishi,fbyhs);
  }

	



	
});

//保存审核结果
function saveAudit(audit,opnion){
	
	dojs.http.ajax({
		url:cn.acessHost,
		data:{
			type:"auditQuestion",
			id:id,
		    appToken:apptoken,
		    audit:audit,
		    opinion:opnion

		},
		type:"POST",
		contentType:"application/x-www-form-urlencoded",
		success:function(data){
			if(data.Result==1){
				nf.toast("审核成功");
				app.closePage("saveSuccess");
			}else if(data.Result==2){
				app.closePageToID({data:"",id:"login"});
				nf.alert("该用户从其它地方登陆");
			}
		},
		error:function(data){
			nf.toast("网络错误,请求失败");
		}
		
	});
	
}

function saveReply(nr,deps){
	dojs.http.ajax({
		url:cn.acessHost,
		data:{
			type:"saveQuestionReply",
			id:id,
		    appToken:apptoken,
		    fknr:nr,
		    yhm:user.yhm,
		    fkbm:deps

		},
		type:"POST",
		contentType:"application/x-www-form-urlencoded",
		success:function(data){
			if(data.Result==1){
				nf.toast("保存成功");
				app.closePage("saveSuccess");
			}else if(data.Result==2){
				app.closePageToID({data:"",id:"login"});
				nf.alert("该用户从其它地方登陆");
			}
		},
		error:function(data){
			nf.toast("网络错误,请求失败");
		}
		
	});
}