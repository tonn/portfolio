import { useEffect, useReducer, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import nameof from 'ts-nameof.macro';
import { BEM } from './helpers/BEM';
import { Map } from './helpers/Map';
import './FullscreenGallery.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface FullscreenGalleryProps { Thumbs: string[], Images: string[], OpenAt?: number, OnClose: () => void };

let zoom: (node: HTMLElement | string, scale?: number | undefined, animationTime?: number) => void; // HACK: 

export const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({ Thumbs, Images, OpenAt, OnClose }) => {
  const [ index, setIndex ] = useState(0);
  const [ imageLoaded, onImageLoaded ] = useReducer(x => x + 1, 0);
  const [ imageLoading, setImageLoading ] = useState(false);

  useEffect(() => {
    if (OpenAt) {
      setIndex(OpenAt)
    }
  }, [OpenAt]);

  useEffect(() => {
    setImageLoading(true);
  }, [index]);

  useEffect(() => {
    zoom?.(elem('Image'), undefined, 0);
    setImageLoading(false);
  }, [imageLoaded]);

  return <div className={block()}>
    <FontAwesomeIcon icon={faTimes} className={elem('CloseButton')} onClick={OnClose} />
    <div className={elem('PanZoom')}>
      <TransformWrapper minScale={.1} centerOnInit>
        {({ zoomToElement }) => {
          zoom = zoomToElement;

          return <TransformComponent wrapperClass={elem('PanZoomWrapper')}>
            <img id={elem('Image')} src={Images[index]} alt='' onLoad={onImageLoaded} style={{ visibility: imageLoading ? 'hidden' : 'visible' }}/>
          </TransformComponent>
        }}

      </TransformWrapper>
    </div>
    <div className={elem('Thumbs')}>
      <Map items={Thumbs}>
        { (thumb, i) => <img key={thumb} className={elem('Thumb', i === index && 'Current')} src={thumb} alt=''
                             onClick={() => setIndex(i)} /> }
      </Map>
    </div>
  </div>;
}

const { block, elem } = BEM(nameof(FullscreenGallery));
