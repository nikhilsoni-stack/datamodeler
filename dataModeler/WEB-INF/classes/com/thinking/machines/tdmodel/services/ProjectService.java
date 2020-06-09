package com.thinking.machines.tdmodel.services;
import com.thinking.machines.tdmodel.services.exception.*;
import com.thinking.machines.tmws.annotations.*;
import com.thinking.machines.tmws.TMForward;
import com.thinking.machines.tdmodel.services.pojo.*;
import com.thinking.machines.tdmodel.utilities.*;
import com.thinking.machines.dmframework.*;
import com.thinking.machines.dmframework.exceptions.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
@Path("/project")
public class ProjectService
{

private ServletContext servletContext;
private HttpSession session;
private HttpServletRequest request;
public void setHttpSession(HttpSession s){this.session=s;}
public void setHttpRequest(HttpServletRequest r){this.request=r;}
public HttpSession getHttpSession(){return this.session;}
public HttpServletRequest getHttpRequest(){return this.request;}
public ServletContext getServletContext(){return this.servletContext;}
public void setServletContext(ServletContext servletContext){this.servletContext=servletContext; }

@Path("create")
@InjectApplication
@InjectRequest
@InjectSession
public TMForward create(String name,int databaseArcitectureCode)
{

try
{
com.thinking.machines.tdmodel.services.exception.ServiceException se=new com.thinking.machines.tdmodel.services.exception.ServiceException();
if(name==null || name.length()==0)
{
se.addError("nameOFProject","Required");
throw se;
}
if(name.length()>100)
{
se.addError("title","Maximum Length of title exceeded");
throw se;
}
com.thinking.machines.tdmodel.dl.Project dlProject=new com.thinking.machines.tdmodel.dl.Project();
com.thinking.machines.tdmodel.services.pojo	.Project pojoProject=new com.thinking.machines.tdmodel.services.pojo.Project();
DataManager dm=new DataManager();
dm.begin();
LinkedList<com.thinking.machines.tdmodel.services.pojo.Project> pojoProjectList=(LinkedList<com.thinking.machines.tdmodel.services.pojo.Project>)servletContext.getAttribute("allProjects");

for(com.thinking.machines.tdmodel.services.pojo.Project eachProject:pojoProjectList)
{
if(name.equalsIgnoreCase(eachProject.getTitle()))
{
se.addError("nameOFProject",name+"already exists");
throw se;
}
}
System.out.println("asdfdf");

dlProject.setTitle(name);

List<com.thinking.machines.tdmodel.dl.Member> dlMemberList;
com.thinking.machines.tdmodel.dl.Member mm=(com.thinking.machines.tdmodel.dl.Member)session.getAttribute("member");
dlMemberList=dm.select(com.thinking.machines.tdmodel.dl.Member.class).where("emailId").eq(mm.getEmailId()).query();
for(com.thinking.machines.tdmodel.dl.Member dlMember:dlMemberList)
{
dlProject.setMemberCode(dlMember.getCode());

break;
}


/////
dlProject.setDatabaseArchitectureCode(databaseArcitectureCode);

long millis=System.currentTimeMillis();  
 java.sql.Date date=new java.sql.Date(millis);
java.sql.Time time=new java.sql.Time(millis);
dlProject.setDateOfCreation(date);
dlProject.setCanvasHeight(510);
dlProject.setCanvasWidth(1123);
dlProject.setTimeOfCreation(time);
dlProject.setNumberOfTable(0);

dm.insert(dlProject);
//add to datastructure

List<com.thinking.machines.tdmodel.dl.Project> dlProjectList;

dlProjectList=dm.select(com.thinking.machines.tdmodel.dl.Project.class).where("title").eq(name).query();
for(com.thinking.machines.tdmodel.dl.Project eachProjectx : dlProjectList)
{
pojoProject.setCode(eachProjectx.getCode());

break;
}
pojoProject.setMemberCode(dlProject.getCode());
pojoProject.setTitle(name);
pojoProject.setCanvasHeight(dlProject.getCanvasHeight());
pojoProject.setCanvasWidth(dlProject.getCanvasWidth());
// databaseArchitecture add karna he datastructure me
List<com.thinking.machines.tdmodel.services.pojo.DatabaseArchitecture> pojoDatabaseArchitecture;
pojoDatabaseArchitecture=(List<com.thinking.machines.tdmodel.services.pojo.DatabaseArchitecture>)servletContext.getAttribute("databaseArchitectures");
for(com.thinking.machines.tdmodel.services.pojo.DatabaseArchitecture eachDatabaseArchitecture: pojoDatabaseArchitecture)
{
if(databaseArcitectureCode==eachDatabaseArchitecture.getCode())
{
pojoProject.setDatabaseArchitecture(eachDatabaseArchitecture);

break;
}
}
pojoProject.setDateOfCreation(date.toString());
pojoProject.setTimeOfCreation(time.toString());

LinkedList<com.thinking.machines.tdmodel.services.pojo.DatabaseTable>  tmpDatabaseTable=new LinkedList<>();
pojoProject.setTables(tmpDatabaseTable);
dm.end();
pojoProjectList.add(pojoProject);
servletContext.removeAttribute("allProjects");
servletContext.setAttribute("allProjects",pojoProjectList);
servletContext.removeAttribute("currentProject");
System.out.println("asdfdf");
servletContext.setAttribute("currentProject",pojoProject);

return new TMForward("/projectView.jsp");
}catch(Exception e)
{
System.out.println(e.getMessage()); 
return new TMForward("/homepage.jsp");
}
}
@Path("save")
@InjectApplication
@InjectRequest
@InjectSession
@Post
public Object save(Project project)
{
List<com.thinking.machines.tdmodel.dl.Project> dlProjects;
com.thinking.machines.tdmodel.dl.Project dlProject;
int projectCode=project.getCode();
com.thinking.machines.tdmodel.dl.DatabaseTable dlTable;
com.thinking.machines.tdmodel.dl.DatabaseTableField dlField;
List<com.thinking.machines.tdmodel.dl.DatabaseTableField > dlFields;
List<com.thinking.machines.tdmodel.dl.DatabaseTable >dlTables;
List<com.thinking.machines.tdmodel.services.pojo.DatabaseTable> pojoTables=project.getTables();
List <com.thinking.machines.tdmodel.services.pojo.DatabaseTableField> pojoFields;
com.thinking.machines.tdmodel.services.pojo.DatabaseTableField pojoField;

com.thinking.machines.tdmodel.services.pojo.DatabaseEngine engine;
com.thinking.machines.tdmodel.services.pojo.Datatype datatype;
int engineCode=0;
int size=0;
try
{
DataManager dataManager=new DataManager();
dataManager.begin();
dlProjects=dataManager.select(com.thinking.machines.tdmodel.dl.Project.class).where("code").eq(projectCode).query();
dlProject=dlProjects.get(0);
// update project
dlProject.setTitle(project.getTitle());
dlProject.setCanvasHeight((int)project.getCanvasHeight());
dlProject.setCanvasWidth((int)project.getCanvasWidth());
dlProject.setNumberOfTable(project.getTables().size());
dataManager.update(dlProject);
System.out.println("********************************************");
System.out.println((DatabaseTableField)pojoTables.get(0).getFields().get(0));
for(com.thinking.machines.tdmodel.services.pojo.DatabaseTable eachTable : pojoTables)
{
dlTable=new com.thinking.machines.tdmodel.dl.DatabaseTable();
System.out.println("aaya re");
if(eachTable.getCode()>0)
{
System.out.println("aaya re sdfsdf");
dlTable.setName(eachTable.getName());
dlTable.setProjectCode(projectCode);
engine=eachTable.getEngine();
engineCode=engine.getCode();
dlTable.setDatabaseEngineCode(engineCode);
dlTable.setNote(eachTable.getNote());
dlTable.setXCor((int)eachTable.getXCor());
dlTable.setYCor((int)eachTable.getYCor());
dlTable.setNumberOfFields(eachTable.getFields().size());
dataManager.update(dlTable);
//dataManager.delete(com.thinking.machines.tdmodel.dl.DatabaseTableField.class,eachTable.getCode());
//update table and delete field
}
else
{
dlTable.setName(eachTable.getName());
dlTable.setProjectCode(projectCode);
engine=eachTable.getEngine();
engineCode=engine.getCode();
dlTable.setDatabaseEngineCode(engineCode);
dlTable.setNote(eachTable.getNote());
dlTable.setXCor((int)eachTable.getXCor());
dlTable.setYCor((int)eachTable.getYCor());
dlTable.setNumberOfFields(eachTable.getFields().size());
dataManager.insert(dlTable);
eachTable.setCode(dlTable.getCode());
// insert table
}
pojoFields=(List<com.thinking.machines.tdmodel.services.pojo.DatabaseTableField>)eachTable.getFields();
System.out.println("***************************************************************");

for(com.thinking.machines.tdmodel.services.pojo.DatabaseTableField eachField: pojoFields)
{
System.out.println("aaya re asdfasdf");
dlField=new com.thinking.machines.tdmodel.dl.DatabaseTableField();
dlField.setName(eachField.getName());
dlField.setTableCode(eachTable.getCode());
datatype=eachField.getDatatype();
dlField.setDatabaseArchitectureDataTypeCode(datatype.getCode());
dlField.setWidth(eachField.getWidth());
dlField.setNumberOfDecimalPlaces(eachField.getNumberOfDecimalPlaces());
dlField.setIsPrimaryKey(eachField.getIsPrimaryKey());
dlField.setIsAutoIncrement(eachField.getIsAutoIncrement());
dlField.setIsUnique(eachField.getIsUnique());
dlField.setIsNotNull(eachField.getIsNotNull());
dlField.setDefaultValue(eachField.getDefaultValue());
dlField.setCheckConstraint(eachField.getCheckConstraints());
dlField.setNote(eachField.getNote());
System.out.println("aaya re nihil");

dataManager.insert(dlField);
System.out.println("aaya re nihil");
eachField.setCode(dlField.getCode());
}

// insert fields
}
dataManager.end();
servletContext.removeAttribute("currentProject");
servletContext.setAttribute("currentProject",project);
List<com.thinking.machines.tdmodel.services.pojo.Project> projects=(List<com.thinking.machines.tdmodel.services.pojo.Project>)servletContext.getAttribute("allProjects");
for(int i=0;i<projects.size();i++)
{
if(project.getCode()==projects.get(i).getCode())
{
projects.remove(i);
break;
}
}
projects.add(project);
servletContext.removeAttribute("allProjects");
servletContext.setAttribute("allProjects",projects);
}catch(Exception e)
{
System.out.println(e.getMessage());
}
return "save successfully";
}
@Path("open")
@InjectApplication
@InjectRequest
@InjectSession
@Post
public Object open(int projectCode)
{
System.out.println("asdfsdf");
List<com.thinking.machines.tdmodel.services.pojo.Project> projects=(List<com.thinking.machines.tdmodel.services.pojo.Project>)servletContext.getAttribute("allProjects");
for(com.thinking.machines.tdmodel.services.pojo.Project xx:projects)
{
if(xx.getCode()==projectCode)
{
servletContext.removeAttribute("currentProject");
servletContext.setAttribute("currentProject",xx);
return xx;
}
}
return null;
}


@InjectApplication
@InjectRequest
@InjectSession
@Path("getProject")
public Object getProject()
{
System.out.println(servletContext.getAttribute("currentProject"));
return servletContext.getAttribute("currentProject");
}
@InjectApplication
@InjectRequest
@InjectSession
@Path("generateScript")
@Post
public Object generateScript(List<Integer> tableCodes)
{
StringBuffer sbHead=new StringBuffer();



return "file bangyi";
}
@InjectApplication
@InjectRequest
@InjectSession
@Path("example")
@Post
public Object get(Psp m)
{
List<Table> x=(List<Table>)m.getTables();
List<DatabaseTableField> y=(List<DatabaseTableField>)x.get(0).getFields();
System.out.println(((DatabaseTableField)y.get(0)).getName());
System.out.println("chala re");
return "";
}

}