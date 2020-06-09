package com.thinking.machines.tdmodel.services.pojo;
import java.util.*;
public class Psp implements java.io.Serializable
{
public List<Table> tables;
public Psp()
{

}
public void setTables(List<Table> t)
{
this.tables=t;
}
public List<Table> getTables()
{
return this.tables;
}

}
