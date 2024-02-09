import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface SpeedGaugeProps {
  speed: number;
}

export default function SpeedGauge({ speed }: SpeedGaugeProps) {
  const [options, setOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'solidgauge',
      height: '180px',
    },
    yAxis: {
      min: 0,
      max: 250,
      title: {
        text: 'Speed',
      },
      tickAmount: 6,
      lineWidth: 1,
      tickWidth: 1,
      minorTickInterval: null,
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'], // red
      ],
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      center: ['50%', '120px'],
      size: '200px',
      background: null,
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    series: [
      {
        name: 'Speed',
        data: [0],
        tooltip: {
          valueSuffix: ' MPH',
        },
        dataLabels: {
          borderWidth: 0,
          format: '{y} MPH',
          dial: {
            radius: '80%',
            backgroundColor: 'gray',
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%',
          },
          color: '#333333',
          style: {
            fontSize: '14px',
          },
        },
      },
    ],
    title: null,
  });

  useEffect(() => {
    setOptions((options) => ({
      ...options,
      series: [
        {
          ...options.series[0],
          data: [speed],
        },
      ],
    }));
  }, [speed]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
