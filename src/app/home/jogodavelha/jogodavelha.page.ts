import { Component, OnInit } from '@angular/core';
import { PointsService } from 'src/app/services/points.service';

@Component({
  selector: 'app-jogodavelha',
  templateUrl: './jogodavelha.page.html',
  styleUrls: ['./jogodavelha.page.scss'],
})
export class JogodavelhaPage implements OnInit {

  globalPoints: number;
  squares: string[];
  xIsNext: boolean;
  winner: string;
  moveCounter = 0;
  empate = false;

  constructor(
    private pointsService: PointsService
  ) {
    this.globalPoints = this.pointsService.globalPoints;
   }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.moveCounter = 0;
    this.empate = false;
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number) {
    if (!this.squares[index]) {
      this.moveCounter++;
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    //Combinações vencedoras
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    //Compara a sequencia de caracteres
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.pointsService.sumPoints();
        this.globalPoints = this.pointsService.globalPoints;
        return this.squares[a];
      }
    }
    if(this.moveCounter >= 9 && this.winner === null) {
      this.empate = true;
    }
    return null;
  }
}
