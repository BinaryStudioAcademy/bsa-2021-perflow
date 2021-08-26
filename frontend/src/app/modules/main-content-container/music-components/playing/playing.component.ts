import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.sass']
})
export class PlayingComponent implements OnInit {
  @ViewChild('ngAnimationContainer') ngAnimationContainer: ElementRef;

  private _drawVisual: number;
  private _dataArray: Uint8Array;
  analyser: AnalyserNode;

  private _svg: d3.Selection<any,any,any,any>;

  ngOnInit(): void {
    this.prepAnimationCanvas();
  }

  prepAnimationCanvas() {
    let containerStyle = window.getComputedStyle(this.ngAnimationContainer.nativeElement);
    this._svg = d3.select(this.ngAnimationContainer.nativeElement).append('svg')
      .attr('width', containerStyle.width)
      .attr('height', containerStyle.height)
      .attr('id', 'svg-container')
      .style('background-color', 'rgba(0,0,0,0)')
      .append('g');
  }

  draw() {
    this._drawVisual = requestAnimationFrame(this.draw);
    this._dataArray = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteFrequencyData(this._dataArray);

  };

  interruptAnimation() {
    window.cancelAnimationFrame(this._drawVisual);
  }
}
