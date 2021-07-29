import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {
  albums: IAlbum[] = [
    { picture: "https://s3-alpha-sig.figma.com/img/d75c/1009/f21231d6f5d9480e4025fca6081aa434?Expires=1628467200&Signature=OTjTRmC-15s41yTDgmE8aKF5q6CnBmJAo55dQRIG7K0XOj8A9L3ENDn6dN4EmFOukNiA7DkyXDUXbf3bAjngVFLV7yUgxTssDto6jzNDJGShiDViBnpZAvV6BSpHRuQYIkGj4vTtKJZLeNtDQXQgnMrNLLz8LA1m1XHxLhvug7dLrmXAO2hxHhJk4PUqXplBNEnxyPSZjs-sY44I--97FKwspfh1eyjIlEIdj9eowU4WNh52N-mrnShdCdKJpbaIzE5-mJkpug91XKth-IWB5iHnotKb88bARs1rCFiMaZlp5-Xxi6jpJdOeYIriyilk9~obp6ItPZK-3t2OxS7tag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA", name: "Perfect Morning", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque fringilla eget vitae eget. Hendrerit tristique sed tellus vulputate bibendum volutpat, pretium malesuada amet" },
    { picture: "https://images.unsplash.com/photo-1627501958001-a10dc50eba63?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", name: "Flowers", description: "Lorem... Scelerisque fringilla eget vitae eget. Hendrerit tristique sed tellus vulputate bibendum volutpat, pretium malesuada amet" },
    { picture: "https://images.unsplash.com/photo-1627571828353-5e8490834c01?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", name: "Deep Ocean", description: "Scelerisque fringilla eget vitae eget. Hendrerit tristique sed tellus vulputate bibendum volutpat, pretium malesuada amet" },
    { picture: "https://images.unsplash.com/photo-1627521665792-1ca326e7d34a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0N3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", name: "Go Home", description: "Hendrerit scelerisque fringilla eget vitae eget. Hendrerit tristique sed tellus vulputate bibendum volutpat, pretium malesuada amet Scelerisque fringilla eget vitae eget" },
    { picture: "https://images.unsplash.com/photo-1627570173170-376a1cf0b357?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", name: "Fast Car", description: "Scelerisque fringilla eget vitae eget. Hendrerit tristique sed tellus vulputate bibendum volutpat, pretium malesuada amet" }
  ];

  public currentAlbum = this.albums[0];
  private i: number = 1;

  constructor() { }

  ngOnInit(): void {
    window.onclick = function(event) {
      if (!(event.target as HTMLElement).matches('.main__avatar-box')) {
        let el = document.getElementById("profile-menu");
        if(el?.classList.contains("showme")) {
          el?.classList.remove("showme");
        }
      }
    }
  }


  showProfileMenu(event: MouseEvent) {
    const el = document.getElementById("profile-menu");
    el?.classList.toggle("showme");
  }

  nextSlide() {
    if(this.i > 3 ) {
      this.i = 0
    }

    document.getElementsByClassName("accordion-information")[0]?.animate([
      // keyframes
      { opacity: '0'},
      { opacity: '2'}
    ], {
      // timing options
      duration: 800
    })

    this.currentAlbum = this.albums[this.i++];

  }

  previousSlide() {
    if(this.i === 0 ) {
      this.i = 4
    }

    document.getElementsByClassName("accordion-information")[0]?.animate([
      // keyframes
      { opacity: '0'},
      { opacity: '2'}
    ], {
      // timing options
      duration: 1000
    })

    this.currentAlbum = this.albums[this.i--];
  }
}

interface IAlbum {
  picture: string;
  name: string;
  description: string
}
