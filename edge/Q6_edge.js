/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='edge/images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'ring',
                            type: 'image',
                            rect: ['795px', '449px', '330px', '330px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"ring.svg",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'dials',
                            type: 'image',
                            rect: ['859px', '513px', '202px', '202px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"dials.svg",'0px','0px'],
                            transform: [[],['-176'],[],['0','0']]
                        },
                        {
                            id: 'nesw',
                            display: 'none',
                            type: 'image',
                            rect: ['837px', '491px', '245px', '245px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"nesw.svg",'0px','0px'],
                            transform: [[],[],[],['0.9','0.9']]
                        },
                        {
                            id: 'spinner',
                            type: 'image',
                            rect: ['854px', '508px', '212px', '212px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"spinner.svg",'0px','0px'],
                            transform: [[],['158'],[],['0','0']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1920px', '840px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(0,171,159,0.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    data: [
                        [
                            "eid13",
                            "scaleX",
                            81,
                            1419,
                            "easeOutBounce",
                            "${ring}",
                            '0',
                            '1'
                        ],
                        [
                            "eid8",
                            "scaleY",
                            384,
                            786,
                            "easeOutExpo",
                            "${dials}",
                            '0',
                            '1'
                        ],
                        [
                            "eid27",
                            "scaleY",
                            948,
                            552,
                            "easeOutBounce",
                            "${nesw}",
                            '0.9',
                            '1'
                        ],
                        [
                            "eid21",
                            "display",
                            948,
                            0,
                            "easeOutElastic",
                            "${nesw}",
                            'none',
                            'block'
                        ],
                        [
                            "eid20",
                            "scaleY",
                            0,
                            1170,
                            "easeOutBounce",
                            "${spinner}",
                            '0',
                            '1'
                        ],
                        [
                            "eid7",
                            "scaleX",
                            384,
                            786,
                            "easeOutExpo",
                            "${dials}",
                            '0',
                            '1'
                        ],
                        [
                            "eid14",
                            "scaleY",
                            81,
                            1419,
                            "easeOutBounce",
                            "${ring}",
                            '0',
                            '1'
                        ],
                        [
                            "eid26",
                            "scaleX",
                            948,
                            552,
                            "easeOutBounce",
                            "${nesw}",
                            '0.9',
                            '1'
                        ],
                        [
                            "eid23",
                            "rotateZ",
                            0,
                            1500,
                            "easeOutCirc",
                            "${dials}",
                            '-176deg',
                            '0deg'
                        ],
                        [
                            "eid16",
                            "rotateZ",
                            0,
                            2000,
                            "easeOutQuad",
                            "${spinner}",
                            '158deg',
                            '0deg'
                        ],
                        [
                            "eid19",
                            "scaleX",
                            0,
                            1170,
                            "easeOutBounce",
                            "${spinner}",
                            '0',
                            '1'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("edge/Q6_edgeActions.js");
})("EDGE-7224463");
