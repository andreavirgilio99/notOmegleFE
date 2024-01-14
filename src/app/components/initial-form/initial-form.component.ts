import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Required } from 'src/app/utils/required.validator';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.css']
})
export class InitialFormComponent {
  interests: string[] = [];
  interestInput = new FormControl('', Required)

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
