import {minX,minY,width,data1,data2} from '../data'
export const option = {
  title: {
    text: "刷选背景",
    top: "top",
    left: "center"
  },
  xAxis: {
    type: "value",
    min:minX,
    max:minX+width
  },
  yAxis: [{
    type: "value", 
    min:minY,
    max:minY+width
  },{
    type: "value",
    min:minY,
    max:minY+width,
    splitLine:{show:false},
    axisLine:{show:false}
  }],
    toolbox: {
      right: "10%",
      top: 30,
      feature: {
        myTool1: {
          show: true,
          title: "刷选背景",
          icon:
            "path://M51.2 128l46.933333 0C104.533333 115.2 115.2 104.533333 128 98.133333L128 51.2C91.733333 64 64 91.733333 51.2 128zM85.333333 725.333333 42.666667 725.333333l0 85.333333 42.666667 0L85.333333 725.333333zM213.333333 981.333333l85.333333 0 0-42.666667-85.333333 0L213.333333 981.333333zM384 981.333333l85.333333 0 0-42.666667-85.333333 0L384 981.333333zM213.333333 85.333333l85.333333 0L298.666667 42.666667l-85.333333 0L213.333333 85.333333zM85.333333 213.333333 42.666667 213.333333l0 85.333333 42.666667 0L85.333333 213.333333zM928 128l46.933333 0C960 91.733333 932.266667 64 896 51.2l0 46.933333C908.8 104.533333 919.466667 115.2 928 128zM85.333333 384 42.666667 384l0 85.333333 42.666667 0L85.333333 384zM85.333333 554.666667 42.666667 554.666667l0 85.333333 42.666667 0L85.333333 554.666667zM96 896 51.2 896C64 932.266667 91.733333 960 128 972.8l0-46.933333C115.2 919.466667 104.533333 908.8 96 896zM896 925.866667l0 46.933333c36.266667-12.8 64-40.533333 76.8-76.8l-46.933333 0C919.466667 908.8 908.8 919.466667 896 925.866667zM938.666667 810.666667l42.666667 0 0-85.333333-42.666667 0L938.666667 810.666667zM384 85.333333l85.333333 0L469.333333 42.666667l-85.333333 0L384 85.333333zM938.666667 213.333333l0 85.333333 42.666667 0 0-85.333333L938.666667 213.333333zM938.666667 469.333333l42.666667 0 0-85.333333-42.666667 0L938.666667 469.333333zM938.666667 640l42.666667 0 0-85.333333-42.666667 0L938.666667 640zM554.666667 981.333333l85.333333 0 0-42.666667-85.333333 0L554.666667 981.333333zM554.666667 85.333333l85.333333 0L640 42.666667l-85.333333 0L554.666667 85.333333zM725.333333 85.333333l85.333333 0L810.666667 42.666667l-85.333333 0L725.333333 85.333333zM725.333333 981.333333l85.333333 0 0-42.666667-85.333333 0L725.333333 981.333333z",
          onclick: () => {}
        },
        brush: {
          id: 1,
          title: {
            clear: "取消"
          }
        }
      }
    },
    brush: {
      toolbox: ["clear"],
      xAxisIndex: 0,
      seriesIndex: 0,
      throttleType: "debounce",
      throttleDelay: 300,
      outOfBrush: {
        colorAlpha: 1
      }
    },
    series: [
      {
        name: "scatter1",
        type: "scatter",
        yAxisIndex:0,
        symbolSize: 6,
        itemStyle:{
            color:'#c21f30'
        },
        data: data1,
        markArea: {
            silent:true,
            itemStyle: {
                color: 'rgba(0,0,0,0.2)'
            },
            data: [
                [{
                    xAxis: 0,
                    yAxis: 0
                }, {
                    xAxis: 0,
                    yAxis: 0
                }],
            ]
        },
        z:9999999999
      },
      {
        name: "scatter2",
        type: "scatter",
        symbolSize: 6,
        itemStyle:{
            color:'#10aec2'
        },
        yAxisIndex:1,
        data: data2,
        z:9999999999
      }
    ]
  };
  