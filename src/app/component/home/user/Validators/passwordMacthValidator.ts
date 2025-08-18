import { AbstractControl, Validators, ValidatorFn, ValidationErrors } from "@angular/forms";

// return true, if password and confirm password are miss match by comparing their values
export function passwordMatchValidator() : ValidatorFn {
   return (formGroup : AbstractControl) : ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if(password?.value !== confirmPassword?.value) {
        return {passwordMissMatch : true}
        
    }
    return null;
   };
}