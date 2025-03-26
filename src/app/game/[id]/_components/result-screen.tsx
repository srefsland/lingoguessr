import GameButton from "@/app/_components/game-button";
import Header from "@/app/_components/header";

type GameResultProps = {
  isCorrect: boolean;
  handleOnClickNextRound: () => void;
  score: number;
  maxScore: number;
  roundNumber: number;
  languageChosen: string;
  languageActual: string;
};

export default function GameResultScreen(props: GameResultProps) {
  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <div className="grow flex flex-col items-center justify-center h-full">
      <Header text={`Result round ${props.roundNumber + 1}`} />
      <div className="m-4">
        <p className="text-center mb-2">
          {props.isCorrect ? "Correct!" : "Incorrect!"}
        </p>
        <p className="text-center mb-2">
          You chose: {capitalize(props.languageChosen)}
        </p>
        <p className="text-center mb-2">
          The correct language was: {capitalize(props.languageActual)}
        </p>
        <p className="text-center mb-2">
          Score: {props.score}/{props.maxScore}
        </p>
      </div>
      <GameButton
        handleOnClick={props.handleOnClickNextRound}
        buttonLabel={
          props.roundNumber + 1 === 5 ? "Final results" : "Next round"
        }
      />
    </div>
  );
}
