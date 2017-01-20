var Widget = (function () {
    function Widget(widgetSelector, preWidgetSelector) {
        this.displaWidget = false;
        this.displayPreWidget = true;
        this.displayEmailInput = false;
        this.displayEmailForm = false;
        this.displayBodyContent = true;
        this.serverUrl = 'http://127.0.0.1:8000';
        this.widget = document.querySelector(widgetSelector);
        this.preWidget = document.querySelector(preWidgetSelector);
        this.bodyContent = document.querySelector('#reward_widget .myreward_body_part');
        this.thankDiv = document.querySelector("#reward_widget .thank-you");
        // forms
        this.emailForm = document.querySelector("#reward_widget .reward_form_email");
        this.formPassword = document.querySelector("#reward_widget .reward_form_password");
        // buttons
        this.savePointBtn = document.querySelector(".middle-part button");
        this.sendPasswordBtn = document.querySelector('input.send-password-button');
        // p
        this.preEmailP = document.querySelector('p.enter-email');
        this.preFormPswP = document.querySelector("p.password-form-p");
    }
    Widget.prototype.showWidget = function () {
        // this.widget.style.display = (this.displaWidget)? 'block' : 'none';
        this.preWidget.style.display = (this.displayPreWidget) ? 'block' : 'none';
        (this.displaWidget) ? this.animateLeft(this.widget, -315, 0) : this.animateLeft(this.widget, 0, -315);
    };
    Widget.prototype.togleWidget = function () {
        this.displaWidget = !this.displaWidget;
        this.displayPreWidget = !this.displayPreWidget;
        this.showWidget();
    };
    Widget.prototype.addListeners = function () {
        var cross = document.querySelector("#reward_widget span.reward_cross");
        cross.addEventListener('click', this.togleWidget.bind(this));
        this.preWidget.addEventListener("click", this.togleWidget.bind(this));
        // document.querySelector('input.send-email-button').addEventListener("click", this.showPasswordInput.bind(this));
        // this.sendPasswordBtn.addEventListener("click", this.confirmPassworForm.bind(this));
    };
    Widget.prototype.animateLeft = function (obj, from, to) {
        var _this = this;
        if (from == to) {
            return;
        }
        else {
            var box = obj;
            box.style.marginLeft = from + "px";
            setTimeout(function () {
                _this.animateLeft(obj, (from < to) ? from + 5 : from - 5, to);
            }, 2);
        }
    };
    Widget.prototype.hideShowEmailForm = function () {
        this.displayBodyContent = !this.displayBodyContent;
        this.displayEmailInput = !this.displayEmailInput;
        this.emailForm.style.display = (this.displayEmailInput) ? "block" : "none";
        this.bodyContent.style.display = (this.displayBodyContent) ? "block" : "none";
        // disable saveMyPoint button 
        this.savePointBtn.disabled = true;
        this.savePointBtn.className += 'disable-btn';
    };
    Widget.prototype.showPasswordInput = function () {
        this.emailForm.style.display = "none";
        this.formPassword.style.display = "block";
    };
    Widget.prototype.confirmPassworForm = function () {
        this.formPassword.style.display = "none";
        this.thankDiv.style.display = "block";
    };
    Widget.prototype.signin = function () {
        var email = document.querySelector("#reward_widget #signin-input");
        console.log("email = " + email);
        if (email.validity.valid) {
            this.post_request(this.serverUrl + "/my_points/widget_login/", { email: email.value }, this.login_suc.bind(this), this.login_err.bind(this));
        }
    };
    Widget.prototype.login_suc = function (obj) {
        this.emailForm.style.display = 'none';
        this.thankDiv.style.display = 'block';
    };
    Widget.prototype.login_err = function (obj) {
        this.preEmailP.innerText = obj.error;
        this.preEmailP.className = "pre_widget-error";
    };
    Widget.prototype.showSignupForm = function () {
        this.emailForm.style.display = 'none';
        this.formPassword.style.display = 'block';
    };
    Widget.prototype.signup = function () {
        var email = document.getElementById("reward_signup-form-input");
        var password1 = document.getElementById("reward_signup-form-password1");
        var password2 = document.getElementById("reward_signup-form-password2");
        if (email.validity.valid && password1.validity.valid && password2.validity.valid) {
            if (password1.value !== password2.value) {
                this.preFormPswP.innerText = "Passwords sholuld be equal";
                this.preFormPswP.className = "pre_widget-error signup-form-error";
                return;
            }
            this.post_request(this.serverUrl + "/my_points/widget_signup/", { email: email.value, password: password1.value }, this.signup_suc.bind(this), this.signup_err.bind(this));
        }
    };
    Widget.prototype.signup_suc = function (obj) {
        console.log("success");
        this.formPassword.style.display = "none";
        this.thankDiv.style.display = "block";
    };
    Widget.prototype.signup_err = function (obj) {
        console.log("error");
        this.preFormPswP.innerText = obj.error;
        this.preFormPswP.className = "pre_widget-error signup-form-error";
    };
    Widget.prototype.post_request = function (url, data, callBack_suc, callBack_err) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                callBack_suc(response);
            }
            else {
                var response = JSON.parse(xhr.responseText);
                callBack_err(response);
            }
        };
        xhr.send(JSON.stringify(data));
    };
    return Widget;
}());
var widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
widget.addListeners();
