import { LightningElement,api,wire,track } from 'lwc';
 import fetchAccount from '@salesforce/apex/AccountList.fetchAccount';

export default class Parentcomponenet extends LightningElement {

  @api searchvalue;
  @api accvalues;
  @track TypeOptions;
  selectedaccname;
  @api selectedRecord;
  handletextChange(event){
    this.searchvalue = event.target.value;
  }

  handlelookupvalue(event){
    console.log('eventfrom child',JSON.stringify(event.detail));
    this.accvalues = event.detail.selectedRecord;
    if(this.accvalues){
      fetchAccount({accid:this.accvalues})
    .then(result => {
      console.log('account details',JSON.stringify(result));
      let options = [];
                 
      for (var key in result) {
//options.push({ label: this.records[key].Name, value: this.records[key].Id  });
this.selectedaccname = result[key].Name;

      }
   

    })
    .catch(error => {
      this.spinner = false;
      console.log(error);
  });

    }
    let options = [];
                 
                for (var key in this.accvalues) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({ label: this.accvalues[key].Name, value: this.accvalues[key].Id  });
 
                    // Here Name and Id are fields from sObject list.
                }
                this.TypeOptions = options;
  }
  handleTypeChange(event){
      console.log('value',event.target.value);
  }
}