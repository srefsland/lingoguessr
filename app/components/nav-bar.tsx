import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-white flex items-center justify-left">
            <Link href="/" className="m-4 text-3xl font-extrablack">LingoGuessr</Link>
        </nav>
    );
}