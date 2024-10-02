import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../person.model';
import { MapboxService } from '../world-map/mapbox.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent implements OnInit {

  name = "John Doe"
  city = "Town"
  country = "Land"
  mood = "Happy"

  @Output() newPerson = new EventEmitter<Person>()

  private mapBoxService = inject(MapboxService)

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.mapBoxService.reverseGeocode(
        position.coords.latitude,
        position.coords.longitude)
        .subscribe({
          next:
            (response: any) => {
              if (response && response.features && response.features.length > 0) {

                const place = response.features[0];

                // Extract city and country
                const context = place.properties.context;

                if (context) {
                  const cityEntry = context.place.name;
                  const countryEntry = context.country.name;

                  this.city = cityEntry ? cityEntry : 'City not found';
                  this.country = countryEntry ? countryEntry : 'Country not found';
                } else {
                  this.city = 'City not found';
                  this.country = 'Country not found';
                }
              } else {
                this.city = 'City not found';
                this.country = 'Country not found';
              }
            },
          error:
            (error) => {
              console.error('Error fetching address:', error);
            }
        }
        );
    })
  }

  onSubmit() {
    const person = {
      name: this.name,
      city: this.city,
      country: this.country,
      mood: this.mood,
    }

    navigator.geolocation.getCurrentPosition((position) => {
      // success getting position
      this.newPerson.emit({
        ...person,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, () => {
      // error getting position
      this.newPerson.emit({
        ...person,
        latitude: 0,
        longitude: 0
      })
    });


  }
}
