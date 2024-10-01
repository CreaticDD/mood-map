import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldMapComponent } from "./world-map/world-map.component";
import { UserInputComponent } from './user-input/user-input.component';
import { Person } from './person.model';
import { persons as personsArray } from './persons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldMapComponent, UserInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('childRef') child!: WorldMapComponent; // Reference to the child component

  title = 'mood-map';
  persons: Person[] = personsArray

  handleNewPerson(newPerson: Person) {
    this.persons.push(newPerson)

    this.child.addMarker(newPerson)
  }
}
