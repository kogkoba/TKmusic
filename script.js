document.addEventListener("DOMContentLoaded", async function () {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx_HuAOaCn8j3P5mKSWGReX2ehoaIAwBsWgYL-paKQ_r0F2t99mNQmEIUo9VQAcQ7W5dA/exec";
    const musicGrid = document.getElementById("musicGrid");
    let currentAudio = null; // 現在の再生中オーディオ

    try {
        let response = await fetch(GAS_URL);
        let songs = await response.json();

        songs.forEach(song => {
            let button = document.createElement("img");
            button.src = `https://drive.google.com/uc?id=${song.imageId}`;
            button.alt = song.name;
            button.classList.add("music-button");

            button.addEventListener("click", function () {
                // すでに再生中の曲があれば停止
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }

                // 新しいオーディオを作成
                currentAudio = new Audio(`https://drive.google.com/uc?export=download&id=${song.mp3Id}`);
                currentAudio.play();
            });

            musicGrid.appendChild(button);
        });
    } catch (error) {
        console.error("音楽データの取得に失敗しました:", error);
    }
});
