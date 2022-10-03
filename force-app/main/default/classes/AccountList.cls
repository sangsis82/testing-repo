public with sharing class AccountList {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating,
                Phone, Website, AnnualRevenue,Industry,  Description,Fax          FROM Account limit 30];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccount(String accid) {
        return [SELECT Id, Name, Type, Rating,
                Phone, Website, AnnualRevenue,Industry,  Description,Fax          FROM Account where id =: accid];
    }
}