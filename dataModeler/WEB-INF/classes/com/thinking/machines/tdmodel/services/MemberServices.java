package com.thinking.machines.tdmodel.services;
import com.thinking.machines.tdmodel.services.exception.*;
import com.thinking.machines.tmws.annotations.*;
//import com.thinking.machines.tmws.*;
import com.thinking.machines.tmws.TMForward;
import com.thinking.machines.tdmodel.services.pojo.*;
import com.thinking.machines.tdmodel.utilities.*;
import com.thinking.machines.dmframework.*;
import com.thinking.machines.dmframework.exceptions.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
@Path("/memberService")
public class MemberServices
{
private HttpSession session;
private HttpServletRequest request;
public void setHttpSession(HttpSession s){this.session=s;}
public void setHttpRequest(HttpServletRequest r){this.request=r;}
public HttpSession getHttpSession(){return this.session;}
public HttpServletRequest getHttpRequest(){return this.request;}
@Path("login")
@Post
@InjectSession
@InjectRequest
public TMForward login(String email,String password)
{
try
{
if(request==null) System.out.println("request Object not set");
request.removeAttribute("errorBean");
HashMap<String,String> errorBean=new HashMap<>();
DataManager dm=new DataManager();
dm.begin();
List<com.thinking.machines.tdmodel.dl.Member> dlMembers;
dlMembers=dm.select(com.thinking.machines.tdmodel.dl.Member.class).where("emailId").eq(email).query();
if(dlMembers.size()<=0)
{
errorBean.put("errorMessage","user name is in-correct");
errorBean.put("errorMessageDnone","d-none");
request.setAttribute("errorBean",errorBean);
return new TMForward("/index.jsp");
}
com.thinking.machines.tdmodel.dl.Member member=dlMembers.get(0);
String pass=Utility.decrypt(member.getPassword(),member.getPasswordKey());
if(pass.equals(password))
{
System.out.println("password matches");
session.setAttribute("member",member);
request.removeAttribute("errorBean");
return new TMForward("/homepage.jsp");
}
else
{
System.out.println("password does not  match");
errorBean.put("passwordError","incorrect password");
errorBean.put("passwordDnone","d-none");
request.setAttribute("errorBean",errorBean);
}
}catch(DMFrameworkException dmfe)
{
System.out.println(dmfe);
}
return new TMForward("/index.jsp");
}
@Path("createMember")
@Post
public Object createMember(Member m)
{
System.out.println("create member chala");
ServiceException se=new ServiceException();
System.out.println("create member chala");
if(m.getFirstName()==null || m.getFirstName().trim().length()==0)se.addError("firstName","First name field cannot be left empty");
if(m.getLastName()==null || m.getLastName().trim().length()==0)se.addError("lastName","Last name field cannot be left empty");
if(m.getEmailId()==null || m.getEmailId().trim().length()==0)se.addError("emailId","Email Id field cannot be left empty");
if(m.getPassword()==null || m.getPassword().trim().length()==0)se.addError("password","Password field cannot be left empty");
if(m.getMobileNumber()==null || m.getMobileNumber().trim().length()==0)se.addError("mobileNumber","Mobile number field cannot be left empty");
System.out.println("create member chala");

if(se.getExceptions().size()>0) return se;
System.out.println("create member chala");
com.thinking.machines.tdmodel.dl.Member dlm=new com.thinking.machines.tdmodel.dl.Member();
System.out.println("create member chala");
dlm.setEmailId(m.getEmailId());
String passKey="asdfsdfwerwegxcvxcv";
String encPass="";
try
{
encPass=Utility.encrypt(m.getPassword(),passKey);
}catch(Exception e)
{
System.out.println("kuch to gadbad he: "+e);
}
dlm.setPassword(encPass);
dlm.setPasswordKey(passKey);
dlm.setFirstName(m.getFirstName());
dlm.setLastName(m.getLastName());
dlm.setMobileNumber(m.getMobileNumber());
dlm.setStatus("a");
dlm.setNumberOfProjects(0);
 DataManager dm=new DataManager();
try
{
dm.begin();
dm.insert(dlm);
dm.end();
}catch(DMFrameworkException dmfe)
{
System.out.println("database me insert karne me problem:"+dmfe);
return new ServiceException(dmfe.getMessage());
}
catch(ValidatorException ve)
{
System.out.println("validator Exception :"+ve);
 return new  ServiceException(ve.getMessage());
}
System.out.println("chal");
return true;
}
@Path("logout")
@InjectSession
public TMForward logout()
{
session.removeAttribute("memeber");
return new TMForward("/index.jsp");

}
}