class ImageModalController {
  constructor($uibModalInstance, imageSelected) {
    this.$uibModalInstance = $uibModalInstance;
    this.imageSelected = imageSelected;
  }

  close() {
    this.$uibModalInstance.close();
  }
}

ImageModalController.$inject = [
  '$uibModalInstance',
  'imageSelected'];
export default ImageModalController;
