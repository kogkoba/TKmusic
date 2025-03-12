document.addEventListener("DOMContentLoaded", async function () {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx_HuAOaCn8j3P5mKSWGReX2ehoaIAwBsWgYL-paKQ_r0F2t99mNQmEIUo9VQAcQ7W5dA/exec";
    const musicGrid = document.getElementById("musicGrid");
    let currentAudio = new Audio();

    try {
        let response = await fetch(GAS_URL);
        let songs = await response.json();

        console.log("取得したデータ:", songs);

        songs.forEach(song => {
            console.log(`処理中の曲: ${song.name}, 画像ID: ${song.imageId}, MP3 ID: ${song.MP3ID}`);

            let button = document.createElement("img");
            button.src = `https://lh3.googleusercontent.com/d/${song.imageId}`;
            button.alt = song.name;
            button.classList.add("music-button");

            button.addEventListener("click", function () {
                // すでに再生中の曲があれば停止
                if (!currentAudio.paused) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }

                // Google Driveの直接再生URL
                let mp3Url = `https://docs.google.com/uc?export=download&id=${song.mp3Id}`;
                
                // audio タグでMP3を再生
                currentAudio.src = mp3Url;
                currentAudio.play().catch(error => console.error("MP3の再生に失敗しました:", error));
            });

            musicGrid.appendChild(button);
        });
    } catch (error) {
        console.error("音楽データの取得に失敗しました:", error);
    }
});
