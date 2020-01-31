window.onload = function() {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const list = document.getElementById("list");
  const container = document.getElementById("container");
  const buttons = document
    .getElementById("buttons")
    .getElementsByTagName("span");
  let timer;
  let index = 1;
  let animated = false;

  function shownButton() {
    for (let i = 0; i < buttons.length; i++) {
      //每点击1次prev或next，清除前一个span元素的className
      if (buttons[i].className == "on") {
        buttons[i].className = "";
        break;
      }
    }
    buttons[index - 1].className = "on";
  }

  function animate(offset) {
    let speed = offset / 30;
    //传入offset，next移动-640px, prev移动+640px
    let newLeft = parseInt(list.style.left) + offset;
    animated = true;

    function go() {
      if (
        (speed > 0 && parseInt(list.style.left) < newLeft) ||
        (speed < 0 && parseInt(list.style.left) > newLeft)
      ) {
        list.style.left = parseInt(list.style.left) + speed + "px";
        setTimeout(go, 10);
      } else {
        animated = false;
        list.style.left = newLeft + "px";
        if (newLeft > -640) {
          list.style.left = -3200 + "px";
        }

        if (newLeft < -3200) {
          list.style.left = -640 + "px";
        }
      }
    }
    go();
  }

  prev.onclick = function() {
    if (!animated) {
      if (index == 1) {
        index = 5;
      } else {
        index -= 1;
      }

      shownButton();
      animate(640);
    }
  };

  next.onclick = function() {
    if (!animated) {
      if (index == 5) {
        index = 1;
      } else {
        index += 1;
      }

      shownButton();
      animate(-640);
    }
  };

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      //如果点击当前图片圆点，则直接return
      if (this.className == "on") {
        return;
      }
      //点击圆点，跳转图片
      let myIndex = parseInt(this.getAttribute("index"));
      let offset = -640 * (myIndex - index);
      if (!animated) {
        animate(offset);
      }
      index = myIndex;
      shownButton();
    };
  }

  function play() {
    timer = setInterval(() => {
      next.onclick();
    }, 2000);
  }
  function stop() {
    clearInterval(timer);
  }
  play();
  container.onmouseover = stop;
  container.onmouseout = play;
};
