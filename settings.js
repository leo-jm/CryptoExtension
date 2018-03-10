function coinpayments(){
	var coinpayments = document.getElementById('coinpayments')
	var coinbase = document.getElementById('coinbase')
	coinpayments.style.display = 'block'
	coinbase.style.display = 'none'
	coinpayments.className = 'open'
	coinbase.className = 'closed'
	checkentercp()
	check()
}

function coinbase(){
	var coinpayments = document.getElementById('coinpayments')
	var coinbase = document.getElementById('coinbase')
	coinpayments.style.display = 'none'
	coinbase.style.display = 'block'
	coinpayments.className = 'closed'
	coinbase.className = 'open'
	checkentercb()
	check()
}

function choosewallet(){
	console.log('test1')
	var wallet = document.getElementById('wallet').value;
	if (wallet == 'coinpayments'){
		coinpayments()
	}else{
		if (wallet == 'coinbase'){
			coinbase()
		}
	}
}

function check(){
	document.getElementById('wallet').addEventListener('change',choosewallet)
}

function checkentercp(){
	document.getElementById('enterbutton1').addEventListener('click',entercp)
}

function checkentercb(){
	document.getElementById('enterbutton2').addEventListener('click',entercb)
}

function entercp(){
	var pub = document.getElementById('pub_key').value
	var priv = document.getElementById('priv_key').value
	if (pub.length != 0 && priv.length != 0){
		document.getElementById('demo').innerHTML = pub + priv
		chrome.storage.sync.set({'pub_cp':pub,'priv_cp':priv});
	} 
}

function entercb(){
	document.getElementById('demo').innerHTML = 'entercb'
}
coinpayments()
check()