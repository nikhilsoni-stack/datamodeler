package com.thinking.machines.tdmodel.services.pojo;
public class Datatype implements java.io.Serializable
{
private int code;
private String datatype;
private int maxWidth;
private int defaultSize;
private int maxWidthOfPrecision;
private Boolean allowAutoIncrement;
private int databaseArchitectureCode;
public void setCode(int code)
{
this.code=code;
}
public int getCode()
{
return this.code;
}
public void setDatatype(String datatype)
{
this.datatype=datatype;
}
public String getDatatype()
{
return this.datatype;
}
public void setMaxWidth(int maxWidth)
{
this.maxWidth=maxWidth;
}
public int getMaxWidth()
{
return this.maxWidth;
}
public void setDefaultSize(int defaultSize)
{
this.defaultSize=defaultSize;
}
public int getDefaultSize()
{
return this.defaultSize;
}
public void setMaxWidthOfPrecision(int maxWidthOfPrecision)
{
this.maxWidthOfPrecision=maxWidthOfPrecision;
}
public int getMaxWidthOfPrecision()
{
return this.maxWidthOfPrecision;
}
public void setAllowAutoIncrement(Boolean allowAutoIncrement)
{
this.allowAutoIncrement=allowAutoIncrement;
}
public Boolean getAllowAutoIncrement()
{
return this.allowAutoIncrement;
}
public void setDatabaseArchitectureCode(int code)
{
this.databaseArchitectureCode=code;
}
public int getDatabaseArchitectureCode()
{
return this.databaseArchitectureCode;
}

}
