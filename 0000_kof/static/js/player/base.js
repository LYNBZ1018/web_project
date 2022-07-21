import { SupGameObject } from "../sup_game_object/base.js";

export class Player extends SupGameObject {
    constructor(root, info) {
        super();
        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.direction = 1;  // 方向

        this.vx = info.vx;
        this.vy = info.vy;

        this.gravity = 50;

        this.speedx = 400;  // 水平速度
        this.speedy = -1000;  // 跳起的初始速度

        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.status = 3;  // 0：idle静止， 1：向前，2：向后，3：跳跃，4：攻击，5：被打，6：死亡；
    }

    start() {

    }

    update_move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 450) {  // 下降一定高度后就停止
            this.y = 450;
            this.vy = 0;

            this.status = 0;  // 跳下之后变为静止转态
        }

        if (this.x < 0) {  // 防止player走出游戏界面
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');  // 判断有没有按下w
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1) {
            if (w) {
                if (d) {  // 向前跳
                    this.vx = this.speedx;
                } else if (a) {  // 向后跳
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;  // 竖直跳
                }

                this.vy = this.speedy;
                this.status = 3;  // 变为跳起转态
            } else if (d) {
                this.vx = this.speedx;  // 向前走
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;  // 向后走
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;  // 静止
            }
        }
    }

    update() {
        this.update_control();
        this.update_move();

        this.render();
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}