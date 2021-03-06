import { Component, OnInit, ViewChild } from '@angular/core'
import { ChartOptions, } from 'chart.js'
import { StatisticsService } from '../../services/statistics.service'
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.styl']
})
export class GraphicComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective

  barChartOptions: ChartOptions = {
    responsive: true, maintainAspectRatio: false, scales: {
      xAxes: [{ gridLines: { color: '#232850' } }],
      yAxes: [{ id: 'y-0', gridLines: { color: '#232850' } }]
    }
  }

  constructor(public statisticService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticService.onChange.subscribe(statistic => {
      if (this.chart) {
        const config = { ...this.barChartOptions }
        config.scales.yAxes = statistic.dataSet.length === 2 ?
          [{ id: 'y-0', type: 'linear', position: 'left' }, { id: 'y-1', type: 'linear', position: 'right' }] :
          [{ id: 'y-0', gridLines: { color: '#232850' } }]
        this.barChartOptions = config


        setTimeout(() => this.chart.update(), 10)
      }
    })
  }
}

