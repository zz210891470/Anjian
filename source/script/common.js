var deviceone = require("deviceone");
var acessHost= "http://218.6.43.178:99/getinfo.aspx";
var sufHost = "http://218.6.43.178:99/";

var anJianHost = "http://211.149.172.65:8080/";

function compareNine(value) {
    return value > 9 ? value : '0' + value;
}
function getDateTime(date) {
	  
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return compareNine(year) + "-" + compareNine(month) + "-" + compareNine(day) + " " + compareNine(hh) + ":" + compareNine(mm);
}
function getDateDay(date) {
	  
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return compareNine(year) + "-" + compareNine(month) + "-" + compareNine(day);
}
//包含秒
function getDateTimes(jsondate) {
	if(jsondate!=null){
	var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return compareNine(year) + "-" + compareNine(month) + "-" + compareNine(day) + " " + compareNine(hh) + ":" + compareNine(mm) + ":" + compareNine(ss);
}
}

//调用的是这个方法
function toJsonDate(jsondate) {
	if(jsondate!=null){
	    var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
	    return date;
	}

}  

//处理服务器拿到的内容包含P标签
function removetag(content){
    return content.replace(/<[^>]+>/g,"");
}

function getYearToMinute(jsondate){
	if(jsondate!=null){
	 var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
	 var year = date.getFullYear();
     var month = date.getMonth() + 1;
     var day = date.getDate();
     var hh = date.getHours();
     var mm = date.getMinutes();
     var ss = date.getSeconds();
     return compareNine(year) + "-" + compareNine(month) + "-" + compareNine(day) + " " + compareNine(hh) + ":" + compareNine(mm);
	}
}

function getYearToDay(jsondate){
	if(jsondate!=null){
	var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return compareNine(year) + "-" + compareNine(month) + "-" + compareNine(day);
}
}
function getYearMonth(){
	var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return compareNine(year) + "-" + compareNine(month);
}
function getCurrentYear(){
	var date = new Date();
	return  date.getFullYear();
}
function formatDate(){
	Date.prototype.format=function(fmt) {        
	    var o = {        
	    "M+" : this.getMonth()+1, //月份        
	    "d+" : this.getDate(), //日        
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时        
	    "H+" : this.getHours(), //小时        
	    "m+" : this.getMinutes(), //分        
	    "s+" : this.getSeconds(), //秒        
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度        
	    "S" : this.getMilliseconds() //毫秒        
	    };        
	    var week = {        
	    "0" : "\u65e5",        
	    "1" : "\u4e00",        
	    "2" : "\u4e8c",        
	    "3" : "\u4e09",        
	    "4" : "\u56db",        
	    "5" : "\u4e94",        
	    "6" : "\u516d"       
	    };        
	    if(/(y+)/.test(fmt)){        
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));        
	    }        
	    if(/(E+)/.test(fmt)){        
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);        
	    }        
	    for(var k in o){        
	        if(new RegExp("("+ k +")").test(fmt)){        
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));        
	        }        
	    }        
	    return fmt;        
	} 
}
module.exports.acessHost = acessHost;
module.exports.sufHost = sufHost;
module.exports.anJianHost = anJianHost;
module.exports.getDateTime=getDateTime;
module.exports.getDateTimes=getDateTimes;
module.exports.toJsonDate=toJsonDate;
module.exports.getDateDay=getDateDay;
module.exports.removetag=removetag;
module.exports.formatDate=formatDate;
module.exports.getYearToMinute = getYearToMinute;
module.exports.getYearToDay = getYearToDay;
module.exports.getCurrentYear=getCurrentYear;
module.exports.getYearMonth=getYearMonth;
