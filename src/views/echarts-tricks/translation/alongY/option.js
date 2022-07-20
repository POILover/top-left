export const option = {
    title: {
        text: "纵向平移",
        top:'top',
        left:'center'
    },
    xAxis: {
        max: 100,
        min: 0,
        type: 'value'
    },
    yAxis: {
        min: 0,
        max: 100,
        type: 'value'
    },
    series: [
        {
            id: 'a',
            name: "ghost",
            type: "line",
            animation:false,
            symbolSize: 8,
            itemStyle: {
                color: "#c23531",
            },
            data: [],
        },]
}