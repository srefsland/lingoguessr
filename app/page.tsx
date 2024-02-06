import GameButton from "@/_components/game-button";
import GameButtonLink from "@/_components/game-link-button";
import Image from "next/image";
import { createNewGame } from "@/actions";

export default function Home() {
  return (
    <div className="grow flex flex-col items-center justify-center my-16">
      <Image className="hidden sm:block w-auto" src="/lingoguessr.png" alt="logo" width="175" height="175" />
      <h1 className="m-6 text-4xl font-extrablack">LingoGuessr</h1>
      <GameButton buttonLabel="Play" handleOnClick={createNewGame} />
      <GameButtonLink linkTo="/about" buttonLabel="About" />
      <GameButtonLink linkTo="/help" buttonLabel="Help" />
    </div>
  );
}
