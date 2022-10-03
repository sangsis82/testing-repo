public class MyContactListController {
@AuraEnabled
  public static List<Contact> getContacts(Id recordId) {
        return [SELECT id, name, phone FROM Contact LIMIT 20];
    }
    
}