import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MoodMarkerComponent } from './mood-marker/mood-marker.component';
import { Person } from '../person.model';
import { apiKey } from './apikey';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent implements OnInit {
  @Input({ required: true }) persons!: Person[]

  map!: mapboxgl.Map; // Declare a map variable

  constructor(private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: apiKey,
      container: 'map', // The ID of the HTML element to bind the map
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      zoom: 1, // Initial zoom level
    });

    this.persons.forEach(person => {
      setTimeout(() => {
        this.addMarker(person)
      }, Math.random() * 60000); // Timeout to allow the initial styles to apply
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  addMarker(person: Person) {

    const component = this.viewContainer.createComponent(MoodMarkerComponent)

    component.setInput("name", person.name)
    component.setInput("location", person.city + ", " + person.country)
    component.setInput("avatarUrl", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5q9GlWCAoQHPpOiDOECuYUeXW9MQP7Ddt-Q&s")
    component.setInput("mood", person.mood)

    const markerElement = component.location.nativeElement

    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([person.longitude, person.latitude])
      .addTo(this.map);

    setTimeout(() => {
      markerElement.firstElementChild!.classList.add('show');
    }, 10)

    setTimeout(() => {
      marker.getElement().firstElementChild?.classList.remove('show')
      setTimeout(() => {
        // marker.remove()
      }, 1000);
    }, 123456);


  }
}
