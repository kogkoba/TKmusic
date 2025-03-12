document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("myAudio");
  const playButton = document.getElementById("playButton");

  let playedOnce = false; // 1回だけ再生するフラグ

  playButton.addEventListener("click", function () {
    if (!playedOnce) {
      playedOnce = true; // フラグを立てる
      playButton.classList.add("disabled"); // ボタンを無効化（視覚的にも）

      audio.currentTime = 0; // 頭出し
      audio.play(); // 再生

      // 再生が終わったらボタンの状態を戻す
      audio.addEventListener("ended", function () {
        playButton.classList.remove("disabled");
      }, { once: true }); // once: true でイベントリスナーを1回だけ実行
    }
  });
});

