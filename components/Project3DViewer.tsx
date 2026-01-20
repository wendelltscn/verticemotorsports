
import * as React from 'react';

// FIX: Correctly declare the 'model-viewer' custom element for JSX.
// This resolves TypeScript errors when using the <model-viewer> web component in JSX.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          // FIX: Corrected prop type to number as per model-viewer spec, which was previously a string.
          shadowIntensity?: number;
          cameraControls?: boolean;
          autoRotate?: boolean;
          ar?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

interface Project3DViewerProps {
    modelSrc: string;
    posterSrc: string;
}

const Project3DViewer: React.FC<Project3DViewerProps> = ({ modelSrc, posterSrc }) => {
    return (
        <div className="relative w-full h-full min-h-64 md:min-h-96 bg-black">
             <model-viewer
                src={modelSrc}
                poster={posterSrc}
                alt="A 3D model of the project car"
                shadowIntensity={1}
                cameraControls
                autoRotate
                ar
                style={{ width: '100%', height: '100%', '--poster-color': 'transparent' }}
            >
                 <div className="absolute top-2 left-2 font-technical text-xs text-white bg-black/50 px-2 py-1 rounded">
                    3D Blueprint Mode
                </div>
            </model-viewer>
        </div>
    );
};

export default Project3DViewer;