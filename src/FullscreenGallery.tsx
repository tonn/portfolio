import { useEffect, useReducer, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import nameof from 'ts-nameof.macro';
import { BEM } from './helpers/BEM';
import { Map } from './helpers/Map';
import './FullscreenGallery.scss';
import { useHotkeys } from 'react-hotkeys-hook';
import { IImage } from './data';
import { If } from './helpers/If';

export interface FullscreenGalleryProps { Images: IImage[], OpenAt?: number, OnClose: () => void };

let zoom: (node: HTMLElement | string, scale?: number | undefined, animationTime?: number) => void; // HACK: 

export const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({ Images, OpenAt, OnClose }) => {
  const [ index, setIndex ] = useState(0);
  const [ imageLoaded, onImageLoaded ] = useReducer(x => x + 1, 0);
  const [ imageLoading, setImageLoading ] = useState(false);

  useHotkeys('esc', () => {
    OnClose();
  })

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
    <div className={elem('CloseButton')} onClick={OnClose}>[esc]</div>
    <div className={elem('PanZoom')}>
      <TransformWrapper minScale={.1} centerOnInit>
        {({ zoomToElement }) => {
          zoom = zoomToElement;

          return <TransformComponent wrapperClass={elem('PanZoomWrapper')}>
            <img id={elem('Image')} src={Images[index].Filename} alt='' onLoad={onImageLoaded} style={{ visibility: imageLoading ? 'hidden' : 'visible' }}/>
          </TransformComponent>
        }}

      </TransformWrapper>
    </div>
    <If condition={!!Images[index].Description}>
      <div className={elem('Description')}>{Images[index].Description}</div>
    </If>
    <div className={elem('Thumbs')}>
      <Map items={Images.map(i => i.Thumb)}>
        { (thumb, i) => <img key={thumb} className={elem('Thumb', i === index && 'Current')} src={thumb} alt=''
                             onClick={() => setIndex(i)} /> }
      </Map>
    </div>
  </div>;
}

const { block, elem } = BEM(nameof(FullscreenGallery));
