import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@ViewChild('contractorLink') contractorLink: ElementRef;
  constructor() { }

  ngOnInit() {
    
    this.contractorLink.nativeElement.click()
    
  }

}
