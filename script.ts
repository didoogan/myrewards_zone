class Widget {
    displaWidget: boolean = false;
    displayPreWidget: boolean = true;
    widget: any;
    preWidget: any;

    constructor(widgetSelector: string, preWidgetSelector: string) {
        this.widget = document.querySelector(widgetSelector);
        this.preWidget = document.querySelector(preWidgetSelector);
    }

    showWidget(): void {
        this.widget.style.display = (this.displaWidget)? 'block' : 'none';
        this.preWidget.style.display = (this.displayPreWidget)? 'block' : 'none';

        let args = [this.widget, '-315px', '315px'];
        // if (this.displaWidget) {
        //     this.animateLeft(this.widget, -315, 0 );
        // }
        (this.displaWidget)? this.animateLeft(this.widget, -315, 0, 'left' ) : this.animateLeft(this.widget, 0, -315, 'left' );

    }
    togleWidget(): void {
        this.displaWidget = !this.displaWidget;
        this.displayPreWidget = !this.displayPreWidget;
        this.showWidget()
    }
    addListeners(): void {
        let cross = document.querySelector("#reward_widget span.reward_cross");
        // Add listener to cross click
        cross.addEventListener('click', this.togleWidget.bind(this));
        
        // Add listener to pre_widget click
        this.preWidget.addEventListener("click", this.togleWidget.bind(this));
    }
    animateLeft (obj: any, from: number, to: number, direction: string): void{
       if(from >= to){         
           // obj.style.visibility = 'hidden';
       return;  
       }
       else {
        var box = obj;
        box.style.marginLeft = from + "px";
        setTimeout(() => {
            this.animateLeft(obj, from+5, to, direction);

        }, 2) 
       }
    }

 }

let widget = new Widget("#reward_widget", "#pre_widget");
widget.showWidget();
// widget.preWidget.addEventListener('click', widget.togleWidget.bind(widget));
widget.addListeners();


