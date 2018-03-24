var pub = '679b75dd6cc96fb752487ed55fe55b6d91bae1d866d9cfe25a299a886e8781b3'
var priv = '1041F448865635187cCff5B547691c11F79c8671a3beCddDBE1a1eEd450278aa'
var call = 'version=1&key=679b75dd6cc96fb752487ed55fe55b6d91bae1d866d9cfe25a299a886e8781b3&cmd=rates'
var hmac = 'd992c6561678ba42db2a8b263cd5e08dcae20cd1f90e8c9197caf97c1f3d40630ca9e24a0d952964e2c3f2631f2c0e99db8da33f6073811a2aadb1693af5feb7'

function makecall(call,hmac){
	var xhttp = new XMLHttpRequest();
	var HMAC = hmac;
	var params = call
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var responseObj = JSON.parse(this.responseText);
		console.log(responseObj)
			  }
	};
	xhttp.open("POST", "https://www.coinpayments.net/api.php", true);
	xhttp.setRequestHeader('HMAC',HMAC);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
}

makecall(call,hmac)