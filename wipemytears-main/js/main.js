
const driftBottles = document.querySelectorAll(".js-drift-bottle");

driftBottles.forEach((bottle) => {
  const btn = bottle.querySelector("button");

  // 确保父容器可以作为定位参考
  bottle.style.position = "relative";
  btn.style.position = "absolute";

  // 获取容器和按钮的尺寸
  const bottleRect = bottle.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  // 可用范围 = 容器大小 - 按钮大小
  const maxLeft = bottleRect.width - btnRect.width;
  const maxTop = bottleRect.height - btnRect.height;

  // 随机位置
  const randLeft = Math.floor(Math.random() * maxLeft);
  const randTop = Math.floor(Math.random() * maxTop);

  // 应用随机位置
  btn.style.left = randLeft + "px";
  btn.style.top = randTop + "px";
});