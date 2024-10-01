import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mood-marker',
  standalone: true,
  imports: [],
  templateUrl: './mood-marker.component.html',
  styleUrl: './mood-marker.component.css'
})
export class MoodMarkerComponent {
  @Input({required: true}) name: string = "John Doe"
  @Input({required: true}) location: string = "Buenos Aeros, Brazil"
  @Input({required: true}) avatarUrl: string = ""
  @Input({required: true}) mood: string = "Happy"
}
