/**
 * related to login.ui
 * 
 * @Author : 13559106115
 * @Timestamp : 2018-01-26
 */
var app = sm("do_App");
var forgot_pwd = ui("do_Button_1");
var dojs = require("dojs");
var nf = sm("do_Notification");
var cn = require("common");
var storage = sm("do_DataCache");
var page = sm("do_Page");
var md5 = require("md5");
var marknote = require("marknote-debug");
var device = sm("do_Device");
var deviceOS = device.getInfo().OS;
var do_external = sm("do_External");
checkIfHasNewVersion();

ui("$").on("touch",function(){
	page.hideKeyboard();
});
forgot_pwd.on("touch",function(){
	app.openPage("source://view/forgot_pwd.ui");
});

var jpush = sm("do_JPush");

var rem_div =ui("do_ALayout_5");
var rember_imgs=["source://images/login@remember0.png","source://images/login@remember1.png"];
var rem_img = ui("do_ImageView_6");
var rem_flag;
var rem_username = storage.loadData("rem_username");
var rem_pwd = storage.loadData("rem_pwd");
if(rem_username==null||rem_username==""){
	rem_flag =false;
	rem_img.source=rember_imgs[0];
}else{
	rem_flag=true;
	rem_img.source=rember_imgs[1];
	 ui("do_TextField_1").text=rem_username;
	 ui("do_TextField_2").text=rem_pwd;
}
rem_div.on("touch",function(){
	if(rem_img.source==rember_imgs[0]){
		rem_img.source=rember_imgs[1];
		rem_flag=true;
	}else{
		rem_img.source=rember_imgs[0];
		rem_flag=false;
	}
	
});
var login_btn = ui("do_Button_2");
login_btn.on("touch",function(){
	var username = ui("do_TextField_1").text;
	var pwd = ui("do_TextField_2").text;
   
	if(username==""||username==null||username==undefined){
		nf.toast("用户名不能为空",150,250);
		return;
	}
	if(pwd==""||pwd==null||pwd==undefined){
		nf.toast("密码不能为空",150,250);
		return;
	}

	  if(rem_flag){
		  storage.saveData("rem_username", username);
		  storage.saveData("rem_pwd",pwd);
	   }else{
		   storage.removeData("rem_username");
		   storage.removeData("rem_pwd");
	   }
	//  app.openPage("source://view/index.ui");

	dojs.http.ajax({
		url:cn.acessHost,
		data:{
			type:"login",
			username:username,
			password:md5.hex_md5(pwd),
			deviceId:jpush.getRegistrationID()
		},
		type:"POST",
		contentType:"application/x-www-form-urlencoded",
		success:function(data){

			var str = JSON.stringify(data);
	

			deviceone.print(JSON.stringify(str));
			
			if(data.Result==1){
				  if(rem_flag){
				    //是否选中记录密码 
					  storage.saveData("rem_username", username);
					  storage.saveData("rem_pwd",pwd);
				   }else{
					   storage.removeData("rem_username");
					   storage.removeData("rem_pwd");
				   }
				   //首页需要用到用户
				  storage.saveData("user",data.user);
				 app.openPage("source://view/index.ui");
			}else{
				nf.toast("用户名或密码错误",150,250);
			}
		},
		error:function(data){
			nf.toast("网络错误,请求失败",150,250);
		}
		
	});
});

page.on("back",function(){
	extApp();
});

function extApp(){
	var dialog = sm("do_Dialog");

	dialog.open("source://view/pop_exit.ui","", function(data, e) {

	});
}
/**
 * 向服务器发请求是否有新版本更新
 */
var v = "1.20180716";
function checkIfHasNewVersion(){
	dojs.http.ajax({
		url:cn.sufHost+"version.xml",
		type:"GET",
		success:function(data){
			//解析服务端传来的xml,使用谷歌的marknote库
			var parser = new marknote.xmlparser.Parser();
			var doc = parser.parse(data);
			var version_num = doc.rootElement.getChildElement("version").getText();
			
			if(version_num!=v){
				if (deviceOS == "android") {
						var dialog = sm("do_Dialog");
						var d = {
								url:doc.rootElement.getChildElement("url").getText()
						}
						dialog.open("source://view/pop_new_version.ui",d, function(data, e) {
	
						});
				
				}else{
					nf.alert("有新版本，请更新最新的app");
				}
				
			}
		}

		
	});
	
}