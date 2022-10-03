({
	doAdd : function(component, event, helper) {
	
         var a_val = component.get('v.input1');
   
        var b_val = component.get('v.input2');

         var result =( parseInt(a_val) + parseInt(b_val));   
        
        var output = component.find('output_val');
        output.set('v.value',result);
    },
    doSub : function(component, event, helper) {
	
         var a_val = component.get('v.input1');
   
        var b_val = component.get('v.input2');

         var result =( parseInt(a_val) - parseInt(b_val));   
        
        var output = component.find('output_val');
        output.set('v.value',result);
    },
 doMultiply : function(component, event, helper) {
	
         var a_val = component.get('v.input1');
   
        var b_val = component.get('v.input2');

         var result =( parseInt(a_val) * parseInt(b_val));   
        
        var output = component.find('output_val');
        output.set('v.value',result);
    },
doDivision : function(component, event, helper) {
	
         var a_val = component.get('v.input1');
   
        var b_val = component.get('v.input2');

         var result =( parseInt(a_val) / parseInt(b_val));   
        
        var output = component.find('output_val');
        output.set('v.value',result);
    }
})