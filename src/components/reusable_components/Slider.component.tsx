import { useEffect, useRef, useState, type ReactNode } from "react";




interface SliderPropTypes{
    style?:string;
    children:ReactNode[];
    btns?:{
      inset?:"-30"|"-15"|"0"|"15"|"30";
      size?:"20"|"30"|"40"|"50";
    };
    animation?:{
      isAutomatic?:boolean;
      duration?:500|1000|2000|3000|4000;
    };
};

function Slider({children, style, btns={size:"20"}, animation={isAutomatic:false, duration:3000}}:SliderPropTypes) {
  const leftBtnRef = useRef<HTMLButtonElement|null>(null);
  const rightBtnRef = useRef<HTMLButtonElement|null>(null);
  const screenRef = useRef<HTMLDivElement|null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);


function slideHandler(btnName: "left" | "right") {
  if (!screenRef.current) throw Error("screenRef not found");

  const screenElement = screenRef.current;
  let newIndex = slideIndex;

  if (btnName === "left") {
    newIndex = slideIndex === 0 ? children.length-1 : slideIndex - 1;
  }
  else if (btnName === "right") {
    newIndex = slideIndex === children.length-1 ? 0 : slideIndex + 1;
  }
  else {
    throw Error("btnName galat hai");
  }

  setSlideIndex(newIndex);
  screenElement.style.transform = `translateX(-${newIndex * 100}%)`;
}


  useEffect(() => {
    if (!animation.isAutomatic) return;
    
    let interval = setInterval(() => {
      slideHandler("right");
    }, animation.duration);

    return() => clearInterval(interval);
  }, [slideHandler]);
 

  return (
    <section className={`relative ${style}`}>
      <button ref={leftBtnRef} className={`absolute top-[50%] translate-y-[-50%] bg-neutral-500 max-w-[50px] max-h-[50px] grid place-items-center rounded-4xl opacity-60 hover:bg-neutral-400 cursor-pointer z-1`}
        style={{
          left:`${btns.inset}px`,
          width:`${btns.size}px`,
          height:`${btns.size}px`
        }}
        onClick={() => slideHandler("left")}
      >&lt;</button>
      <div className="border-2 h-full overflow-hidden z-0">
        <div ref={screenRef} className="flex h-full transition-transform duration-1000" >
          {children}
        </div>
      </div>
      <button ref={rightBtnRef} className={`absolute top-[50%] translate-y-[-50%] bg-neutral-500 max-w-[50px] max-h-[50px] grid place-items-center rounded-4xl opacity-60 hover:bg-neutral-400 cursor-pointer z-1`}
        style={{
          right:`${btns.inset||"0"}px`,
          width:`${btns.size}px`,
          height:`${btns.size}px`
        }}
        onClick={() => slideHandler("right")}
      >&gt;</button>
    </section>
  )
}

export default Slider;
