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
    var page4class = document.getElementById('page4').className
	console.log(page3class)
	if (page4class == 'open'){
	    checkcancelpage4()
		getcalldata(checktransfercall)
	}else{
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
}

function page2(){
	//Function for going to page 2
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='open'
	document.getElementById("page3").className='closed'
    document.getElementById("page4").className='closed'
	var address = document.getElementById("address").value;
	if (address.length != 0) {
			var page1 = document.getElementById("page1");
			var page2 = document.getElementById("page2");
			var page3 = document.getElementById("page3");
            var page4 = document.getElementById('page4');
			var page1val = "none"
			var page2val = "block"
			var page3val = "none"
            var page4val = 'none'
			var page1class = 'closed'
			var page2class = 'open'
			var page3class = 'closed'
            var page4class = 'closed'
		}
		//Saving page and transaction data to storage
    chrome.storage.sync.set({'page1':page1val,'page2':page2val,'page3':page3val,'page4':page4val,'address':address, 'page1class':page1class,'page2class':page2class, 'page3class':page3class,'page4class':page4class});
		getpagevals(load)

}

function page3(){
	//function for going to page 3
	console.log('page3')
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='closed'
	document.getElementById("page3").className='open'
    document.getElementById('page4').className = 'closed'
	console.log(document.getElementById("page3").className)
	var amount = document.getElementById('amount').value;
	var coin = document.getElementById('coin').value;
		if (address.length != 0) {
			if (amount.length != 0){
				var page1 = document.getElementById("page1");
				var page2 = document.getElementById("page2");
				var page3 = document.getElementById("page3");
                var page4 = document.getElementById('page4');
				var page1val = "none"
				var page2val = "none"
				var page3val = "block"
                var page4val = 'none'
				var page1class = 'closed'
				var page2class = 'closed'
				var page3class = 'open'
                var page4class = 'closed'
			}
		}
		//Saving page and transaction data to storage
    chrome.storage.sync.set({'page1':page1val,'page2':page2val, 'page3':page3val,'page4':page4val, 'amount':amount, 'coin':coin,'page1class':page1class,'page2class':page2class, 'page3class':page3class,'page4class':page4class});
		getpagevals(load)
}

function page4(){
	//function for going to page 4
	console.log('page4')
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='closed'
	document.getElementById("page3").className='closed'
    document.getElementById('page4').className = 'open'
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");
    var page4 = document.getElementById('page4');
    var page1val = "none"
    var page2val = "none"
    var page3val = "none"
    var page4val = 'block'
    var page1class = 'closed'
    var page2class = 'closed'
    var page3class = 'closed'
    var page4class = 'open'
		//Saving page and transaction data to storage
    chrome.storage.sync.set({'page1':page1val,'page2':page2val, 'page3':page3val,'page4':page4val,'page1class':page1class,'page2class':page2class, 'page3class':page3class,'page4class':page4class});
	getpagevals(load)
}

function getpagevals(callback){
	//Retrieve page and transaction data from storage
	var pagevals = [];
	chrome.storage.sync.get(['page1','page2','page3','page4','address','amount','coin','page1class','page2class','page3class','page4class'], function(items){
		if (!chrome.runtime.error) {
			pagevals = items;
			callback(pagevals);
		}
	});
}

function getkeyvals(callback){
	var keyvals = [];
	chrome.storage.sync.get(['keys','keyname','address','coin','amount'],function(items){
		if(!chrome.runtime.error){
			keyvals = items;
			callback(keyvals);
		};
	});
}


function load(val){
	//Loads in the page based on saved data, called in the callback for function getpagevals()
	if(val.page1 == undefined){
		resetpages()
	}else{
	var page1val = 'base'
	var page2val = 'base'
	var page3val = 'base'
    var page4val = 'base'
	var page1val = val.page1
	var page2val = val.page2
	var page3val = val.page3
    var page4val = val.page4
	var page1class = val.page1class
	var page2class = val.page2class
	var page3class = val.page3class
    var page4class = val.page4class
	var page1 = document.getElementById("page1");
	var page2 = document.getElementById("page2");
	var page3 = document.getElementById("page3");
    var page4 = document.getElementById("page4");
    var address = val.address
	var amount = val.amount
	var coin = val.coin
	page1.style.display = page1val
	page2.style.display = page2val
	page3.style.display = page3val
    page4.style.display = page4val
	page1.className = page1class
	page2.className = page2class
	page3.className = page3class
    page4.className = page4class
	var transactioninfo = 'Address: <br>'+address + '<br/>' +"Amount: &nbsp;"+amount+'<br>'+"Coin: &nbsp;"+coin
	document.getElementById("transactioninfo").innerHTML = transactioninfo;
	if (page3class == 'open'){
		getkeyvals(sortkeyvals)
	}
	checkbuttons()
	/*
	if (page4class == 'open){
		
	}
	else{
		checkbuttons()
	}*/
	}
}

function sortkeyvals(val){
	console.log(val.keys)
	val = val.keys
	for (i = 0; i < val.length; i++){
		console.log(val[i])
		key = val[i]
		if (key[0] == 'cp1'){
			var keyname = key[0]
			var pub = key[1]
			var priv = key[2]
			walletdata(pub,priv,keyname)
		}else{
			var test = document.getElementById('test').innerHTML
			test += key
			document.getElementById('test').innerHTML = test;
		}
	}

}

function checkbuttonpress1(){
	// Checks for the enter button to be pressed on page 1
	document.getElementById("page1").className='open'
	document.getElementById("page2").className='closed'
	document.getElementById("page3").className='closed'
    document.getElementById("page4").className='closed'
	document.getElementById("enterbutton1").addEventListener('click',page2)
}

function checkbuttonpress2(){
	// Checks for the enter button to be pressed on page 2
	document.getElementById("page1").className='closed'
	document.getElementById("page2").className='open'
	document.getElementById("page3").className='closed'
    document.getElementById("page4").className='closed'
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

function checkcancelpage4(){
	//Checks for the cancel button to be pressed on page 4
	document.getElementById("cancelpage4").addEventListener('click',resetpages)
}


function resetpages(){
	//Sets the page data and transaction datat back to default
	var element1 = document.getElementById('tempdivpage3')
	var element2 = document.getElementsByClassName('tempdiv')
	for (var i = 0; i < element2.length; i++){
			element1.removeChild(element2[i])
	}
    chrome.storage.sync.set({'page1':'block','page2':'none','page3':'none','page4':'none','address':'','amount':'', 'page1class':'open','page2class':'closed','page3class':'closed','page4class':'closed'});
	getpagevals(load)
}

function hmac(call,priv,keyname){
	// Creating Sha512 HMAC signature Credit: https://github.com/Caligatio/jsSHA Uses the files in src-sha folder
	console.log('test')
	var shaObj = new jsSHA("SHA-512", "TEXT");
	shaObj.setHMACKey(priv, "TEXT");
	shaObj.update(call);
	var hmac = shaObj.getHMAC("HEX");
	getwalletinfo(call,hmac,keyname)
}

function walletdata(pub,priv,keyname){
	// creates the API call for fetching wallet data and balances
	var call = 'version=1&cmd=balances&key='
	call = call.concat(pub)
	hmac(call,priv,keyname)
}

function getwalletinfo(call,hmac,keyname) {
	//Makes api call using an HTTP POST call
	//Parses through call result and creates a div of the data to be displayed
	var xhttp = new XMLHttpRequest();
	var HMAC = hmac;
	var params = call
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var responseObj = JSON.parse(this.responseText);
		var coinname = Object.keys(responseObj.result)
		for (i = 0, len = coinname.length; i < len; i++){
			var result = responseObj.result
			var key = coinname[i]
			var coindetails = result[key]
			var balance = coindetails.balancef
			var id = 'tempdiv'
			id = id.concat(i+1)
			var temp = new tempwalletinfo('CoinPayments',coinname[i],balance,id,'tempdiv',keyname)
			temp.creatediv(balance,keyname)
			}
	}
	};
	xhttp.open("POST", "https://www.coinpayments.net/api.php", true);
	xhttp.setRequestHeader('HMAC',HMAC);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
}


function hover(){
	//change css for when the temp div is hovered
   this.className='tempdivhover'
}

function unhover(){
	//changej css for when the temp div is unhovered
    this.className = 'tempdiv'
}

function chosen(){
    console.log(this)
	var keyname = this.getElementsByClassName('keyname')
	keyname = keyname[0]
	keyname = keyname.innerHTML
    console.log(keyname)
    chrome.storage.sync.set({'keyname':keyname});
    var keysort = function (val){
        console.log(val)
		var keys = val.keys
        var keyname = val.keyname
        var amount = val.amount
        var address = val.address
        var coin = val.coin
        console.log(keyname)
		keylist = []
		for (i = 0; i < keys.length; i++){
            var key = keys[i]
            console.log(key)
            console.log(keyname)
            if (key[0] == keyname){
                var pub = key[1]
                var priv = key[2]
              setuptransfercall(pub,priv,address,amount,coin)  
        }
	}
		
	}
	getkeyvals(keysort)
}

function tempwalletinfo(title,coinname,balance,id,divclass,keyname){
	this.title = title;
	this.coinname =coinname;
	this.balance = balance;
	this.id = id;
	this.divclass = divclass;
    this.keyname = keyname;
	console.log(name)
	this.creatediv = function(balance,keyname) {
		var p1 = document.createElement("p");
		var divtitle = document.createTextNode(title);
		p1.appendChild(divtitle);
		var p2 = document.createElement("p");
		var name = document.createTextNode(coinname);
		p2.appendChild(name);
		var p3 = document.createElement("p");
		var balance = document.createTextNode(balance);
		p3.appendChild(balance);
		var p4 = document.createElement("p");
		var keyname = document.createTextNode(keyname);
		p4.appendChild(keyname)
		p4.setAttribute('class','keyname')
		p4.setAttribute('style','display:none')
        /*
        var button = document.createElement('button');
        var buttonid = id.concat('button')
        var buttonwords = document.createTextNode('test')
        button.appendChild(buttonwords)
        button.setAttribute('id',buttonid)
        */
		var newdiv = document.createElement('div');
		newdiv.appendChild(p1);
		newdiv.appendChild(p2);
		newdiv.appendChild(p3);
		newdiv.appendChild(p4);
        //newdiv.appendChild(button)
		newdiv.setAttribute('id',id);
		newdiv.setAttribute('class',divclass);
		var page3 = document.getElementById('tempdivpage3');
		page3.appendChild(newdiv);
        newdiv.onmouseover = hover;
        newdiv.onmouseout = unhover;
        newdiv.onclick = chosen;
	};
}

function setuptransfercall(pub,priv,address,amount,coin){
    var temp = pub + priv + address + amount + coin
	chrome.storage.sync.set({'calldata':[pub,priv,address,amount,coin]});
    console.log(temp)
	getcalldata(checktransfercall)
}

function getcalldata(callback){
	var calldata = [];
	chrome.storage.sync.get(['calldata','page4class'],function(items){
		if(!chrome.runtime.error){
			calldata = items;
			callback(calldata);
		};
	});
}

function checktransfercall(calldata){
	console.log(calldata)
	var page4class = calldata.page4class
	calldata = calldata.calldata
	var pub = calldata[0]
	var priv = calldata[1]
	var address = calldata[2]
	var amount = calldata[3]
	var coin = calldata[4]
	document.getElementById('confirm').innerHTML ='<br>You are about to send ' + amount +' '+ coin + ' to ' + address 
	if (page4class == 'closed'){
		page4()
	}else{
		document.getElementById('enterbutton3').addEventListener('click',confirmed)
	}
}

function confirmed(){
	getcalldata(parsecalldata)
}

function parsecalldata(calldata){
		calldata = calldata.calldata
		var pub = calldata[0]
		var priv = calldata[1]
		var address = calldata[2]
		var amount = calldata[3]
		var coin = calldata[4]
		buildcall(pub,address,amount,coin,priv)
}

function buildcall(pub,address,amount,coin,priv){
		var call = 'cmd=create_withdrawal&amount='+amount+'&currency='+coin+'&address='+address
		console.log(call)
		transferhmac(call,priv)
}
	
function transferhmac(call,priv){
		var shaObj = new jsSHA("SHA-512", "TEXT");
		shaObj.setHMACKey(priv, "TEXT");
		shaObj.update(call);
		var hmac = shaObj.getHMAC("HEX");
		console.log(call)
		console.log(hmac)
}

function makecall(call,hmac){
	var xhttp = new XMLHttpRequest();
	var HMAC = hmac;
	var params = call
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var responseObj = JSON.parse(this.responseText);
		var result = responseObj.result
		var transferstatus = result['status']
	}
	};
	xhttp.open("POST", "https://www.coinpayments.net/api.php", true);
	xhttp.setRequestHeader('HMAC',HMAC);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
}

function options(){
	var options = document.getElementsByClassName('optionsbutton');
	for(i = 0; i < options.length; i++){
		options[i].onclick = function() {
			var settingspage = chrome.runtime.getURL('settings.html')
			var createProperties = {url:settingspage}
			chrome.tabs.create(createProperties)
		}
	}
}

//Initial Function called
options()
checkload()