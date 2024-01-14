import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserCache } from 'src/app/model/user-cache.model';
import { Required } from 'src/app/utils/required.validator';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.css']
})
export class InitialFormComponent implements OnInit{
  interests: string[] = [];
  interestInput = new FormControl('', Required)

  form = new FormGroup({
    username: new FormControl('', Required),
    purpose: new FormControl('', Required),
    isMinor: new FormControl(false),
    rememberMe: new FormControl(false)
  })

  ngOnInit(): void {
    const cachedData = localStorage.getItem('userData');

    if(cachedData){
      const parsedData: UserCache = JSON.parse(cachedData);

      this.form.get('username')!.setValue(parsedData.data.username);
      this.form.get('purpose')!.setValue(parsedData.data.purpose);
      this.form.get('isMinor')!.setValue(parsedData.data.isMinor);
      this.form.get('rememberMe')!.setValue(parsedData.rememberMe);

      this.interests = parsedData.data.interests;
    }
  }

  addInterest(){
    if(this.interestInput.valid){
      this.interests.push(this.interestInput.value!)
      this.interestInput.reset()
    }
  }

  removeInterest(interest: string){
    const indx = this.interests.indexOf(interest);
    this.interests.splice(indx, 1)
  }

  interestKeydown(e: KeyboardEvent){
    if(e.key === 'Enter'){
      e.preventDefault();
      this.addInterest()
    }
  }
}
