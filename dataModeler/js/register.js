function reload()
{
var signUpForm=$("#signUpForm");
var url1="/toddatamodel/webservice/captcha?=sdf"+encodeURI((new Date()).getTime());
signUpForm.find("#captchaImage").attr("src",url1);
signUpForm.find("#captchaCode").val(" ");
}




function validateAndSignUp()
{
var signUpForm=$("#signUpForm");
var captchaCode=signUpForm.find("#captchaCode").val().trim();
captchaServicesManager.validate(captchaCode,function(result){
if(result)
{
var member=new Member();
member.firstName=signUpForm.find("#firstName").val().trim();
member.lastName=signUpForm.find("#lastName").val().trim();
member.mobileNumber=signUpForm.find("#mobileNumber").val().trim();
member.password=signUpForm.find("#password").val().trim();
member.emailId=signUpForm.find("#emailAddress").val().trim();
alert(JSON.stringify(member));
memberServiceManager.createMember(member,function(s){
if(s)
{
alert(s);
var signUpDiv=$("#signUpForm");
signUpDiv.addClass("d-none");
var registeredDiv=$("#registeredDiv");
registeredDiv.removeClass("d-none");


}
else
{
alert("could not create a member");

}


},function(e){
//TODO add is-invalid class to all error fields and show error messages
if(e.firstName)
{
signUpForm.find("#firstName").addClass("is-invalid");
signUpForm.find("#firstNameError").html(e.firstName);
}
if(e.lastName)
{
signUpForm.find("#lastName").addClass("is-invalid");
signUpForm.find("#lastNameError").html(e.lastName);
}
var url1="/toddatamodel/webservice/captcha?=sdf"+encodeURI((new Date()).getTime());
signUpForm.find("#captchaImage").attr("src",url1);
signUpForm.find("#captchaCode").val(" ");


});
}
else
{
var url="/toddatamodel/webservice/captcha?=sdf"+encodeURI((new Date()).getTime());
alert(url);
signUpForm.find("#captchaImage").attr("src",url);
signUpForm.find("#captchaCode").addClass("is-invalid")
signUpForm.find("#captchaCode").val(" ");


}

}, function(e){alert(e)});

}