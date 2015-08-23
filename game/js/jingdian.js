		(function(){
			    //设定样式 

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

				// 设定使用时间time的位置
				var time=document.getElementById("time");
				time.style.top=(height-600)/2+"px";//设定time的top值，使其和第一列重叠
				time.style.left=(width-150)/2+"px";//设定time的left值，使其和第一列重叠		

				// 结束设定样式

				//定义全局变量 
				var ms=0;//定义所花时间
				var state=0;//定义状态，开始/结束计时

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
						ms=now.getTime()- then.getTime();
						time.innerHTML=ms/1000+"\"";
					}
					setTimeout(arguments.callee,50) ;
				}

				EventUtil.addHandler(document.body,"load",display);
		
			// 初始化和实现动作
			(function(){
				// 初始化变量
				var minNum=1;//最底端的行值
				var maxNum=4;//最顶端的行值

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
									if(m==minNum+1 || m==40){

										var newElement=document.createElement("div");
										newElement.className="row3 column3";
										this.appendChild(newElement);
										newElement.style.cssText="background-color:#ccc;-webkit-animation:clickStyle .2s ease-in-out;-moz-animation:clickStyle .2s ease-in-out;-o-animation:clickStyle .2s ease-in-out;";

										var minRow=document.getElementById("row"+minNum);
										var maxRow=document.getElementById("row"+maxNum);
										main.removeChild(minRow);
										minNum++;
										maxNum++;
										if(minNum<38){
											var newRow=document.createElement("div");
											newRow.className="row3 column12";
											newRow.id="row"+maxNum;
											var column1=document.createElement("div");
											column1.className="row3 column3";
											newRow.appendChild(column1);
											var column2=document.createElement("div");
											column2.className="row3 column3";									
											newRow.appendChild(column2);
											var column3=document.createElement("div");
											column3.className="row3 column3";									
											newRow.appendChild(column3);
											var column4=document.createElement("div");
											column4.className="row3 column3";									
											newRow.appendChild(column4);
											main.insertBefore(newRow,maxRow);
											var newBlackNum=setColor(maxNum);
											addAction(maxNum,newBlackNum);

										}else if(minNum<40 && minNum>=38){    //判断是不是倒数第2个和第3个

											var newRow=document.createElement("div");
											newRow.className="row3 column12";
											newRow.id="row"+maxNum;
											newRow.style.border="0px";
											newRow.style.height="150px";
											newRow.style.backgroundColor="lime";
											main.insertBefore(newRow,maxRow);										
										}else{                               //判断是不是最后一个
											
											state=0;
											var useTime=ms/1000;
											var bestShow="<h1>新记录</h1>";

											localStorage.setItem('useTime', useTime);
											if(!localStorage.getItem('fastTime')){

												localStorage.setItem('fastTime', localStorage.getItem('useTime'));

											}else if(localStorage.getItem('fastTime')>localStorage.getItem('useTime')){

												localStorage.setItem('fastTime', localStorage.getItem('useTime'));

											}else{
												bestShow="<h1>历史最佳："+localStorage.getItem('fastTime')+"\"</h1>"
											}

											// 创建新的一行
											var newRow=document.createElement("div");
											newRow.className="row3 column12";
											newRow.id="row"+maxNum;
											newRow.style.border="0px";
											newRow.style.height="150px";
											newRow.style.lineHeight="180px";
											newRow.style.backgroundColor="lime";
											// newRow.innerHTML="<h1>"+localStorage.getItem('useTime')+"\"</h1>";
											main.insertBefore(newRow,maxRow);

											// 0.5秒后显示成功的页面
											setTimeout(function(){

												document.getElementById("time").style.display="none";

												// 目前第一行显示文字
												var maxRow=document.getElementById("row"+maxNum);												
												maxRow.innerHTML="<h1>"+localStorage.getItem('useTime')+"\"</h1>";

												//删除此时的最小行			
												main.removeChild(document.getElementById("row"+minNum));
												//重新创建新的一行
												var newRow=document.createElement("div");
												newRow.className="row3 column12";
												newRow.id="row"+(maxNum+1);
												newRow.style.border="0px";
												newRow.style.height="150px";
												newRow.style.backgroundColor="lime";
												newRow.style.lineHeight="100px";
												newRow.innerHTML="<h1>经典模式</h1>";
												main.insertBefore(newRow,maxRow);	

												maxNum++;//新创建了一行，行值要加1

												//main的背景色变成lime，这样可以使边框也变成绿色 
												main.style.backgroundColor="lime";

												// 第三行显示文字
												thirdRow=document.getElementById("row"+(maxNum-2));
												thirdRow.innerHTML=bestShow;											

												// 最后一行显示文字
												thelastRow=document.getElementById("row"+(maxNum-3));	
												// 创建第一列，并赋显示文字
												var column1=document.createElement("div");
												column1.className="row3 column6";
												column1.style.border="0px";
												column1.innerHTML="<a href=\"index.html\" >返回</a>";
												thelastRow.appendChild(column1);
												// 创建第二列，并赋显示文字
												var column2=document.createElement("div");
												column2.className="row3 column6";	
												column2.style.border="0px";
												column2.innerHTML="<a href=\"jingdian.html\" >重来</a>";								
												thelastRow.appendChild(column2);

											},1000);

										}

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

									setTimeout(function(){
										document.getElementById("time").style.display="none";

										main.style.backgroundColor="red";

										var minRow=document.getElementById("row"+minNum);
										var maxRow=document.getElementById("row"+maxNum);

										maxRow.style.border="0px";

										for(var i=0;i<maxRow.childNodes.length;i++){
											maxRow.removeChild(maxRow.childNodes[i]);
										}

										maxRow.innerHTML="<h1 style='color:#fff;line-height: 200px;'>经典模式</h1>";

										var secondRow=document.getElementById("row"+(maxNum-1));
										secondRow.style.border="0px";

										for(var i=0;i<secondRow.childNodes.length;i++){
											secondRow.removeChild(secondRow.childNodes[i]);
										}

										secondRow.innerHTML="";

										var thirdRow=document.getElementById("row"+(maxNum-2));
										thirdRow.style.border="0px";

										for(var i=0;i<thirdRow.childNodes.length;i++){
											thirdRow.removeChild(thirdRow.childNodes[i]);
										}

										thirdRow.innerHTML="<h1>任务失败</h1>";

										minRow.style.border="0px";
										minRow.style.backgroundColor="red";

										for(var i=0;i<minRow.childNodes.length;i++){
											minRow.removeChild(minRow.childNodes[i]);
										}

										minRow.innerHTML="";									

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
										column2.innerHTML="<a href=\"jingdian.html\" >重来</a>";								
										minRow.appendChild(column2);									

									},1000);
									
								});								
							}
					
					}

				}
				
			})();

		})();