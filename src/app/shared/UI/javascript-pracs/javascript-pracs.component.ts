import { Component } from '@angular/core';

@Component({
  selector: 'app-javascript-pracs',
  templateUrl: './javascript-pracs.component.html',
  styleUrls: ['./javascript-pracs.component.css']
})
export class JavascriptPracsComponent {
  title: string = 'JavaScript Practice';
  isDisabled: boolean = true;

  clickFunction(a:number, b:number){
    console.log("Interview Cracked");
    console.log(a + b);
  }

  name: string = 'Interview';
}
