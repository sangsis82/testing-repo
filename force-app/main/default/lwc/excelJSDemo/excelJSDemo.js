import { LightningElement } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import writeExcel from "@salesforce/resourceUrl/writeExcel";
export default class ExcelJSDemo extends LightningElement {
    librariesLoaded = false;
    objectsData = [
        // Object #1
        {
            name: 'John Smith',
            dateOfBirth: new Date(),
            cost: 1800,
            paid: true
        },
        // Object #2
        {
            name: 'Alice Brown Alice Brown Alice Brown Alice Brown Alice Brown Alice Brown',
            dateOfBirth: new Date(),
            cost: 2600,
            paid: false
        }
    ]
    schemaObj = [
        // Column #1
        {
            column: 'Name',
            type: String,
            wrap: 'true',
            color: '#ccaaaa',
            value: student => student.name
        },
        // Column #2
        {
            column: 'Date of Birth',
            type: Date,
            format: 'mm/dd/yyyy',
            value: student => student.dateOfBirth
        },
        // Column #3
        {
            column: 'Cost',
            type: Number,
            format: '#,##0.00',
            value: student => student.cost
        },
        // Column #4
        {
            column: 'Paid',
            type: Boolean,
            value: student => student.paid
        }
    ]

    get_array(){
        const cars = {
            brand:'toyota',
            color:'blue'
        }
        console.log('carsobj'+JSON.stringify(cars));
      
        console.log('v1'+cars['brand']);
        console.log('v2'+cars.color);

        var arr_keys = Object.keys(cars);
        var arr_values = Object.values(cars);
        var arr_entries = Object.entries(cars);

       console.log('keys'+JSON.stringify(arr_keys));
       console.log('values'+JSON.stringify(arr_values));
       console.log('entries'+JSON.stringify(arr_entries));


        var obj = {};

// Loop to insert key & value in this object one by one
for (var i = 0; i < arr_keys.length; i++) {
    obj[arr_keys[i]] = arr_values[i];

} 
console.log('Objecttype'+JSON.stringify(obj));
    

       // Create a map object 
        var map = new Map(); 
      
        // Loop to insert key & value in this object one by one
       // for(var i = 0; i < arr_keys.length; i++){ 
         //   console.log(arr_values[i]);
map.set('firstName', 'Luke')
map.set('lastName', 'Skywalker')
map.set('occupation', 'Jedi Knight')
       // } 
        console.log('Map method'+(map(0)));

    }


    renderedCallback() {
        console.log("renderedCallback xlsx");
        if (this.librariesLoaded) return;
        this.librariesLoaded = true;
        loadScript(this, writeExcel + "/writeExcel/write-excel-file.min.js")
            .then(async (data) => {
                console.log("success------>>>", data);
            })
            .catch(error => {
                console.log("failure-------->>>>", error);
            });
    }
    // calling the download function from xlsxMain.js
    async download() {
        let _self = this;
            console.log('excelobj'+this.objectsData);

        // When passing `objects` and `schema`.
        await writeXlsxFile(_self.objectsData, {
            schema: _self.schemaObj,
            fileName: 'file.xlsx'
        })
    }
}