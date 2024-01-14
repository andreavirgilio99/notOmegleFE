import { Component, ViewChild } from '@angular/core';
import { InitialFormComponent } from './components/initial-form/initial-form.component';
import { UserCache } from './model/user-cache.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notOmegleFE';

  @ViewChild(InitialFormComponent)
  formComponent!: InitialFormComponent

  startSearch(){
    const {username, purpose, isMinor, rememberMe} = this.formComponent.form.controls;
    const interests = this.formComponent.interests;

    if(rememberMe.value){
      const cache: UserCache = {
        data: {
          username: username.value!,
          purpose: purpose.value!,
          isMinor: isMinor.value!,
          interests: interests
        },
        rememberMe: rememberMe.value!
      };

      localStorage.setItem('userData', JSON.stringify(cache))
    }
    else{
      localStorage.removeItem('userData')
    }
  }
}
