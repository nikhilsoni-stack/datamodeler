function TMForward()
{
}
function Member()
{
this.emailId="";
this.password="";
this.firstName="";
this.lastName="";
this.mobileNumber="";
}
function MemberServiceManager()
{
this.logout=function(successHandler,exceptionHandler)
{
service.getJSON('memberService/logout',null,function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
this.login=function(argument1,argument2,successHandler,exceptionHandler)
{
service.postJSON('memberService/login',{
'argument-1': argument1,
'argument-2': argument2
},
function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
this.createMember=function(argument1,successHandler,exceptionHandler)
{
service.postJSON('memberService/createMember',{
'argument-1': argument1
},
function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
}
var memberServiceManager=new MemberServiceManager();
