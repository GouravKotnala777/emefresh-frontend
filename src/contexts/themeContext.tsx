import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface ThemeContextTypes{
    theme:"light"|"dark";
    toggleTheme:()=>void;
    setTheme:Dispatch<SetStateAction<"light"|"dark">>;
};

export const ThemeContext = createContext<ThemeContextTypes|null>(null);

export function ThemeProvider({children}:{children:ReactNode;}) {
    const [theme, setTheme] = useState<ThemeContextTypes["theme"]>("light");

    function toggleTheme() {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as ThemeContextTypes["theme"];

        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("light");
            root.classList.remove("dark");
        }
        else{
            root.classList.add("dark");
            root.classList.remove("light");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return(
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};