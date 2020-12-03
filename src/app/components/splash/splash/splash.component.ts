import { Component, OnInit } from '@angular/core';
import { delay } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(
    private router: Router
    ) { }

  async ngOnInit(): Promise<void> {
    await delay(3000);
    this.router.navigate(['auth']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
