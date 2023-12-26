import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="flex h-48 items-center justify-center bg-lime-400">
      <img src={logo} alt="Logo Dev Finances" />
    </header>
  );
}
