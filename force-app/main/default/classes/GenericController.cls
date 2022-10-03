public class GenericController {

  @AuraEnabled(cacheable=true)
  Public static list<Account> Accountass_con(){
              return [SELECT Id, Name, Industry, Type, (SELECT Id, FirstName, LastName FROM Contacts) FROM Account];

  }
}