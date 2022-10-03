public class MyAccountListController {

    @AuraEnabled
  public static List<Account> getAccount(Id recordId) {
      
    return [SELECT Id, Name,Phone,CustomerText__c,CustomerLogo__c FROM Account WHERE Id= :recordId];

  }

}