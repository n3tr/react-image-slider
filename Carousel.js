
import Hammer from 'hammerjs';


export default class Carousel {

  constructor(el) {
    this.element = el;
    this.container = el.childNodes[0];
    this.panes = this.container.childNodes;
    this.pane_count = this.panes.length;
    this.pane_width = 0;
    this.current_pane = 0;

    this.setPaneDimensions();
    window.addEventListener('orientationchange', this.setPaneDimensions.bind(this));
    window.addEventListener('resize', this.setPaneDimensions.bind(this));
    window.addEventListener('load', this.setPaneDimensions.bind(this));

    this.hammer = new Hammer(el);
    this.handleHammer = this.handleHammer.bind(this);
    this.hammer.on('tap panend panleft panright swipeleft swiperight', this.handleHammer);

  }

  /**
   * show pane by index
   * @param   {Number}    index
   */
  showPane(index, animate) {
    // between the bounds
    index = Math.max(0, Math.min(index, this.pane_count-1));
    this.current_pane = index;

    var offset = -((100/ this.pane_count) * this.current_pane);

    this.setContainerOffset(offset, true);
  }

  next() { return this.showPane(this.current_pane + 1, true); };
  prev() { return this.showPane(this.current_pane - 1, true); };

  setContainerOffset(percent, animate) {
    this.container.classList.remove("animate");

    if(animate) {
      this.container.classList.add("animate");
    }

    var px = ((this.pane_width * this.pane_count) / 100) * percent;

    this.container.style.transform = "translate3d("+ percent +"%,0,0) scale3d(1,1,1)";
    // this.container.style.transform = "translate("+ percent +"%,0)";
    // return;
    //
    // else if(Modernizr.csstransforms) {
    //   container.css("transform", "translate("+ percent +"%,0)");
    // }
    //   else {
    //     var px = ((this.pane_width*this.pane_count) / 100) * percent;
    //     container.style.left = px + "px";
    //   }
  }

  handleHammer(ev) {
    ev.preventDefault();

    switch(ev.type) {
      case 'panright':
      case 'panleft':
      // stick to the finger
      var pane_offset = -(100/ this.pane_count) * this.current_pane;
      var drag_offset = ((100/ this.pane_width) * ev.deltaX) / this.pane_count;

      // slow down at the first and last pane
      if((this.current_pane == 0  && ev.direction == Hammer.DIRECTION_RIGHT) ||
         (this.current_pane == this.pane_count-1 && ev.direction == Hammer.DIRECTION_LEFT)) {
        drag_offset *= .4;
      }

      this.setContainerOffset(drag_offset + pane_offset);
      break;

    case 'swipeleft':
      this.next();
      ev.stop();
      break;
    //
    case 'swiperight':
      this.prev();
      ev.stop();
      break;

    case 'panend':
      // Left & Right
      // more then 50% moved, navigate
      if(Math.abs(ev.deltaX) > this.pane_width/2) {
        if(ev.direction ==  Hammer.DIRECTION_RIGHT) {
          this.prev();
        } else if(ev.direction ==  Hammer.DIRECTION_LEFT) {
          this.next();
        }else{
          this.showPane(this.current_pane, true);
        }
      }
      else {
        this.showPane(this.current_pane, true);
      }
    }
  }


  setPaneDimensions() {
    this.pane_width = this.element.offsetWidth;

    for (var i = 0; i < this.pane_count; i++) {
      this.panes[i].style.width = this.pane_width;
    }
    this.container.style.width = (this.pane_width * this.pane_count);
  }
}
