package com.thinking.machines.tdmodel.services.pojo;

import java.util.*;
public class DatabaseArchitecture implements java.io.Serializable
{
private int code;
private String name;
private List<Datatype> datatypes;
private List<DatabaseEngine> databaseEngines;
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
public void setDatatypes(List datatypes)
{
this.datatypes=datatypes;
}
public List getDatatypes()
{
return this.datatypes;
}
public void setDatabaseEngines(List databaseEngines)
{
this.databaseEngines=databaseEngines;
}
public List getDatabaseEngines()
{
return this.databaseEngines;
}

}