import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { ApiCallService } from './api-call.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apollonia';
  currentUrl :any;
  isLoading:any
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiCallService: ApiCallService){

  }
  ngOnInit(){
 
//  this.router.events.subscribe(ev:NavigationEnd).closed();
this.router.events.subscribe((event: any) => {
  this.currentUrl = window.location.pathname;
      if(event instanceof NavigationStart) {
        console.log(event);
        console.log(window.location.pathname)
      }
    });
    this.apiCallService.isLoading$.subscribe(res =>{
      this.isLoading = res;
      console.log(res)
    });
  }

  ngAfterViewInit(){
    // console.log(this.activatedRoute.pathFromRoot);
    // console.log(this.router);
    // console.log(this.router?.routerState);
    // console.log(this.router?.routerState?.snapshot);
    // console.log(this.router.routerState.snapshot.url);
  }
}
