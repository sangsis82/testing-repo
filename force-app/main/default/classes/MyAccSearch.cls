public class MyAccSearch {

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccs(String str_startdate,String str_enddate,String str_acctype){
     Date sdate;
     Date edate;
      sdate = Date.valueOf(str_startdate);
      edate = Date.valueOf(str_enddate);
      System.debug('apexx'+sdate);
      list<Account> lstAccs = [SELECT Name, Industry,Phone,AnnualRevenue,Type,SLAExpirationDate__c  From Account WHERE (SLAExpirationDate__c>:sdate AND SLAExpirationDate__c<:edate) AND Type like :'Customer%'];

        if(lstAccs.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstAccs;
    }

  /*public static map<Id,Account> searchAccs(String str_startdate,String str_enddate,String str_acctype){
     Date sdate;
     Date edate;
      sdate = Date.valueOf(str_startdate);
      edate = Date.valueOf(str_enddate);
      System.debug('apexx'+sdate);
      map<Id,Account> accmap = new map<Id,Account>([SELECT Name, Industry,AnnualRevenue,Type  From Account WHERE (SLAExpirationDate__c>:sdate AND SLAExpirationDate__c<:edate) AND Type like :'Customer%']);

        if(accmap.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accmap;
    }*/


}