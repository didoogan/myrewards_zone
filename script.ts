class Widget {
    displaWidget: boolean = false;
    displayPreWidget: boolean = false;
    displayEmailInput: boolean = false;
    displayEmailForm: boolean = false;
    displayBodyContent: boolean = true;
    widget: HTMLInputElement;
    preWidget: HTMLInputElement;
    bodyContent: HTMLInputElement;
    thankDiv: HTMLInputElement;
    // forms
    emailForm: HTMLInputElement;
    formPassword: HTMLInputElement;
    // buttons
    savePointBtn: HTMLInputElement;
    sendPasswordBtn: HTMLInputElement;
    serverUrl: string = 'http://127.0.0.1:8000';
    // p
    preEmailP: HTMLInputElement;
    preFormPswP: HTMLInputElement;

    constructor(widgetSelector: string, preWidgetSelector: string) {
        this.widget = <HTMLInputElement>document.querySelector(widgetSelector);
        this.preWidget = <HTMLInputElement>document.querySelector(preWidgetSelector);
        this.bodyContent = <HTMLInputElement>document.querySelector('#reward_widget .myreward_body_part');
        this.thankDiv = <HTMLInputElement>document.querySelector("#reward_widget .thank-you");
        // forms
        this.emailForm = <HTMLInputElement>document.querySelector("#reward_widget .reward_form_email");
        this.formPassword = <HTMLInputElement>document.querySelector("#reward_widget .reward_form_password");
        // buttons
        this.savePointBtn = <HTMLInputElement>document.querySelector(".middle-part button");
        this.sendPasswordBtn= <HTMLInputElement>document.querySelector('input.send-password-button');
        // p
        this.preEmailP = <HTMLInputElement>document.querySelector('p.enter-email');
        this.preFormPswP = <HTMLInputElement>document.querySelector("p.password-form-p");

        
}

    togleWidget(): void {
        this.displaWidget = !this.displaWidget;
        (this.displaWidget)? 
        this.animateLeft(this.widget, -294, 0) : 
        this.animateLeft(this.widget, 0, -294);
    }
    addListeners(): void {
        let cross = document.querySelector("#reward_widget span.reward_cross");
        // cross.addEventListener('click', this.togleWidget.bind(this));
        // this.preWidget.addEventListener("click", this.togleWidget.bind(this));
        // document.querySelector('input.send-email-button').addEventListener("click", this.showPasswordInput.bind(this));
        // this.sendPasswordBtn.addEventListener("click", this.confirmPassworForm.bind(this));
    }
    animateLeft (obj: any, from: number, to: number): void {
       if(from == to){         
           return;  
       }
       else {
        var box = obj;
        box.style.marginLeft = `${from}px`;
        setTimeout(() => {
            this.animateLeft(obj, (from < to)? from+6 : from-6, to);

        }, 2) 
       }
    }
    hideShowEmailForm ():void {
        this.displayBodyContent = !this.displayBodyContent;
        this.displayEmailInput = !this.displayEmailInput;
        this.emailForm.style.display = (this.displayEmailInput)? "block": "none";
        this.bodyContent.style.display = (this.displayBodyContent)? "block": "none";
        // disable saveMyPoint button 
        this.savePointBtn.disabled = true;
        this.savePointBtn.className += 'disable-btn';

    }
    showPasswordInput (): void {
        this.emailForm.style.display = "none";
        this.formPassword.style.display = "block";
    }
    confirmPassworForm (): void {
        this.formPassword.style.display = "none";
        this.thankDiv.style.display = "block";
    }
    signin(): void {
        let email = (<any> document.querySelector("#reward_widget #signin-input"));
        if (email.validity.valid) {
            this.post_request(
                `${this.serverUrl}/my_points/widget_login/`,
                {email: email.value}, this.login_suc.bind(this), this.login_err.bind(this)
            );
        }
    }
    login_suc(obj: any): void {
        this.emailForm.style.display = 'none';
        this.thankDiv.style.display = 'block';
    }
    login_err(obj: any): void {
        this.preEmailP.innerText = obj.error;
        this.preEmailP.className = "pre_widget-error";
    }

    showSignupForm(): any {
        this.emailForm.style.display = 'none';
        this.formPassword.style.display = 'block';
        
    }
    signup(): void {
        let email = (<any> document.getElementById("reward_signup-form-input"));
        let password1 = (<any> document.getElementById("reward_signup-form-password1"));
        let password2 = (<any> document.getElementById("reward_signup-form-password2"));
        if (email.validity.valid && password1.validity.valid && password2.validity.valid) {
            if (password1.value !== password2.value) {
                this.preFormPswP.innerText = "Passwords sholuld be equal";
                this.preFormPswP.className = "pre_widget-error signup-form-error";
                return;
            }
            this.post_request(
              `${this.serverUrl}/my_points/widget_signup/`,
                {email: email.value, password: password1.value}, this.signup_suc.bind(this), this.signup_err.bind(this)  
            );
        }
    }
    signup_suc(obj: any): void {
        this.formPassword.style.display = "none";
        this.thankDiv.style.display = "block";
    }
    signup_err(obj: any): void {
        this.preFormPswP.innerText = obj.error;
        this.preFormPswP.className = "pre_widget-error signup-form-error";
    }

    post_request(url: string, data: Object, callBack_suc, callBack_err): any {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                callBack_suc(response);
            } else {
                let response = JSON.parse(xhr.responseText);
                callBack_err(response);
            }
        };
        xhr.send(JSON.stringify(data));
    }


 }

let widget = new Widget("#reward_widget", "#pre_widget");
widget.addListeners();


