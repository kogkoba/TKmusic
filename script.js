document.addEventListener("DOMContentLoaded", async function () {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx_HuAOaCn8j3P5mKSWGReX2ehoaIAwBsWgYL-paKQ_r0F2t99mNQmEIUo9VQAcQ7W5dA/exec";
    const musicGrid = document.getElementById("musicGrid");
    const playerContainer = document.createElement("div");
    document.body.appendChild(playerContainer);
    let currentPlayer = null; // 現在のプレイヤー

    try {
        let response = await fetch(GAS_URL);
        let songs = await response.json();

        console.log("取得したデータ:", songs);

        songs.forEach(song => {
            console.log(`処理中の曲: ${song.name}, 画像ID: ${song.imageId}, MP3 ID: ${song.mp3Id}`);

            let button = document.createElement("img");
            button.src = `https://drive.google.com/uc?export=view&id=${song.imageId}`;
            button.alt = song.name;
            button.classList.add("music-button");

            button.addEventListener("click", function () {
                // すでに再生中なら削除
                if (currentPlayer) {
                    currentPlayer.remove();
                }

                // 新しい `iframe` で `preview` を開く
                currentPlayer = document.createElement("iframe");
                currentPlayer.src = `https://drive.google.com/file/d/${song.mp3Id}/preview`;
                currentPlayer.width = "0"; // 非表示にする
                currentPlayer.height = "0";
                currentPlayer.style.display = "none";

                playerContainer.appendChild(currentPlayer);
            });

            musicGrid.appendChild(button);
        });
    } catch (error) {
        console.error("音楽データの取得に失敗しました:", error);
    }
});
