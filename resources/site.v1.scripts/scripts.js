window.site ??= {};

window.site.config ??= {};

window.site.config.page_path ??= document.body?.getAttribute( "data-site-page-path" );

window.site.config.page_view_lang ??= document.body?.getAttribute( "data-site-page-view-lang" );

window.site.addOnClickListener ??= function () {
    document.body.addEventListener(
        "click",
        ( event ) => {
            // Find the closest <a> element (in case of nested elements)
            let anchorElement = event.target.closest( "a" );

            if (
                !anchorElement
                || anchorElement.getAttribute( "target" ) === "_blank"
                || event.ctrlKey
                || event.metaKey
            ) {
                return;
            }

            window.history.pushState(
                null,
                null,
                anchorElement.getAttribute( "href" )
            );

            if ( anchorElement.getAttribute( "href" ).startsWith( "#" ) ) {
                return;
            }

            event.preventDefault();

            if ( anchorElement.getAttribute( "href" ) === "" ) {
                return;
            };

            if (
                anchorElement.getAttribute( "href" ) === "https://healthy-lifestyle-quiz.github.io/v1/zh-Hant/"
                || anchorElement.getAttribute( "href" ) === "https://healthy-lifestyle-quiz.github.io/v1/"
                || anchorElement.getAttribute( "href" ) === "https://healthy-lifestyle-quiz.github.io/"
            ) {
                document.title = "健康生活型態測驗 Healthy Lifestyle Test";
            } else if (
                anchorElement.getAttribute( "href" ).startsWith( "https://healthy-lifestyle-quiz.github.io" )
            ) {
                window.open( anchorElement.getAttribute( "href" ), "_self" );
            } else {
                window.open( anchorElement.getAttribute( "href" ) );
            };
        }
    );
};

window.site.renderSinglePageApplicationPage ??= function ( page_path ) {
    const firstHeading = document.getElementById("firstHeading");

    const singlePageApplicationPageData = {
        "zh-Hant": {
            "title": "健康生活型態測驗 Healthy Lifestyle Test",
            "heading": "首頁",
            "content": "",
        },
        "zh-Hant/instructions": {
            "title": "測驗說明 | 健康生活型態測驗 Healthy Lifestyle Test",
            "heading": "測驗說明",
            "content": "",
        },
        "zh-Hant/quiz": {
            "title": "測驗 | 健康生活型態測驗 Healthy Lifestyle Test",
            "heading": "測驗",
            "content": "",
        },
        "zh-Hant/results": {
            "title": "測驗結果 | 健康生活型態測驗 Healthy Lifestyle Test",
            "heading": "測驗結果",
            "content": "",
        },
    };

    if (
        firstHeading === null
        || typeof( page_path ) !== "string"
        || !( page_path in singlePageApplicationPageData )
        || !( "title" in singlePageApplicationPageData[page_path] )
        || typeof( singlePageApplicationPageData[page_path].title ) !== "string"
        || !( "content" in singlePageApplicationPageData[page_path] )
        || typeof( singlePageApplicationPageData[page_path].content ) !== "string"
    ) {
        return;
    }

    document.title = singlePageApplicationPageData[page_path].title;
    firstHeading.innerText = singlePageApplicationPageData[page_path].heading;
    /* content = singlePageApplicationPageData[page_path].content; */
    window.site.onRenderSinglePageApplicationPage( page_path );
};

window.site.onRenderSinglePageApplicationPage ??= function ( page_path ) {
    const onMainPage = function () {
    };

    const onInstructions = function () {
    };

    const onQuiz = function () {
    };

    const onResultsRadarChart = function () {
        const radarChartValues = Object.fromEntries(
            Array.from(
                new URLSearchParams( window.location.search )
            ).map( ( [ k, v ] ) =>
                [ k, Number( v ) ]
            ).filter( ( [ _, v ] ) =>
                !Number.isNaN( v ) && v >= 0 && v <= 5
            )
        );

        if (
            !( "n" in radarChartValues )
            || !( "i" in radarChartValues )
            || !( "r" in radarChartValues )
            || !( "a" in radarChartValues )
            || !( "p" in radarChartValues )
            || !( "s" in radarChartValues )
        ) {
            if (
                false /* noscript query */
            ) {
            } else if (
                false /* ongoing quiz */
            ) {
                location = "./../quiz/";
            } else {
                location = "./../";
            }
        }

        const radarChart = echarts.init(
            document.getElementById( "result_chart" ),
            null,
            {
                renderer: "svg",
            }
        );

        const radarChartOption = {
            title: {
                text: "健康生活型態雷達圖",
                textStyle: {
                    fontSize: 20,
                },
            },
            tooltip: {},
            radar: [
                {
                    axisName: {
                        fontSize: 16,
                    },
                    indicator: [
                        {
                            /* n: proper nutrition */
                            text: "適當的營養",
                            max: 5,
                        },
                        {
                            /* i: interpersonal support */
                            text: "人際支持",
                            max: 5,
                        },
                        {
                            /* r: health responsibility */
                            text: "健康責任",
                            max: 5,
                        },
                        {
                            /* a: self-actualization */
                            text: "自我實現",
                            max: 5,
                        },
                        {
                            /* p: physical activity */
                            text: "運動",
                            max: 5,
                        },
                        {
                            /* s: stress management */
                            text: "壓力處理",
                            max: 5,
                        },
                    ],
                },
            ],
            series: [
                {
                    type: "radar",
                    tooltip: {},
                    areaStyle: {},
                    data: [
                        {
                            name: "健康生活型態雷達圖",
                            value: [
                                radarChartValues.n,
                                radarChartValues.i,
                                radarChartValues.r,
                                radarChartValues.a,
                                radarChartValues.p,
                                radarChartValues.s,
                            ],
                        },
                    ],
                },
            ],
        };

        radarChart.setOption( radarChartOption );

        window.addEventListener(
            "resize",
            () => {
                radarChart.resize();
            }
        );
    };

    const onResults = function () {
        onResultsRadarChart();
    };

    const singlePageApplicationPageHooks = {
        "zh-Hant": window.site.onMainPage,
        "zh-Hant/instructions": window.site.onInstructions,
        "zh-Hant/quiz": window.site.onQuiz,
        "zh-Hant/results": window.site.onResults,
    };

    if (
        typeof( page_path ) !== "string"
        || !( page_path in singlePageApplicationPageHooks )
        || typeof( singlePageApplicationPageHooks[page_path] ) !== "function"
    ) {
        return;
    }

    ( singlePageApplicationPageHooks[page_path] )();
};

/*
window.site.addOnClickListener ??= function () {
    document.getElementById( "fullscreen_enter_button" ).addEventListener(
        "click",
        () => {
            if ( window.initialFullscreen ) {
                return;
            }

            if ( document.documentElement.requestFullscreen ) {
                document.documentElement.requestFullscreen();
            } else if ( document.documentElement.mozRequestFullScreen ) {
                document.documentElement.mozRequestFullScreen();
            } else if ( document.documentElement.webkitRequestFullScreen ) {
                document.documentElement.webkitRequestFullScreen();
            } else if ( document.documentElement.msRequestFullscreen ) {
                document.documentElement.msRequestFullscreen();
            }

            window.initialFullscreen = true;
        }
    );
};
*/

( function () {
    const page_path = window.site?.config?.page_path;

    if ( typeof( page_path ) !== "string" ) {
        return;
    }

    window.site.onRenderSinglePageApplicationPage( page_path );
} ) ();
