({
	doInit : function(component, event, helper) {
        
    var action = component.get("c.getContacts");
        var id = component.get('v.recordId');
                    action.setParams({
                skey:id
            })  
        action.setCallback(this,function(response){
             var state = response.getState();
            if (state === "SUCCESS") {
             var  responsevalue = response.getReturnValue();
                component.set('v.Mycontacts',responsevalue);
                console.log('Response'+responsevalue);
                console.log('TEST'+JSON.stringify(response.getReturnValue()));

            }  
            else {
                    console.log("Unknown error");
                }

        })	
                $A.enqueueAction(action);

	},
    doAdd: function(component, event, helper) {
    var search_text = component.get('v.SearchKey');
        console.log(search_text);
    component.set('v.Key',search_text)
    
},
    	doNavigation : function(component, event, helper) {
                    console.log('hhh');

            var eventSource = event.getSource();
            var cid = eventSource.get('v.name');
                                console.log('hhh');

                var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      "recordId": cid,
      "slideDevName": "detail"
    });
    navEvt.fire();

        }
})