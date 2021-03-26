import { FormControl } from "@angular/forms";

export class CustomValidators {

    static startWithNumber(control: FormControl) {

        let firstChar = control?.value.charAt(0);
        if (firstChar && !isNaN(firstChar)) {
            return { 'startWithNumber': true };
        } else {
            return null;
        }

    }

    static titleTaken(control: FormControl) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (control.value === 'title') {
                    resolve({ 'titleTaken': true });
                } else {
                    resolve(null);
                }

            }, 2000);
        });
    };

}
