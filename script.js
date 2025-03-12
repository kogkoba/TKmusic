document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("myAudio");
  const playButton = document.getElementById("playButton");

  let isPlaying = false; // 再生中フラグ

  playButton.addEventListener("click", function () {
    if (!isPlaying) {
      isPlaying = true; // 再生中フラグを立てる
      playButton.classList.add("disabled"); // ボタンを無効化（視覚的にも）

      audio.currentTime = 0; // 頭出し
      audio.play(); // 再生

      // 再生が終わったらボタンを元に戻す
      audio.addEventListener("ended", function () {
        isPlaying = false; // フラグをリセット
        playButton.classList.remove("disabled"); // ボタンを有効化
      }, { once: true }); // once: true でイベントリスナーを1回だけ実行
    }
  });
});
