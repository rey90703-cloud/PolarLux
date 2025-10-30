declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface ModelViewerJSX {
  src?: string;
  alt?: string;
  ar?: boolean;
  'auto-rotate'?: boolean;
  'camera-controls'?: boolean;
  'shadow-intensity'?: string;
  'exposure'?: string;
  'environment-image'?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  'camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  'field-of-view'?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLElement>;
}
