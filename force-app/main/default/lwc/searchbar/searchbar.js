import { LightningElement,track,api,wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';

export default class Searchbar extends LightningElement {
    @track accounts;
    @track error;
    @track  searchKey;

    @wire(findAccounts,{name:'$searchKey'}) 
accounts({error,data}){

     if(data){
        console.log('@@@@@data'+data.length);      

         this.accounts=data;
     }
     if(error){
        console.log('@@@@@data'+error);      

         this.error=error;
     }
}

    handleKeyChange(event) {
        // Debouncing this method: Do not actually invoke the Apex call as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
       // window.clearTimeout(this.delayTimeout);
       event.preventDefault();
 
       this. searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
}
}