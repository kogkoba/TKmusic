// 画面切り替え用のDOM取得
const loginScreen = document.getElementById('login-screen');
const selectionScreen = document.getElementById('selection-screen');
const musicScreen = document.getElementById('music-screen');

// ボタン取得
const loginBtn = document.getElementById('login-btn');
const musicSelectBtn = document.getElementById('music-select-btn');
const musicImg = document.getElementById('music-img');
const musicAudio = document.getElementById('music-audio');

// ログインボタン：選択画面へ切り替え
loginBtn.addEventListener('click', () => {
  loginScreen.style.display = 'none';
  selectionScreen.style.display = 'block';
});

// 選択画面の音楽ボタン：音楽再生画面へ切り替え
musicSelectBtn.addEventListener('click', () => {
  selectionScreen.style.display = 'none';
  musicScreen.style.display = 'block';
});

// フラグ: 現在再生中かどうか
let isPlaying = false;

// 画像クリック時の処理
musicImg.addEventListener('click', () => {
  // 再生中は何もしない
  if (isPlaying) return;

  // 再生開始
  musicAudio.currentTime = 0;
  musicAudio.play();
  isPlaying = true;
  // 画像に無効状態用のクラスを追加（色を変更して視覚的に分かるように）
  musicImg.classList.add('disabled');

  // 再生終了後に有効化
  musicAudio.addEventListener('ended', onAudioEnded);
});

// 再生終了時の処理
function onAudioEnded() {
  isPlaying = false;
  musicImg.classList.remove('disabled');
  // 再生終了イベントを一度だけ受け取るためにリスナーを削除
  musicAudio.removeEventListener('ended', onAudioEnded);
}
