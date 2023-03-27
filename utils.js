function aiSnake() {
  if (Math.floor(Math.sqrt(Math.pow(ai.position.x-food.position.x, 2)+Math.pow(ai.position.y-food.position.y, 2))) >= 0) {
    if (ai.position.x !== food.position.x) {
      if (ai.position.x - food.position.x > 0) {
        ai.left = true
        ai.right = false
        ai.position.x -= ai.velocity
      } else {
        ai.left = false
      }
      if (ai.position.x - food.position.x < 0) {
        ai.right = true
        ai.left = false
        ai.position.x += ai.velocity
      } else {
        ai.right = false
      }

      ai.up = false
      ai.down = false
    } else {
      if (ai.position.y - food.position.y > 0) {
        ai.up = true
        ai.down = false
        ai.position.y -= ai.velocity
      } else {
        ai.up = false

      }

      if (ai.position.y - food.position.y < 0) {
        ai.position.y += ai.velocity
        ai.down = true
        ai.up = false
      } else {
        ai.down = false

      }
      ai.left = false
      ai.right = false
    }
  }
}