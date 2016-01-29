window.onload=function(){
	var sence=document.getElementById('sence');
	var leftPlace=document.getElementById('leftPlace');
	var rightPlace=document.getElementById('rightPlace');
	var fn3=function(){
		for(i=0;i<7;i++){
			for(j=0;j<i+1;j++){            
				var puKePai=document.createElement('div');
				puKePai.setAttribute('class','puKePai');
				puKePai.setAttribute('id',i+'_'+j);
				puKePai.style.position='absolute';
				puKePai.style.top=45*i+'px';
				puKePai.style.left=(6-i)*65+j*130+'px'; //如何平铺？
				sence.appendChild(puKePai);
			}
		}
	};
	fn3();
	var dict={1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'};
	var hh=['rd','bk','fk','mh'];
	var fn5=function(){
		var zidian={};
		var poker=[],suijiH,suijiS;
		while(poker.length!=52){
			suijiH=hh[Math.floor(Math.random()*4)];
			suijiS=dict[Math.floor(Math.random()*13+1)];
			var pai={huase:suijiH,number:suijiS};
			if(!zidian[suijiH+suijiS]){
				poker.push(pai);
				zidian[suijiH+suijiS]=true;
			}				
		}
		return poker;
	};
	var poker=fn5();   //52
	// 主体部分的牌
	var els=document.getElementsByClassName('puKePai');   //28
	for(i=0;i<els.length;i++){
		els[i].innerHTML=poker[i].number;
		if(poker[i].huase=='rd'){
			els[i].style.backgroundImage='url(./images/hongtao.jpg)';
			els[i].style.color='#BC0821';
		}
		if(poker[i].huase=='bk'){
			els[i].style.backgroundImage='url(./images/heitao.jpg)';
			els[i].style.color='black';
		}
		if(poker[i].huase=='fk'){
			els[i].style.backgroundImage='url(./images/fangpian.jpg)';
			els[i].style.color='#BC0821';
		}
		if(poker[i].huase=='mh'){
			els[i].style.backgroundImage='url(./images/meihua.jpg)';
			els[i].style.color='black';
		}
	}
	
	// poker=poker.splice(24);  // 等同于 poker.length=28;
	// 左下的24张牌
	for (i = 0; i < 24; i++) {
		var leftPai=document.createElement('div');
		leftPai.setAttribute('class','leftPai');   //
		leftPai.style.position='absolute';
		leftPai.style.top='0px';
		leftPai.style.left='0px';
		leftPlace.appendChild(leftPai);
	}
	// leftPai=poker.splice(28);
	leftPai=poker.slice(28);   //leftPai为后24张牌
	var L_els=document.getElementsByClassName('leftPai');
	for(i=0;i<L_els.length;i++){
		L_els[i].innerHTML=leftPai[i].number;
		if(leftPai[i].huase=='rd'){
			L_els[i].style.backgroundImage='url(./images/hongtao.jpg)';
			L_els[i].style.color='#BC0821';
		}
		if(leftPai[i].huase=='bk'){
			L_els[i].style.backgroundImage='url(./images/heitao.jpg)';
			L_els[i].style.color='black';
		}
		if(leftPai[i].huase=='fk'){
			L_els[i].style.backgroundImage='url(./images/fangpian.jpg)';
			L_els[i].style.color='#BC0821';
		}
		if(leftPai[i].huase=='mh'){		
			L_els[i].style.backgroundImage='url(./images/meihua.jpg)';
			L_els[i].style.color='black';
		}
	}
	// 事件委托
	var previous=null,one,tow;
	sence.onclick=function(e){
		var el=e.target;
		if(el==this) return;
		if(el.innerHTML=='K'){
			el.parentElement.removeChild(el);
			return;
		}
		tow=el.innerHTML;
		var id=el.getAttribute('id');
		if (id!=null) {
			var x=Number(id.split('_')[0]);
			var y=Number(id.split('_')[1]);
			var s1=document.getElementById((x+1)+'_'+y);
			var s2=document.getElementById((x+1)+'_'+(y+1));
			if (s1||s2) {
				return;
			}	
		}
		if(previous!=null){
			one=previous.innerHTML;	
			if(one=='2'&&tow=='J'||one=='J'&&tow=='2'||one=='A'&&tow=='Q'||one=='Q'&&tow=='A'||Number(one)+Number(tow)==13){
				el.parentElement.removeChild(el);
				previous.parentElement.removeChild(previous);
				previous=null;
				return;
			}
			// previous.style.border='none';
			previous.style.webkitTransform='scale(1)';
		}
		// el.style.border='1px solid black';
		el.style.webkitTransform='scale(1.1)';
		previous=el;
		// if(els.length==0&&L_els.length==0){
		if(sence.children.length==4&&leftPlace.children.length==0&&rightPlace.children.length==0){
			alert('你真棒！');
			location.reload();
		}  //点击change时才会弹出来
		// 点击按钮翻牌部分
		if(el==change){
			el.style.webkitTransform='scale(1)';
			var L_last=leftPlace.lastElementChild;
			if(L_last==null){
				return;
			}
			rightPlace.appendChild(leftPlace.removeChild(L_last));
		}
		if(el==reChange){
			el.style.webkitTransform='scale(1)';
			if(jiHui==3){
				tishi.style.display='block';
				sence.onclick=null;
				again.innerHTML='again';
				again.style.color='white';
				again.style.cursor='pointer';
				again.onclick=function(){
					location.reload();
				};
				return;
			}
			if(leftPlace.children.length!=0){
				return;
			}
			for(i=0;i<L_els.length;i++){
				var R_last=rightPlace.lastElementChild;
				leftPlace.appendChild(rightPlace.removeChild(R_last));
			}
			jiHui++;
		}
	};
	// change部分
	var change=document.getElementById('change');
	var reChange=document.getElementById('reChange');
	var tishi=document.getElementById('tishi');
	var again=document.getElementById('again');
	var jiHui=0;
	sence.onmousedown=function(e){
		e.preventDefault();
	};
	again.onmousedown=function(e){
		e.preventDefault();
	}
	console.log(sence.children.length);



	// change.onclick=function(){	
	// 	var L_last=leftPlace.lastElementChild;
	// 	if(L_last==null){
	// 		return;
	// 	}
	// 	rightPlace.appendChild(leftPlace.removeChild(L_last));
	// };
	// reChange.onclick=function(){
	// 	if(jiHui==3){
	// 		tishi.style.display='block';
	// 		sence.onclick=null;
	// 		again.innerHTML='again';
	// 		again.style.color='white';
	// 		again.style.cursor='pointer';
	// 		again.onclick=function(){
	// 			location.reload();
	// 		};
	// 		// alert('游戏结束！');
	// 		// reChange.onclick=null;
	// 		return;
	// 	}
	// 	if(leftPlace.children.length!=0){
	// 		return;
	// 	}
	// 	for(i=0;i<L_els.length;i++){
	// 		var R_last=rightPlace.lastElementChild;
	// 		leftPlace.appendChild(rightPlace.removeChild(R_last));
	// 	}
	// 	jiHui++;
	// };	
	// change.onmousedown=function(e){
	// 	e.preventDefault();
	// }
	// reChange.onmousedown=function(e){
	// 	e.preventDefault();
	// }















	// var timerId=setInterval();






















};