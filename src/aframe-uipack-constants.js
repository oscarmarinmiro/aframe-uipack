
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.UIPACK = AFRAME.UIPACK || {

    constants: {
        'default_theme': "dark",
    },

    cache: {

    },

    paths: {
        click_sound: "https://cdn.dataverse.xyz/audio/click.mp3",
        hover_sound: "https://cdn.dataverse.xyz/audio/hover.mp3",
        photo_thumbnail: "https://cdn.dataverse.xyz/img/plaholder-image.png",
        video_thumbnail: "https://cdn.dataverse.xyz/img/placeholder-video.png",
        viz_thumbnail: "https://cdn.dataverse.xyz/img/placeholder-vis.png",
        loading_thumbnail_static: "https://cdn.dataverse.xyz/img/loading_static.jpg"
    },

    dmms: {
        'close_button': 40,
        'plus_button': 40,
        'label': 20,
        'big_label': 30,
        'sublabel': 16,
        'subtitle': 12,
        'min_text': 1,
        'map_label': 8,
        'map_attribution': 20
    },

    animation : {
        geo: 500,
        button: 500
    },

    distances : {
        close: 1.75,
        panel: 1.5
    },


    height: 1.6,


    UIPACK_CONSTANTS : {
        button_hover: 1000,
        menu_pitch: -90,
        menu_begin_pitch: -20,
        menu_distance : 1.3,
        menu_tick_check: 1,
        offset_player : 0.30,
        offset_buttons : 0.9,
        offset_icons : 0.15,
        icon_spacing : 0.05,
        menu_player_width: 1.0,
        menu_player_height: 0.1,
        menu_player_button_radius: 0.03,
        button_spacing : 0.1,
        menu_button_width : 3.0,
        icon_path :  "themes/dark/icons/",
        button_radius : 0.05,
        button_distance : 2.9,
        button_elevation : 1.8,
        button_offset : 0.1,
        arc_color: "red",
        thumbnail_distance:3.1,
        thumbnail_elevation: 1.8,
        thumbnail_icon: "arrow-up.png",
        play_icon: "play-circle-o.png",
        pause_icon: "pause-circle-o.png",
        label_distance: 3.1,
        label_elevation: 1.8,
        label_front_gap : 0.1,
        label_width: 3.0
    },

    themes :
    {
        'light': {
            'default_color': '#CCCCCC',
            'cursor_color': '#F91100',
            'arc_color': '#F91100',
            'icon_path': 'https://cdn.dataverse.xyz/themes/dark/icons',
            'player_background': "white",
            'player_text_color': "black",
            'player_font': '25px Roboto'
        },
        'dark': {
            'default_color': '#333333',
            'cursor_color': '#F91100',
            'arc_color': '#F91100',
            'icon_path': 'https://cdn.dataverse.xyz/themes/light/icons',
            'player_background': "#000000",
            'player_text_color': "white",
            'player_font': '25px Roboto'
        }
    }
};
