var Widget = (function () {
    function Widget(widgetSelector, preWidgetSelector) {
        this.displaWidget = false;
        this.displayPreWidget = true;
        this.widget = document.querySelector(widgetSelector);
        this.preWidget = document.querySelector(preWidgetSelector);
    }
    Widget.prototype.dich = function () {
        alert('DICH!!!');
    };
    Widget.prototype.showWidget = function () {
        this.widget.style.display = (this.displaWidget) ? 'block' : 'none';
        this.preWidget.style.display = (this.displayPreWidget) ? 'block' : 'none';
    };
    Widget.prototype.togleWidget = function () {
        this.displaWidget = !this.displaWidget;
        this.displayPreWidget = !this.displayPreWidget;
        this.showWidget();
    };
    return Widget;
}());
var widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
widget.preWidget.addEventListener("click", widget.togleWidget);
