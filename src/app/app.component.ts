import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
declare var $;

@Component({
  selector: 'app-root',
  template: `

  <table id="dt" class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Position</th>
      <th scope="col">Team Name</th>
      <th scope="col">Played</th>
      <th scope="col">Won</th>
      <th scope="col">Drawn</th>
      <th scope="col">Lost</th>
      <th scope="col">Goal</th>
      <th scope="col">Difference</th>
      <th scope="col">Points</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let currentStanding of currentStandings">
      <th scope="row">{{currentStanding.position}}</th>
      <td>{{currentStanding.team_name}}</td>
      <td>{{currentStanding.overall.games_played}}</td>
      <td>{{currentStanding.overall.won}}</td>
      <td>{{currentStanding.overall.draw}}</td>
      <td>{{currentStanding.overall.lost}}</td>
      <td>{{currentStanding.overall.goals_scored}}</td>
      <td>{{currentStanding.total.goal_difference}}</td>
      <td>{{currentStanding.total.points}}</td>
    </tr>
  </tbody>
</table>

  
  `,
})
export class AppComponent implements OnInit {
  
  

  ngOnInit(): void {
    setTimeout(function (){
      $(function (){
        $('#dt').DataTable();
      });
    }, 3000);
    
  }
  currentStandings: any;

  

  private apiURL= 'https://soccer.sportmonks.com/api/v2.0/standings/season/825?api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC';

  //data: any = {};

  constructor(private http: Http){
    console.log('contructor working');

    this.getData();
    this.getSeasonStandings();
  }  

  

 



  getData(){
    return this.http.get(this.apiURL)
      .map((res: Response) => res.json())
  }



  getSeasonStandings(){
    this.getData().subscribe(standings => {
     console.log(standings.data[0].standings.data);
     this.currentStandings = standings.data[0].standings.data;
     //console.log(currentStandings);
    })
  }
  
}
