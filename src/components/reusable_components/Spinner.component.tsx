

interface SpinnerPropTypes{
    width?:string;
    thickness?:string;
    color?:string;
}

function Spinner({width="30px", thickness="4px", color="blue"}:SpinnerPropTypes) {
    
    return(
        <div className="animate-spin border-2 border-red-500 w-30 h-30 rounded-full mx-auto border-b-transparent"
            style={{
                width,
                height:width,
                border:`${thickness} solid ${color}`,
                borderRight:`${thickness} solid transparent`
            }}
        >
        </div>
    )
};

export default Spinner;