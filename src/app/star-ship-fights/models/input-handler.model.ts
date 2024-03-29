import { Socket } from 'socket.io-client';
export class InputHandler {
  keys: string[] = [];

  constructor(private socket: Socket) {
    document.addEventListener('keydown', (e) => {
      this.addKey(e);
    });

    document.addEventListener('keyup', (e) => {
      this.removeKey(e);
    });
  }

  addKey(e: KeyboardEvent) {
    if (this.keys.includes(e.key)) return;
    this.keys.push(e.key);
    this.socket.emit('inputs', this.keys);
  }
  removeKey(e: KeyboardEvent) {
    if (!this.keys.includes(e.key)) return;
    const index = this.keys.indexOf(e.key);
    this.keys.splice(index, 1);
    this.socket.emit('inputs', this.keys);
  }
}
