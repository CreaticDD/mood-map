import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../person.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  name = "John Doe"
  city = "Town"
  country = "Land"
  mood = "Happy"

  @Output() newPerson = new EventEmitter<Person>()

  onSubmit() {
    this.newPerson.emit({
      name: this.name,
      city: this.city,
      country: this.country,
      mood: this.mood,
      latitude: 0,
      longitude: 0
    })
  }
}
