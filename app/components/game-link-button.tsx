import React from "react";
import Link from "next/link";

type GameLinkButtonProps = {
    linkTo: string;
    buttonLabel: string;
}

export default function GameLinkButton(props: GameLinkButtonProps) {
    return (
        <Link className="mb-2 py-5 text-white no-underline text-xl text-center font-bold
         bg-black rounded-md w-40 hover:scale-103" href={props.linkTo}>
            {props.buttonLabel}
        </Link>
    );
}