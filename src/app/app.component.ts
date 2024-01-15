import { AfterViewChecked, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { InitialFormComponent } from './components/initial-form/initial-form.component';
import { UserCache } from './model/user-cache.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'notOmegleFE';

  @ViewChild(InitialFormComponent)
  formComponent!: InitialFormComponent

  constructor(public router: Router, private changeDetector: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  startSearch() {
    const { username, purpose, isMinor, rememberMe } = this.formComponent.form.controls;
    const interests = this.formComponent.interests;

    const userData = {
      username: username.value!,
      purpose: purpose.value!,
      isMinor: isMinor.value!,
      interests: interests
    }

    const cache: UserCache = {
      data: userData,
      rememberMe: rememberMe.value!
    };

    this.storeCache(cache);
    this.router.navigate(['/video-chat']);
  }

  storeCache(cache: UserCache) {
    sessionStorage.setItem('userData', JSON.stringify(cache))

    if (cache.rememberMe) {
      localStorage.setItem('userData', JSON.stringify(cache))
    }
    else {
      localStorage.removeItem('userData')
    }
  }
}
