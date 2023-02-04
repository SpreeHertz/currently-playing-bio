const electron = require('electron')
const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
  const spotifyTokenBtn = document.getElementById('spotify_token')
  spotifyTokenBtn.addEventListener("click", function () {
      let active_hotspot_id = localStorage.getItem('active_hotspot_id')
      const reply = ipc.sendSync('hotspot-event', active_hotspot_id)
      const targetElement = document.getElementById('help_text')
        if (targetElement.style.display === 'none') {
          targetElement.style.display = 'block';
        }
        else {
          targetElement.style.display = 'none';
      }
  });


})