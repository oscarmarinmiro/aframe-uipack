AFRAME.registerComponent('uipack-text-panel', {
    schema: {
        title: {type: 'string', default: ""},
        text: {type: 'string', default: ""},
        point_from: {type: 'vec3', default: {x:0, y:0, z:0}},
        cam_distance: {type: 'number', default: 2},
        baseline: {type: 'string', default: "top"},
        align: {type: 'string', default: 'center'},
        anchor: {type: 'string', default: 'center'},
        absolute:  {type: 'boolean', default: true},
        close: {type: 'boolean', default: true},
        close_icon: {type: 'string', default: ""},
        close_radius: {type: 'number', default: 0.05},
        color: {'type': 'color', default: "black"},
        background: {'type': 'color', default: "white"},
        font: {'type': 'string', default: "roboto"},
        width: {'type': 'number', default: 2.0},
        height: {'type': 'number', default: 1.0},
        wrap_count_title: {'type': 'number', default: 15},
        wrap_count: {'type': 'number', default: 40},

    },

    init: function () {

        console.log("INIT PANEL");

        this.el.classList.add("uipack");
        this.el.classList.add("uipack-panel");
        this.el.classList.add("uipack-text-panel");

    },
    update: function (oldData) {

        this.frame = document.createElement("a-plane");

        this.frame.setAttribute("width", this.data.width);
        this.frame.setAttribute("height", this.data.height);
        this.frame.setAttribute("material", {color: this.data.background, shader: "flat"});

        if(this.title!== "") {
            this.title = document.createElement("a-text");
            this.title.setAttribute("value", this.data.title);
            this.title.setAttribute("font", this.data.font);
            this.title.setAttribute("width", this.data.width*0.9);
            this.title.setAttribute("wrap-count", this.data.wrap_count_title + 2);
            this.title.setAttribute("anchor", this.data.anchor);
            this.title.setAttribute("align", this.data.align);
            this.title.setAttribute("color", this.data.color);
            this.title.setAttribute("position", {x:0, y: (this.data.height/2) * 0.70, z:0});
            this.el.appendChild(this.title);
        }

        this.main_text = document.createElement("a-text");
        this.main_text.setAttribute("value", this.data.text);
        this.main_text.setAttribute("font", this.data.font);
        this.main_text.setAttribute("width", this.data.width*0.9);
        this.main_text.setAttribute("wrap-count", this.data.wrap_count + 2);
        this.main_text.setAttribute("anchor", this.data.anchor);
        this.main_text.setAttribute("align", this.data.align);
        this.main_text.setAttribute("baseline", this.data.baseline);
        this.main_text.setAttribute("color", this.data.color);

        if(this.data.baseline === "top") {
            this.main_text.setAttribute("position", {
                x: 0,
                y: (this.data.title !== "") ? this.data.height / 2 * 0.4 : this.data.height / 2 * 0.70,
                z: 0
            });
        }

        if(this.data.baseline === "center") {
            this.main_text.setAttribute("position", {
                x: 0,
                y: 0,
                z: 0
            });
        }

        if(this.data.baseline === "bottom") {
            this.main_text.setAttribute("position", {
                x: 0,
                y: -this.data.height/2 * 0.9,
                z: 0
            });
        }


        // Reposition based on point_from, cam_distance and actual cam_position

        if(!this.absolute){

        }

        var element = this.el;

        // Close button?

        if(this.data.close){

              var icon = document.createElement("a-entity");

              icon.setAttribute("position", {x:0, y: -(this.data.height/2), z:0.01});

              icon.setAttribute("uipack-button", {
                  icon_name: "static/icons/times.png",
                  radius: this.data.close_radius
              });

              this.el.appendChild(icon);

              var node = this.el;

              icon.addEventListener("clicked", function () {


                  element.emit("closed");

                  var close_function = function(){
                      node.parentNode.removeChild(node);
                  };

                  // Remove panel

                  setTimeout(close_function, 500);

              });

        }



        this.el.appendChild(this.frame);
        this.el.appendChild(this.main_text);

    }
});

