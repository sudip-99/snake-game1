let name = prompt ('Enter your name :').toUpperCase()

const canvas = document.querySelector('canvas')
document.getElementById ('name').innerText = name
const text = document.getElementById('score')
const clock = document.getElementById('timer')
const sound = document.createElement('audio')
sound.src = 'Sound_crunch.wav'
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext ('2d')
let game_start_image = new Image()
game_start_image.src = 'game-start.png'
let image_show_time = 5
game_start_window()

let score = 0
let bgImage = new Image()
bgImage.src = 'bg.png'
let game_over_image = new Image()
game_over_image.src = 'game-over.png'

let gameClose = false

let position = {
  touchStart: {},
  touchEnd: {}
}


class Food {
  constructor (position) {
    this.position = position
    this.width = 30
    this.height = 30
    this.images = [
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image()
    ]
    this.images[0].src = 'green-apple.png'
    this.images[1].src = 'red-apple.png'
    this.images[2].src = 'apple.png'
    this.images[3].src = 'guava.png'
    this.images[4].src = 'egg.png'
    this.food_image = this.images[1]
    this.size = 30
  }

  draw () {
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect (this.position.x, this.position.y, this.width, this.height)
    ctx.drawImage (this.food_image, this.position.x, this.position.y, this.size, this.size)
    this.update ()
  }

  update () {
    
    if (Math.floor(Math.sqrt(Math.pow(player.position.x-this.position.x, 2)+Math.pow(player.position.y-this.position.y, 2))) < 20){
      score += 1
      text.innerText = score 
    }
    
    if (
      Math.floor(Math.sqrt(Math.pow(player.position.x-this.position.x, 2)+Math.pow(player.position.y-this.position.y, 2))) < 20 || Math.floor(Math.sqrt(Math.pow(ai.position.x-this.position.x, 2)+Math.pow(ai.position.y-this.position.y, 2))) < 20 
    ) {
      sound.play()
      this.position.x = Math.floor (Math.random()*(canvas.width-100))
      this.position.y = Math.floor (Math.random()*(canvas.height-100))
      this.food_image = this.images[Math.floor(Math.random()*4)]
    }


  }
}

class AI {
  constructor (position) {
    this.position = position
    this.velocity = 1
    this.width = 20
    this.height = 20
    this.images = [
      new Image(),
      new Image(),
      new Image(),
      new Image()
    ]
    this.images[0].src = 'ai-up.png'
    this.images[1].src = 'ai-down.png'
    this.images[2].src = 'ai-left.png'
    this.images[3].src = 'ai-right.png'
    this.size = 150
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.image = this.images[0]
    this.offsetx = 0
    this.offsety = 0
  }

  draw () {
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect (this.position.x, this.position.y, this.width, this.height)
    if (this.up) {
      this.image = this.images[0]
      this.offsetx = 65
      this.offsety = 19
    }
    if (this.down) {
      this.image = this.images[1]
      this.offsetx = 63
      this.offsety = 111
    }
    if (this.left) {
      this.image = this.images[2]
      this.offsetx = 17
      this.offsety = 63
    }
    if (this.right) {
      this.image = this.images[3]
      this.offsetx = 109
      this.offsety = 65
    }

    ctx.drawImage (this.image, this.position.x-this.offsetx, this.position.y-this.offsety, this.size, this.size)
  }

}

class Player {
  constructor (position) {
    this.position = position
    this.width = 20
    this.height = 20
    this.speed = 1.5
    this.left = false
    this.right = false
    this.up = false
    this.down = false
    this.snake_head_up = false
    this.snake_head_down = false
    this.snake_head_left = false
    this.snake_head_right = false
    this.snake_size = 150
    this.images = [
      new Image(),
      new Image(),
      new Image(),
      new Image()
    ]
    this.images[0].src = 'head-up.png'
    this.images[1].src = 'head-down.png'
    this.images[2].src = 'head-left.png'
    this.images[3].src = 'head-right.png'
    this.player_image = this.images[2]
    this.offsetx
    this.offsety
    this.default_image = this.images[3]
    this.show_defalut_image = true
  }

  draw () {
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect (this.position.x, this.position.y, this.width, this.height)
    if (this.snake_head_up) {
      this.player_image = this.images[0]
      this.offsetx = 37
      this.offsety = 30
      this.show_defalut_image = false
    }
    if (this.snake_head_down) {
      this.player_image = this.images[1]
      this.offsetx = 93
      this.offsety = 100
      this.show_defalut_image = false 
    }
    if (this.snake_head_left) {
      this.player_image = this.images[2]
      this.offsetx = 13
      this.offsety = 85
      this.show_defalut_image = false 
    }

    if (this.snake_head_right) {
      this.player_image = this.images[3]
      this.offsetx = 105
      this.offsety = 20
      this.show_defalut_image = false
    }
    if (this.show_defalut_image){
      ctx.drawImage (this.default_image,this.position.x-105,this.position.y-20,this.snake_size,this.snake_size)
    }
    ctx.drawImage (this.player_image, this.position.x-this.offsetx, this.position.y-this.offsety, this.snake_size, this.snake_size)
    
    this.update()
  }

  update() {

    if (this.position.x > canvas.width-this.width || this.position.x < 0 || this.position.y > canvas.height-this.height || this.position.y < 0
    ) {
      this.speed = 0
      gameClose = true
    }

    let dx = Math.floor(position.touchStart.x - position.touchEnd.x)
    let dy = Math.floor(position.touchStart.y- position.touchEnd.y)



    if ((dx >= 30 || dx <= 30) && position.touchEnd.y-position.touchStart.y > 50 && (!this.left) && (!this.right) && (!this.up)) {
      this.down = true
      this.position.y += this.speed
      this.snake_head_down = true



    } else {
      this.down = false
      this.snake_head_down = false

    }

    if ((dx >= 30 || dx <= 30) && position.touchStart.y-position.touchEnd.y > 50 && (!this.left) && (!this.down) && (!this.right)) {
      this.up = true
      this.position.y -= this.speed
      this.snake_head_up = true

    } else {
      this.up = false
      this.snake_head_up = false

    }

    if ((dy >= 30 || dy <= 30) && position.touchStart.x-position.touchEnd.x > 50 && (!this.right) && (!this.up) && (!this.down)) {
      this.left = true
      this.position.x -= this.speed
      this.snake_head_left = true


    } else {
      this.left = false
      this.snake_head_left = false

    }

    if (position.touchEnd.x-position.touchStart.x > 50 && (!this.left) && (!this.up) && (!this.down)){
      this.right = true
      this.position.x += this.speed
      this.snake_head_right = true


    } else {
      this.right = false
      this.snake_head_right = false

    }

    }
  }
  const player = new Player({
    x: 100, y: 100
  })
  const food = new Food ({
    x: 200, y: 100
  })
  const ai = new AI ({
    x: 300, y: 300
  })
  let time = 60
 
  function game_start_window(){
    setTimeout(game_start_window,1000)
    if (image_show_time>0){
      image_show_time--
      
    }
  }
  
  
  function animate () {
    if(image_show_time){
    ctx.drawImage(game_start_image,0,0,canvas.width,canvas.height)
    } else {
    ctx.drawImage (bgImage, 0, 0, 800, canvas.height)
    player.draw()
    food.draw()
    ai.draw()
    aiSnake()
    }
    if (!gameClose){
     requestAnimationFrame (animate)
    } else{
      time = 0
      alert ('SWIPE DOWN TO RESTART THE GAME')
    }
  }

  animate()

  canvas.addEventListener ('touchstart', e=> {
      if (!gameClose)
         e.preventDefault()

    position.touchStart.x = e['changedTouches']['0'].screenX
    position.touchStart.y = e['changedTouches']['0'].screenY
  })

  canvas.addEventListener ('touchend', e=> {
    if (!gameClose)
       e.preventDefault()

    position.touchEnd.x = e['changedTouches']['0'].screenX
    position.touchEnd.y = e['changedTouches']['0'].screenY
  })
