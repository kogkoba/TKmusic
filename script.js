document.addEventListener("DOMContentLoaded", async function () {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx_HuAOaCn8j3P5mKSWGReX2ehoaIAwBsWgYL-paKQ_r0F2t99mNQmEIUo9VQAcQ7W5dA/exec";
    const musicGrid = document.getElementById("musicGrid");
    let currentAudio = null;

    async function playAudio(url) {
        try {
            let response = await fetch(url);
            let blob = await response.blob();
            let objectURL = URL.createObjectURL(blob);

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            currentAudio = new Audio(objectURL);
            currentAudio.play();
        } catch (error) {
            console.error("MP3の再生に失敗しました:", error);
        }
    }

    try {
        let response = await fetch(GAS_URL);
        let songs = await response.json();

        console.log("取得したデータ:", songs);

        songs.forEach(song => {
            console.log(`処理中の曲: ${song.name}, 画像ID: ${song.imageId}, MP3 ID: ${song.mp3Id}`);

            let button = document.createElement("img");
            button.src = `https://drive.google.com/thumbnail?id=${song.imageId}`;
            button.alt = song.name;
            button.classList.add("music-button");

            button.addEventListener("click", function () {
                let mp3Url = `https://drive.google.com/uc?export=download&id=${song.mp3Id}`;
                playAudio(mp3Url);
            });

            musicGrid.appendChild(button);
        });
    } catch (error) {
        console.error("音楽データの取得に失敗しました:", error);
    }
});
