import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  @ViewChild('invoiceTemplate') invoiceTemplate!: TemplateRef<any>;
  @ViewChild('reportTemplate') reportTemplate!: TemplateRef<any>;

  selectedTemplate: TemplateRef<any> | null = null;

  invoiceData: any;
  reportData: any;

  constructor(private template: TemplatesService) {}

  ngOnInit() {
    if (this.selectedTemplate == this.invoiceTemplate) {
      this.invoiceData = this.template.getInvoiceTemplateData();
    } else this.reportData = this.template.getReportTemplateData();
  }
}
