import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RandomUserService } from '../services/random-user.service';
import { TvMazeService } from '../services/tv-maze-service.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[RandomUserService, TvMazeService]
})
export class SharedModule { }
