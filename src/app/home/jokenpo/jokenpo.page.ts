import { Component, OnInit } from '@angular/core';
import { PointsService } from 'src/app/services/points.service';

@Component({
  selector: 'app-jokenpo',
  templateUrl: './jokenpo.page.html',
  styleUrls: ['./jokenpo.page.scss'],
})

export class JokenpoPage implements OnInit {

  userScore: number;
  compScore: number;
    score = 0;
    globalPoints: number;

  constructor(private pointsService: PointsService) {
    this.globalPoints = this.pointsService.globalPoints;
  }

  ngOnInit() {
    this.userScore = 0;
    this.compScore = 0;
  }

  

}



export class AppComponent {
  userScore = 0;
  compScore = 0;
  userSelected: string;
  compSelected: string;
  action: string;
  status: string;
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];

  userPick(userWeapon: string): void {
    this.userSelected = userWeapon;
    console.log( this.userSelected);
    setTimeout( () => {
      const randomNum = Math.floor(Math.random() * 3);
      this.compSelected = this.compWeapons[randomNum];
      console.log(this.compSelected);
      this.checkResult();
    }, 1000);
  }

  clearField() {
    setTimeout(() => {
      this.status = '';
      this.userSelected = '';
      this.compSelected = '';
    }, 2500);
  }

  win(user, comp) {
    this.userScore ++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'beats';
    this.status = '. Você ganhou!';
    this.clearField();
  }


  lose(user, comp) {
    this.compScore ++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'loses to';
    this.status = '. Você perdeu!';
    this.clearField();
  }

  draw(user, comp) {
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'and';
    this.status = '. Empate!';
    this.clearField();
  }

  checkResult() {
    const userChoice = this.userSelected;
    const compChoice = this.compSelected;
    switch (userChoice + compChoice) {
      case 'rockscissors':
      case 'paperrock':
      case 'scissorspaper':
        this.win(userChoice, compChoice);
        break;
      case 'rockpaper':
      case 'scissorsrock':
      case 'paperscissors':
        this.lose(userChoice, compChoice);
        break;
      default:
        this.draw(userChoice, compChoice);
        break;
    }

  }
}
