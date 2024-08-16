AFRAME.registerComponent('gesture-handler-horizontal', {
  schema: {
    enabled: { default: true },
  },

  init: function () {
    this.internalState = {
      previousPosition: null,
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
    const { previousPosition } = this.internalState;
    const currentPosition = event.detail.position;

    if (previousPosition) {
      const deltaX = currentPosition.x - previousPosition.x;
      this.el.object3D.position.x += deltaX;
    }

    this.internalState.previousPosition = currentPosition;
  },
});
