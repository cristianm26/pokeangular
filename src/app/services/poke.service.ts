import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokeData } from '../__mocks__/interfaces/pokeData.interface';
import { PokeList } from '../__mocks__/interfaces/pokeList.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private baseUrl: string = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) {}

  get url() {
    return this.baseUrl + '/pokemon/';
  }
  getList(page: number = 0) {
    return this.http.get<PokeList>(`${this.baseUrl}/pokemon/`, {
      params: {
        offset: page,
        limit: 8,
      },
    });
  }

  getPokeData(name: string) {
    return this.http.get<PokeData>(`${this.baseUrl}/pokemon/${name}`);
  }
}
