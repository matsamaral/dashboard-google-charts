import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

@Injectable()
export class DadosService {

  readonly dados = [
    ['Janeiro', 33],
    ['Fevereiro', 68],
    ['Março', 49],
    ['Abril', 35],
    ['Maio', 88],
    ['Junho', 27]
  ];

  constructor() { }

  /**
   * Retorna um obsevable contendo os dados a serem exibidos no gráfico.
   *
   * @return Observable<any>
   */
  obterDados(): Observable<any> {
    return of(this.dados);
  }
}
