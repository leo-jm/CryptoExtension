transferstatus = 1
var demo = document.getElementById('demo')

if (transferstatus == '0'|| transferstatus == '1.0'){
	demo.innerHTML = '1'
 }
else{
  if (transferstatus == '1'){
	demo.innerHTML='2'
}
}