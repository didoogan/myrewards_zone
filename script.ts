class Widget {
    displaWidget: boolean = false;
    displayPreWidget: boolean = true;
    widget: any;
    preWidget: any;

    constructor(widgetSelector: string, preWidgetSelector: string) {
        this.widget = document.querySelector(widgetSelector);
        this.preWidget = document.querySelector(preWidgetSelector);
    }

    dich(): void {
        alert('DICH!!!');
    }
    showWidget(): void {
        this.widget.style.display = (this.displaWidget)? 'block' : 'none';
        this.preWidget.style.display = (this.displayPreWidget)? 'block' : 'none';
    }
    togleWidget(): void {
        this.displaWidget = !this.displaWidget;
        this.displayPreWidget = !this.displayPreWidget;
        this.showWidget()
    }

 }

let widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
