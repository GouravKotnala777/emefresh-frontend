import type { SyntheticEvent } from "react";


function ImageWithFallback({image}:{image?:string;}) {
    
    function onErrorHandler(e:SyntheticEvent<HTMLImageElement>) {
        const target = e.currentTarget;
        target.src = "/no_product1.jpg";
        target.onerror = null;
    }
    return <img
        src={`${import.meta.env.VITE_SERVER_URL}/api/v1${image}`}
        alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${image}`}
        className="h-full text-xs"
        onError={onErrorHandler}
    />
}

export default ImageWithFallback;