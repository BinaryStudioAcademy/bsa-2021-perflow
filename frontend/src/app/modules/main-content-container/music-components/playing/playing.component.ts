import {
  AfterViewInit,
  Component, ElementRef, ViewChild
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.sass']
})
export class PlayingComponent implements AfterViewInit {
  @ViewChild('ngAnimationContainer') ngAnimationContainer: ElementRef;

  private _drawVisual: number;
  private _dataArray: Uint8Array;
  analyser: AnalyserNode;

  private _svg: d3.Selection<any, any, any, any>;

  private readonly _amountofStrokes = 60;
  private _height: number;
  private _width: number;
  private _maxBarHeight: number;
  private _minBarHeight: number;
  private _barWidth: number;

  private readonly _decimalRadix = 10;

  ngAfterViewInit(): void {
    const styles = window.getComputedStyle(this.ngAnimationContainer.nativeElement);
    this._height = parseInt(styles.height, this._decimalRadix);
    this._width = parseInt(styles.width, this._decimalRadix);
    this._maxBarHeight = 0.95 * this._height;
    this._minBarHeight = 0.05 * this._height;
    this._barWidth = this._width / this._amountofStrokes;

    this.prepAnimationCanvas();
    this.prepVisualization();
  }

  prepAnimationCanvas() {
    this._svg = d3.select(this.ngAnimationContainer.nativeElement).append('svg')
      .attr('width', this._width)
      .attr('height', this._height)
      .attr('id', 'svg-container')
      .style('background-color', 'rgba(0,0,0,0)')
      .style('transform', 'scale(1,-1)')
      .append('g');
  }

  draw = () => {
    this._drawVisual = requestAnimationFrame(this.draw);
    this._dataArray = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteFrequencyData(this._dataArray);

    for (let i = 0; i < this._amountofStrokes; i += 1) {
      const mod = this._dataArray[i] / 256;
      const newHeight = this._minBarHeight + (this._maxBarHeight * mod);
      d3.select(`#rect-${i}`)
        .attr('height', newHeight)
        .attr('transform', `translate(${this._barWidth * i}, 0)`);
    }
  };

  prepVisualization() {
    for (let i = 0; i < this._amountofStrokes; i += 1) {
      this.appendRect(this._svg,
        `rect-${i}`,
        this._minBarHeight,
        this._barWidth,
        '#FD5D34',
        '#FD9122',
        1,
        this._barWidth * i,
        0);
    }
  }

  appendRect = (svg: d3.Selection<any, any, any, any>,
    id: string,
    h: number,
    w: number,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    transX: number,
    transY: number) => {
    svg.append('rect')
      .attr('class', 'reactive-rect')
      .attr('id', id)
      .attr('width', w)
      .attr('height', h)
      .attr('fill', fillColor)
      .attr('stroke', strokeColor)
      .attr('stroke-width', `${strokeWidth}px`)
      .attr('transform', `translate(${transX},${transY})`);
  };

  interruptAnimation() {
    window.cancelAnimationFrame(this._drawVisual);
  }
}
