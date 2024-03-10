import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Manager, Socket } from 'socket.io-client';

import { InputHandler } from './models/input-handler.model';

@Component({
  selector: 'app-star-ship-fights',
  standalone: true,
  imports: [],
  templateUrl: './star-ship-fights.component.html',
  styleUrl: './star-ship-fights.component.scss',
})
export class StarShipFightsComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  // manager = new Manager('http://localhost:3000');
  manager = new Manager('https://space-ship-mo-server.onrender.com');
  socket = this.manager.socket('/');
  // socketgame = this.manager.socket('/game');
  inputHandler = new InputHandler(this.socket);
  assets = {
    'space-ship': {
      img: new Image(),
      spriteWidth: 89,
      spriteHeight: 113,
    },
  };

  players: any[] = [];
  shoots: any[] = [];

  ngOnInit(): void {
    this.assets['space-ship'].img.src = 'assets/space-ship.png';
    this.wsEvents();
    this.canvas = this.canvas1.nativeElement;
    this.canvas.width = 1000; // window.innerWidth;
    this.canvas.height = 1000; // window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    if (this.ctx) {
      this.animate(this.ctx);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    timestamp: number = performance.now()
  ) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.players.forEach((player) => {
      const centerX = player.x + player.width * 0.5;
      const centerY = player.y + player.height * 0.5;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((((player.angle - 90) * Math.PI) / 180) * -1);
      ctx.drawImage(
        this.assets['space-ship'].img,
        0,
        0,
        this.assets['space-ship'].spriteWidth,
        this.assets['space-ship'].spriteHeight,
        -player.width * 0.5,
        -player.height * 0.5,
        player.width,
        player.height
      );
      ctx.restore();
    });
    this.shoots.forEach((shoot) => {
      ctx.beginPath();
      ctx.arc(shoot.x, shoot.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    requestAnimationFrame(() => this.animate(ctx, timestamp));
  }

  wsEvents() {
    this.socket.on('connect', () => {
      console.log('ws connected');
    });

    this.socket.on('canvas', (canvas: { width: number; height: number }) => {
      this.canvas.width = canvas.width;
      this.canvas.height = canvas.height;
    });

    this.socket.on('disconnect', () => {
      console.log('ws disconnected');
    });

    this.socket.on('players', (playersServer) => {
      this.players = playersServer;
    });

    this.socket.on('shoots', (shootsServer) => {
      this.shoots = shootsServer;
    });
  }
}
