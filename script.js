var Widget = (function () {
    function Widget(widgetSelector, preWidgetSelector) {
        this.displaWidget = false;
        this.displayPreWidget = true;
        this.displayEmailInput = false;
        this.displayEmailForm = false;
        this.displayBodyContent = true;
        this.widget = document.querySelector(widgetSelector);
        this.preWidget = document.querySelector(preWidgetSelector);
        this.bodyContent = document.querySelector('#reward_widget .myreward_body_part');
        this.emailForm = document.querySelector("#reward_widget .reward_form_email");
        this.formPassword = document.querySelector("#reward_widget .reward_form_password");
        this.thankDiv = document.querySelector("#reward_widget .thank-you");
        // buttons
        this.savePointBtn = document.querySelector(".middle-part button");
        this.sendPasswordBtn = document.querySelector('input.send-password-button');
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
        document.querySelector('input.send-email-button').addEventListener("click", this.showPasswordInput.bind(this));
        this.sendPasswordBtn.addEventListener("click", this.confirmPassworForm.bind(this));
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
    return Widget;
}());
var widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
// widget.preWidget.addEventListener('click', widget.togleWidget.bind(widget));
widget.addListeners();
