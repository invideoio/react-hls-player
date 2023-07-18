import React, { useState, useRef } from 'react';

import HlsPlayer from '../../src';

function App() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hlsUrl, setHlsUrl] = useState(
    'http://localhost:4000/export/stream/playlist.m3u8?export_id=8c213931-35ee-419e-88b9-29a3c95e5249&region=us-west-2&key=exports%2Fc0a42a59-8cf5-41b2-ad86-4622216a8337%2Fc0a42a59-8cf5-41b2-ad86-4622216a8337&bucket=iv-stage-pro-dev'
  );
  const [destroy, setDestroy] = useState(false);

  function _handleEnter(e: React.KeyboardEvent) {
    setHlsUrl(inputRef?.current?.value ?? '');
  }

  function _handleDestroyClick() {
    setDestroy(true);
  }

  function _handleToggleControls() {
    if (playerRef?.current?.hasAttribute('controls')) {
      playerRef.current.removeAttribute('controls');
    } else {
      playerRef?.current?.setAttribute('controls', 'true');
    }
  }

  return (
    <div>
      <div
        style={{
          margin: '0 0 20px',
        }}
      >
        <label
          style={{
            display: 'block',
            marginBottom: 10,
          }}
          htmlFor="url-input"
        >
          hls url :{' '}
        </label>
        <input
          ref={inputRef}
          id="url-input"
          type="text"
          defaultValue={hlsUrl}
          onKeyUp={_handleEnter}
          style={{
            width: '100%',
            height: '30px',
            lineHeight: '30px',
            fontSize: '16px',
            color: '#333',
          }}
        />
      </div>

      {!destroy ? (
        <HlsPlayer
          loop={true}
          width="100%"
          height="auto"
          autoPlay
          playerRef={playerRef}
          src={hlsUrl}
          hlsConfig={
            {
              fragLoadPolicy: {
                default: {
                  maxTimeToFirstByteMs: 10000,
                  maxLoadTimeMs: 120000,
                  timeoutRetry: {
                    maxNumRetry: 4,
                    retryDelayMs: 5000,
                    maxRetryDelayMs: 5000,
                  },
                  errorRetry: {
                    maxNumRetry: 6,
                    retryDelayMs: 5000,
                    maxRetryDelayMs: 8000,
                  },
                },
                backoff: 'exponential',
              },
            } as any
          }
        />
      ) : null}

      <br />

      <button
        style={{
          padding: '5px 10px',
        }}
        onClick={_handleDestroyClick}
      >
        Destroy Video
      </button>

      <button
        style={{
          padding: '5px 10px',
        }}
        onClick={_handleToggleControls}
      >
        Toggle Controls (via custom ref)
      </button>
    </div>
  );
}

export default App;
