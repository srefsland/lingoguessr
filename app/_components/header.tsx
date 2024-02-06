export default function Header(props: { text: string }) {
    return (
        <h1 className="m-5 text-4xl font-extrablack">{props.text}</h1>
    )
}