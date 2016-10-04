var b =false
var box = document.getElementById('bannerbox')
var box1 = document.getElementById('one')
var n=0; 
var c =box.getElementsByTagName('a')
var d =   box.getElementsByTagName('span')
document.getElementById("mapContent").style.display='none';


function load(a){
	var target = a.target
	var c6 =  box1.getElementsByTagName('img')[0];
	c6.setAttribute("src",a.getAttribute('href'))
	for(i=0;i<5;i++){
		d[i].setAttribute('id','')
		if(c[i] == a){
			a.childNodes[0].setAttribute('id','ctrl-curr');
			n=i
		}
	}
}
// 进入店铺
var list_item = document.getElementsByClassName("list-item");
for(var i = 0;i < list_item.length;i++){
	list_item[i].onmouseover = a_block;
	list_item[i].onmouseout = a_none;
}
function a_block(){
	this.childNodes[3].childNodes[7].childNodes[7].style.display = "block";
	this.style.background  = '#fafafa'
}
function a_none(){
	this.childNodes[3].childNodes[7].childNodes[7].style.display = "none";
	this.style.background  = 'white'
}
function change(n){
	if(n>4) {
		n=0
		d[0].setAttribute('id','ctrl-curr')
		d[4].setAttribute('id','')
	}
	if(n>0){
		d[0].setAttribute('id','')
		d[n].setAttribute('id','ctrl-curr')
		d[n-1].setAttribute('id','')
	}
 	document.getElementById("test").setAttribute("src",'../images/'+ n+".jpg");
 	n++;
 	setTimeout(function(){
 		change(n)
 	},1000);
 }		
  change(1)
  // 左侧详细页
	var list_detail = document.getElementById("list_detail");
	var nav_list_ul = document.getElementsByClassName("cate-list-main")[0];
	var nav_detail_ul = document.getElementById("nav_detail_ul");
	var nav_list_li = nav_list_ul.getElementsByTagName("li");
	var nav_detail_li = nav_detail_ul.getElementsByTagName("li");
	var list_container = document.getElementById("listcontainer");
	for(var i =0;i<nav_list_li.length;i++){
		nav_list_li[i].index = i;
		nav_list_li[i].onmouseover = function(){

			list_detail.style.display = "block";
			for(var j =0;j<nav_detail_li.length;j++){
				nav_detail_li[j].style.display = "none";
			}
			nav_detail_li[this.index].style.display = "block";
		}
	}
	list_container.onmouseleave = function(){
		$('#list_detail').stop().animate({width:'hide'},500)
	}
//置顶
var back_top_btn = document.getElementById("back_top_btn");
	window.onscroll = function(){
		if(document.body.scrollTop > 200){
			back_top_btn.style.display = "block";
		}else{
			back_top_btn.style.display = "none";
		}
	}
	back_top_btn.onclick = function(){
		var top = document.body.scrollTop;
		var speed = top / 60;
		var id = setInterval(function(){
			if(document.body.scrollTop <= 0 ){
				clearInterval(id);
				document.body.scrollTop = 0;
			}else{
				document.body.scrollTop = document.body.scrollTop - speed;
			}
		},1);
	}
// 地图
var map_contianer =document.getElementById("map_contianer");
	var map_close = document.getElementById("map_close");
	var map_open = document.getElementsByClassName("btn-mode-map")[0];
	map_contianer.style.width = document.documentElement.clientWidth + "px";
	map_contianer.style.height = document.documentElement.clientHeight + "px";
	map_open.onclick = function(){
		map_contianer.style.display = "block";
		console.log("----------------");
		$.getJSON("http://10.3.156.247:5000/tcbadata/data/pagecount/1?callback=?",getDataFromServer);
		console.log("================");
	}
	map_close.onclick = function(){
		map_contianer.style.display = "none";
	}

//加载页面就开始Uncaught SyntaxError: Unexpected token :
window.onload=function(){
	$.getJSON("http://10.3.156.247:5000/tcbadata/data/pagecount/1?callback=?",getDataFromServer);

}
//将获得的JSON数据遍历至文档中
function getDataFromServer(data){
	var shopData= data.shop_data;
	//处理店铺列表的数据
	shopData.forEach(function(elem,index){
		if(index<5){
			$(".shop_pic").eq(index).attr("src",elem.shop_ico);
			$(".shop_name").eq(index).text(elem.shop_name);
			$(".desc").eq(index).text(elem.shop_desc);
			$(".addr").eq(index).text(elem.addr);
		}
	})
	//处理地图上的数据
	var orignY = parseFloat(shopData[0].map_latitude);
	var orignX = parseFloat(shopData[0].map_longitude);
	var orign=[orignX,orignY];
	newMap(orign,shopData);
}


//点击每一页从服务器获得对应的数据
$(".page_a").click(function(e){
	e.preventDefault();
	var page=parseInt($(this).text());
	$.getJSON("http://10.3.156.247:5000/tcbadata/data/pagecount/"+page+"?callback=?",getDataFromServer);
	$(".page_a").css("background","white").css("color","#999").css("border","1px solid #d6d6d6").css('cursor','pointer'); 
	$(this).css("background","#FC6621").css("color","white").css("border","1px solid #FC6621");;
})


//地图
//---------------------------从AMAP获得地图------------------//
function newMap(orign,shopData){
	var myMap = new AMap.Map('mapshow',{
	    zoom: 10,
	    center: orign
	});
	AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation','AMap.OverView'],
	    function(){
            myMap.addControl(new AMap.ToolBar());
            myMap.addControl(new AMap.Scale());
            myMap.addControl(new AMap.Geolocation());
            myMap.addControl(new AMap.OverView({isOpen:true}));
	});
	shopData.forEach(function(elem,index){
		var positionX = parseFloat(shopData[index].map_longitude);
		var positionY = parseFloat(shopData[index].map_latitude);
		var position = [positionX,positionY];
		var marker=[],circle=[],info=[];
		var icon = new AMap.Icon({
            size : new AMap.Size(24,38)
    	});
		marker[index] = new AMap.Marker({
			icon:icon,
        	position: position,
	    });
	    marker[index].setMap(myMap);//地图的点标记
	    myMap.setFitView()//地图的自适应
	    circle[index] = new AMap.Circle({
	        center: position,
	        radius: 100,
	        fillOpacity:0.2,
	        fillColor:'#09f',
            strokeColor:'#09f',
	        strokeWeight:1
	    })
	    circle[index].setMap(myMap);//点标记的圆
	    //点击点标记时的弹窗
	    info[index] = new AMap.InfoWindow({
	        content:ShopInfo(elem),
	        offset:new AMap.Pixel(0,-20),
	        size:new AMap.Size(350,180)
	    })
	    //点击marker显示信息窗体
	   	var clickHandle = AMap.event.addListener(marker[index], 'click', function() {
   			info[index].open(myMap,marker[index].getPosition());
		})
	})
}
//地图中的店铺信息
function ShopInfo(elem){
 	var shop_name = elem.shop_name;
 	var shop_desc = "主营："+elem.shop_desc;
	var shop_addr = "地址："+elem.addr;
	var shop_href = elem.shop_addr;
	$("#shopContent").text(shop_name);
	$("#descContent").text(shop_desc);
	$("#addrContent").text(shop_addr);
	$("#contentHref").attr("href",shop_href);
	document.getElementById("mapContent").style.display='block'
	$("#mapContent").css("display","block");
	return $("#mymapcontent").html();
}

//搜索框补全
var body = document.getElementsByTagName('body')[0]
var input = document.getElementsByClassName('addr-ipt')[0];
input.onkeyup = search;
input.onfocus = show;
input.onblur = blurno;
function search(){
	//创建script标签
	var script =document.getElementsByTagName('script');
	if(script.length>3){
		document.body.removeChild(script[3])
	}
	//input里面的值
	var put = document.getElementsByClassName('addr-ipt')[0].value;
	if(put !=""){
		document.getElementById('searchSuggest').style.display='block'
		document.getElementById('searchSuggest1').style.display='none'
		var script = document.createElement('script');
		document.body.appendChild(script);
		script.src = "http://suggest.bang.360.cn/suggest?word="+put+"&category=7&encodein=utf-8&encodeout=utf-8&format=json&callback=window.suggest&t=0.3514809920297852"
		window.suggest = function(data){
			document.getElementById('searchSuggest').innerHTML="";
			var result = data.result;
			result.forEach(function(elem,index){
				//遍历结果后就创建div用来装数据
				var listDiv = document.createElement('div');
				listDiv.onclick = selector;
				listDiv.className = 'listDiv';
				listDiv.innerHTML = elem.word;
				document.getElementById('searchSuggest').appendChild(listDiv)
				document.getElementById('searchSuggest').style.display = 'block';
			})
		}

	}else{
		document.getElementById('searchSuggest').style.display='none';
		document.getElementById('searchSuggest1').style.display='block'
	}

}
function show(){
	document.getElementById('searchSuggest1').style.display='block'
}
function blurno(){
	document.getElementById('searchSuggest1').style.display='none'
}
function selector(event){
	var target =event.target
	input.value = target.innerHTML
	document.getElementById('searchSuggest').style.display = 'none';

}




		