const navigatorControls = document.getElementsByClassName('navigatorControls')[0];

const deactivateControls = () => {

  const arrows = [... document.getElementsByClassName('navigatorControl')];

  arrows.forEach(arrow => delete arrow.dataset.controlState);
}


const activateControl = (e) => {
  
  if (e.target.classList.contains('navigatorControl')) {

    deactivateControls();
  
    e.target.dataset.controlState = 'active';
  }
}

navigatorControls.addEventListener('mouseover', activateControl, false);
