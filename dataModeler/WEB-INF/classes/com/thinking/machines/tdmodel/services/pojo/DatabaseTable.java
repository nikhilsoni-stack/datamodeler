package com.thinking.machines.tdmodel.services.pojo;
import java.util.*;

public class DatabaseTable implements java.io.Serializable
{
private int code;
private String name;
private String note;
private DatabaseEngine engine;
private List<DatabaseTableField> fields;
private int numberOfFields;
private double xCor;
private double yCor;
public void setXCor(double x)
{
this.xCor=x;
}
public double getXCor()
{
return this.xCor;
}
public void setYCor(double y)
{
this.yCor=y;
}
public double getYCor()
{
return this.yCor;
}
public void setCode(int code)
{
this.code=code;
}
public int getCode()
{
return this.code;
}
public void setName(String name)
{
this.name=name;
}
public String getName()
{
return this.name;
}
public void setNote(String note)
{
this.note=note;
}
public String getNote()
{
return this.note;
}
public void setEngine(DatabaseEngine engine)
{
this.engine=engine;
}
public DatabaseEngine getEngine()
{
return this.engine;
}
public void setFields(List<DatabaseTableField> fields)
{
this.fields=fields;
}
public List<DatabaseTableField> getFields()
{
return this.fields;
}
public void setNumberOfFields(int numberOfFields)
{
this.numberOfFields=numberOfFields;
}
public int getNumberOfFields()
{
return this.numberOfFields;
}

}
