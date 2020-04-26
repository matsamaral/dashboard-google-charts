import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { DadosService } from './dados.service';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.obterDados().pipe(take(1)).subscribe(
      dados => {
        this.dados = dados;
        this.init();
      }
    );
  }

  /**
   * Inicializa a API de gráficos com delay de 1 segundo o que permite a integração da API com o Angular
   *
   * @return void
   */
  init(): void {
    if (typeof (google) !== undefined) {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada.
   * Responsavel por chamar os métodos geradores dos gráficos
   *
   * @return void
   */
  exibirGraficos() {
    this.exbirPieChart();
    this.exbir3dPieChart();
    this.exbirBarChart();
    this.exbirLineChart();
    this.exbirDonutChart();
    this.exbirColumnChart();
  }

  /**
   * Exbibe o gráfico Pie chart
   *
   * @return void
   */
  exbirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exbibe o gráfico 3d pie chart
   *
   * @return void
   */
  exbir3dPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes.is3D = true;

    chart.draw(this.obterDataTable(), opcoes);
  }

  /**
   * Exbibe o gráfico Bar chart
   *
   * @return void
   */
  exbirBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }


  /**
   * Exbibe o gráfico Line chart
   *
   * @return void
   */
  exbirLineChart() {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exbibe o gráfico Donut chart
   *
   * @return void
   */
  exbirDonutChart() {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes.pieHole = 0.4;

    chart.draw(this.obterDataTable(), opcoes);
  }

  /**
   * Exbibe o gráfico ColumnChart
   *
   * @return void
   */
  exbirColumnChart() {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Cria e retorna o objeto data table da API de gráficos
   * responsável por definir os dados do gráfico
   *
   * @return any
   */
  obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico
   *
   * @return any
   */
  obterOpcoes(): any {
    return {
      title: 'Quantidade de cadastros primeiro semestre',
      width: 400,
      height: 300
    };
  }

}
