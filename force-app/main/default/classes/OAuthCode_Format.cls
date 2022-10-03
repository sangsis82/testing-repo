/*OAuth Code Format of Authentication
 * EndPoint : https://login.salesforce.com/services/oauth2/authorise
 * Method : GET
 * Parameters : response_type = code
 * client_id : Consumerkey provided by salesforce
 * redirect_url : Callbackurl given in connected app 

*/
public class OAuthCode_Format {
    public String code  {set;get;}
    public String result {set;get;}
    
}