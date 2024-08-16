AFRAME.registerComponent('gesture-handler-horizontal', {
  schema: {
    enabled: { default: true },
  },

  init: function () {
    this.internalState = {
      previousRotation: null,
    };

    this.handleDrag = this.handleDrag.bind(this);
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener('onefingermove', this.handleDrag);
    } else {
      this.el.sceneEl.removeEventListener('onefingermove', this.handleDrag);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('onefingermove', this.handleDrag);
  },

  handleDrag: function (event) {
    const { previousRotation } = this.internalState;
    const currentPosition = event.detail.position;

    if (previousRotation) {
      const deltaX = currentPosition.x - previousRotation.x;
      this.el.object3D.rotation.y += deltaX * 2;  // Multiplique para ajustar a sensibilidade
    }

    this.internalState.previousRotation = currentPosition;
  },
});
