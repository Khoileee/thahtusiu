// Nhạc nền: "Tip Toe (Speed Up)" – HYBS, nhúng từ kênh phát hành chính thức HYBS - Topic trên YouTube (không lưu file nhạc).
export const SONG = {id:'fhgVHpli4uM', title:'Tip Toe (Speed Up)', artist:'HYBS', url:'https://www.youtube.com/watch?v=fhgVHpli4uM'};

export function createSong(mountId, onChange) {
  let player = null, ready = false, want = false, state = -1, failed = false;
  const emit = () => onChange?.({playing: state === 1, buffering: state === 3, failed, ready});

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.onerror = () => { failed = true; emit(); };
  document.head.append(tag);
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    prev?.();
    player = new YT.Player(mountId, {
      host: 'https://www.youtube-nocookie.com',
      width: 200, height: 200, videoId: SONG.id,
      playerVars: {controls: 1, loop: 1, playlist: SONG.id, playsinline: 1, rel: 0, modestbranding: 1, fs: 0, iv_load_policy: 3},
      events: {
        onReady() { ready = true; player.setVolume(60); if (want) player.playVideo(); emit(); },
        onStateChange(e) { state = e.data; emit(); },
        onError() { failed = true; emit(); }
      }
    });
  };

  return {
    get playing() { return state === 1 || state === 3; },
    get failed() { return failed; },
    // Gọi trong sự kiện chạm/bấm để trình duyệt cho phép phát.
    play() { want = true; if (ready) player.playVideo(); },
    pause() { want = false; if (ready) player.pauseVideo(); }
  };
}
