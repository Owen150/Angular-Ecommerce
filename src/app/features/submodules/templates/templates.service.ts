import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  
  constructor() {}

  getTemplate(templateType: string): any {
    switch (templateType) {
      case 'invoice':
        return {
          type: 'invoice',
          customerName: 'John Doe',
          invoiceDate: '2025-05-19',
          items: [
            { name: 'Service A', qty: 2, price: 100 },
            { name: 'Service B', qty: 1, price: 250 },
          ],
        };
      case 'report':
        return {
          type: 'report',
          title: 'Monthly Report',
          author: 'Jane Doe',
          content: 'This is the report content...',
          dateCreated: '2025-05-01',
        };
      default:
        return null;
    }
  }
}
