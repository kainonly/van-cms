import {Component, OnInit} from '@angular/core';
import {BitService} from 'ngx-bit';
import packer from './language';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer);
  }
}
