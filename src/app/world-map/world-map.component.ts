import { Component, EmbeddedViewRef, OnInit, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent implements OnInit {
  map!: mapboxgl.Map; // Declare a map variable

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiY3JlYXRpY2RkIiwiYSI6ImNtMXFobGhmNDAwODYyanM4em5yNmtnZm4ifQ.sLfd-koSyspDUuOgfPgHvA',
      container: 'map', // The ID of the HTML element to bind the map
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      zoom: 1, // Initial zoom level
    });

    for (let i = 0; i < 5; i++) {
      const markerElement = this.createCustomMarker();

      new mapboxgl.Marker(markerElement)
        .setLngLat([Math.random() * 360 - 180, Math.random() * 180 - 90])
        .addTo(this.map);
    }

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  createCustomMarker(): HTMLElement {
    const htmlString = '<p class="marker">Hello, <strong>world!</strong></p>';
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim(); // Trim to remove excess whitespace
    return template.content.firstChild as HTMLElement; // Return the first child of the template
  }

}
