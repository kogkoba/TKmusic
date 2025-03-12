document.addEventListener("DOMContentLoaded", async function () {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbx_HuAOaCn8j3P5mKSWGReX2ehoaIAwBsWgYL-paKQ_r0F2t99mNQmEIUo9VQAcQ7W5dA/exec";
  const musicGrid = document.getElementById("musicGrid");
  const audioPlayer = document.getElementById("audioPlayer");

  try {
    let response = await fetch(GAS_URL);
    let songs = await response.json();

    songs.forEach(song => {
      let button = document.createElement("img");
      button.src = `https://www.dropbox.com/scl/fi/${song.imageId}?raw=1`;
      button.alt = song.name;
      button.classList.add("music-button");
      button.addEventListener("click", function () {
        audioPlayer.src = `https://www.dropbox.com/scl/fi/${song.mp3Id}?raw=1`;
        audioPlayer.play();
      });
      musicGrid.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching music data:", error);
  }
});
