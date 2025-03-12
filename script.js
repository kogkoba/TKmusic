// main.js

let audio = null;

async function playAudio(fileId) {
    const url = `https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjedJ2HD9KaXK3IcJP22_DMbBZRFJlEmwN8bzuE9L_m_3EMvrh-PGaQt7OSm3MK9CIREzfKluPwPrdtV5a-4cSfQVBzA4rASr2WIWShtIkOyHQVgloFZrid_DLmu6tuRCUe-sam_ftI_qE2kp1WnDGSD17kntVqLIfe9YI_LRyJQ9WArYgy4LSexr0rGRK6qfIJc8o3kC3NIx9P0OBZbTCeQVXWcMtgq2WowkBz4LhOF3M7Lbw41Q48NfX3Zp2poIqJAgvYLxqZd0PVEV0tOOutrP24pqZ4nxEvjpgF3H1WKrIZwYr_VeuVyUvI-orr-kfGXLj4wm9t7XsFSOOjavcqXR_NIg&lib=MGaS2nS_nMDNMW6CDUQ4QWVlHSDnYtYkg&fileId=${fileId}`;
    
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
async function playAudio(fileId) {
    const url = `https://script.google.com/macros/s/AKfycbyEKyr-gjofu4v0HJpa9nHSZQLm5WNkOneYsbboeB5Wqerz2Xexw-GTwS-4MozFzUgGMg/exec?fileId=${fileId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fetch error: ${response.status}`);

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);

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

// ページ読み込み時に曲リストをロード
window.onload = loadSongs;
