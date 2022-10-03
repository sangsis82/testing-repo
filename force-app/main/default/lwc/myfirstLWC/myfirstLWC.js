import { LightningElement,api,track,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import mapDemo from '@salesforce/apex/UtilityClass.mapDemo';
import getAccounts from '@salesforce/apex/UtilityClass.getAccounts';

export default class MyfirstLWC extends LightningElement {

    @api name='Sangeetha';
    @track title ='Web developer';
    @track  searchKey;
    @track objects=[];
    @track error;
    @track contacts=[
        {
            Id:'0055e0000041HKcAAy',
            Name:'Amit'
        },
        {
            Id:'0055e0000041HKcAAZ',
            Name:'Piper'
        },
        {
            Id:'0055e0000041HKcAAU',
            Name:'Spring'
        }
    ]
    phone='4054991090';
    email="sangsis82@gmail.com";
   userId= Id;
    handleClick(){
        /*eslint-disable no-console*/
console.log('I am inside JS file');
this.name="Sangeetha Prabhu";
this.title="Front end developer";

    }

    @wire (getAccounts,{strAccountName: '$searchKey'}) accounts;
    handleKeyChange(event){
      this.searchKey = event.target.value;
    }
  

   
    handleapexCall(){
        /*eslint-disable no-console*/
console.log('I am inside JS file');
this.name="Sangeetha Prabhu";
this.title="Front end developer";

    mapDemo()

    .then(result => {
        //this.objects = result;
//alert(' Result ==> ' + this.objects);
        for(let key in result) {
            // Preventing unexcepted data
            if (result.hasOwnProperty(key)) { // Filtering the data in the loop
                this.objects.push({value:result[key], key:key});
            }
        }
    })
    .catch(error => {
        this.error = error;
    });

    }


   
}