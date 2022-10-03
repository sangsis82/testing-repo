public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey) {
        String key = '%'+searchKey + '%';
        return [SELECT Id, Name, AccountNumber,Logo__c FROM Account WHERE Name LIKE :key];
    }

            @AuraEnabled(cacheable=true)
        public static List<Account> findLogo(String accId) {
                    system.debug('accId >> ' + accId);

        return [SELECT Id, Name,Logo__c FROM Account WHERE Id = :accId];
    }

 }