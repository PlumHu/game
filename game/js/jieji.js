(function(){

	// 设定样式
	// 设定box的位置
	var box=document.getElementById("box");

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

	//设定box的top值，让其在视口中距离上下的距离值一样 
	box.style.top=(height-621)/2+"px";
	//设定box的left值，让其在视口中距离左右的距离值一样 
	box.style.left=(width-621)/2+"px";

	// 结束设定box的位置
	// 结束设计样式
	
	// 设定结果result的位置
	var result=document.getElementById("result");
	result.style.top=(height-600)/2+"px";//设定result的top值，使其和第一列重叠
	result.style.left=(width-150)/2+"px";//设定result的left值，使其和第一列重叠	
	//结束设定样式 

	// 初始化变量
	var main=document.getElementById("main");
	var minNum=1;//最小行的序号
	var minBlackNum=2;//最小黑块行的序号
	var maxNum=4;
	var initTime=1500;	
	var state=0;
	var number=0;
	// 定义addHandler和removeHandler
	var EventUtil = {
					
		addHandler : function(element, type, handler){

			if (element.addEventListener){
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on"+type,handler);
			} else {
				element["on" + type] = handler;
			}

		},
		
		removeHandler : function(element, type, handler){
			
			if (element.removeEventListener){
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on"+type,handler);
			} else {
				element["on" + type] = null;
			}
		}

	};

// 给每一行的各个块初始化，设定颜色和行为
	for(var i=minNum; i<=maxNum; i++ ){
		if(i!=1){
			var blackNum=setColor(i);//设定颜色，获取每行黑块的位置
			addAction(i,blackNum);//添加动作
		}					
	}		

	// 给每一行随机设定一个黑块，并返回黑块在该行的位置
	function setColor(i){

		var row=document.getElementById("row"+i);
		var num=Math.round(Math.random()*3+0);
		var column=row.getElementsByTagName("div");
		column[num].style.backgroundColor="#000";
		return num;			
	}

	// 给某一行的不同的块儿添加不同的动作
	function addAction(m,blackNum){
		var row=document.getElementById("row"+m);			
		var column=row.getElementsByTagName("div");		

		// 遍历该行的所有的块儿
		for(var j=0;j<4;j++){ 
			// 判断是否是黑块
			if(j==blackNum){
			// 给黑块添加点击动作
			EventUtil.addHandler(column[j],"click",function(event){	

				// this.style.cssText="background-color:#ccc;-webkit-transition:background-color .5s ease-in;-moz-transition:background-color .5s ease-in;-o-transition:background-color .5s ease-in;";
				
				if(m==minBlackNum){

					// 缩放渐变成灰色
					var newElement=document.createElement("div");
					newElement.className="row3 column3";
					this.appendChild(newElement);
					newElement.style.cssText="background-color:#ccc;-webkit-animation:clickStyle .2s ease-in-out;-moz-animation:clickStyle .2s ease-in-out;-o-animation:clickStyle .2s ease-in-out;";
				
					// 从第一次点击开始计时
					if(m==2){
						state = 1;
						action(); //开始速度越来越快的掉落行		
					}

					minBlackNum++;
					number++;
					result.innerHTML=number;

				}else{

					var newElement=document.createElement("div");
					newElement.className="row3 column3";
					this.appendChild(newElement);
					newElement.style.cssText="background-color:#ccc;-webkit-animation:wrongAction 1s ease-in-out;-moz-animation:wrongAction 1s ease-in-out;-o-animation:wrongAction 1s ease-in-out;";					
					for(var i=minBlackNum;i<m;i++){

						var divElement=document.getElementById("row"+i).getElementsByTagName("div");
						for (var j = 0; j < 4; j++) {
							if(divElement[j].style.backgroundColor=="rgb(0, 0, 0)"){
								// 缩放渐变成灰色
								var newElement=document.createElement("div");
								newElement.className="row3 column3";
								divElement[j].appendChild(newElement);
								newElement.style.cssText="background-color:#ccc;-webkit-animation:clickStyle .2s ease-in-out;-moz-animation:clickStyle .2s ease-in-out;-o-animation:clickStyle .2s ease-in-out;";					    
							}
						};

					}			

					state=0;

					// 存储记录和历史最佳记录
					localStorage.setItem('jiejiResult', number);

					if(!localStorage.getItem('bestJiejiResult')){

						localStorage.setItem('bestJiejiResult', localStorage.getItem('jiejiResult'));
						var bestShow="<h1>新记录</h1>";	
					}else if(parseInt(localStorage.getItem('bestJiejiResult')) < parseInt(localStorage.getItem('jiejiResult'))){

						localStorage.setItem('bestJiejiResult', localStorage.getItem('jiejiResult'));
						var bestShow="<h1 style='color:#fff'>新记录</h1>";
					}else{
						var bestShow="<h1 style='color:#fff'>历史最佳："+localStorage.getItem('bestJiejiResult')+"</h1>";
					}
		
					// 0.5s后显示失败的页面
					setTimeout(function(){

						document.getElementById("result").style.display="none";

						box.style.backgroundColor="#000";
						main.style.border="none";

						// 定义最小行和最大行
						var minRow=document.getElementById("row"+minNum);
						var maxRow=document.getElementById("row"+maxNum);

						// 最大（顶端）行显示文字
						maxRow.style.border="0px";//去掉边框

						for(var i=0;i<maxRow.childNodes.length;i++){ //移除第一行的列
							maxRow.removeChild(maxRow.childNodes[i]);
						}

						maxRow.innerHTML="<h1 style='color:#fff;line-height: 100px;'>街机模式</h1>";//赋值，显示文字

						// 第二行显示文字
						var secondRow=document.getElementById("row"+(maxNum-1));
						secondRow.style.border="0px";
						secondRow.style.lineHeight="180px";
						secondRow.style.color="#fff";

						for(var i=0;i<secondRow.childNodes.length;i++){ //移除第二行的列
							secondRow.removeChild(secondRow.childNodes[i]);
						}		

						secondRow.innerHTML="<h1 style='color:#fff'>"+localStorage.getItem('jiejiResult')+"</h1>";; //赋值，显示文字

						// 第三行显示文字
						var thirdRow=document.getElementById("row"+(maxNum-2));
						thirdRow.style.border="0px";//去掉边框
						thirdRow.style.color="#fff";

						for(var i=0;i<thirdRow.childNodes.length;i++){ //移除第三行的列
							thirdRow.removeChild(thirdRow.childNodes[i]);
						}

						thirdRow.innerHTML=bestShow; //赋值，显示文字

						// 第四行，最底端的行，显示文字
						minRow.style.border="0px";//去掉边框
						minRow.style.backgroundColor="#000";

						for(var i=0;i<minRow.childNodes.length;i++){ //移除第四行的列
							minRow.removeChild(minRow.childNodes[i]);
						}

						minRow.innerHTML="";	//赋值，显示文字								

						// 创建第一列，并赋显示文字
						var column1=document.createElement("div");
						column1.className="row3 column6";
						column1.style.border="0px";
						column1.innerHTML="<a href=\"index.html\" >返回</a>";
						minRow.appendChild(column1);
						// 创建第二列，并赋显示文字
						var column2=document.createElement("div");
						column2.className="row3 column6";	
						column2.style.border="0px";
						column2.innerHTML="<a href=\"jieji.html\" >重来</a>";								
						minRow.appendChild(column2);

						},1500);
										
					}

				});
			}else{  

				//给白块添加点击事件
				EventUtil.addHandler(column[j],"click",function(event){

					var newElement=document.createElement("div");
					newElement.className="row3 column3";
					this.appendChild(newElement);
					newElement.style.cssText="background-color:red;-webkit-animation:wrongAction 1s ease-in-out;-moz-animation:wrongAction 1s ease-in-out;-o-animation:wrongAction 1s ease-in-out;";
					
					state=0;
					// 存储记录和历史最佳记录
					localStorage.setItem('jiejiResult', number);

					if(!localStorage.getItem('bestJiejiResult')){

						localStorage.setItem('bestJiejiResult', localStorage.getItem('jiejiResult'));
						var bestShow="<h1>新记录</h1>";	
					}else if(parseInt(localStorage.getItem('bestJiejiResult')) < parseInt(localStorage.getItem('jiejiResult'))){

						localStorage.setItem('bestJiejiResult', localStorage.getItem('jiejiResult'));
						var bestShow="<h1 style='color:#fff'>新记录</h1>";
					}else{

						var bestShow="<h1 style='color:#fff'>历史最佳："+localStorage.getItem('bestJiejiResult')+"</h1>";

					}
	
					// 0.5s后显示失败的页面
					setTimeout(function(){

						document.getElementById("result").style.display="none";

						box.style.backgroundColor="red";
						main.style.border="none";

						// 定义最小行和最大行
						var minRow=document.getElementById("row"+minNum);
						var maxRow=document.getElementById("row"+maxNum);

						// 最大（顶端）行显示文字
						maxRow.style.border="0px";//去掉边框

						for(var i=0;i<maxRow.childNodes.length;i++){ //移除第一行的列
							maxRow.removeChild(maxRow.childNodes[i]);
						}

						maxRow.innerHTML="<h1 style='color:#fff;line-height: 100px;'>街机模式</h1>";//赋值，显示文字

						// 第二行显示文字
						var secondRow=document.getElementById("row"+(maxNum-1));
						secondRow.style.border="0px";
						secondRow.style.lineHeight="180px";

						for(var i=0;i<secondRow.childNodes.length;i++){ //移除第二行的列
							secondRow.removeChild(secondRow.childNodes[i]);
						}		

						secondRow.innerHTML="<h1 style='color:#fff'>"+localStorage.getItem('jiejiResult')+"</h1>";; //赋值，显示文字

						// 第三行显示文字
						var thirdRow=document.getElementById("row"+(maxNum-2));
						thirdRow.style.border="0px";//去掉边框

						for(var i=0;i<thirdRow.childNodes.length;i++){ //移除第三行的列
							thirdRow.removeChild(thirdRow.childNodes[i]);
						}

						thirdRow.innerHTML=bestShow; //赋值，显示文字

						// 第四行，最底端的行，显示文字
						minRow.style.border="0px";//去掉边框
						minRow.style.backgroundColor="red";

						for(var i=0;i<minRow.childNodes.length;i++){ //移除第四行的列
							minRow.removeChild(minRow.childNodes[i]);
						}

						minRow.innerHTML="";	//赋值，显示文字								

						// 创建第一列，并赋显示文字
						var column1=document.createElement("div");
						column1.className="row3 column6";
						column1.style.border="0px";
						column1.innerHTML="<a href=\"index.html\" >返回</a>";
						minRow.appendChild(column1);
						// 创建第二列，并赋显示文字
						var column2=document.createElement("div");
						column2.className="row3 column6";	
						column2.style.border="0px";
						column2.innerHTML="<a href=\"jieji.html\" >重来</a>";								
						minRow.appendChild(column2);

					},1000);
									
				});		

			}
					
		}

	}

// 控制每行下落的速度和行为
	function action(){

		if(state==1){   //判断开始点击时没

			if(minBlackNum==minNum || minBlackNum<minNum){      //漏掉黑块未点击时
				var minRow=document.getElementById("row"+minNum)
				var divElement=minRow.getElementsByTagName("div");
				for(var i=0;i<divElement.length;i++){
					if(divElement[i].style.backgroundColor=="rgb(0, 0, 0)"){

						var newElement=document.createElement("div");
						newElement.className="row3 column3";
						divElement[i].appendChild(newElement);
						newElement.style.cssText="background-color:#ccc;-webkit-animation:wrongAction 1s ease-in-out;-moz-animation:wrongAction 1s ease-in-out;-o-animation:wrongAction 1s ease-in-out;";						
					    
					    break;
					}
				}
				
				state=0;

				// 存储记录和历史最佳记录
				localStorage.setItem('jiejiResult', number);

				if(!localStorage.getItem('bestJiejiResult')){

					localStorage.setItem('bestJiejiResult', localStorage.getItem('jiejiResult'));
					var bestShow="<h1>新记录</h1>";	
				}else if(parseInt(localStorage.getItem('bestJiejiResult')) < parseInt(localStorage.getItem('jiejiResult'))){

					localStorage.setItem('bestJiejiResult', localStorage.getItem('jiejiResult'));
					var bestShow="<h1 style='color:#fff'>新记录</h1>";
				}else{
					var bestShow="<h1 style='color:#fff'>历史最佳："+localStorage.getItem('bestJiejiResult')+"</h1>";
				}
		
				// 0.5s后显示失败的页面
				setTimeout(function(){

					document.getElementById("result").style.display="none";

					box.style.backgroundColor="#000";
					main.style.border="none";

					// 定义最小行和最大行
					var minRow=document.getElementById("row"+minNum);
					var maxRow=document.getElementById("row"+maxNum);

					// 最大（顶端）行显示文字
					maxRow.style.border="0px";//去掉边框

					for(var i=0;i<maxRow.childNodes.length;i++){ //移除第一行的列
						maxRow.removeChild(maxRow.childNodes[i]);
					}

					maxRow.innerHTML="<h1 style='color:#fff;line-height: 100px;'>街机模式</h1>";//赋值，显示文字

					// 第二行显示文字
					var secondRow=document.getElementById("row"+(maxNum-1));
					secondRow.style.border="0px";
					secondRow.style.lineHeight="180px";

					for(var i=0;i<secondRow.childNodes.length;i++){ //移除第二行的列
						secondRow.removeChild(secondRow.childNodes[i]);
					}		

					secondRow.innerHTML="<h1 style='color:#fff'>"+localStorage.getItem('jiejiResult')+"</h1>";; //赋值，显示文字

					// 第三行显示文字
					var thirdRow=document.getElementById("row"+(maxNum-2));
					thirdRow.style.border="0px";//去掉边框

					for(var i=0;i<thirdRow.childNodes.length;i++){ //移除第三行的列
						thirdRow.removeChild(thirdRow.childNodes[i]);
					}

					thirdRow.innerHTML=bestShow; //赋值，显示文字

					// 第四行，最底端的行，显示文字
					minRow.style.border="0px";//去掉边框
					minRow.style.backgroundColor="#000";

					for(var i=0;i<minRow.childNodes.length;i++){ //移除第四行的列
						minRow.removeChild(minRow.childNodes[i]);
					}

					minRow.innerHTML="";	//赋值，显示文字								

					// 创建第一列，并赋显示文字
					var column1=document.createElement("div");
					column1.className="row3 column6";
					column1.style.border="0px";
					column1.innerHTML="<a href=\"index.html\" >返回</a>";
					minRow.appendChild(column1);
					// 创建第二列，并赋显示文字
					var column2=document.createElement("div");
					column2.className="row3 column6";	
					column2.style.border="0px";
					column2.innerHTML="<a href=\"jieji.html\" >重来</a>";								
					minRow.appendChild(column2);

					// 结束第4行

				},1000);

			}else{	//按照顺序点击每行的黑块时

				var minRow=document.getElementById("row"+minNum);
				var maxRow=document.getElementById("row"+maxNum);
				main.removeChild(minRow);
				minNum++;
				maxNum++;

				// 创建新的一行
				var newRow=document.createElement("div");		
				newRow.className="row3 column12";
				newRow.id="row"+maxNum;
				// 插入第一列
				var column1=document.createElement("div");
				column1.className="row3 column3";
				newRow.appendChild(column1);
				// 插入第二列
				var column2=document.createElement("div");
				column2.className="row3 column3";							
				newRow.appendChild(column2);
				// 插入第三列
				var column3=document.createElement("div");
				column3.className="row3 column3";								
				newRow.appendChild(column3);
				// 插入第四列
				var column4=document.createElement("div");
				column4.className="row3 column3";								
				newRow.appendChild(column4);

				// 将新的一行插入到main第一行前
				main.insertBefore(newRow,maxRow);
				var newBlackNum=setColor(maxNum);
				addAction(maxNum,newBlackNum);			

				if(initTime>1000 || initTime==1000){
					initTime-=200;
				}else if(initTime>800 || initTime==800){
					initTime-=80;
				}else if(initTime>600 || initTime==600){
					initTime-=50;
				}else if(initTime>400 || initTime==400){
					initTime-=30;
				}else if(initTime>200 || initTime==200){
					initTime-=20;
				}else if(nitTime>80){
					initTime-=10;
				}else{
					initTime=80;
				}	

				setTimeout(arguments.callee,initTime);				

			}

		}else{
			setTimeout(arguments.callee,50);
		}					

	}

})();
