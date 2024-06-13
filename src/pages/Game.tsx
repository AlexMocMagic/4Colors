import { useState, useEffect } from "react";

const Game = () => {
    const buttons = [
        {
            id: 1,
            bg: "bg-[#FFC0C0]",
            class: "rounded-xl",
        },
        {
            id: 2,
            bg: "bg-[#FFF1AA]",
            class: "rounded-xl",
        },
        {
            id: 3,
            bg: "bg-[#90E4FF]",
            class: "rounded-xl",
        },
        {
            id: 4,
            bg: "bg-[#A7FF90]",
            class: "rounded-xl",
        },
    ];

    const [color, setColor] = useState<number>(1);
    const [score, setScore] = useState<number>(0);
    const [time, setTime] = useState<number>(30);
    const [scoreChange, setScoreChange] = useState<"increase" | "decrease" | null>(null);

    const [endgame, setEndgame] = useState<boolean>(false);

    const click = (e: number) => {
        if (e === color) {
            setScore(score + 1);
            setScoreChange("increase");
        } else if (score > 0) {
            setScore(score - 1);
            setScoreChange("decrease");
        }

        setColor(Math.floor(Math.random() * 4) + 1);
    };

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }else{
            setEndgame(true);
        }
    }, [time]);

    return (
        <>
            <div className="w-full h-full grid grid-cols-2 gap-2 relative poppins text-xl">
                <div className="grid place-items-center absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[5rem] aspect-square bg-[#121212] rounded-full">
                    <div
                        className={`w-4/5 rounded-full aspect-square ${
                            color === 1
                                ? "bg-[#FFC0C0]"
                                : color === 2
                                ? "bg-[#FFF1AA]"
                                : color === 3
                                ? "bg-[#90E4FF]"
                                : "bg-[#A7FF90]"
                        }`}
                    ></div>
                </div>
                <div className="w-max absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-0 mt-10 px-5 h-[2.5rem] rounded-full bg-[#121212] flex items-center justify-center gap-3 text-white">
                    <p>{time < 10 ? `00:0${time}` : `00:${time}`}</p>
                </div>
                <div
                    id="score"
                    className={`absolute w-max px-5 h-[2.5rem] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 bottom-0 bg-[#121212] flex items-center justify-center ${
                        scoreChange === "increase" ? "text-[#A7FF90]" : scoreChange === "decrease" ? "text-[#FF6B6B]" : "text-white"
                    }`}
                >
                    <a href="/">{score}</a>
                </div>
                {buttons.map((button) => (
                    <button
                        onClick={() => {
                            click(button.id);
                        }}
                        key={button.id}
                        className={`${button.bg} ${button.class}`}
                    ></button>
                ))}
            </div>

            {/* // ending game */}
            <div className={`absolute w-full h-dvh bg-black/95 top-0 left-0 flex flex-col items-center justify-center text-white ${endgame ? "visible" : "invisible"}`}>
                <h1 className="text-3xl">Game Over</h1>
                <p>Score: {score}</p>
                <section className="flex w-full items-center justify-center gap-10 mt-10">
                    <a href="/" className="flex-1 text-end underline">Home</a>
                    <a href="/game" className="flex-1 text-start underline">Play</a>
                </section>
            </div>
        </>
    );
};

export default Game;
