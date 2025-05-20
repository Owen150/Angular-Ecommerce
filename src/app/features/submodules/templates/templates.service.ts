import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor() { }

  getInvoiceTemplateData() {
    return {
      customerName: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      items: [{ name: '', qty: 1, price: 0 }],
    };
  }

  getReportTemplateData() {
    return {
      title: '',
      author: '',
      content: '',
      dateCreated: new Date().toISOString(),
    };
  }
}
