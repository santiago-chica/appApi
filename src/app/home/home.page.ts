import { AfterContentInit, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon } from '@ionic/angular/standalone';
import { CatService } from '../../@core/services/cat-service';
import { Type } from 'src/@core/enums/cat-query';
import { IonButton } from '@ionic/angular/standalone';
import { lastValueFrom } from 'rxjs';
import { Cat, CatImage } from 'src/@core/interfaces/cat-api';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

const CAT_AMOUNT: number = 16;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonButton, IonInput, FormsModule, IonIcon],
})
export class HomePage implements AfterContentInit {

  totalCatNumber: number = 0;

  catPosition: number = 0;
  catArray: Cat[] = [];
  loadingCat: boolean = false;

  tagInput: string = '';
  textInput: string = '';


  constructor(private catService: CatService) {
    addIcons({
      'search-outline': searchOutline,
    });
  }

  ngOnInit() {
    this.catService.getCount().subscribe(data => {
      this.totalCatNumber = data.count;
      this.reloadCatsDefault();
    });
  }

  reloadCatsDefault() {
    this.reloadCats(CAT_AMOUNT);
  }


  private reloadCats(n: number) {
    this.catPosition = 0;
    const randomSkip = this.tagInput ? 0 :
    Math.floor(Math.random() * (this.totalCatNumber - n));
    
    this.catService.getCats({ limit: n, skip: randomSkip, ...(this.tagInput? { tags: this.tagInput } : {}) }).subscribe(cats => {
      this.catArray = cats;
    });
  }

  ngAfterContentInit() {
    // this.loadRandomCat();
  }

  getRandomCat() {
    this.reloadCats(1);
  }

  getCurrentCat(): CatImage {
    const currentCat = this.catArray[this.catPosition];
    if (currentCat) {
      return {
        ...currentCat,
        url: `https://cataas.com/cat/${currentCat.id}`
      } as CatImage;
    }

    return {
      id: "0C2bQ39x8kuhx31p",
      tags: [
        "sara",
        "looking"
      ],
      mimetype: "image/jpeg",
      created_at: "2023-11-17T20:44:28.000Z",
      url: "https://cataas.com/cat/0C2bQ39x8kuhx31p"
    } as CatImage;
  }

  leftCat() {
    const newIndex = Math.max(0, this.catPosition - 1);
    this.catPosition = newIndex;
  }

  rightCat() {
    const newIndex = Math.min(this.catArray.length - 1, this.catPosition + 1);
    this.catPosition = newIndex;
  }

}
