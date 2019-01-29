const getWakuDimensions = () => {

  const waku = document.getElementsByClassName('waku')[0];

  const wakuDimensions = {

    width : parseFloat(window.getComputedStyle(waku).width),
    height : parseFloat(window.getComputedStyle(waku).height)
  }
  
  return wakuDimensions;
}


const getWakuOffsetLeft = () => {

  const wakuSlideshow = document.getElementsByClassName('wakuSlideshow')[0];

  let wakuOffsetLeft = window.getComputedStyle(wakuSlideshow).transform;
  wakuOffsetLeft = wakuOffsetLeft.replace('matrix(1, 0, 0, 1, ',  '').replace(', 0)', '');
  wakuOffsetLeft = parseFloat(wakuOffsetLeft);

  return wakuOffsetLeft;
}


const wakuSlideLeft = () => {

  const wakuSlideshow = document.getElementsByClassName('wakuSlideshow')[0];
  const wakuOffsetLeft = getWakuOffsetLeft();
  const wakuDimensions = getWakuDimensions();

  deactivateControls();

  let newValue = (wakuOffsetLeft - wakuDimensions.width);
  toString(newValue);

  wakuSlideshow.style.transform = `matrix(1, 0, 0, 1, ${newValue}, 0)`;
}


const wakuResetPosition = () => {

    const wakuSlideshow = document.getElementsByClassName('wakuSlideshow')[0];
    const wakuOffsetLeft = getWakuOffsetLeft();
    const wakuDimensions = getWakuDimensions();

    let newValue;

    if ((wakuOffsetLeft % wakuDimensions.width) !== 0) {

      if ((Math.abs(wakuOffsetLeft % wakuDimensions.width)) < (wakuDimensions.width / 2)) {

        // slides back to the earlier of the two visible slides
        newValue = (wakuOffsetLeft - (wakuOffsetLeft % wakuDimensions.width));
      }

      if ((Math.abs(wakuOffsetLeft % wakuDimensions.width)) > (wakuDimensions.width / 2)) {

        // slides forward to the later of the two visible slides
        newValue = (wakuOffsetLeft - (wakuOffsetLeft % wakuDimensions.width) - wakuDimensions.width);
      }
    }

    wakuSlideshow.style.transform = `matrix(1, 0, 0, 1, ${newValue}, 0)`;
}




const wakuControls = document.getElementsByClassName('wakuControls')[0];

const deactivateControls = () => {

  const arrows = [... document.getElementsByClassName('wakuControl')];

  arrows.forEach(arrow => delete arrow.dataset.controlState);
}


const activateControl = (e) => {
  
  if (e.target.classList.contains('wakuControl')) {

    deactivateControls();
  
    e.target.dataset.controlState = 'active';
  }
}

wakuControls.addEventListener('mouseover', activateControl, false);


document.querySelector('.wakuControl.--right').addEventListener('click', wakuSlideLeft, false);

let resizeTimer; 
window.addEventListener('resize', () => {clearTimeout(resizeTimer); resizeTimer = setTimeout(wakuResetPosition, 400);}, false);
