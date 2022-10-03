({
	doInit : function(component, event, helper) {
component.set("v.mycolumns",[
    {label:"SNO",fieldName:"sno",type:"number"},
    {label:"Name of Source",fieldName:"source",type:"text"},
    {label:"Amonut",fieldName:"amount",type:"number"}
]);
        component.set("v.incomes",[
          {  sno:1,
            source:'Regular Job',
            amount:10000
        },
                      
            {  sno:2,
            source:'Part Time Job',
            amount:2000},

            ]);
    },
         handleRegisteredComponentEvent: function(component, event, helper){
            alert('event is handled');
            var total = event.getParam('totalIncome');
            component.set('v.totalIncome',total);
            console.log('test',total);
        },
     
            
        toggleIncomeform: function(component, event, helper){
              var incomeForm = component.find("incomeform");
               $A.util.toggleClass(incomeForm,"hide");
            },
        
       addIncome: function(component,event,helper){
            var incomes = component.get('v.incomes');
            var  newincome = {
               sno: incomes.length + 1,
               source : component.find('source').get('v.value'),
               amount :parseFloat(component.find('amount').get('v.value'))
            }
            if(newincome.source!='' && newincome.amount!='' && newincome.source!= 'null' && newincome.amount!='null'){
            incomes.push(newincome);
            component.set('v.incomes',incomes);
            component.find('source').set('v.value','');
            component.find('amount').set('v.value','');
            }            
      } ,
            fireTotalIncomeComponentEvent:function(component,event,helper){
             var incomes = component.get('v.incomes');
              var totalIncome  = 0;
             for (var i=0;i<incomes.length;i++){
                totalIncome  += incomes[i].amount;
            }
                var action = component.getEvent ('totalIncomeComponentEvent');      
        action .setParams({
            totalIncome: totalIncome 
        });
        action.fire();
        //console.log('test1',event.getParam('totalIncome'));
    }    
            
})