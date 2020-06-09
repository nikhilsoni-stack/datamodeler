var DEFAULT_HEIGHT=150;
var DEFAULT_WIDTH=180;
var tableFlag=0;
var tableComponents=[];
var selectedTable=null;
var selectedTableIndex=-1;
var sno=0;
var canvas=null;
var context=null;
var currProject=null
function selectedDataType()
{
}

function drawFlag()
{
//var canvas = document.getElementById("myCanvas");
tableFlag=1;
projectManager.getProject(function(s)
{
currProject=s;
},function(x)
{

});
}
function createTable(event)
{
var tableComponent=null;
var databaseTable=null;
var drawableTable=null;

if(tableFlag)
{
tableFlag=0;
var x = event.x;
var y = event.y;
//var canvas = document.getElementById("myCanvas");
x -= canvas.offsetLeft;
y -= canvas.offsetTop;
// table ke name ka loop
var databaseTable=new DatabaseTable("table");
databaseTable.xcor=x;
databaseTable.ycor=y;
var drawableTable=new DrawableTable(x,y,databaseTable);
drawableTable.height=DEFAULT_HEIGHT;
drawableTable.width=DEFAULT_WIDTH;
var tableComponent=new TableComponent(databaseTable,drawableTable);
tableComponents.push(tableComponent);
//var context = canvas.getContext("2d");
context.font = "30px Arial";
var metrix = context.measureText("table");
var width=metrix.width;
context.rect(x, y,DEFAULT_WIDTH,DEFAULT_HEIGHT );
context.stroke();
context.closePath();
context.fillText("Table1", x+(DEFAULT_WIDTH-width)/2, y+25);
context.beginPath();
context.moveTo(x,y+25)
context.lineTo(x+DEFAULT_WIDTH,y+25);
context.stroke();
context.closePath();
}
}

function getTable(event)
{
var p,x,y,width,height,flag=0; 
for(p=0; tableComponents.length>p;p++)
{
x=tableComponents[p].drawableTable.x;
y=tableComponents[p].drawableTable.y;
width=tableComponents[p].drawableTable.width;
height=tableComponents[p].drawableTable.height;
//var canvas = document.getElementById("myCanvas");
if(x<=(event.x-canvas.offsetLeft) &&(event.x-canvas.offsetLeft)<=(x+width) && y<=(event.y-canvas.offsetTop) &&(event.y-canvas.offsetTop)<=(y+height))
{
selectedTable=tableComponents[p];
selectedTableIndex=p;
flag=1;
}
}

if(flag)
{
flag=0;
$("#myTable tbody tr").remove();
sno=0;
var row,col1,col2,col3,col4,col5,col6,col7,col8;
var databaseTable=selectedTable.databaseTable;
var createTableModal=$("#createTableModal");
createTableModal.find("input[name=nameOfTable]").val(databaseTable.name);
//createTableModal.find("#engine").val();
if(databaseTable.engine!=null && databaseTable.engine.name.length!=0) createTableModal.find("engine").val(databaseTable.engine.name);
else
{
document.getElementById("engine").selectedIndex = "0";
}
var tableNote=$("textarea#note").val(databaseTable.note);

var field;
var attribute="";

for(var pp=0 ;databaseTable.fields!=null && pp<databaseTable.fields.length;pp++)
{
field=databaseTable.fields[pp];
atrribute="";
if(field.isNotNull) attribute=attribute+"NN ";
if(field.isAutoIncrement) attribute=attribute+"AI ";
if(field.isPrimaryKey)attribute=attribute+"PK ";
if(field.isUnique)attribute=attribute+"UK ";
row = $("<tr id='row'+(pp+1)></tr>");
col1 = $("<td>"+(pp+1)+"</td>");
col2 = $("<td>"+field.name+"</td>");
col3 = $("<td>"+field.datatype.datatype+"</td>");
col4=$("<td>"+attribute+"</td>"); 
col5 = $("<td>"+field.defaultValue+"</td>");
col6 = $("<td>"+field.numberOfDecimalPlaces+"</td>");
col7 = $("<td>"+field.checkConstraints+"</td>");
col8=$("<td><a href='#' onclick='editRow(row+(pp+1))'>edit</a> <a href='#' onclick='delete(row+(pp+1))'>delete</a></td>"); 
row.append(col1,col2,col3,col4,col5,col6,col7,col8).appendTo("#myTable"); 
sno=pp;
}



//done done


$("#createTableModal").modal({backdrop:'static',keyboard:false});
}
}

function addField()
{
var fieldForm=$("#addFieldForm");
var fieldName=fieldForm.find("input[name=fieldName]");

var databaseTable=selectedTable.databaseTable;
var tableFields=selectedTable.databaseTable.fields;
var p;
if(fieldName.val().length==0)
{
fieldName.addClass("is-invalid");
return;
}

for(p=0;tableFields!=null && p<tableFields.length;p++)
{
if(tableFields[p].name==fieldName.val())
{
fieldName.addClass("is-invalid");
return;
}
} 

var fieldDataType=fieldForm.find("#fieldDatatype").find(":selected").text();
var width=parseInt(fieldForm.find("input[name=fieldWidth]").val());
var defaultValue=fieldForm.find("input[name=defaultValue]").val();
var precision=parseInt(fieldForm.find("input[name=precisionValue]").val());
var nn=fieldForm.find("input[name=notNull]").prop('checked') == true;
var uk=fieldForm.find("input[name=uniqueKey]").prop('checked') == true;
var pk=fieldForm.find("input[name=primaryKey]").prop('checked') == true;
var ai=fieldForm.find("input[name=autoIncrement]").prop('checked') == true;
var check=fieldForm.find("input[name=fieldCheck]").val()
var fieldNote=fieldForm.find("input[name=fieldNote]").val()
var attribute="";
if(nn) attribute=attribute+"NN ";
if(ai) attribute=attribute+"AI ";
if(pk)attribute=attribute+"PK ";
if(uk)attribute=attribute+"UK ";
var x=generateNumber();
var row,col1,col2,col3,col4,col5,col6,col7,col8;
row = $("<tr id='row'+x></tr>");
col1 = $("<td>"+x+"</td>");
col2 = $("<td>"+fieldName.val()+"</td>");
col3 = $("<td>"+fieldDataType+"</td>");
col4=$("<td>"+attribute+"</td>"); 
col5 = $("<td>"+defaultValue+"</td>");
col6 = $("<td>"+precision+"</td>");
col7 = $("<td>"+check+"</td>");
col8=$("<td><a href='#' onclick='editRow(row+x)'>edit</a> <a href='#' onclick='delete(row+x)'>delete</a></td>"); 
row.append(col1,col2,col3,col4,col5,col6,col7,col8).appendTo("#myTable"); 

var field=new DatabaseTableField()
for(var xx=0;xx<currProject.databaseArchitecture.datatypes.length;xx++)
{
if(currProject.databaseArchitecture.datatypes[xx].datatype==fieldDataType)
{
field.datatype=currProject.databaseArchitecture.datatypes[xx];
}
}
field.width=width;
field.numberOfDecimalPlaces=precision;
field.name=fieldName.val();
field.isNotNull=nn
field.isPrimaryKey=pk
field.isAutoIncrement=ai
field.checkConstraints=check;
field.isUnique=uk
field.defaultValue=defaultValue;
field.note=fieldNote;
selectedTable.databaseTable.fields.push(field);

fieldForm.find("input[name=fieldName]").removeClass("is-invalid");
fieldForm.find("input[name=fieldName]").val("");
fieldForm.find("input[name=fieldWidth]").val("");
fieldForm.find("input[name=defaultValue]").val("");
fieldForm.find("input[name=precisionValue]").val("");
fieldForm.find("input[name=notNull]").val("");
fieldForm.find("#notNull").prop('checked',false);
fieldForm.find("input[name=uniqueKey]").prop('checked',false) ;
fieldForm.find("input[name=primaryKey]").prop('checked',false) ;
fieldForm.find("input[name=autoIncrement]").prop('checked',false);
fieldForm.find("input[name=fieldCheck]").val("");
fieldForm.find("input[name=fieldNote]").val("");
}
function generateNumber()
{
sno=sno+1;
return sno;
}
function draw()
{
var i;
for (i = 0; i < tableComponents.length; i++) 
{ 
  tableComponents[i].draw();
}
}



function DatabaseTable(x)
{
this.name=x;
this.note="";
this.code=0;
this.engine=null;
this.fields=[];
this.numberOfFields=0;
this.xcor=0.0;
this.ycor=0.0;
}
function DrawableTable(xcor,ycor,databaseTable)
{
this.x=xcor;
this.y=ycor;
this.width=0;
this.height=0;
this.databaseTable=databaseTable;
var THIS=this;
this.draw=function()
{
var textHeight,texWidth,maxWidth,maxHeight,tmp;
maxWidth=0;
maxHeight=0;
var text=databaseTable.name;
//var canvas=document.getElementById("myCanvas");
//var context=canvas.getContext("2d");
context.clearRect(THIS.x-1,THIS.y-1,THIS.width+2,THIS.height+2);
context.closePath()
context=canvas.getContext("2d");
context.beginPath()
context.font="30px Times";
var field=null;
var textMetrics=context.measureText(text);
if(maxWidth<textMetrics.width) maxWidth=textMetrics.width;
tmp=35;
for(var i=0;i<databaseTable.fields.length;i++)
{
field=databaseTable.fields[i];
text=field.name;

text+=" "+field.datatype.datatype;
if(field.width>0) text+="("+field.width+")";
if(field.isNotNull) text+=" NN";
if(field.isUnique) text+=" UK";
if(field.isPrimaryKey) text+=" PK";
if(field.isAutoIncrement) text+=" Auto";
textMetrics=context.measureText(text)
if(maxWidth<textMetrics.width) maxWidth=textMetrics.width;
tmp+=30;
context.fillText(text,THIS.x+5,THIS.y+tmp)
}
THIS.width=maxWidth+15;
THIS.height=tmp+10;
context.closePath();
context.rect(THIS.x,THIS.y,THIS.width,THIS.height);
context.stroke();
context.beginPath();
context.moveTo(THIS.x,THIS.y+35);
context.lineTo(THIS.x+THIS.width,THIS.y+35);
context.stroke();
context.closePath();
textMetrics=context.measureText(databaseTable.name);
context.fillText(databaseTable.name,THIS.x+(THIS.width-textMetrics.width)/2,THIS.y+25);
context.closePath();
};

}
function DatabaseTableField()
{
this.code=0;
this.name="";
this.datatype=null;
this.width=0;
this.numberOfDecimalPlaces=0;
this.isPrimaryKey=false;
this.isAutoIncrement=false;
this.isUnique=false;
this.isNotNull=false;
this.defaultValue="";
this.checkConstraints="";
this.note="";
}
function TableComponent(databaseTable,drawableTable)
{
this.databaseTable=databaseTable;
this.drawableTable=drawableTable;
this.draw=function(){
drawableTable.draw();
};
}
function attachEvents()
{
canvas = document.getElementById("myCanvas");
context=canvas.getContext("2d");
canvas.addEventListener("mousedown", createTable);
canvas.addEventListener("dblclick",getTable,false);
$("#createTableModal").on("hidden.bs.modal",function()
{
var createTableModal=$("#createTableModal");
var tableName=createTableModal.find("input[name=nameOfTable]");
var engine=createTableModal.find("#engine").find(":selected").text();
var tableNote=$("textarea#note").val();
var xx;
var count;
for(xx=0;xx<tableComponents.length;xx++)
{
if(tableComponents[xx].databaseTable.name==tableName.val())
{
//count=parseInt(tableComponents[xx].databaseTable.name.substring(tableComponents[xx].databaseTable.name.length-1));
createTableModal.find("#tableNameError").val("name already exists");
count=1;
}
}
if(count!=1)
{
if(tableName.val().length!=0)selectedTable.databaseTable.name=tableName.val();
}

for(var jj=0;jj<currProject.databaseArchitecture.databaseEngines.length;jj++)
{

if(currProject!=null && currProject.databaseArchitecture.databaseEngines[jj].name==engine)
{
selectedTable.databaseTable.engine=currProject.databaseArchitecture.databaseEngines[jj];
break;
}
}
selectedTable.databaseTable.note=tableNote;
selectedTable.draw();
});
}
//////////////////////////
function Datatype()
{
this.code=0;
this.datatype="";
this.maxWidth=0;
this.defaultSize=0;
this.maxWidthOfPrecision=0;
this.allowAutoIncrement=true;
this.databaseArchitectureCode=0;
}

function DatabaseEngine()
{
this.code=0;
this.name="";
this.databaseArchitectureCode=0;
}
function DatabaseArchitecture()
{
this.code=0;
this.name="";
this.datatypes=null;
this.databaseEngines=null;
}


/////////////////////////////
function save()
{  
delete currProject.canvaseWidth;
currProject.canvasWidth=canvas.width;
currProject.canvasHeight=canvas.height;
currProject.tables=[];
tables=currProject.tables;
var databaseTable=new DatabaseTable();
var databaseTableField=new DatabaseTableField();
var tmpTable;
var tmpDrawableTable;

for(var i=0; i<tableComponents.length;i++)
{
currProject.tables.push(tableComponents[i].databaseTable);
}


projectManager.save(currProject,function(success){alert(success);},function(sss){});
}
//////////////////////
function openProject()
{
var openProjectModal=$("#openProjectModal");
var projectCode=openProjectModal.find("#projectList").find(":selected").val();
projectManager.open(projectCode,function(project)
{
if(project==null) return;
tableComponents=[];
var databaseTable;
var drawableTable;
var tableComponent=null;
currProject=project;
for(var x=0;x<project.tables.length;x++)
{
databaseTable=project.tables[x];
drawableTable=new DrawableTable(databaseTable.xcor,databaseTable.ycor,databaseTable);
tableComponent=new TableComponent(databaseTable,drawableTable);
tableComponents.push(tableComponent);
}
for(var j=0;j<tableComponents.length;j++)
{
tableComponents[j].draw();
}


},function(exception)
{
alert(exception);
});

}










/////////////////////////
window.addEventListener('load',attachEvents);

