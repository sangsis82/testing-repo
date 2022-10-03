import { LightningElement,api,wire,track } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';
export default class Childcomponent extends LightningElement {
    @api searchstring;
    @track records;
    @track searchacc;
    showPill=false;
    selectedvalue;
    @track  Combo_options;
connectedCallback(){
    console.log('search string from parent',this.searchstring);
    this.fetchdata();
}
handleTypeChange(event){
    console.log('comboboxevent',(event.target.value));
    this.selectedvalue = event.target.value;
    this.showPill = true;
    const oEvent = new CustomEvent('lookupupdate',
    {
        'detail': {selectedRecord: this.selectedvalue}
    }
);
this.dispatchEvent(oEvent);

}
handleRemoveOnly(event) {
    event.preventDefault();
    this.showPill = !this.showPill;
}
fetchdata(){   
findAccounts({searchKey:this.searchstring})
    .then(result => {
        this.records = result;
        console.log('formatted Data'+JSON.stringify(this.records));
        let options = [];
                 
                for (var key in this.records) {
                    options.push({ label: this.records[key].Name, value: this.records[key].Id  });
 
                }
                this.Combo_options = options;
                this.showPill =false;
        this.spinner = false;
    })
    .catch(error => {
        this.spinner = false;
        console.log(error);
    });


} 

}
