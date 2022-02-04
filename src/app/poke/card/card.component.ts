import { Component, Input, OnInit } from '@angular/core';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() info: any = { name: '' };
  url: string = '';
  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.pokeService.getPokeData(this.info.name).subscribe((data: any) => {
      this.url = data.sprites.front_default;
    });
  }
}
