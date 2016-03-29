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
                            id: 'FRAME',
                            type: 'image',
                            rect: ['820px', '384px', '278px', '284px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"FRAME.svg",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'G1',
                            type: 'image',
                            rect: ['940px', '518px', '109px', '109px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"G1.svg",'0px','0px'],
                            transform: [[],['720'],[],['0','0']]
                        },
                        {
                            id: 'G2',
                            type: 'image',
                            rect: ['869px', '495px', '85px', '85px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"G2.svg",'0px','0px'],
                            transform: [[],['-720'],[],['0','0']]
                        },
                        {
                            id: 'G3',
                            type: 'image',
                            rect: ['928px', '453px', '68px', '68px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"G3.svg",'0px','0px'],
                            transform: [[],['720'],[],['0','0']]
                        },
                        {
                            id: 'G4',
                            type: 'image',
                            rect: ['921px', '420px', '41px', '41px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"G4.svg",'0px','0px'],
                            transform: [[],['-720'],[],['-0.08','-0.08']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1917px', '840px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(0,171,159,0.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 9000,
                    autoPlay: true,
                    data: [
                        [
                            "eid36",
                            "scaleX",
                            500,
                            500,
                            "easeOutBounce",
                            "${G2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid37",
                            "scaleY",
                            500,
                            500,
                            "easeOutBounce",
                            "${G2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid26",
                            "scaleX",
                            0,
                            1000,
                            "easeOutBounce",
                            "${FRAME}",
                            '0',
                            '1'
                        ],
                        [
                            "eid45",
                            "scaleY",
                            1000,
                            500,
                            "easeOutBounce",
                            "${G4}",
                            '-0.08',
                            '1'
                        ],
                        [
                            "eid2",
                            "rotateZ",
                            0,
                            9000,
                            "easeOutCirc",
                            "${G1}",
                            '720deg',
                            '0deg'
                        ],
                        [
                            "eid78",
                            "top",
                            3104,
                            0,
                            "linear",
                            "${FRAME}",
                            '384px',
                            '384px'
                        ],
                        [
                            "eid11",
                            "rotateZ",
                            0,
                            9000,
                            "easeOutCirc",
                            "${G4}",
                            '-720deg',
                            '0deg'
                        ],
                        [
                            "eid81",
                            "top",
                            3104,
                            0,
                            "linear",
                            "${G1}",
                            '518px',
                            '518px'
                        ],
                        [
                            "eid79",
                            "top",
                            3104,
                            0,
                            "linear",
                            "${G4}",
                            '420px',
                            '420px'
                        ],
                        [
                            "eid40",
                            "scaleX",
                            750,
                            500,
                            "easeOutBounce",
                            "${G3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid41",
                            "scaleY",
                            750,
                            500,
                            "easeOutBounce",
                            "${G3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid27",
                            "scaleY",
                            0,
                            1000,
                            "easeOutBounce",
                            "${FRAME}",
                            '0',
                            '1'
                        ],
                        [
                            "eid77",
                            "top",
                            3104,
                            0,
                            "linear",
                            "${G3}",
                            '453px',
                            '453px'
                        ],
                        [
                            "eid32",
                            "scaleX",
                            250,
                            500,
                            "easeOutBounce",
                            "${G1}",
                            '0',
                            '1'
                        ],
                        [
                            "eid29",
                            "rotateZ",
                            0,
                            9000,
                            "easeOutCirc",
                            "${G2}",
                            '-720deg',
                            '0deg'
                        ],
                        [
                            "eid71",
                            "background-color",
                            3104,
                            0,
                            "linear",
                            "${Stage}",
                            'rgba(0,171,159,0.00)',
                            'rgba(0,171,159,0.00)'
                        ],
                        [
                            "eid80",
                            "top",
                            3104,
                            0,
                            "linear",
                            "${G2}",
                            '495px',
                            '495px'
                        ],
                        [
                            "eid33",
                            "scaleY",
                            250,
                            500,
                            "easeOutBounce",
                            "${G1}",
                            '0',
                            '1'
                        ],
                        [
                            "eid44",
                            "scaleX",
                            1000,
                            500,
                            "easeOutBounce",
                            "${G4}",
                            '-0.08',
                            '1'
                        ],
                        [
                            "eid9",
                            "rotateZ",
                            0,
                            9000,
                            "easeOutCirc",
                            "${G3}",
                            '720deg',
                            '0deg'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("edge/Q9a_edgeActions.js");
})("EDGE-8449181");
