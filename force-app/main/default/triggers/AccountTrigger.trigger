trigger AccountTrigger on Account (before insert,after insert) {
    if(Trigger.isInsert){
           if(Trigger.isBefore){
               AccountTriggerHandler.updateRating(Trigger.New);            
           }else if(Trigger.isAfter){
           AccountTriggerHandler.createRelatedOpp(Trigger.New); 
        }
    }
}