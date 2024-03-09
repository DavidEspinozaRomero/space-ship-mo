// class Player {
//   // maxHealth: number = 100;
//   // health: number = this.maxHealth;
//   // damage: number = 10;

//   spriteWidth = this.game.assets['spaceShipImg'].width;
//   spriteHeight = this.game.assets['spaceShipImg'].height;
//   width = this.spriteWidth * 0.8;
//   height = this.spriteHeight * 0.8;
//   img = this.game.assets['spaceShipImg'].img;
//   speed = 0;
//   maxSpeed = 5;
//   // angle = Math.floor(Math.random() * 8) * 45;
//   angle = 90;
//   cooldownAngle = 0;
//   cooldown = 0;

//   x = this.game.width * 0.5 - this.width;
//   y = this.game.height * 0.5 - this.height;

//   directionX = Math.cos((this.angle * Math.PI) / 180);
//   directionY = Math.sin((this.angle * Math.PI) / 180) * -1;

//   constructor(private game: Game) {}

//   update(input: string[]) {
//     if (input.includes(' ')) {
//       this.shoot();
//     }
//     // if (input.includes('ArrowDown')) {
//     //   if (this.speed > 0) {
//     //     this.speed--;
//     //   }
//     // }
//     // if (input.includes('ArrowUp')) {
//     //   if (this.maxSpeed > this.speed) {
//     //     this.speed++;
//     //   }
//     //   this.directionX = Math.cos((this.angle * Math.PI) / 180);
//     //   this.directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
//     // }

//     // if (this.cooldownAngle > 0) {
//     //   this.cooldownAngle--;
//     // } else {
//     //   this.cooldownAngle = 10;

//     //   if (input.includes('ArrowLeft')) {
//     //     this.angle += 45;
//     //   }
//     //   if (input.includes('ArrowRight')) {
//     //     this.angle -= 45;
//     //   }
//     // }

//     // movement horizontal
//     this.x += this.directionX * this.speed;
//     if (this.x < 0) {
//       this.x = 0;
//     }
//     if (this.x > this.game.width - this.width) {
//       this.x = this.game.width - this.width;
//     }

//     // movement vertical
//     this.y += this.directionY * this.speed;
//     if (this.y < 0) {
//       this.y = 0;
//     }
//     if (this.y > this.game.height - this.height) {
//       this.y = this.game.height - this.height;
//     }

//     // this.speed *= this.friction;
//   }
//   draw(ctx: CanvasRenderingContext2D) {
//     // ctx.fillRect(10, 20, 10, 20);
//     const centerX = this.x + this.width * 0.5;
//     const centerY = this.y + this.height * 0.5;

//     ctx.save();
//     ctx.translate(centerX, centerY);
//     ctx.rotate((((this.angle - 90) * Math.PI) / 180) * -1);
//     ctx.drawImage(
//       this.img,
//       0,
//       0,
//       this.spriteWidth,
//       this.spriteHeight,
//       -this.width * 0.5,
//       -this.height * 0.5,
//       this.width,
//       this.height
//     );
//     if (this.game.debug) {
//       ctx.strokeRect(
//         -this.width * 0.5,
//         -this.height * 0.5,
//         this.width,
//         this.height
//       );
//     }
//     ctx.restore();

//     // ctx.save();
//     // const centerX = this.x + this.width * 0.5;
//     // const centerY = this.y + this.height * 0.5;
//     // ctx.translate(centerX, centerY);
//     // ctx.rotate((((this.angle - 90) * Math.PI) / 180) * -1);
//     // ctx.translate(-centerX, -centerY);
//     // ctx.fillStyle = 'blue';
//     // ctx.fillRect(this.x, this.y, this.width, this.height);
//     // ctx.fillStyle = `red`;
//     // ctx.fillRect(this.x + this.width - 30, this.y, 30, 10);
//     // ctx.restore();
//   }

//   shoot() {
//     if (this.cooldown > 0) {
//       this.cooldown--;
//       return;
//     }
//     this.cooldown = 10;

//     // calculate x and y from angle
//     const centerX = this.x + this.width * 0.5;
//     const centerY = this.y + this.height * 0.5;

//     this.game.shoots.push(new Shoot(this.game, centerX, centerY, this.angle));
//   }
// }

// class Shoot {
//   markedForDeletion = false;
//   directionX = Math.cos((this.angle * Math.PI) / 180);
//   directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
//   speed = 3;

//   constructor(
//     private game: Game,
//     private x: number,
//     private y: number,
//     private angle: number
//   ) {}

//   update() {
//     // move shoot by angle
//     this.x += this.directionX * this.speed;
//     this.y += this.directionY * this.speed;
//     if (this.x < 0) this.markedForDeletion = true;
//     if (this.x > this.game.width) this.markedForDeletion = true;
//     if (this.y < 0) this.markedForDeletion = true;
//     if (this.y > this.game.height) this.markedForDeletion = true;
//   }
//   draw(ctx: CanvasRenderingContext2D) {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.stroke();
//   }
// }

// class Game {
//   player = new Player(this);
//   shoots: Shoot[] = [];
//   debug = false;

//   inputHandler = new InputHandler();

//   constructor(
//     public readonly width: number,
//     public readonly height: number,
//     public assets: AssetProps
//   ) {
//   }

//   update() {
//     this.player.update(this.inputHandler.keys);
//     this.shoots.forEach((shoot) => {
//       shoot.update();
//     });
//     this.shoots = this.shoots.filter((shoot) => !shoot.markedForDeletion);
//   }
//   draw(ctx: CanvasRenderingContext2D) {
//     this.player.draw(ctx);
//     this.shoots.forEach((shoot) => {
//       shoot.draw(ctx);
//     });
//   }
// }

// interface AssetProps {
//   [key: string]: {
//     img: HTMLImageElement;
//     width: number;
//     height: number;
//   };
// }
