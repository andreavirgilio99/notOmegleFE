import { Component } from '@angular/core';
import { siteDescription1, instagramAnchor, siteDescription2 } from 'src/app/constants';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent {
  description1 = siteDescription1;
  anchorText = instagramAnchor;
  description2 = siteDescription2;
}
