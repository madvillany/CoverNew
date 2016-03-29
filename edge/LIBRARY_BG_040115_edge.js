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
                            id: 'bookshelf2',
                            type: 'image',
                            rect: ['2058px', '85px', '292px', '558px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"bookshelf2.svg",'0px','0px'],
                            transform: [[],[],['-22']]
                        },
                        {
                            id: 'books',
                            type: 'image',
                            rect: ['880px', '-539px', '243px', '506px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"books.svg",'0px','0px']
                        },
                        {
                            id: 'books2',
                            type: 'image',
                            rect: ['878px', '103px', '267px', '508px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"books2.svg",'0px','0px']
                        },
                        {
                            id: 'books3',
                            type: 'image',
                            rect: ['876px', '127px', '267px', '484px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"books3.svg",'0px','0px']
                        },
                        {
                            id: 'chair',
                            type: 'image',
                            rect: ['1415px', '358px', '258px', '377px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"chair.svg",'0px','0px']
                        },
                        {
                            id: 'desk',
                            type: 'image',
                            rect: ['2068px', '482px', '500px', '258px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"desk.svg",'0px','0px']
                        },
                        {
                            id: 'clock',
                            type: 'image',
                            rect: ['1654px', '72px', '130px', '130px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"clock.svg",'0px','0px'],
                            transform: [[],['-360']]
                        },
                        {
                            id: 'art',
                            type: 'image',
                            rect: ['1274px', '72px', '280px', '188px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"art.svg",'0px','0px']
                        },
                        {
                            id: 'deskitems',
                            type: 'image',
                            rect: ['1322px', '323px', '443px', '164px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"deskitems.svg",'0px','0px']
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
                    duration: 1888,
                    autoPlay: true,
                    data: [
                        [
                            "eid370",
                            "top",
                            1112,
                            500,
                            "easeOutCubic",
                            "${books3}",
                            '-518px',
                            '127px'
                        ],
                        [
                            "eid360",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${bookshelf2}",
                            '2058px',
                            '864px'
                        ],
                        [
                            "eid373",
                            "left",
                            500,
                            1250,
                            "easeInOutCubic",
                            "${chair}",
                            '2189px',
                            '1415px'
                        ],
                        [
                            "eid369",
                            "top",
                            983,
                            566,
                            "easeOutCubic",
                            "${books2}",
                            '-542px',
                            '103px'
                        ],
                        [
                            "eid362",
                            "skewX",
                            0,
                            1250,
                            "easeOutBack",
                            "${bookshelf2}",
                            '-22deg',
                            '0deg'
                        ],
                        [
                            "eid379",
                            "rotateZ",
                            638,
                            1250,
                            "easeInOutCubic",
                            "${clock}",
                            '-360deg',
                            '0deg'
                        ],
                        [
                            "eid388",
                            "left",
                            1888,
                            0,
                            "easeInOutCubic",
                            "${clock}",
                            '1654px',
                            '1654px'
                        ],
                        [
                            "eid365",
                            "top",
                            750,
                            704,
                            "easeOutCubic",
                            "${books}",
                            '-539px',
                            '106px'
                        ],
                        [
                            "eid371",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${desk}",
                            '2068px',
                            '1294px'
                        ],
                        [
                            "eid380",
                            "opacity",
                            638,
                            1250,
                            "easeInOutCubic",
                            "${art}",
                            '0',
                            '1'
                        ],
                        [
                            "eid372",
                            "skewX",
                            0,
                            1250,
                            "easeOutBack",
                            "${desk}",
                            '-22deg',
                            '0deg'
                        ],
                        [
                            "eid368",
                            "left",
                            1345,
                            0,
                            "easeOutCubic",
                            "${books}",
                            '880px',
                            '880px'
                        ],
                        [
                            "eid377",
                            "opacity",
                            638,
                            1250,
                            "easeInOutCubic",
                            "${clock}",
                            '0',
                            '1'
                        ],
                        [
                            "eid387",
                            "left",
                            1888,
                            0,
                            "easeInOutCubic",
                            "${art}",
                            '1274px',
                            '1274px'
                        ],
                        [
                            "eid382",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${deskitems}",
                            '2096px',
                            '1322px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("edge/LIBRARY_BG_040115_edgeActions.js");
})("EDGE-library");
