export const option = {
  title: {
    text: "对数坐标平移",
    top:'top',
    left:'center'
  },
  xAxis: {
    min: 1,
    max: 10000,
    type: "log"
  },
  yAxis: {
    min: 1,
    max: 10000,
    type: "log"
  },
  series: [
    {
      id: "a",
      name: "ghost",
      type: "line",
      animation:false,
      symbolSize: 8,
      itemStyle: {
        color: "#c23531"
      },
      data: [],
    }
  ]
};
