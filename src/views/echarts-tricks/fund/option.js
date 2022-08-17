export const option = {
    backgroundColor: "white",
    xAxis: {
        type: "category",
        data: [],
    },
    yAxis: {
        type: "value",
        max: 3,
        min: -3,
        minInterval: 1,
        maxInterval: 1,
        minorSplitLine: {
            show: true,
        },
        minorTick: {
            show: false,
            splitNumber: 2,
        },
    },

    series: [
        {
            data: [],
            type: "line",
        },
    ],
};
