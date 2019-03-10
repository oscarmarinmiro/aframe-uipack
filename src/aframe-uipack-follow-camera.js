
AFRAME.registerComponent('uipack-follow-camera', {
    schema: {
        y_diff: { type: 'number', default: -1.6},
    },

    init: function () {

        var self = this;

        self.frame_count = 0;


        // Annotate pointer to camera on scene 'mounted' or on the fly it camera exists

        if (!('camera' in self.el.sceneEl)) {

            self.el.sceneEl.addEventListener("renderstart", function (e) {
                self.camera = self.el.sceneEl.camera;
            });
        }
        else {
            self.camera = self.el.sceneEl.camera;
        }
    },

    tick: function() {

        var self = this;

        self.frame_count++;

        if(self.frame_count % AFRAME.UIPACK.UIPACK_CONSTANTS.menu_tick_check === 0) {

                if(self.camera) {

                    var cam_position = self.camera.el.getAttribute("position");

                    self.el.setAttribute("position",{x: cam_position.x, y: self.data.y_diff, z: cam_position.z});

                }
        }


    }
});
