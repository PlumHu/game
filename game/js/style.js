(function(){
	// 设定样式
	// 设定main的位置
	var main=document.getElementById("main");

	if(document.body.clientHeight){
		var height=document.body.clientHeight;
	}else{
		var height=document.documentElement.clientHeight;
	}

	if(document.body.clientWidth){
		var width=document.body.clientWidth;
	}else{
		var width=document.documentElement.clientWidth;
	}	

	//设定main的top值，让其在视口中距离上下的距离值一样 
	main.style.top=(height-620)/2+"px";
	//设定main的left值，让其在视口中距离左右的距离值一样 
	main.style.left=(width-620)/2+"px";

	// 结束设定main的位置
	// 结束设计样式		
})();

