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
	document.getElementById('enterbutton1').addEventListener('click',cpgetkeyvals)
}

function checkentercb(){
	document.getElementById('enterbutton2').addEventListener('click',entercb)
}

function getkeyvals(callback){
	var keyvals = [];
	chrome.storage.sync.get(['keys'],function(items){
		if(!chrome.runtime.error){
			keyvals = items;
			callback(keyvals);
		};
	});
}

function cpgetkeyvals(){
	getkeyvals(entercp)
}

function entercp(vals){
	console.log(vals);
	var keys = vals.keys
	console.log(keys)
    if (keys == undefined){
        console.log(keys)
        var pub = document.getElementById('pub_key').value
        var priv = document.getElementById('priv_key').value
        if (pub.length != 0 && priv.length != 0){
            document.getElementById('demo').innerHTML = keys
            console.log(keys)
            chrome.storage.sync.set({'keys':[['cp1',pub,priv]]});
            //['cp1',pub,priv],['cp2',pub,priv]
        }
    }else{
        var len = keys.length
        len = len - 1
        var lastkey = keys[len]
        console.log(lastkey)
        var keyid = lastkey[0]
        console.log(keyid)
        var keyidnum = Number(keyid[2])
        var nextidnum = keyidnum+1
        console.log(keyidnum)
        var newkeyid = keyid[0]+ keyid[1]+ nextidnum
        var pub = document.getElementById('pub_key').value
        var priv = document.getElementById('priv_key').value
        var newkey = [newkeyid,pub,priv]
        keys.push(newkey)
        //var pub = document.getElementById('pub_key').value
        //var priv = document.getElementById('priv_key').value
        if (pub.length != 0 && priv.length != 0){
            document.getElementById('demo').innerHTML = keys
            console.log(keys)
            chrome.storage.sync.set({'keys':keys});
            //['cp1',pub,priv],['cp2',pub,priv]
            //chrome.storage.sync.set({'pub_cp':pub,'priv_cp':priv});
        }
    }
}


function entercb(){
	document.getElementById('demo').innerHTML = 'entercb'
}
coinpayments()
check()