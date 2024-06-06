import { Component } from '@angular/core';
import { TvMazeService } from '../services/tv-maze-service.service';
import { ModalController } from '@ionic/angular';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  query: string = '';
  shows: any[] = [];

  constructor(
      private tvMazeService: TvMazeService,
      private modalController: ModalController,
      private router: Router
    ) {}

  searchShows() {
    if (this.query.trim() === '') {
      this.shows = [];
      return;
    }

    this.tvMazeService.searchShows(this.query).subscribe({
      next: (res: any) => {
        this.shows = res;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  async showDetails(show: any) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: { show }
    })
    return await modal.present()
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
