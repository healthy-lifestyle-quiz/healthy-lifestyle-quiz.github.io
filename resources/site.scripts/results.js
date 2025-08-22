( () => {
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
} ) ();
