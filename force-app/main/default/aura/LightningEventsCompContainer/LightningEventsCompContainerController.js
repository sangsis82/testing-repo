({
         handleRegisteredComponentEvent: function(component, event, helper){
            console.log('event is handled');
            var total = event.getParam('totalIncome');
            component.set('v.totalIncome',total);
            console.log('compcont',event.getParam('totalIncome'));
        }

})