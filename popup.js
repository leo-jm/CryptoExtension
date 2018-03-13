var pub = ''
var priv = ''
function myFunction() {
	//Test Function
	var x = document.getElementById("address").value;
	if (x.length != 0) {
		document.getElementById("demo").innerHTML = x;
		}	
	}

function checkload(){
	//Loads the page, initial function
	getpagevals(load)
}

function checkbuttons(){
	//Decides what buttons to check for
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

function page2(){
	//Function for going to page 2
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
	//function for going to page 3
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

function getpagevals(callback){
	//Retrieve page and transaction data from storage
	var pagevals = [];
	chrome.storage.sync.get(['page1','page2','page3','address','amount','coin','page1class','page2class','page3class','pub_cp','priv_cp'], function(items){
		if (!chrome.runtime.error) {
			pagevals = items;
			callback(pagevals);
		}
	});
}

function load(val){
	//Loads in the page based on saved data, called in the callback for function getpagevals()
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
	pub = val.pub_cp 
	priv = val.priv_cp
	page1.style.display = page1val
	page2.style.display = page2val
	page3.style.display = page3val
	page1.className = page1class
	page2.className = page2class
	page3.className = page3class
	var transactioninfo = 'Address: &nbsp;'+address + '<br/>' +"Amount: &nbsp;"+amount+' &nbsp;&nbsp;&nbsp;&nbsp;'+"Coin: &nbsp;"+coin
	document.getElementById("transactioninfo").innerHTML = transactioninfo;
	if (page3class == 'open'){
		walletdata(pub,priv)
	}
	checkbuttons()
}

function checkbuttonpress1(){
	// Checks for the enter button to be pressed on page 1
	document.getElementById("page1").className='open'
	document.getElementById("page2").className='closed'
	document.getElementById("page3").className='closed'
	document.getElementById("enterbutton1").addEventListener('click',page2)
}

function checkbuttonpress2(){
	// Checks for the enter button to be pressed on page 2
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='open'
	document.getElementById("page3").className='closed'
	console.log('check')
	document.getElementById("enterbutton2").addEventListener('click',page3)
}

function checkcancelpage2(){
	//Checks for the cancel button to be pressed on page 2
	document.getElementById("cancelpage2").addEventListener('click',resetpages)
}

function checkcancelpage3(){
	//Checks for the cancel button to be pressed on page 3
	document.getElementById("cancelpage3").addEventListener('click',resetpages)
}

function resetpages(){
	//Sets the page data and transaction datat back to default
	chrome.storage.sync.set({'page1':'block','page2':'none','page3':'none','address':'','amount':'', 'page1class':'open','page2class':'closed','page3class':'closed'});
	getpagevals(load)
}

function hmac(call,priv){
	// Creating Sha512 HMAC signature Credit: https://github.com/Caligatio/jsSHA Uses the files in src-sha folder
	console.log('test')
	var shaObj = new jsSHA("SHA-512", "TEXT");
	shaObj.setHMACKey(priv, "TEXT");
	shaObj.update(call);
	var hmac = shaObj.getHMAC("HEX");
	getwalletinfo(call,hmac)
}

function walletdata(pub,priv){
	// creates the API call for fetching wallet data and balances
	var call = 'version=1&cmd=balances&key='
	call = call.concat(pub)
	hmac(call,priv)
}

function getwalletinfo(call,hmac) {
	//Makes api call using an HTTP POST call
	//Parses through call result and creates a div of the data to be displayed
	var xhttp = new XMLHttpRequest();
	var HMAC = hmac;
	var params = call
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var responseObj = JSON.parse(this.responseText);
		console.log(responseObj)
		console.log(responseObj.result)
		var coinname = Object.keys(responseObj.result)
		console.log(coinname)
		for (i = 0, len = coinname.length; i < len; i++){
			var result = responseObj.result
			console.log(i)
			console.log(coinname[0])
			var key = coinname[i]
			var coindetails = result[key]
			console.log(coindetails)
			var balance = coindetails.balancef
			var id = 'tempdiv'
			id = id.concat(i+1)
			var temp = new tempwalletinfo('CoinPayments',coinname[i],balance,id,'tempdiv')
			temp.creatediv(balance)
			}
	}
	};
	xhttp.open("POST", "https://www.coinpayments.net/api.php", true);
	xhttp.setRequestHeader('HMAC',HMAC);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
}


function tempwalletinfo(title,coinname,balance,id,divclass){
	this.title = title;
	this.coinname =coinname;
	this.balance = balance;
	this.id = id;
	this.creatediv = function(balance) {
		var p1 = document.createElement("p");
		var divtitle = document.createTextNode(title);
		p1.appendChild(divtitle);
		var p2 = document.createElement("p");
		var name = document.createTextNode(coinname);
		p2.appendChild(name);
		var p3 = document.createElement("p");
		var balance = document.createTextNode(balance);
		p3.appendChild(balance);
		var newdiv = document.createElement('div');
		newdiv.appendChild(p1)
		newdiv.appendChild(p2)
		newdiv.appendChild(p3)
		newdiv.setAttribute('id',id)
		newdiv.setAttribute('class',divclass)
		var page3 = document.getElementById('page3')
		page3.appendChild(newdiv)
	};
}

//Initial Function called
checkload()