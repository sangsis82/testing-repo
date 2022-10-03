public class Treegridaccounts {

 @AuraEnabled(cacheable=true)
     public static List < Account > fetchAccounts_con() {
        return [ SELECT Id, Name, Industry, Phone,
                ( SELECT Id, FirstName, LastName,Email,Phone FROM Contacts ),
                (Select AccountId,PartnerAccountId,Name From Opportunities)
                FROM Account LIMIT 10 ];
    }

}