document.addEventListener("DOMContentLoaded", async function () {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx_HuAOaCn8j3P5mKSWGReX2ehoaIAwBsWgYL-paKQ_r0F2t99mNQmEIUo9VQAcQ7W5dA/exec";
    const musicGrid = document.getElementById("musicGrid");
    const playerContainer = document.getElementById("playerContainer");

    try {
        let response = await fetch(GAS_URL);
        let songs = await response.json();

        songs.forEach(song => {
            let button = document.createElement("img");
            button.src = song.imageId; // B列の画像URL
            button.alt = song.name;
            button.classList.add("music-button");
            button.addEventListener("click", function () {
                // クリックでMP3の埋め込みプレイヤーを表示
                playerContainer.innerHTML = `<iframe src="https://drive.google.com/file/d/${song.mp3Id}/preview" width="300" height="50"></iframe>`;
            });
            musicGrid.appendChild(button);
        });
    } catch (error) {
        console.error("音楽データの取得に失敗しました:", error);
    }
});
