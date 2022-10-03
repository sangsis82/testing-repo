public with sharing class ContactList {
 @AuraEnabled(cacheable=true)
 public static List<contact>getContactList(){
     return [SELECT Id, Name, FirstName,LastName, Phone, Email FROM Contact limit 10];
 }
}