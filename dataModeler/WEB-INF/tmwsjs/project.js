function Psp()
{
this.tables=null;
}
function Project()
{
this.code=0;
this.memberCode=0;
this.title="";
this.databaseArchitecture=null;
this.dateOfCreation="";
this.timeOfCreation="";
this.canvasWidth=0.0;
this.canvasHeight=0.0;
this.tables=null;
}
function TMForward()
{
}
function ProjectManager()
{
this.get=function(argument1,successHandler,exceptionHandler)
{
service.postJSON('project/example',{
'argument-1': argument1
},
function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
this.save=function(argument1,successHandler,exceptionHandler)
{
service.postJSON('project/save',{
'argument-1': argument1
},
function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
this.open=function(argument1,successHandler,exceptionHandler)
{
service.postJSON('project/open',{
'argument-1': argument1
},
function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
this.create=function(argument1,argument2,successHandler,exceptionHandler)
{
service.getJSON('project/create?argument-1='+encodeURI(argument1)+'&'+'argument-2='+encodeURI(argument2),null,function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
this.getProject=function(successHandler,exceptionHandler)
{
service.getJSON('project/getProject',null,function(result){
successHandler(result);
},function(exception){
exceptionHandler(exception);
});
}
}
var projectManager=new ProjectManager();
