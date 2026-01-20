window.site ??= {};

window.site.config ??= {};

window.site.config.page_path ??= document.body?.getAttribute("data-site-page-path");

window.site.config.page_view_lang ??= document.body?.getAttribute("data-site-page-view-lang");

window.site.onQuiz ??= function () {
};

window.site.onResults ??= function () {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams( paramsString );

    if ( false ) {
        location = "https://healthy-lifestyle-quiz.github.io/v1/zh-Hant/";
    }

    const radarChart = echarts.init(
        document.getElementById( 'result_chart' ),
        null,
        {
            renderer: 'svg',
        }
    );

    const radarChartOption = {
        title: {
            text: '健康生活型態雷達圖',
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
                        text: '適當的營養',
                        max: 5,
                    },
                    {
                        text: '人際支持',
                        max: 5,
                    },
                    {
                        text: '健康責任',
                        max: 5,
                    },
                    {
                        text: '自我實現',
                        max: 5,
                    },
                    {
                        text: '運動',
                        max: 5,
                    },
                    {
                        text: '壓力處理',
                        max: 5,
                    },
                ],
            },
        ],
        series: [
            {
                type: 'radar',
                tooltip: {},
                areaStyle: {},
                data: [
                    {
                        name: '健康生活型態雷達圖',
                        value: [
                            5,
                            4,
                            3,
                            3.5,
                            2,
                            3
                        ],
                    },
                ],
            },
        ],
    };

    radarChart.setOption( radarChartOption );

    window.addEventListener(
        'resize',
        () => {
            radarChart.resize();
        }
    );
};

window.site.addOnClickListener ??= function () {
    document.body.addEventListener(
        'click',
        (event) => {
            // Find the closest <a> element (in case of nested elements)
            let anchorElement = event.target.closest( 'a' );

            if (
                !anchorElement
                || anchorElement.getAttribute( 'target' ) === '_blank'
                || event.ctrlKey
                || event.metaKey
            ) {
                return;
            }

            window.history.pushState(
                null,
                null,
                anchorElement.getAttribute( 'href' )
            );

            if ( anchorElement.getAttribute( 'href' ).startsWith( '#' ) ) {
                return;
            }

            event.preventDefault();

            if ( anchorElement.getAttribute( 'href' ) === '' ) {
                return;
            };

            if (
                anchorElement.getAttribute('href') === 'https://healthy-lifestyle-quiz.github.io/v1/zh-Hant/'
                || anchorElement.getAttribute('href') === 'https://healthy-lifestyle-quiz.github.io/v1/'
                || anchorElement.getAttribute('href') === 'https://healthy-lifestyle-quiz.github.io/'
            ) {
                document.title = '健康生活型態測驗 Healthy Lifestyle Test';
            } else if (
                anchorElement.getAttribute('href').startsWith( 'https://healthy-lifestyle-quiz.github.io' )
            ) {
                window.open( anchorElement.getAttribute( 'href' ), '_self' );
            } else {
                window.open( anchorElement.getAttribute( 'href' ) );
            };
        }
    );
};

/*
window.site.addOnClickListener ??= function () {
    document.getElementById( 'fullscreen_enter_button' ).addEventListener(
        'click',
        () => {
            if ( window.initialFullscreen ) {
                return;
            }

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }

            window.initialFullscreen = true;
        }
    );
};
*/

( function () {
    switch ( window.site.config.page_path ) {
        case null:
        case undefined:
            return;

        case "zh-Hant":
            /* window.site.addOnClickListener(); */

            break;

        case "zh-Hant/quiz":
            /* window.site.addOnClickListener(); */
            window.site.onQuiz();

            break;

        case "zh-Hant/results":
            /* window.site.addOnClickListener(); */
            window.site.onResults();

            break;

        default:
            return;
    }
} ) ();
