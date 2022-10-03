public class AccountTriggerHandler {
    public static void updateRating(List<Account> newList){
        for(Account acc: newList){
            if(acc.Industry!=null && acc.Industry=='Media'){
              acc.Rating='Hot';  
            }
        }
    }
    
    public static void createRelatedOpp(List<Account> newList){
       List<Opportunity> oppToBeInserted = new List<Opportunity>();
        for(Account acc:newList){
            Opportunity opp = new Opportunity();
            opp.Name=acc.Name;
            opp.AccountId=acc.Id;
            opp.StageName ='Prospecting';
            opp.CloseDate= System.today();
            oppToBeInserted.add(opp);
        }
        if(!oppToBeInserted.isEmpty()){
            insert oppToBeInserted;
        }
    }
}