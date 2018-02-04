function myFunction() {
	var x = document.getElementById("address").value;
	if (x.length != 0) {
		document.getElementById("demo").innerHTML = x;
		}	
	}
function checkload(){
	document.getElementById('mainpage').addEventListener('load',getpagevals(load))
	if (document.getElementById("page2").className='open'){
		checkcancelpage2()
	}else{
		if(document.getElementById("page1").className='open'){
		document.getElementById("demo").innerHTML = 'test'
		checkbuttonpress()
		}
	}
}
function page2(){
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='open'
	var x = document.getElementById("address").value;
		if (x.length != 0) {
			var page1 = document.getElementById("page1");
			var page2 = document.getElementById("page2");
			var page1val = "none"
			var page2val = "block"
			var page1class = 'closed'
			var page2class = 'open'
		}
		chrome.storage.sync.set({'page1':page1val,'page2':page2val,'address':x, 'page1class':page1class,'page2class':page2class});
		getpagevals(load)

}
function getpagevals(callback){
	var pagevals = [];
	chrome.storage.sync.get(['page1','page2','address','page1class','page2class'], function(items){
		if (!chrome.runtime.error) {
			pagevals = items;
			callback(pagevals);
		}
	});
}
function load(val){
	var page1val = 'base'
	var page2val = 'base'
	var page1val = val.page1
	var page2val = val.page2
	var page1class = val.page1class
	var page2class = val.page2class
	var page1 = document.getElementById("page1");
	var page2 = document.getElementById("page2");
	var address = val.address
	page1.style.display = page1val
	page2.style.display = page2val
	page1.className = page1class
	page2.className = page2class
	document.getElementById("addresstext").innerHTML = address;
}
function checkbuttonpress(){
	document.getElementById("page1").className='open'
	document.getElementById("page2").className='closed'
	document.getElementById("enterbutton").addEventListener('click',page2)
}
function checkcancelpage2(){
	document.getElementById("cancelpage2").addEventListener('click',resetpages)
}
function resetpages(){
	chrome.storage.sync.set({'page1':'block','page2':'none','address':'', 'page1class':'open','page2class':'closed'});
	getpagevals(load)
}
checkload()