package com.thinking.machines.tdmodel.services.exception;
import java.io.*;
import java.util.*;
public class ServiceException extends Exception
{
private String message;
private HashMap<String,String> errors;
public ServiceException(String m)
{
this.message=m;
}
public ServiceException()
{
errors=new HashMap<>();
}
public void addError(String key,String value)
{
errors.put(key,value);
}
public HashMap<String,String> getExceptions()
{
return errors;
}
public String getError()
{
return this.message;
}
}