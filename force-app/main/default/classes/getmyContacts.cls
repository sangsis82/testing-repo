public class getmyContacts {
 @AuraEnabled(cacheable=true)
    public static List<contact>getContacts(String skey){
               return [SELECT Id, Name, FirstName,LastName, Phone, Email FROM Contact where accountId = :skey];
        
    }
    
}