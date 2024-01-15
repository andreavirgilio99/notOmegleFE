import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserCache } from 'src/app/model/user-cache.model';
import { Required } from 'src/app/utils/required.validator';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.css']
})
export class InitialFormComponent implements OnInit {

  interests: string[] = [];
  interestInput = new FormControl('', Required)

  form = new FormGroup({
    username: new FormControl('', Required),
    purpose: new FormControl('', Required),
    isMinor: new FormControl(false),
    rememberMe: new FormControl(false)
  })

  ngOnInit(): void {
    const sessionCachedData = sessionStorage.getItem('userData');
    const localCachedData = localStorage.getItem('userData');

    if (sessionCachedData) {
      const parsedData: UserCache = JSON.parse(sessionCachedData);
      this.setCachedValues(parsedData)
    }

    else if (localCachedData) {
      const parsedData: UserCache = JSON.parse(localCachedData);
      this.setCachedValues(parsedData)
    }
  }

  addInterest() {
    if (this.interestInput.valid) {
      this.interests.push(this.interestInput.value!)
      this.interestInput.reset()
    }
  }

  removeInterest(interest: string) {
    const indx = this.interests.indexOf(interest);
    this.interests.splice(indx, 1)
  }

  interestKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addInterest()
    }
  }

  setCachedValues(cache: UserCache) {
    this.form.get('username')!.setValue(cache.data.username);
    this.form.get('purpose')!.setValue(cache.data.purpose);
    this.form.get('isMinor')!.setValue(cache.data.isMinor);
    this.form.get('rememberMe')!.setValue(cache.rememberMe);

    this.interests = cache.data.interests;
  }
}
