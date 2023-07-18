import React, { RefObject } from 'react';
import Hls from 'hls.js';
import Config from 'hls.js';
export interface HlsPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    hlsConfig?: Config;
    playerRef: RefObject<HTMLVideoElement>;
    getHLSRef?: (hlsObj: Hls) => void;
    src: string;
}
declare function ReactHlsPlayer({ hlsConfig, playerRef, getHLSRef, src, autoPlay, ...props }: HlsPlayerProps): React.JSX.Element;
export default ReactHlsPlayer;
