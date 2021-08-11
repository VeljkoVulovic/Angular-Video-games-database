import {Component, OnInit, OnDestroy} from '@angular/core';
import {APIResponse, Game} from "../../models";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort?: string;
  public games?: Array<Game>;
  private routeSub?: Subscription;
  private gameSub?: Subscription;

  constructor(
    private httpService: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort?: string, search?: string): void {
    if (sort != null) {
      this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
    }
  }

  openGameDetails(id?: string): void {
    this.router.navigate(['details', id])
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
