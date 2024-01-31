"use client";

type GameButtonProps = {
    handleOnClick: () => void;
    buttonLabel: string;
}

export default function GameButton(props: GameButtonProps) {
    const handlePlayClick = () => {
        props.handleOnClick();
    };

    return (
        <button className="mb-2 py-5 text-white no-underline text-xl text-center font-bold
         bg-black rounded-md w-40 hover:scale-103" onClick={handlePlayClick}>
            {props.buttonLabel}
        </button>
    );
}