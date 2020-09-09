<template>
    <div class = 'block-canvas'>
    <canvas class = "myCanvas" ref="myCanvas" width = "500" height = "500" />
    </div>
</template>

<script>
import axios from 'axios';


export default {
        data() {
            return {
                img: null,
                canvas: null,
                ctx: null,
                imgUrl: null,
                mx: null,
                my: null,
                startX: null,
                startY: null,
                dx: null,
                dy: null,
                shapes: [],
                mouse: {
                    x: 0,
                    y: 0,
                    down: false
                },
                rect: {
                    x: 225,
                    y: 225,
                    w: 50,
                    h: 50
                },
                selected: false,
                isDragging: false,
                green: 'rgba(0, 255, 0, 0.5)',
                blue: 'rgba(0, 0, 255, 0.5)'
            }
        },
        mounted() {
            axios.get('http://fantogramma.org/test.png', {responseType: 'blob'})
            .then(response => {
                this.imgUrl = URL.createObjectURL(response.data);
                this.draw();
                this.canvas.addEventListener('mousemove', this.handleMouseMove);
                this.canvas.addEventListener('mousedown', this.handleMouseDown);
                this.canvas.addEventListener('mouseup', this.handleMouseUp);
            });
        },
        methods:{
            draw: function() {
                let self = this;
                self.canvas = self.$refs.myCanvas;
                self.ctx = self.canvas.getContext("2d");
                self.img = new Image();
                self.img.src = self.imgUrl;
                self.img.onload = function () {
                    console.log ('loaded');
                    self.ctx.drawImage(self.img, 0, 0, 500, 500);
                    if (self.isDragging) {
                        self.ctx.fillStyle = self.blue;
                    } else {
                        self.ctx.fillStyle = self.green;
                    }
                    
                    self.fillRect(self.rect.x, self.rect.y, self.rect.w, self.rect.h);
                }
            },
            fillRect: function(x, y, w, h) {
                this.ctx.fillRect(x, y, w, h);
            },
            strokeRect: function(x, y, w, h) {
                this.ctx.strokeRect(x, y, w, h);
            },
            select: function() {
                return this.selected = !this.selected;
            },
            handleMouseDown: function(e) {
                this.mouse.down = true;
                this.mouse.x = e.clientX - this.canvas.getBoundingClientRect().left;
                this.mouse.y = e.clientY - this.canvas.getBoundingClientRect().top;
                
                if (!this.selected) {
                    if (this.isCursorInRect()) {
                        this.selected = this.rect;
                        this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
                        this.startY =  e.clientY - this.canvas.getBoundingClientRect().top;
                        this.dx = this.startX - this.rect.x;
                        this.dy = this.startY - this.rect.y;
                        this.isDragging = true;
                    }
                }
            },
            handleMouseMove: function(e) {
                if (this.mouse.down) {
                this.mx = parseInt(e.clientX - this.canvas.getBoundingClientRect().left);
                this.my = parseInt(e.clientY - this.canvas.getBoundingClientRect().top);

                if (this.isDragging) {
                    this.rect.x = this.mx - this.dx;
                    this.rect.y = this.my - this.dy;
                }

                this.draw();
                }
            },
            handleMouseUp: function() {
                this.mouse.down = false;
                this.selected = false;
                this.isDragging = false;
                this.rect.x = 225;
                this.rect.y = 225;
                this.draw();
            },
            isCursorInRect: function() {
                return this.mouse.x > this.rect.x && this.mouse.x < this.rect.x + this.rect.w && this.mouse.y > this.rect.y && this.mouse.y < this.rect.y + this.rect.h;
            }
        }
    }
</script>

<style lang = 'scss'>
    * {
        box-sizing: border-box;
    }

    .block-canvas {
        text-align: center;
        .myCanvas {
            width: 500px;
            height: 500px;
            border: red solid 1px;
            margin-top: 50px;
        }
    }
</style>