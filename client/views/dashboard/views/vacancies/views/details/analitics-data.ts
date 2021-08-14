export const analiticsData = {
  options: {
    chart: {
      height: 450,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#37d6ab', 'rgb(89, 104, 226)', '#ffad46', '#48abf7'],
    stroke: {
      show: true,
      width: 9,
      colors: ['transparent']
    },

    xaxis: {
      categories: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
      ]
    },
    yaxis: {
      title: {
        text: 'Rendimento Mensal'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return ' ' + val + ' Candidatos'
        }
      }
    }
  },
  series: [
    {
      name: 'Selecionados',
      data: []
    },
    {
      name: 'Inscritos',
      data: []
    },
    {
      name: 'Recusados',
      data: []
    }
  ]
}
