// Nhạc nền: "Tip Toe (Speed Up)" – HYBS, nhúng từ kênh phát hành chính thức HYBS - Topic trên YouTube (không lưu file nhạc).
export const SONG = {id:'fhgVHpli4uM', title:'Tip Toe (Speed Up)', artist:'HYBS', url:'https://www.youtube.com/watch?v=fhgVHpli4uM'};

export function createSong(mountId, onChange) {
  let player = null, ready = false, want = false, auto = false, muted = false, state = -1, failed = false, autoTimer;
  const audible = () => (state === 1 || state === 3) && !muted;
  const emit = () => onChange?.({playing: audible(), started: state === 1, muted, failed, ready});

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
        onReady() { ready = true; player.setVolume(60); if (auto) tryAuto(); else if (want) player.playVideo(); emit(); },
        onStateChange(e) { state = e.data; emit(); },
        onError() { failed = true; emit(); }
      }
    });
  };

  // Thử phát có tiếng; trình duyệt chặn thì phát tắt tiếng (được phép) để chờ lần chạm đầu tiên bật tiếng.
  function tryAuto() {
    player.unMute(); player.playVideo();
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      if (state === 1 || !want) return;
      muted = true; player.mute(); player.playVideo(); emit();
    }, 1200);
  }

  return {
    get playing() { return audible(); },
    get failed() { return failed; },
    autoStart() { want = true; auto = true; if (ready) tryAuto(); },
    // Gọi trong sự kiện chạm/bấm để trình duyệt cho phép phát có tiếng.
    play() {
      want = true; auto = false; clearTimeout(autoTimer);
      if (!ready) return;
      if (muted || player.isMuted()) { player.unMute(); player.setVolume(60); muted = false; }
      player.playVideo(); emit();
    },
    pause() { want = false; auto = false; clearTimeout(autoTimer); if (ready) player.pauseVideo(); }
  };
}
