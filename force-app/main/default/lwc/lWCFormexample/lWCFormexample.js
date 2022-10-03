import {
	LightningElement,
	track,
	wire
} from 'lwc';
import searchAccs from '@salesforce/apex/MyAccSearch.searchAccs';
import {
	getPicklistValues
} from 'lightning/uiObjectInfoApi';
import {
	getObjectInfo
} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {
	loadScript
} from "lightning/platformResourceLoader";
import writeExcel from "@salesforce/resourceUrl/writeExcel";
import Type_FIELD from '@salesforce/schema/Account.Type';
export default class LWCFormexample extends LightningElement {
	librariesLoaded = false;
	@track objectsData;
	@track schemaObj;
	@track acc;
	@track todoItemList;
	@track columns = [{
			label: 'Account name',
			fieldName: 'Name',
			type: 'text',
			sortable: true
		},
		{
			label: 'Type',
			fieldName: 'Type',
			type: 'text',
			sortable: true
		},
		{
			label: 'Annual Revenue',
			fieldName: 'AnnualRevenue',
			type: 'Currency',
			sortable: true
		},
		{
			label: 'Phone',
			fieldName: 'Phone',
			type: 'phone',
			sortable: true
		},
		{
			label: 'SLA Expiry Date',
			fieldName: 'SLAExpirationDate__c',
			type: 'Date',
			sortable: true
		},
	];
	@track acctypevalue;
	@track arr_acc;
	@track objvalue;
	@wire(getObjectInfo, {
		objectApiName: ACCOUNT_OBJECT
	})
	objectInfo;
	@wire(getPicklistValues, {
		recordTypeId: '$objectInfo.data.defaultRecordTypeId',
		fieldApiName: Type_FIELD
	})
	TypePicklistValues;
	handleChange(event) {
		this.acctypevalue = event.detail.value;
	}
	startdate_val = '';
	enddate_val;
	//revenue_val;
	@track searchData;
	@track accList;
	handleValChange(event) {
		if (event.target.dataset.id === 'startdatefield') {
			this.startdate_val = event.target.value;
		} else if (event.target.dataset.id === 'enddatefield') {
			this.enddate_val = event.target.value;
		}
		/* else if(event.target.dataset.id === 'revenuefield'){
		this.revenue_val = event.target.value;
		}*/
	}
	handleSearch(event) {
		this.template.querySelector('[data-id="Green_Button"]').click();
		console.log('yess' + this.startdate_val);
		if (!this.startdate_val) {
			this.errorMsg = 'Please enter account name to search.';
			this.searchData = undefined;
			return;
		}
		searchAccs({
				str_startdate: this.startdate_val,
				str_enddate: this.enddate_val,
				str_acctype: this.acctypevalue
			})
			.then(result => {
				this.accList = result;
				console.log('hi::' + JSON.stringify(result));
				this.objectsData = (this.accList);
				//this.objectsData = Object.values(this.accList);
				/*this.objectsData = objArray.map(function(key){
				return {[key]:objArray[key]};
				});*/
				console.log('values:::' + this.objectsData);
				this.schemaObj = [{
						column: 'Account name',
						type: String,
						sortable: true,
						value: student => student.Name
					},
					{
						column: 'Type',
						type: String,
						sortable: true,
						value: student => student.Type
					},
					{
						label: 'Annual Revenue',
						column: 'AnnualRevenue',
						type: Number,
						sortable: true,
						format: '#,##0.00',
						value: student => student.AnnualRevenue
					},
					{
						column: 'SLA of Birth',
						type: Date,
						format: 'yyyy-mm-dd',
						value: student => student.SLAExpirationDate__c
					},
				];
			})
			.catch(error => {
				this.accList = undefined;
				//this.error = error;
			});
	}
	// this method validates the data and creates the csv file to download
	/*downloadCSVFile() {   
	let rowEnd = '\n';
	let csvString = '';
	// this set elminates the duplicates if have any duplicate keys
	let rowData = new Set();
	// getting keys from data
	this.accList.forEach(function (record) {
	Object.keys(record).forEach(function (key) {
	rowData.add(key);
	});
	});
	console.log('first'+ rowData);
	// Array.from() method returns an Array object from any object with a length property or an iterable object.
	rowData = Array.from(rowData);
	console.log('second'+ rowData);
	// splitting using ','
	csvString += rowData.join(',');
	csvString += rowEnd;
	// main for loop to get the data based on key value
	for(let i=0; i < this.accList.length; i++){
	let colValue = 0;
	// validating keys in data
	for(let key in rowData) {
	if(rowData.hasOwnProperty(key)) {
	// Key value 
	// Ex: Id, Name
	let rowKey = rowData[key];
	// add , after every value except the first.
	if(colValue > 0){
	csvString += ',';
	}
	// If the column is undefined, it as blank in the CSV file.
	let rowvalue = this.accList[i][rowKey] === undefined ? '' : this.accList[i][rowKey];
	csvString += '"'+ rowvalue +'"';
	colValue++;
	}
	//this.arr_acc.push(this.objvalue);
	}
	csvString += rowEnd;
	}
	x// Creating anchor element to download
	let downloadElement = document.createElement('a');
	// This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
	downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
	downloadElement.target = '_self';
	// CSV File Name
	downloadElement.download = 'Account Data.csv';
	// below statement is required if you are using firefox browser
	document.body.appendChild(downloadElement);
	// click() Javascript function to download CSV file
	downloadElement.click(); 
	}*/
	renderedCallback() {
		console.log("renderedCallback xlsx");
		if (this.librariesLoaded) return;
		this.librariesLoaded = true;
		loadScript(this, writeExcel + "/writeExcel/write-excel-file.min.js")
			.then(async(data) => {
				console.log("success------>>>", data);
			})
			.catch(error => {
				console.log("failure-------->>>>", error);
			});
	}
	// calling the download function from xlsxMain.js
	async downloadCSVFile() {
		let _self = this;
		console.log('obj' + this.objectsData);
		// When passing `objects` and `schema`.
		await writeXlsxFile(_self.objectsData, {
			schema: _self.schemaObj,
			fileName: 'file.xlsx'
		})
	}
}