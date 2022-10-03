import { LightningElement,wire ,track} from 'lwc';
import fetchAccounts_con from '@salesforce/apex/Treegridaccounts.fetchAccounts_con';
export default class Griddemo extends LightningElement {

    @track gridData;
    @track gridColumns = [{
        type: 'text',
        fieldName: 'Name',
        label: 'Name'
    },
    {
        type: 'text',
        fieldName: 'Industry',
        label: 'Industry'
    },
    
    {
        type: 'text',
        fieldName: 'FirstName',
        label: 'FirstName'
    },
    {
        type: 'text',
        fieldName: 'LastName',
        label: 'LastName'
    },
    {
        type: 'phone',
        fieldName: 'Phone',
        label: 'Phone number'
    },
    {
        type: 'Email',
        fieldName: 'Email',
        label: 'Email Id'
    }
    
    
    
    ];
    @wire(fetchAccounts_con)
accountTreeData({ error, data }) {

        if(data){
                        console.log(' Data'+JSON.stringify(data));

            this.gridData = data.map(item=>{
                const{Contacts,...accounts} = item;
                return{...accounts,"_children":Contacts};
            })
            console.log('formatted Data'+JSON.stringify(this.gridData));

        }else if (error) {
            console.log('error ====> ' + JSON.stringify(error));
        }

    }

}