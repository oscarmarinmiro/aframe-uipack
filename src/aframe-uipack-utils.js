
AFRAME.UIPACK = AFRAME.UIPACK || {};

AFRAME.UIPACK.utils = {

    // Insert a 'controls' menu for a video with 'theme' and 'open' params that 'act' on 'el' DOM element (a video component)

    // Also, sets cursor based on desktop, mobile or headset

    insert_immersive_video_menu: function(options) {

        var options = options || {};

        var theme = options.theme || AFRAME.UIPACK.constants.default_theme;

        var open = ('open' in options) ? options.open : true;

        var el = options.el;

        function insert_cursor_and_menu(scene, element, theme, open) {

            var video_id = element.components["immersive-video"].video_id;

            AFRAME.UIPACK.utils.set_cursor(scene);

            var menu = document.createElement("a-entity");

            menu.setAttribute("uipack-menu", {

                theme: theme,

                icons: [], buttons: [], media_id: video_id, open: open

            });


            scene.appendChild(menu);

        }

        var scene = document.querySelector("a-scene");

        if (scene.renderStarted) {
            insert_cursor_and_menu(scene, el, theme, open);
        }
        else {
            scene.addEventListener("renderstart", function () {
                insert_cursor_and_menu(scene, el, theme, open);
            });
        }
    },

    point_to_camera: function(point, camera, distance){

          var camera_pos = camera.getWorldPosition().clone();

          var icon_pos = new THREE.Vector3(point.x, point.y, point.z).clone();

          var dir = icon_pos.clone().sub(camera_pos).projectOnPlane(new THREE.Vector3(0,1,0)).normalize().setLength(distance);

          var y_rotation = (Math.atan2(dir.x,dir.z) * 180) / Math.PI;

          var position = dir.clone().add(camera_pos);

          return {position: position, y_rotation: y_rotation}

    },


    set_cursor: function (scene, theme) {

        var self = this;

        if(theme === undefined){
            theme = AFRAME.UIPACK.constants.default_theme;
        }

        self.scene = scene;

        self.camera = scene.camera.el;

        self.theme_data = AFRAME.UIPACK.themes[theme];

        console.log("SETTING CURSOR");

        console.log("HEADSET", AFRAME.utils.checkHeadsetConnected(), AFRAME.utils.isMobile(), AFRAME.utils.isGearVR(), navigator.userAgent);

        var mobile = AFRAME.utils.isMobile();
        var headset = AFRAME.utils.checkHeadsetConnected();

        var desktop = !(mobile) && !(headset);

        // Oculus Go or GearVR;

        if (AFRAME.utils.isMobile() && AFRAME.utils.isGearVR()) {
            headset = true;
            mobile = false;
        }

        // htc, oculus or gearvr

        if ((headset) && (!(mobile))) {

            self.laser_controls = document.createElement("a-entity");

            self.laser_controls.setAttribute("laser-controls", {});

            self.laser_controls.setAttribute("line", {color: self.theme_data.cursor_color});

            self.laser_controls.setAttribute("raycaster", {objects: ".clickable", near: 0.0, enabled: false});

            self.scene.appendChild(self.laser_controls);

            // Wait for 'enterVR' to activate raycaster. Otherwise, OculusGo browser will do weird things before enterVR, or even crash...

            self.scene.addEventListener("enter-vr", function(){
                console.log("VR ENTERED");

                self.laser_controls.setAttribute("raycaster", {objects: ".clickable", near: 0.0, enabled: true});

            })



        }
        // mobile or desktop
        else {
            self.cursor = document.createElement("a-entity");

            // console.log("CAMERA", self.camera);

            self.camera.appendChild(self.cursor);

            self.cursor.setAttribute("id", "cursor");

            self.cursor.setAttribute("cursor", {
                rayOrigin: desktop ? "mouse" : "entity",
                fuse: true,
                fuseTimeout: AFRAME.UIPACK.animation.button
            });
            self.cursor.setAttribute("position", {x: 0, y: 0, z: -1});
            self.cursor.setAttribute("geometry", {primitive: "ring", radiusInner: 0.01, radiusOuter: 0.02});
            self.cursor.setAttribute("material", {color: self.theme_data.cursor_color, shader: "flat"});
            self.cursor.setAttribute("visible", !desktop);
            self.cursor.setAttribute("raycaster", {objects: ".clickable", near: 0.0});


        }



        AFRAME.UIPACK.cursor_mode = desktop ? "desktop" : (mobile ? "gaze" : "laser");

    }
};
