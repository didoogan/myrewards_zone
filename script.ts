class Widget {
    displaWidget: boolean = false;
    displayPreWidget: boolean = true;
    displayEmailInput: boolean = false;
    displayEmailForm: boolean = false;
    displayBodyContent: boolean = true;
    widget: HTMLInputElement;
    preWidget: HTMLInputElement;
    bodyContent: HTMLInputElement;
    emailForm: HTMLInputElement;
    formPassword: HTMLInputElement;
    thankDiv: HTMLInputElement;
    // buttons
    savePointBtn: HTMLInputElement;
    sendPasswordBtn: HTMLInputElement;

    constructor(widgetSelector: string, preWidgetSelector: string) {
        this.widget = <HTMLInputElement>document.querySelector(widgetSelector);
        this.preWidget = <HTMLInputElement>document.querySelector(preWidgetSelector);
        this.bodyContent = <HTMLInputElement>document.querySelector('#reward_widget .myreward_body_part');
        this.emailForm = <HTMLInputElement>document.querySelector("#reward_widget .reward_form_email");
        this.formPassword = <HTMLInputElement>document.querySelector("#reward_widget .reward_form_password");
        this.thankDiv = <HTMLInputElement>document.querySelector("#reward_widget .thank-you");
        // buttons
        this.savePointBtn = <HTMLInputElement>document.querySelector(".middle-part button");
        this.sendPasswordBtn= <HTMLInputElement>document.querySelector('input.send-password-button');
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
        document.querySelector('input.send-email-button').addEventListener("click", this.showPasswordInput.bind(this));
        this.sendPasswordBtn.addEventListener("click", this.confirmPassworForm.bind(this));
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

 }

let widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
// widget.preWidget.addEventListener('click', widget.togleWidget.bind(widget));
widget.addListeners();


