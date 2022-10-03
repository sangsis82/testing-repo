import { LightningElement,api,track } from 'lwc';
import sendEmailToController from '@salesforce/apex/ControllerLwcExample.sendEmailToController';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
      @track subject = 'Test Email'
    @track body = 'Hello'
    @track toSend = 'sangsis82@gmail.com'

  changeHandler(event) {
    this.greeting = event.target.value;
    const recordInput = {body: this.body, toSend: this.toSend, subject: this.subject}  //You can send parameters
    sendEmailToController(recordInput)
    .then( () => {
alert('yes');        }).catch( error => {
        //If there is an error on response
        alert('no');
    })

}
}