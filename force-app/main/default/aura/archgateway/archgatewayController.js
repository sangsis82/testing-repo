({
    doInit : function(component, event, helper) {
        console.log(component.get("v.pageReference"));
    },
    getexpid : function(component, event, helper) {
    console.log('yess i am');
        var expId = event.getParam('expid');
            component.set("v.expid", expId);
    }
})