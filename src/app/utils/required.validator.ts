import { AbstractControl } from "@angular/forms";

export function Required(control: AbstractControl) {
    const value = control.value

    if (value == undefined || value == null) {
      return { notFilled: true };
    }

    if(String(value) == ''){
        return { notFilled: true };
    }

    return null;
  }