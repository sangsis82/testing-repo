({
	myAction : function(component, event, helper) {
		        component.set("v.Columns", [
    {label:" Name", fieldName:"Name", type:"text"},
    {label:" Customertext", fieldName:"CustomerText__c", type:"Rich Text Area"},               
    {label:"Id", fieldName:"Id", type:"Number"},
    {label:"Logo", fieldName:"CustomerLogo__c", type:"Rich Text Area"}
]);
    var action = component.get("c.getAccount");
action.setParams({
    recordId: component.get("v.recordId")
});
action.setCallback(this, function(data) {
    component.set("v.Accountdata", data.getReturnValue());
});
$A.enqueueAction(action);
    }

	
})