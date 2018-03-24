function checkpage(){
	var enterkeys = document.getElementById('enterkeys').style.display
	var managekeys = document.getElementById('managekeys').style.display
	if (enterkeys == 'block'){
		coinpayments()
		check()
	}else{
		if (managekeys == 'block'){
			getkeyvals(sortkeys)
		}
	}
}

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
	chrome.storage.sync.get(['keys','removekey'],function(items){
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
    if (keys.length == 0 || keys == undefined){
        console.log(keys)
        var pub = document.getElementById('pub_key').value
        var priv = document.getElementById('priv_key').value
        if (pub.length != 0 && priv.length != 0){
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

function sortkeys(vals){
	var keys = vals.keys
	if (keys.length == 0 || keys == undefined){
        document.getElementById('nokeys').innerHTML = 'You have no keys! Click Enter Keys to add some.'
    }else{
		document.getElementById('nokeys').innerHTML = ''
        var len = keys.length
        for (i=0; i<len; i++){
			var key = keys[i]
			var keyid = key[0]
			if (keyid[0,1] = 'cp'){
				var pub = key[1]
				var id = 'tempdiv'.concat(i+1)
				var wallet = 'Coinpayments'
				var divclass = 'tempdiv'
				var temp = new tempkeyinfo(wallet,pub,keyid,id,divclass)
				temp.creatediv(keyid)
			}
		}
    }
}

function deletetempdivs(){
	chrome.storage.sync.set({'removekey':''});
	var element1 = document.getElementById('managekeysdata')
	var element2 = document.querySelectorAll('.tempdiv,.tempdivhover')
	var length = element2.length
	for (var i = length - 1; i >= 0; i--){
		element1.removeChild(element2[i])
	}
}

function tempkeyinfo(wallet,pub,keyid,id,divclass){
	this.wallet = wallet
	this.pub = 'public key '+pub
	this.divclass = divclass
	this.id = id
	this.keyid = keyid
	this.creatediv = function(keyid){
		var p1 = document.createElement("p");
		var divtitle = document.createTextNode(wallet);
		p1.appendChild(divtitle);
		var p2 = document.createElement("p");
		var key = document.createTextNode(pub);
		p2.appendChild(key);
		var p3 = document.createElement("p");
		var keyid = document.createTextNode(keyid);
		p3.appendChild(keyid)
		p3.setAttribute('class','keyid')
		p3.setAttribute('style','display:none')
		var newdiv = document.createElement('div');
		newdiv.appendChild(p1);
		newdiv.appendChild(p2);
		newdiv.appendChild(p3);
		newdiv.setAttribute('id',id);
		newdiv.setAttribute('class',divclass);
		var managekeyspage = document.getElementById('managekeysdata');
		managekeyspage.appendChild(newdiv);
		var element1 = document.getElementById('managekeysdata')
		var element2 = document.getElementsByClassName('tempdiv')
		newdiv.onclick = toggle;
	}
}

function toggle(){
	var currentclass = this.className
	var keyid = this.getElementsByClassName('keyid')
	console.log(keyid)
	keyid = keyid[0]
	console.log(keyid)
	keyid = keyid.innerHTML
	console.log(keyid)
	if (currentclass == 'tempdiv'){
		var otherchosen = document.getElementsByClassName('tempdivhover')
		if (otherchosen.length != 0){
		otherchosen[0].className = 'tempdiv'
		this.className = 'tempdivhover'
		console.log(keyid)
		chrome.storage.sync.set({'removekey':keyid});
		}else{
			this.className = 'tempdivhover'
			console.log(keyid)
			chrome.storage.sync.set({'removekey':keyid});
		}
	}else{
		if(currentclass == 'tempdivhover'){
			this.className = 'tempdiv'
			chrome.storage.sync.set({'removekey':''});
	}
	}
}
function removekey(){
	getkeyvals(function(val){
		console.log(val)
		var removekey = val.removekey
		var keys = val.keys
		for (i=0;i<keys.length;i++){
			var key = keys[i]
			var id = key[0]
			console.log(id)
			if (id == removekey){
				keys.splice(i,1)
				break
			}
		}
		for (i=0;i<keys.length;i++){
			var key = keys[i]
			key[0] = 'cp'.concat(i+1)
		}
		chrome.storage.sync.set({'keys':keys});
		deletetempdivs()
		getkeyvals(sortkeys)
	})
}


function botbar(){
	document.getElementById('enterkeysbutton').addEventListener('click',enterkeyspage)
	document.getElementById('managekeysbutton').addEventListener('click',managekeyspage)
}

function enterkeyspage(){
	document.getElementById('enterkeys').style.display = 'block'
	document.getElementById('managekeys').style.display = 'none'
	deletetempdivs()
	checkpage()
}
function managekeyspage(){
	document.getElementById('enterkeys').style.display = 'none'
	document.getElementById('managekeys').style.display = 'block'
	document.getElementById('removebutton').addEventListener('click',removekey)
	checkpage()
}
botbar()
checkpage()
