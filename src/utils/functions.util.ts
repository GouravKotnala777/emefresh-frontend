

export function debounce<T extends (...args:any[])=>Promise<R>,R>(cb:T) {
    let timer:ReturnType<typeof setTimeout> = 0;
    return function (...args:Parameters<T>){
        clearTimeout(timer);
        const resultPromise = new Promise<R>((resolve, reject) => {
            timer = setTimeout(() => {
                try {
                    const response = cb(...args);                    
                    resolve(response);
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            }, 700);
        });
        return resultPromise;
    }
};