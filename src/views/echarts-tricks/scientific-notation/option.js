import scientificNotation from '@/utils/scientificNotation'
export const option = {
    title: {
      text: "科学计数法",
      top:'top',
      left:'center'
    },
    xAxis: {
      min: 0.0001,
      max: 100000,
      type: "log",
      axisLabel: {
        color: "black",
        formatter: scientificNotation,
      },
    },
    yAxis: {
      min: 0.0001,
      max: 100000,
      type: "log",
      axisLabel: {
        color: "black",
        formatter: scientificNotation,
      },
    }
  };
  