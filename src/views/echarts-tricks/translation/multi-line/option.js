export const option = {
  title: {
    text: "多条直线平移",
    top:'top',
    left:'center'
  },
  xAxis: {
    min: 0,
    max: 100,
    type: "value"
  },
  yAxis: {
    min: 0,
    max: 100,
    type: "value"
  },
  series: [
    {
      id: "a",
      name: "ghost_a",
      type: "line",
      animation:false,
      symbolSize: 8,
      itemStyle: {
        color: "#c23531"
      },
      data: [],
    },
    {
      id: "b",
      name: "ghost_b",
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
