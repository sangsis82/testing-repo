import { LightningElement, api,track } from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import docxImport from "@salesforce/resourceUrl/docx";
import contactGrab from "@salesforce/apex/ContactGrabber.getAllRelatedContacts";
import sendEmailToController from '@salesforce/apex/ControllerLwcExample.sendEmailToController';


export default class Contact_list_generator extends LightningElement {

    @api recordId;
    downloadURL;
    _no_border = {top: {style: "none", size: 0, color: "FFFFFF"},
	bottom: {style: "none", size: 0, color: "FFFFFF"},
	left: {style: "none", size: 0, color: "FFFFFF"},
	right: {style: "none", size: 0, color: "FFFFFF"}};
    @track aidata ;
    @track subject = 'Test Email'
    @track body = 'Hello'


    connectedCallback(){
        Promise.all([loadScript(this, docxImport)]).then(() =>{
            this.renderButtons();
        });
    }

    renderButtons(){
        this.template.querySelector(".hidden").classList.add("not_hidden");
        this.template.querySelector(".hidden").classList.remove("hidden");
    }

    startDocumentGeneration(){
        contactGrab({'acctId': this.recordId}).then(contacts=>{
            this.buildDocument(contacts);
        });
    }

    buildDocument(contactsPassed){
        this.aidata = contactsPassed[0].Email;
        console.log('aidata'+this.aidata);

        let document = new docx.Document();
        let headeritems = [];
        headeritems.push(this.generateHeaderRow());
        //console.log(this.aidata);

     //   contactsPassed.forEach(contact => {
       //     tableCells.push(this.generateRow(contact));
        //});

        this.generateTable(document, headeritems);
        this.generateDownloadLink(document);
    }

    generateHeaderRow(){
        console.log('aidata11'+this.aidata);

        let tableHeaderRow = new docx.TableRow({
            children:[
                new docx.TableCell({
                    children: [new docx.Paragraph("HelloWorld Name")],
                    borders: this._no_border
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph("This Agreement is hereby made between Year Up Professional Resources, PBC, d/b/a YUPRO herein referred to as YUPRO, located at 78 Dawson Village Way N Ste 140-253, Dawsonville, GA 30534 and herein referred to as Partner, located at"+ this.aidata +"The Agreement is effective on ____________, 20__, herein referenced as ‘effective date’. ")],
                    borders: this._no_border
                }) 
            ]
        });

        return tableHeaderRow;
    }

    generateRow(contactPassed){
        let tableRow = new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph({children: [this.generateTextRun(contactPassed["FirstName"].toString())]})],
                    borders: this._no_border
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph({children: [this.generateTextRun(contactPassed["LastName"].toString())]})],
                    borders: this._no_border
                })
            ]
        });

        return tableRow;
    }

    generateTextRun(cellString){
        let textRun = new docx.TextRun({text: cellString, bold: true, size: 48, font: "Calibri"});
        return textRun;
    }

    generateTable(documentPassed, tableCellsPassed){
        let docTable = new docx.Table({
            rows: tableCellsPassed
        });

        documentPassed.addSection({
            children: [docTable]
        });
    }

    generateDownloadLink(documentPassed){
        docx.Packer.toBase64String(documentPassed).then(textBlob =>{
            this.downloadURL = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + textBlob;
            this.template.querySelector(".slds-hide").classList.remove("slds-hide");
            const recordInput = {body: textBlob, toSend: this.aidata, subject: this.subject}  //You can send parameters
            sendEmailToController(recordInput)
            .then( () => {
        alert('yes');        }).catch( error => {
                //If there is an error on response
                alert('no');
            })
        
        });
    }
}