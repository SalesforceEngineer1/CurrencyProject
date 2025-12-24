import { LightningElement, wire, track } from 'lwc';
//import syncCurrencies from
    //'@salesforce/apex/CurrencyController.syncCurrencies';
import getCurrencies from
    '@salesforce/apex/CurrencyController.getCurrencies';
import { refreshApex } from '@salesforce/apex';

export default class CurrencyManager extends LightningElement {

    @track message;
    @track currencies;
    wiredResult;

    columns = [
        { label: 'Currency Name', fieldName: 'Name' },
        { label: 'Currency Code', fieldName: 'Currency_Code__c' },
        { label: 'Symbol', fieldName: 'Symbol__c' },
        { label: 'Native Symbol', fieldName: 'Native_Symbol__c' },
        { label: 'Decimal Digits', fieldName: 'Decimal_Digits__c', type: 'number' },
        { label: 'Rounding', fieldName: 'Rounding__c', type: 'number' },
        { label: 'Plural Name', fieldName: 'Plural_Name__c' }
    ];

    @wire(getCurrencies)
    wiredCurrencies(result) {
        this.wiredResult = result;
        if (result.data) {
            this.currencies = result.data;
        }
    }

    handleSync() {
        syncCurrencies()
            .then(result => {
                this.message = result;
                return refreshApex(this.wiredResult);
            })
            .catch(error => {
                this.message = error.body.message;
            });
    }
}
