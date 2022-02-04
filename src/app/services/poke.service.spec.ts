import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokeService } from './poke.service';
import { HttpClient } from '@angular/common/http';
import { pokeListMock } from '../__mocks__/pokeList.mock';
import { PokeList } from '../__mocks__/interfaces/pokeList.interface';
import { pokeDataMock } from '../__mocks__/pokeData.mock';

describe('PokeService', () => {
  let service: PokeService;
  let httpClient: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [HttpClient],
    });
    httpClient = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokeService);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia hacer una petición Http de tipo GET', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8';
    service.getList().subscribe(() => {
      done();
    });
    const req: TestRequest = httpClient.expectOne(url);
    expect(req.request.url).toEqual(service.url);
    expect(req.request.urlWithParams).toEqual(url);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('Deberia retornar la lista de pokemones', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8';
    service.getList().subscribe((res) => {
      expect(res).toEqual(pokeListMock);
      expect(res.results.length).toBe(8);
      done();
    });
    httpClient.expectOne(url).flush(pokeListMock);
  });

  it('Deberia retornar la imagen de nuestro pokemon', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1';
    service.getPokeData('1').subscribe((res) => {
      expect(res).toEqual(pokeDataMock);

      done();
    });
    httpClient.expectOne(url).flush(pokeDataMock);
  });
});
