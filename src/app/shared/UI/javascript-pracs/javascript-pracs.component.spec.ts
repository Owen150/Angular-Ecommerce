import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JavascriptPracsComponent } from './javascript-pracs.component';

describe('JavascriptPracsComponent', () => {
  let component: JavascriptPracsComponent;
  let fixture: ComponentFixture<JavascriptPracsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptPracsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JavascriptPracsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the default template text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('javascript-pracs works!');
  });
});
