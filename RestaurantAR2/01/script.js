AFRAME.registerComponent('gesture-handler', {
    schema: {
        enabled: {default: true}
    },
    init: function () {
        this.handleRotation = this.handleRotation.bind(this);
        this.el.sceneEl.addEventListener('touchmove', this.handleRotation);
    },
    handleRotation: function (event) {
        if (!this.data.enabled) return;
        let touch = event.touches[0];
        let rotation = this.el.getAttribute('rotation');
        rotation.y += touch.movementX * 0.1;
        this.el.setAttribute('rotation', rotation);
    },
    remove: function () {
        this.el.sceneEl.removeEventListener('touchmove', this.handleRotation);
    }
});
