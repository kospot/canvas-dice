# html5 canvas学习
## 该练习是一个摇色子的游戏[demo](http://miniwa.com.cn/apps/canvas-dice/index.html)

  通过 1 + Math.floor(Math.random()*6) 获取一个1-6的随机数，作为色子的数，然后通过drawDice绘出色子。

  提供了randowDraw随机画色子的方法，会滚动色子，并返回一个es6的Promise对象
  
  随机的时候，色子变换的时间间隔，采用了一元二次方程的抛物线
