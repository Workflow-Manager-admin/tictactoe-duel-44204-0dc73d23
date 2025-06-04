import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
/**
 * Main TicTacToe Duel UI. Hosts game state, win/draw logic, turn indicator, grid and reset.
 */
export class AppComponent {
  readonly PLAYER_X = 'X';
  readonly PLAYER_O = 'O';
  readonly GRID_SIZE = 3;

  board: (string | null)[][] = [];
  currentPlayer: string = this.PLAYER_X;
  winner: string | null = null;
  isDraw: boolean = false;

  // PUBLIC_INTERFACE
  constructor() {
    this.resetGame();
  }

  // PUBLIC_INTERFACE
  resetGame(): void {
    this.board = Array.from({ length: this.GRID_SIZE }, () =>
      Array(this.GRID_SIZE).fill(null)
    );
    this.currentPlayer = this.PLAYER_X;
    this.winner = null;
    this.isDraw = false;
  }

  // PUBLIC_INTERFACE
  handleCellClick(row: number, col: number): void {
    if (this.winner || this.isDraw || this.board[row][col]) {
      return;
    }
    this.board[row][col] = this.currentPlayer;
    if (this.checkWinner(this.currentPlayer)) {
      this.winner = this.currentPlayer;
    } else if (this.isBoardFull()) {
      this.isDraw = true;
    } else {
      this.currentPlayer = this.currentPlayer === this.PLAYER_X ? this.PLAYER_O : this.PLAYER_X;
    }
  }

  // PUBLIC_INTERFACE
  checkWinner(player: string): boolean {
    // Rows, cols, diags
    for (let i = 0; i < this.GRID_SIZE; i++) {
      if (
        this.board[i].every(cell => cell === player) ||
        this.board.map(row => row[i]).every(cell => cell === player)
      ) {
        return true;
      }
    }
    // Diagonals
    if (Array.from({length: this.GRID_SIZE}).every((_,i) => this.board[i][i] === player)) { return true; }
    if (Array.from({length: this.GRID_SIZE}).every((_,i) => this.board[i][this.GRID_SIZE - i - 1] === player)) { return true; }
    return false;
  }

  // PUBLIC_INTERFACE
  isBoardFull(): boolean {
    return this.board.every(row => row.every(cell => cell));
  }
}
