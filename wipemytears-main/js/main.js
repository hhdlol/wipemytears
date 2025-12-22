
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

function cancelButtonRefresh() {
  
  const cancelButton = document.querySelector('.js-cancel-button');

  cancelButton.addEventListener('click', () => {
    document.querySelector('.js-create-parchment').innerHTML = '';
  });
};

const driftBottleButtons = document.querySelectorAll('.js-drift-bottle-buttons');

driftBottleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.js-create-parchment').innerHTML =`
      <div id="create-parchment">

        <div id="parchment">

          <button id="cancel-button" class="js-cancel-button">
          <img src="/wipemytears-main/images/cancel.png" id="cancel-icon">
          </button>

          <img src="/wipemytears-main/images/parchment.png" id="parchment-image">

          <div id="info-input" class="parchment-pages js-info-input">
            <div id="confirm-content" class="parchment-pages">
              <div id="content-preview">
                <div id="title-preview">标题</div>
                <div id="text-preview">内容</div>
                <div id="details-preview">来自呵呵哒hvh（国家）</div>
              </div>
              <div id="decision-buttons">
                <button id="revise-button" class="parchment-button">
                  修改
                </button>
                <button id="confirm-button" class="parchment-button">
                  确认
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    cancelButtonRefresh();

  });
});

const createDriftBottleButton = document.querySelector('.js-create-drift-bottle-buttons');

createDriftBottleButton.addEventListener('click', () => {
  document.querySelector('.js-create-parchment').innerHTML = `
    <div id="create-parchment">

      <div id="parchment">

        <button id="cancel-button" class="js-cancel-button">
        <img src="/wipemytears-main/images/cancel.png" id="cancel-icon">
        </button>

        <img src="/wipemytears-main/images/parchment.png" id="parchment-image">

        <div id="info-input" class="parchment-pages js-info-input">
          <div id="title-input">
            <label for="title">标题（可选）:</label>
            <input type="text" id="title">
          </div>
          <div id="text-input">
            <label for="text-area">内容:</label>
            <textarea id="text-area" placeholder="输入文本提示词"></textarea>
          </div>

          <div id="details-input">

            <div id="nickname-input">
              <label for="nickname">来自（昵称）：</label>
              <input type="text" id="nickname">
            </div>

            <div id="country-input">

              <label for="country">国家/地区：</label>

              <select id="country">
                <option>--请选择--</option>
              </select>

            </div>
          </div>

          <div id="continue">
            <button id="continue-button" class="parchment-button js-continue-button">继续</button>
          </div>

        </div>
      </div>
    </div>
  `;

  cancelButtonRefresh();

  const continueButton = document.querySelector('.js-continue-button');

  continueButton.addEventListener('click', () => {
    document.querySelector('.js-info-input').innerHTML = `
      <div id="confirm-content" class="parchment-pages">
        <div id="content-preview">
          <div id="title-preview">标题</div>
          <div id="text-preview">内容</div>
          <div id="details-preview">来自呵呵哒hvh（国家）</div>
        </div>
        <div id="decision-buttons">
          <button id="revise-button" class="parchment-button">
            修改
          </button>
          <button id="confirm-button" class="parchment-button">
            确认
          </button>
        </div>
      </div>
    `;
  });

});