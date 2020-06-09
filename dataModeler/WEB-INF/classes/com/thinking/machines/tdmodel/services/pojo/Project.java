package com.thinking.machines.tdmodel.services.pojo;
import java.util.*;
import java.io.*;
public class Project implements java.io.Serializable
{
private int code;
private int memberCode;
private String title;
private DatabaseArchitecture databaseArchitecture;
private String dateOfCreation;
private String timeOfCreation;
private double canvasWidth;
private double canvasHeight;
private List<DatabaseTable> tables;
public Project()
{
}
public void setCanvasWidth(double canvasWidth)
{
this.canvasWidth=canvasWidth;
}
public double getCanvasWidth()
{
return this.canvasWidth;
}
public void setCanvasHeight(double canvasHeight)
{
this.canvasHeight=canvasHeight;
}
public double getCanvasHeight()
{
return this.canvasHeight;
}
public void setCode(int code)
{
this.code=code;
}
public int getCode()
{
return this.code;
}
public void setMemberCode(int memberCode)
{
this.memberCode=memberCode;
}
public int getMemberCode()
{
return this.memberCode;
}
public void setTitle(String title)
{
this.title=title;
}
public String getTitle()
{
return this.title;
}
public void setDatabaseArchitecture(DatabaseArchitecture databaseArchitecture)
{
this.databaseArchitecture=databaseArchitecture;
}
public DatabaseArchitecture getDatabaseArchitecture()
{
return this.databaseArchitecture;
}
public void setDateOfCreation(String dateOfCreation)
{
this.dateOfCreation=dateOfCreation;
}
public String getDateOfCreation()
{
return this.dateOfCreation;
}
public void setTimeOfCreation(String timeOfCreation)
{
this.timeOfCreation=timeOfCreation;
}
public String getTimeOfCreation()
{
return this.timeOfCreation;
}

public void setTables(List<DatabaseTable> tables)
{
this.tables=tables;
}
public List getTables()
{
return this.tables;
}

}
