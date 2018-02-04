function myFunction() {
	var x = document.getElementById("address").value;
	if (x.length != 0) {
		document.getElementById("demo").innerHTML = x;
	}	
	}
function page2(){
	var x = document.getElementById("address").value;
	/*chrome.tab.executeScript({*/
		if (x.length != 0) {
			var page1 = document.getElementById("page1");
			var page2 = document.getElementById("page2");
			page1.style.display = "none"
			page2.style.display = "block"
			/*window.location.href='popup2.html';*/
			/*
				var page1 = document.getElementById("page1");
				var page2 = document.getElementById("page2");
				page1.style.display = "none"
				page2.style.display = "block"
			*/	
	}
/*});*/
}
