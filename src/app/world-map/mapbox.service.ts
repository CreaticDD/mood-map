// mapbox.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey } from './apikey';

@Injectable({
    providedIn: 'root'
})
export class MapboxService {
    private readonly accessToken: string = apiKey;
    private readonly baseUrl: string = 'https://api.mapbox.com/search/geocode/v6/reverse';

    constructor(private http: HttpClient) { }

    reverseGeocode(latitude: number, longitude: number): Observable<any> {
        const url = `${this.baseUrl}?longitude=${longitude}&latitude=${latitude}`;
        return this.http.get(url, {
            params: {
                access_token: this.accessToken,
                limit: '1' // Optional: limit the number of results
            }
        });
    }
}
