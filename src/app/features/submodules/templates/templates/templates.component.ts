import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TemplatesService } from '../templates.service';

declare var html2pdf: any;

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  @ViewChild('invoice', { static: true }) invoiceTemplate!: TemplateRef<any>;
  @ViewChild('report', { static: true }) reportTemplate!: TemplateRef<any>;

  activeTemplate: TemplateRef<any> | null = null;
  templateContext: any = { data: {} };

  constructor(private templateService: TemplatesService) {}

  loadTemplate(type: string) {
    const data = this.templateService.getTemplate(type);
    this.templateContext = { data };
    switch (type) {
      case 'invoice':
        this.activeTemplate = this.invoiceTemplate;
        break;
      case 'report':
        this.activeTemplate = this.reportTemplate;
        break;
      default:
        this.activeTemplate = null;
    }
  }

  exportToPDF() {
    const element = document.getElementById('template-render');
    if (element) {
      html2pdf().from(element).save(`${this.templateContext.data.type}-template.pdf`);
    }
  }

  ngOnInit() {
    this.loadTemplate('invoice');
  }
}
