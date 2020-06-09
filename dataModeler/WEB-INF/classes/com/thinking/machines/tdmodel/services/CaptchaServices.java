package com.thinking.machines.tdmodel.services;
import com.thinking.machines.tdmodel.services.exception.*;
import com.thinking.machines.tmws.annotations.*;
import com.thinking.machines.tmws.*;
import com.thinking.machines.tmws.captcha.*;
import com.thinking.machines.dmframework.*;
import com.thinking.machines.dmframework.exceptions.*;
import javax.servlet.*;
import javax.servlet.http.*;

@Path("/captchaServices")
public class CaptchaServices
{
private HttpSession session;
public void setHttpSession(HttpSession s)
{
System.out.println(s+"aaya re aaya");
this.session=s;
}
@InjectSession
@Post
@Path("validate")
public Object validate(String captchaCode)
{
System.out.println(captchaCode+":aaya");
Captcha captcha=(Captcha)session.getAttribute(Captcha.CAPTCHA_NAME);
System.out.println(captchaCode+":aaya");
if(captcha==null) return false;
if(captcha.isValid(captchaCode)) 
{
session.removeAttribute(captcha.CAPTCHA_NAME);
return true;
}
return false;
}
}
