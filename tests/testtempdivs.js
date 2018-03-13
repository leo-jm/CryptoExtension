function test(){
	document.getElementById('demo').innerHTML = 'test'
}
function parseresponse(){
	responseObj = {
		"error": "ok",
		"result": {
			"BTC": {
				"balance": 10000000,
				"balancef": 0.10000000,
			},
			"XRP":{
				"balance": 1012938,
				"balancef": 101.2938,
			},
			"LTC":{
				"balance": 100000,
				"balancef": 10.923,
			}
		}
	}
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
		var page3 = document.getElementById('test')
		page3.appendChild(newdiv)
	};
}