import { LightningElement, api,wire ,track} from 'lwc';
import getContactList from '@salesforce/apex/contactAuraService.getContactList';
export default class ContactList extends LightningElement {

 @track  searchKey;
 @track contacts;
@wire(getContactList,{name: '$searchKey'}) 
wiredContact({error,data}){

     if(data){
         this.contacts=data;
     }
     if(error){
         this.error=error;
     }
}

handleChange(event){
    event.preventDefault();
    this.searchKey=event.target.value;
}

}