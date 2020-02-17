const resetButton = document.querySelector('.settings__reset');
const settings = document.querySelector('.settings');

// оставить условие здесь, т.к. сначала должна прогрузиться страница
if (localStorage.getItem('contrast')) {
  document.querySelector('section[class^="settings"]').classList.add('settings_appear');
}


function resetSettings() {
  document.querySelector('section[class^="settings"]').classList.remove('settings_appear');
  document.body.parentNode.classList.remove('contrast');
  document.body.parentNode.classList.remove('middle');
  document.body.parentNode.classList.remove('grand');
  localStorage.clear();
}


function changeVeiw(event) {
  if (event.target.classList.contains('settings__font_standard')) {
    document.documentElement.classList.remove('middle');
    document.documentElement.classList.remove('grand');

    localStorage.removeItem('font');
  }

  if (event.target.classList.contains('settings__font_middle')) {
    document.documentElement.classList.remove('grand');
    document.documentElement.classList.add('middle');
    localStorage.setItem('font', 1);
  }

  if (event.target.classList.contains('settings__font_grand')) {
    document.documentElement.classList.remove('middle');
    document.documentElement.classList.add('grand');
    localStorage.setItem('font', 2);
  }
}


resetButton.addEventListener('click', resetSettings);
settings.addEventListener('click', changeVeiw);