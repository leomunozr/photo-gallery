class PanelController {
  constructor() {
  }

  setIndexes() {
    let temp = this.slides.splice(0, this.selected);
    this.slides = this.slides.concat(temp);

    this.slides.map((slide, i) => slide.id = i);
  }
}

export default PanelController;
