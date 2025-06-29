import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-ratings',
  imports: [FontAwesomeModule],
  templateUrl: './ratings.html',
  styleUrl: './ratings.css'
})
export class Ratings {
  score = input<number>(0);
  faStar = faStar;
  faStarHalfStorke = faStarHalfStroke;
  faStarEmpty = faStarEmpty;

  stars =  computed(() => {
      const value = Math.min(this.score(), 5);
      const icons : IconDefinition[] = [];

      const solidRating = Math.floor(value);
      const halfRating = value - solidRating >= 0.5;

      for(let i = 0; i < solidRating; i++){
        icons.push(faStar);
      }

      if(halfRating){
        icons.push(faStarHalfStroke);
      }

      while(icons.length < 5) {
        icons.push(faStarEmpty);
      }
      return [...icons];
  });

}
