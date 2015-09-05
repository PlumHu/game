
		(function(){
			   	//设定样式 

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

				// 设定使用时间time的位置
				var time=document.getElementById("time");
				time.style.top=(height-600)/2+"px";//设定time的top值，使其和第一列重叠
				time.style.left=(width-150)/2+"px";//设定time的left值，使其和第一列重叠		
				// 设定提示语的样式
				document.getElementById("tip").style.paddingTop="0px";

				// 结束设定样式
				 
				//定义全局变量 
				var main=document.getElementById("main");
				var ms=0;//定义所花时间
				var state=0;//定义状态，开始/结束计时
				var initTime=30*1000;	
				var result=0;
				var minNum=1;//最底端的行值
				var maxNum=4;//最顶端的行值

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
					}

				};


			// 获得所花时间以及显示
				function display(){
					
					if(state==1){
						now = new Date();
						ms=initTime-(now.getTime()- then.getTime());
						time.innerHTML=ms/1000+"\"";
						// 时间到
						if(ms==0 || ms<0){
							state=0;	
							time.innerHTML="时间到！";
							var bestShow="<h1>新记录</h1>";
							// 存储记录和历史最佳记录
							localStorage.setItem('chanResult', result);

							if(!localStorage.getItem('bestChanResult')){

								localStorage.setItem('bestChanResult', localStorage.getItem('chanResult'));
								var bestShow="<h1>新记录</h1>";		
							
							}else if(parseInt(localStorage.getItem('bestChanResult')) < parseInt(localStorage.getItem('chanResult'))){

								localStorage.setItem('bestChanResult', localStorage.getItem('chanResult'));

							}else{

								bestShow="<h1>历史最佳："+localStorage.getItem('bestChanResult')+"</h1>";
							}

							// 0.5s后显示失败的页面
							setTimeout(function(){

								document.getElementById("time").style.display="none";

								box.style.backgroundColor="#333";
								main.style.border="none";

								// 定义最小行和最大行
								var minRow=document.getElementById("row"+minNum);
								var maxRow=document.getElementById("row"+maxNum);

								// 最大（顶端）行显示文字
								maxRow.style.border="0px";//去掉边框

								for(var i=0;i<maxRow.childNodes.length;i++){ //移除第一行的列
									maxRow.removeChild(maxRow.childNodes[i]);
								}

								maxRow.innerHTML="<h1 style='color:#fff;line-height: 100px;'>禅模式</h1>";//赋值，显示文字

								// 第二行显示文字
								var secondRow=document.getElementById("row"+(maxNum-1));
								secondRow.style.border="0px";
								secondRow.style.lineHeight="180px";

								for(var i=0;i<secondRow.childNodes.length;i++){ //移除第二行的列
									secondRow.removeChild(secondRow.childNodes[i]);
								}		

								secondRow.innerHTML="<h1>"+localStorage.getItem('chanResult')+"</h1>";; //赋值，显示文字

								// 第三行显示文字
								var thirdRow=document.getElementById("row"+(maxNum-2));
								thirdRow.style.border="0px";//去掉边框

								for(var i=0;i<thirdRow.childNodes.length;i++){ //移除第三行的列
									thirdRow.removeChild(thirdRow.childNodes[i]);
								}

								thirdRow.innerHTML=bestShow; //赋值，显示文字

								// 第四行，最底端的行，显示文字
								minRow.style.border="0px";//去掉边框
								minRow.style.backgroundColor="#333";

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
								column2.innerHTML="<a href=\"chan.html\" >重来</a>";								
								minRow.appendChild(column2);							
								// 结束第4行

							},500);	

						}						
					}

					setTimeout(arguments.callee,50);

				}

				EventUtil.addHandler(document.body,"load",display);
		
 
			// 初始化和实现动作
			(function(){

				// 初始化，设定每行块的颜色和添加动作
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
									// 从第一次点击开始计时
									if(m==2){
										state = 1;
										then = new Date();		
										display();						
									}
									// 判断是不是最下面的黑块，或者是最后一个黑（灰）块
									if(m==minNum+1 && ms>0){

										//缩放渐变成灰色
										var newElement=document.createElement("div");
										newElement.className="row3 column3";
										this.appendChild(newElement);
										newElement.style.cssText="background-color:#ccc;-webkit-animation:clickStyle .2s ease-in-out;-moz-animation:clickStyle .2s ease-in-out;-o-animation:clickStyle .2s ease-in-out;";
										
										var minRow=document.getElementById("row"+minNum);
										var maxRow=document.getElementById("row"+maxNum);
										main.removeChild(minRow);
										minNum++;
										maxNum++;
										result++;

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

									}else{
										return ;
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
									localStorage.setItem('chanResult', result);

									if(!localStorage.getItem('bestChanResult')){

										localStorage.setItem('bestChanResult', localStorage.getItem('chanResult'));
										var bestShow="<h1>新记录</h1>";	
									}else if(parseInt(localStorage.getItem('bestChanResult')) < parseInt(localStorage.getItem('chanResult'))){

										localStorage.setItem('bestChanResult', localStorage.getItem('chanResult'));
										var bestShow="<h1>新记录</h1>";
									}else{
										var bestShow="<h1>历史最佳："+localStorage.getItem('bestChanResult')+"</h1>";
									}
	
									// 0.5s后显示失败的页面
									setTimeout(function(){

										document.getElementById("time").style.display="none";

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

										maxRow.innerHTML="<h1 style='color:#fff;line-height: 100px;'>禅模式</h1>";//赋值，显示文字

										// 第二行显示文字
										var secondRow=document.getElementById("row"+(maxNum-1));
										secondRow.style.border="0px";
										secondRow.style.lineHeight="180px";

										for(var i=0;i<secondRow.childNodes.length;i++){ //移除第二行的列
											secondRow.removeChild(secondRow.childNodes[i]);
										}		

										secondRow.innerHTML="<h1>"+localStorage.getItem('chanResult')+"</h1>";; //赋值，显示文字

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
										column2.innerHTML="<a href=\"chan.html\" >重来</a>";								
										minRow.appendChild(column2);
										// 创建第三列，并赋显示文字
										// var column3=document.createElement("div");
										// column3.className="row3 column4";	
										// column3.style.border="0px";
										// column3.innerHTML="<a href=\"chan.html\" >重置</a>";								
										// minRow.appendChild(column3);										
										// 结束第4行

									},1000);
									
								});								
							}
					
					}
					
				}
				
			})();

		})();