export const option1 = {
    backgroundColor: "white",
    tooltip: {},
    xAxis: {
        type: "category",
        data: [],
        scale: true,
    },
    yAxis: [
        {
            type: "value",
            scale: true,
        },
        {
            type: "value",
            scale: true,
        },
    ],

    series: [
        {
            data: [],
            type: "line",
        },
        {
            data: [],
            type: "line",
            yAxisIndex: 1,
        },
    ],
};
export const option2 = {
    backgroundColor: "white",
    xAxis: {
        type: "category",
        data: [],
        scale: true,
    },
    yAxis: {
        type: "value",
        scale: true,
    },

    series: [
        {
            data: [],
            type: "line",
        },
    ],
};
