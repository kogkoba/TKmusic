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
