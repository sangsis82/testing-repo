import { LightningElement,api,track,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactList.getContactList';
import findLogo from '@salesforce/apex/AccountController.findLogo';
import { getRecord, getFieldValue  } from 'lightning/uiRecordApi';

export default class CustomDatatableexample extends LightningElement {

@track data;
@track error;
@track accountlogo;
@api recordId;

    @wire(findLogo, {accId:'$recordId'})
    wiredlogo({data, error}){
        if(data){
            this.accountlogo = data;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.accountlogo = undefined;
        }
        console.log('Logoimage'+JSON.stringify(this.accountlogo));

    }


@wire(getContactList)
contacts(result){
            if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }

}

}