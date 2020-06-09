import com.thinking.machines.tmws.annotations.*;
import com.thinking.machines.dmframework.*;
import com.thinking.machines.dmframework.exceptions.*;
import com.thinking.machines.tdmodel.utilities.*;
import java.util.*;
public class CreateAdministrator
{
public static void main(String gg[])
{
try
{
DataManager dataManager;
dataManager=new DataManager();
dataManager.begin();
com.thinking.machines.tdmodel.dl.Administrator administrator=new com.thinking.machines.tdmodel.dl.Administrator();
administrator.setUsername("admin");
administrator.setPassword(Utility.encrypt("nikhil","ujjain"));
administrator.setPasswordKey("ujjain");
administrator.setEmailId("admin@gmail.com");
administrator.setFirstName("Aamir");
administrator.setLastName("Khan");
administrator.setMobileNumber("+914543654757");
dataManager.insert(administrator);
dataManager.end();
}catch(ValidatorException validatorException)
{
System.out.println(validatorException.getMessage());
}catch(DMFrameworkException dmFrameworkException)
{
System.out.println(dmFrameworkException.getMessage());
}
}

}
