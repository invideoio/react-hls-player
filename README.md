# React Player HLS

![NPM Downloads](https://img.shields.io/npm/dm/@gumlet/react-player-hls?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/@gumlet/react-player-hls)

## Introduction

`react-player-hls` is a simple HLS live stream player.
It uses [hls.js](https://github.com/video-dev/hls.js) to play your hls live stream if your browser supports `html 5 video` and `MediaSource Extension`.

```bash
npm i @gumlet/react-player-hls
```

## Examples

### Using the ReactHlsPlayer component

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHlsPlayer from '@gumlet/react-player-hls';

ReactDOM.render(
  <ReactHlsPlayer
    src="https://video.gumlet.io/5f462c1561cf8a766464ffc4/635789f017629894d4d125a4/main.m3u8"
    autoPlay={false}
    controls={true}
    width="100%"
    height="auto"
  />,
  document.getElementById('app')
);
```

### Using hlsConfig (advanced use case)

All available config properties can be found on the [Fine Tuning](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning) section of the Hls.js API.md

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHlsPlayer from '@gumlet/react-player-hls';

ReactDOM.render(
  <ReactHlsPlayer
    src="https://video.gumlet.io/5f462c1561cf8a766464ffc4/635789f017629894d4d125a4/main.m3u8"
    hlsConfig={{
      maxLoadingDelay: 4,
      minAutoBitrate: 0,
      lowLatencyMode: true,
    }}
  />,
  document.getElementById('app')
);
```

### Using playerRef

The `playerRef` returns a ref to the underlying video component, and as such will give you access to all video component properties and methods.

```javascript
import React from 'react';
import ReactHlsPlayer from '@gumlet/react-player-hls';

function MyCustomComponent() {
  const playerRef = React.useRef();

  function playVideo() {
    playerRef.current.play();
  }

  function pauseVideo() {
    playerRef.current.pause();
  }

  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }

  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      src="https://video.gumlet.io/5f462c1561cf8a766464ffc4/635789f017629894d4d125a4/main.m3u8"
    />
  );
}

ReactDOM.render(<MyCustomComponent />, document.getElementById('app'));
```

You can also listen to events of the video

```javascript
import React from 'react';
import ReactHlsPlayer from '@gumlet/react-player-hls';

function MyCustomComponent() {
  const playerRef = React.useRef();

  React.useEffect(() => {
    function fireOnVideoStart() {
      // Do some stuff when the video starts/resumes playing
    }

    playerRef.current.addEventListener('play', fireOnVideoStart);

    return playerRef.current.removeEventListener('play', fireOnVideoStart);
  }, []);

  React.useEffect(() => {
    function fireOnVideoEnd() {
      // Do some stuff when the video ends
    }

    playerRef.current.addEventListener('ended', fireOnVideoEnd);

    return playerRef.current.removeEventListener('ended', fireOnVideoEnd);
  }, []);

  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      src="https://video.gumlet.io/5f462c1561cf8a766464ffc4/635789f017629894d4d125a4/main.m3u8"
    />
  );
}

ReactDOM.render(<MyCustomComponent />, document.getElementById('app'));
```

## Props

All [video properties](https://www.w3schools.com/tags/att_video_poster.asp) are supported and passed down to the underlying video component

| Prop                     | Description                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| src `String`, `required` | The hls url that you want to play                                                                                       |
| autoPlay `Boolean`       | Autoplay when component is ready. Defaults to `false`                                                                   |
| controls `Boolean`       | Whether or not to show the playback controls. Defaults to `false`                                                       |
| width `Number`           | Video width. Defaults to `100%`                                                                                         |
| height `Number`          | Video height. Defaults to `auto`                                                                                        |
| hlsConfig `Object`       | `hls.js` config, you can see all config [here](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning) |
| playerRef `React Ref`    | Pass in your own ref to interact with the video player directly. This will override the default ref.                    |


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->