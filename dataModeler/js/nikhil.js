var DEFAULT_HEIGHT=150;
var DEFAULT_WIDTH=180;
var tableFlag=0;
var tableComponents=[];
var selectedTable=null;
var selectedTableIndex=-1;
var sno=0;
var canvas=null;
var context=null;
function selectedDataType()
{
}

function drawFlag()
{
//var canvas = document.getElementById("myCanvas");
tableFlag=1;
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
alert(databaseTable.engine);
if(databaseTable.engine.length!=0)createTableModel.find("engine").val(databaseTable.engine);
else
{
document.getElementById("engine").selectedIndex = "0";
}
var tableNote=$("textarea#note").val(databaseTable.note);

var field;
var attribute="";
for(var pp=0 ;pp<databaseTable.fields.length;pp++)
{
field=databaseTable.fields[pp];
atrribute="";
if(field.nn) attribute=attribute+"NN ";
if(field.ai) attribute=attribute+"AI ";
if(field.pk)attribute=attribute+"PK ";
if(field.uk)attribute=attribute+"UK ";
row = $("<tr id='row'+(pp+1)></tr>");
col1 = $("<td>"+(pp+1)+"</td>");
col2 = $("<td>"+field.fieldName+"</td>");
col3 = $("<td>"+field.fieldDataType+"</td>");
col4=$("<td>"+attribute+"</td>"); 
col5 = $("<td>"+field.defaultValue+"</td>");
col6 = $("<td>"+field.numberOfDecimalPlaces+"</td>");
col7 = $("<td>"+field.check+"</td>");
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
var tableFields=databaseTable.fields;
var p;
if(fieldName.val().length==0)
{
fieldName.addClass("is-invalid");
return;
}

for(p=0;p<tableFields.length;p++)
{
if(tableFields[p].fieldName==fieldName.val())
{
fieldName.addClass("is-invalid");
return;
}
} 

var fieldDataType=fieldForm.find("#fieldDatatype").find(":selected").text();
var width=fieldForm.find("input[name=fieldWidth]").val();
var defaultValue=fieldForm.find("input[name=defaultValue]").val();
var precision=fieldForm.find("input[name=precisionValue]").val();
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

field.fieldDataType=fieldDataType
field.width=width
field.numberOfDecimalPlaces=precision;
field.fieldName=fieldName.val();
field.nn=nn
field.pk=pk
field.ai=ai
field.check=check
field.isUnique=uk
field.defaultValue=defaultValue;
field.note=fieldNote;

tableFields.push(field);

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
this.engine="";
this.fields=[]
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
text=field.fieldName;
text+=" "+field.fieldDataType;
if(field.width>0) text+="("+field.width+")";
if(field.nn) text+=" NN";
if(field.uk) text+=" UK";
if(field.pk) text+=" PK";
if(field.ai) text+=" Auto";
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
this.dataTypeCode=0
this.dataType="";
this.width=0;
this.numberOfDecimalPlaces=0;
this.fieldName="";
this.nn=false;
this.pk=false;
this.ai=false;
this.check="";
this.isUnique=false;
this.defaultValue="";
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

var databaseTable=selectedTable.databaseTable;
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
if(tableName.val().length!=0)databaseTable.name=tableName.val();
}
databaseTable.engine=engine;
databaseTable.note=tableNote;
selectedTable.draw();
});
}
//////////////////////////
function DatabaseTableField()
{
this.code=0;
this.name="";
this.datatype=null;
this.width=0;
this.numberOfDecimalPlaces=0;
this.isPrimaryKey=true;
this.isAutoIncrement=true;
this.isUnique=true;
this.isNotNull=true;
this.defaultValue="";
this.checkConstraints="";
this.note="";
}
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
function Project()
{
this.code=0;
this.memberCode=0;
this.title="";
this.databaseArchitecture=null;
this.dateOfCreation="";
this.timeOfCreation="";
this.canvasWidth=0;
this.canvasHeight=0;
this.tables=null;
}
function DatabaseTable()
{
this.code=0;
this.name="";
this.note="";
this.engine=null;
this.fields=null;
this.numberOfFields=0;
this.xCor=0;
this.yCor=0;
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
var dtoProject=new DTOProject();
dtoProject.width=canvas.width;
dtoProject.height=canvas.height;
dtoProject.table.push();
dtoProject.title=$("#currentProjectTitle").text();
var table=new Table();
var field=new Field();
var tmpTable;
var tmpField;
var tmpFields;
var tmpDrawableTable;
for(var i=0; i<tableComponents.length;i++)
{
tmpTable=tableComponents[i].databaseTable;
tmpDrawableTable=tableComponents[i].drawableTable;
tmpFields=tmpTable.fields;
table.name=tmpTable.name;
table.note=tmpTable.note;
table.engineName=tmpTable.engine;
table.xCor=drawableTable.x;
table.yCor=drawableTable.y;
for(var j=0;j<tmpFields.length;j++)
{
tmpFiled=tmpFields[j];
field.name=tmpField.FiledName;
field.dataType=tmpField.fieldDataType;
field.width=tmpField.width;
field.numberOfDecimalPlaces=tmpField.numberOFDecimalPlace;
field.isPrimaryKey=ttmpField.pk;
field.isAutoIncrement=tmpField.ai;
field.isUnique=tmpField.uk;
field.isNotNull=tmpField.nn;
field.defaultValue=tmpField.defaultValue;
field.checkConstraint=tmpField.check;
field.note=tmpField.note;
table.fields.push(field);
}
dtoProject.table.push(table);
}
}











/////////////////////////
window.addEventListener('load',attachEvents);

