public class CustomLoginController {

    public String ExpID { get; set; }

public String username{get; set;}
public String password {get; set;}



public pageReference doLogin()
{  
    return Site.login(username,password,'/user1home');
}


//Get the expid parameter from query string
Public string getExpidFromURL()
{
   String expid = System.currentPageReference().getParameters().get('expid');  
   System.debug('tessss');  
    Return expid;
}

}