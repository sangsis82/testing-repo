public with sharing class UtilityClass {
    public UtilityClass() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<String,Integer> mapDemo(){
        Map<string,Integer> testMap = new Map<string,Integer>();
        testMap.put('Amit',1);
        testMap.put('Ashley',2);
        testMap.put('Julie',3);
        testMap.put('Joy',4);
        return testMap;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String strAccountName) {
        String strKey = '%'+strAccountName+'%';
         List<Account> accList = [SELECT Id,Name,AccountNumber FROM Account WHERE name like :strKey ];
         return accList;
       }
}