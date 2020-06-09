function CaptchaServicesManager()
{
this.validate=function(argument1,successHandler,exceptionHandler)
{
service.postJSON('captchaServices/validate',{
'argument-1': argument1
},
function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
}
var captchaServicesManager=new CaptchaServicesManager();
