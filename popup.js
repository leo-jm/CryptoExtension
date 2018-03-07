//Test Function
function myFunction() {
	var x = document.getElementById("address").value;
	if (x.length != 0) {
		document.getElementById("demo").innerHTML = x;
		}	
	}
//Loads the page, initial function
function checkload(){
	getpagevals(load)
	//document.getElementById('mainpage').addEventListener('load',getpagevals(load))
}
//Decides what buttons to check for
function checkbuttons(){
	var page1class = document.getElementById("page1").className
	var page2class = document.getElementById("page2").className
	var page3class = document.getElementById("page3").className
	console.log(page3class)
	if (page3class == 'open'){
		console.log('test3')
		checkcancelpage3()
	}else{
		if(page2class == 'open'){
			console.log('test2')
			checkcancelpage2()
			checkbuttonpress2()
		}else{
			if(page1class == 'open'){
			console.log('test1')
			checkbuttonpress1()
			}
		}
	}
}
//Function for going to page 2
function page2(){
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='open'
	document.getElementById("page3").className='closed'
	var address = document.getElementById("address").value;
	if (address.length != 0) {
			var page1 = document.getElementById("page1");
			var page2 = document.getElementById("page2");
			var page3 = document.getElementById("page3")
			var page1val = "none"
			var page2val = "block"
			var page3val = "none"
			var page1class = 'closed'
			var page2class = 'open'
			var page3class = 'closed'
		}
		//Saving page and transaction data to storage
		chrome.storage.sync.set({'page1':page1val,'page2':page2val,'page3':page3val,'address':address, 'page1class':page1class,'page2class':page2class, 'page3class':page3class});
		getpagevals(load)

}
function page3(){
	console.log('page3')
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='closed'
	document.getElementById("page3").className='open'
	console.log(document.getElementById("page3").className)
	var amount = document.getElementById('amount').value;
	var coin = document.getElementById('coin').value;
		if (address.length != 0) {
			if (amount.length != 0){
				var page1 = document.getElementById("page1");
				var page2 = document.getElementById("page2");
				var page3 = document.getElementById("page3")
				var page1val = "none"
				var page2val = "none"
				var page3val = "block"
				var page1class = 'closed'
				var page2class = 'closed'
				var page3class = 'open'
			}
		}
		//Saving page and transaction data to storage
		chrome.storage.sync.set({'page1':page1val,'page2':page2val, 'page3':page3val, 'amount':amount, 'coin':coin,'page1class':page1class,'page2class':page2class, 'page3class':page3class});
		getpagevals(load)

}
//Retrieve page and transaction data from storage
function getpagevals(callback){
	var pagevals = [];
	chrome.storage.sync.get(['page1','page2','page3','address','amount','coin','page1class','page2class','page3class'], function(items){
		if (!chrome.runtime.error) {
			pagevals = items;
			callback(pagevals);
		}
	});
}
//Loads in the page based on saved data, called in the callback for function getpagevals()
function load(val){
	var page1val = 'base'
	var page2val = 'base'
	var page3val = 'base'
	var page1val = val.page1
	var page2val = val.page2
	var page3val = val.page3
	var page1class = val.page1class
	var page2class = val.page2class
	var page3class = val.page3class
	var page1 = document.getElementById("page1");
	var page2 = document.getElementById("page2");
	var page3 = document.getElementById("page3")
	var address = val.address
	var amount = val.amount
	var coin = val.coin
	page1.style.display = page1val
	page2.style.display = page2val
	page3.style.display = page3val
	page1.className = page1class
	page2.className = page2class
	page3.className = page3class
	document.getElementById("addresstext").innerHTML = address;
	document.getElementById("amounttext").innerHTML = amount;
	document.getElementById("cointext").innerHTML = coin;
	checkbuttons()
}
// Checks for the enter button to be pressed on page 1
function checkbuttonpress1(){
	document.getElementById("page1").className='open'
	document.getElementById("page2").className='closed'
	document.getElementById("page3").className='closed'
	document.getElementById("enterbutton1").addEventListener('click',page2)
}
// Checks for the enter button to be pressed on page 2
function checkbuttonpress2(){
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='open'
	document.getElementById("page3").className='closed'
	console.log('check')
	document.getElementById("enterbutton2").addEventListener('click',page3)
}
//Checks for the cancel button to be pressed on page 2
function checkcancelpage2(){
	document.getElementById("cancelpage2").addEventListener('click',resetpages)
}
function checkcancelpage3(){
	document.getElementById("cancelpage3").addEventListener('click',resetpages)
}
//Sets the page data and transaction datat back to default
function resetpages(){
	chrome.storage.sync.set({'page1':'block','page2':'none','page3':'none','address':'','amount':'', 'page1class':'open','page2class':'closed','page3class':'closed'});
	getpagevals(load)
}
//Initial Function called
checkload()