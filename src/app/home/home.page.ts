import { AfterContentInit, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CatService } from '../../@core/services/cat-service';
import { Type } from 'src/@core/enums/cat-query';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements AfterContentInit {
  catUrl: string | null = null;
  loadingCat: boolean = false;

  constructor(private catService: CatService) {}


  ngAfterContentInit() {
    this.loadRandomCat();
  }

  async loadRandomCat() {
    this.loadingCat = true;
    const cat = await lastValueFrom(this.catService.getCat({ type: Type.medium }));
    this.catUrl = cat.url;
    this.loadingCat = false;
  }
}
