package com.thinking.machines.tdmodel.services.pojo;
import java.util.*;
public class Table implements java.io.Serializable
{
public  List<DatabaseTableField> fields;
public Table()
{

}
public void setFields(List<DatabaseTableField> fields)
{
this.fields=fields;
}
public List<DatabaseTableField> getFields()
{
return this.fields;
}

}
