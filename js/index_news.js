function focusImg(id)
{
	var oDiv=document.getElementById(id);
	var aLiBtn=oDiv.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var t=null;
	var iNow=0;
	var left=0;
	var autoPlayTimer=null;
	var i=0;
	
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
	
	for(i=0;i<aLiBtn.length;i++)
	{
		aLiBtn[i].index=i;
		aLiBtn[i].onmouseover=function ()
		{
			iNow=this.index;
			
			tab();
		};
	}
	
	function tab()
	{
		for(i=0;i<aLiBtn.length;i++)
		{
			aLiBtn[i].className='';
		}
		
		aLiBtn[iNow%aLiBtn.length].className='active';
		startMove(-aLi[0].offsetWidth*iNow);
	}
	
	function next()
	{
		iNow++;
		
		tab();
	}
	
	autoPlayTimer=setInterval(next, 5000);
	
	function startMove(iTarget)
	{
		if(t)
		{
			clearInterval(t);
		}
		t=setInterval
		(
			function ()
			{
				doMove(iTarget);
			}, 30
		);
	}
	
	function doMove(iTarget)
	{
		var iSpeed=0;
		
		if(left==iTarget)
		{
			clearInterval(t);
			t=null;
		}
		else
		{
			iSpeed=(iTarget-left)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			left+=iSpeed;
			
			var l=left;
			
			l%=oUl.offsetWidth/2;
			if(l<-oUl.offsetWidth/2)
			{
				l+=oUl.offsetWidth/2;
			}
			
			oUl.style.left=l+'px';
		}
	}
	
	oDiv.onmouseover=function ()
	{
		clearInterval(autoPlayTimer);
	};
	
	oDiv.onmouseout=function ()
	{
		autoPlayTimer=setInterval(next, 5000);
	};
}