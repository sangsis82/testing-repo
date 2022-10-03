public with sharing class contactAuraService {
    public contactAuraService() {

    }
    @AuraEnabled(cacheable=true)
    public static List<sObject> getContactList(String name){
  
        String key = '%' + name + '%';
        String Query = 'Select Id,Name ,Email,Phone from Contact where Name like :key ';
        return Database.query(query);
    }
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAccountList(String name){
        String key = '%' + name + '%';
        String Query = 'Select Id,Name,Industry from Account where Name like :key';
        return Database.query(query);

    }
}