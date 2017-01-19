class Widget {
    displaWidget: boolean = false;
    displayPreWidget: boolean = true;
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
    preEmailP: HTMLInputElement;
    serverUrl: string = 'http://127.0.0.1:8000';

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

        
}

    showWidget(): void {
        // this.widget.style.display = (this.displaWidget)? 'block' : 'none';
        this.preWidget.style.display = (this.displayPreWidget)? 'block' : 'none';
        (this.displaWidget)? this.animateLeft(this.widget, -315, 0) : this.animateLeft(this.widget, 0, -315);

    }
    togleWidget(): void {
        this.displaWidget = !this.displaWidget;
        this.displayPreWidget = !this.displayPreWidget;
        this.showWidget()
    }
    addListeners(): void {
        let cross = document.querySelector("#reward_widget span.reward_cross");
        cross.addEventListener('click', this.togleWidget.bind(this));
        this.preWidget.addEventListener("click", this.togleWidget.bind(this));
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
            this.animateLeft(obj, (from < to)? from+5 : from-5, to);

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
    signin(): any {
        let email = (<any> document.getElementById("signin-input")).value;
        let response = this.post_request(`${this.serverUrl}/my_points/widget_login/`,
             {email: email}, this.login_suc.bind(this), this.login_err.bind(this));
    }
    showSignupForm(): any {
        this.emailForm.style.display = 'none';
        this.formPassword.style.display = 'block';
        
    }
    login_suc(obj: any): void {
        console.log(obj);
        this.emailForm.style.display = 'none';
        this.thankDiv.style.display = 'block';
    }
    login_err(): void {
        this.preEmailP.innerText = "Such email doesn't exist in database";
        this.preEmailP.className = "pre_widget-error";
    }
    post_request(url: string, data: Object, callBack_suc, callBack_err): any {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var info = JSON.parse(xhr.responseText);
                callBack_suc(info);
            } else {
                callBack_err();
            }
        };
        xhr.send(JSON.stringify(data));
    }


 }

let widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
widget.addListeners();


