// main.js

let audio = null;

async function playAudio(fileId) {
    const url = `https://script.google.com/macros/s/YOUR_GAS_DEPLOYMENT_ID/exec?fileId=${fileId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fetch error: ${response.status}`);

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);

        // 既に再生中なら停止
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        console.error("再生エラー:", error);
    }
}

// スプレッドシートのデータを取得してプレイリストを作成
async function loadSongs() {
    const url = "https://script.google.com/macros/s/YOUR_GAS_DEPLOYMENT_ID/exec";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // ページ上に曲リストを生成
        const songList = document.getElementById("songList");
        data.forEach(row => {
            const songName = row.songName;
            const fileId = row.fileId;

            const button = document.createElement("button");
            button.textContent = songName;
            button.onclick = () => playAudio(fileId);
            songList.appendChild(button);
        });
    } catch (error) {
        console.error("スプレッドシートの読み込みエラー:", error);
    }
}

// ページ読み込み時に曲リストをロード
window.onload = loadSongs;
