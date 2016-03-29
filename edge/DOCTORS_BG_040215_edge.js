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
                            id: 'desk2',
                            type: 'image',
                            rect: ['2047px', '440px', '516px', '324px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"desk2.svg",'0px','0px'],
                            transform: [[],[],['-30']]
                        },
                        {
                            id: 'cabinet1',
                            type: 'image',
                            rect: ['993px', '-363px', '179px', '307px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"cabinet1.svg",'0px','0px']
                        },
                        {
                            id: 'cabinet2',
                            type: 'image',
                            rect: ['816px', '84px', '179px', '307px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"cabinet2.svg",'0px','0px']
                        },
                        {
                            id: 'cabinet3',
                            type: 'image',
                            rect: ['638px', '83px', '179px', '307px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"cabinet3.svg",'0px','0px']
                        },
                        {
                            id: 'chair2',
                            type: 'image',
                            rect: ['1973px', '622px', '244px', '174px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"chair2.svg",'0px','0px']
                        },
                        {
                            id: 'bed2',
                            type: 'image',
                            rect: ['1378px', '894px', '323px', '310px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"bed2.svg",'0px','0px']
                        },
                        {
                            id: 'shelf',
                            type: 'image',
                            rect: ['2067px', '140px', '337px', '24px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"shelf.svg",'0px','0px']
                        },
                        {
                            id: 'shelfitems2',
                            type: 'image',
                            rect: ['1382px', '-267px', '312px', '212px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"shelfitems2.svg",'0px','0px']
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
                    duration: 2000,
                    autoPlay: true,
                    data: [
                        [
                            "eid414",
                            "top",
                            694,
                            653,
                            "easeOutCubic",
                            "${shelfitems2}",
                            '-267px',
                            '88px'
                        ],
                        [
                            "eid391",
                            "left",
                            0,
                            1250,
                            "easeInOutCubic",
                            "${desk2}",
                            '2047px',
                            '645px'
                        ],
                        [
                            "eid408",
                            "opacity",
                            586,
                            722,
                            "easeOutCubic",
                            "${bed2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid399",
                            "top",
                            694,
                            1306,
                            "easeOutBounce",
                            "${cabinet3}",
                            '-364px',
                            '83px'
                        ],
                        [
                            "eid411",
                            "left",
                            250,
                            1058,
                            "easeOutCubic",
                            "${shelf}",
                            '2067px',
                            '1370px'
                        ],
                        [
                            "eid397",
                            "top",
                            250,
                            1306,
                            "easeOutBounce",
                            "${cabinet1}",
                            '-363px',
                            '84px'
                        ],
                        [
                            "eid398",
                            "top",
                            472,
                            1306,
                            "easeOutBounce",
                            "${cabinet2}",
                            '-363px',
                            '84px'
                        ],
                        [
                            "eid402",
                            "left",
                            694,
                            1306,
                            "easeOutBack",
                            "${chair2}",
                            '1973px',
                            '678px'
                        ],
                        [
                            "eid407",
                            "top",
                            586,
                            722,
                            "easeOutCubic",
                            "${bed2}",
                            '894px',
                            '467px'
                        ],
                        [
                            "eid394",
                            "skewX",
                            750,
                            722,
                            "easeOutBack",
                            "${desk2}",
                            '-30deg',
                            '0deg'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("edge/DOCTORS_BG_040215_edgeActions.js");
})("EDGE-doctor"); 
