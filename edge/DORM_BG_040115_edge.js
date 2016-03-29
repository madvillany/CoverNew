/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='edge/images/dorm/',
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
                            id: 'headboard',
                            type: 'image',
                            rect: ['1249px', '867px', '451px', '351px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"headboard.svg",'0px','0px']
                        },
                        {
                            id: 'pillow1',
                            type: 'image',
                            rect: ['1475px', '-89px', '166px', '89px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"pillow1.svg",'0px','0px']
                        },
                        {
                            id: 'pillow2',
                            type: 'image',
                            rect: ['1319px', '500px', '166px', '89px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"pillow2.svg",'0px','0px']
                        },
                        {
                            id: 'bed2',
                            type: 'image',
                            rect: ['1245px', '578px', '412px', '197px', 'auto', 'auto'],
                            opacity: '1',
                            fill: ["rgba(0,0,0,0)",im+"bed.svg",'0px','0px']
                        },
                        {
                            id: 'blanket',
                            type: 'image',
                            rect: ['1475px', '578px', '204px', '152px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"blanket.svg",'0px','0px']
                        },
                        {
                            id: 'fridge',
                            type: 'image',
                            rect: ['2426px', '396px', '171px', '382px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"fridge.svg",'0px','0px']
                        },
                        {
                            id: 'bookshelf',
                            type: 'image',
                            rect: ['1251px', '342px', '448px', '10px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"bookshelf.svg",'0px','0px']
                        },
                        {
                            id: 'shelfitems',
                            type: 'image',
                            rect: ['1270px', '271px', '415px', '152px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"shelfitems.svg",'0px','0px'],
                            transform: [[],[],[],['1','0']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1920px', '836px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(0,167,142,1.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 2125.6511046004,
                    autoPlay: true,
                    data: [
                        [
                            "eid317",
                            "skewX",
                            0,
                            1250,
                            "easeInOutBack",
                            "${bed2}",
                            '-23deg',
                            '0deg'
                        ],
                        [
                            "eid328",
                            "top",
                            1126,
                            1000,
                            "easeOutBounce",
                            "${pillow2}",
                            '-95px',
                            '500px'
                        ],
                        [
                            "eid335",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${fridge}",
                            '2426px',
                            '912px'
                        ],
                        [
                            "eid327",
                            "top",
                            750,
                            1000,
                            "easeOutBounce",
                            "${pillow1}",
                            '-89px',
                            '506px'
                        ],
                        [
                            "eid309",
                            "top",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${headboard}",
                            '867px',
                            '427px'
                        ],
                        [
                            "eid310",
                            "opacity",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${headboard}",
                            '0',
                            '1'
                        ],
                        [
                            "eid337",
                            "left",
                            402,
                            1250,
                            "easeInOutCubic",
                            "${bookshelf}",
                            '2765px',
                            '1251px'
                        ],
                        [
                            "eid322",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${blanket}",
                            '2196px',
                            '1475px'
                        ],
                        [
                            "eid336",
                            "skewX",
                            0,
                            1250,
                            "easeInOutBack",
                            "${fridge}",
                            '-23deg',
                            '0deg'
                        ],
                        [
                            "eid313",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${bed2}",
                            '1990px',
                            '1269px'
                        ],
                        [
                            "eid353",
                            "top",
                            1352,
                            474,
                            "easeInOutCubic",
                            "${shelfitems}",
                            '271px',
                            '190px'
                        ],
                        [
                            "eid354",
                            "scaleY",
                            1352,
                            474,
                            "easeInOutCubic",
                            "${shelfitems}",
                            '0',
                            '1'
                        ],
                        [
                            "eid323",
                            "skewX",
                            0,
                            1250,
                            "easeInOutBack",
                            "${blanket}",
                            '-23deg',
                            '0deg'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("edge/DORM_BG_040115_edgeActions.js");
})("EDGE-91100205");
