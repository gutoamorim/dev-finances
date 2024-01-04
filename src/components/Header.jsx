import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="h-24 bg-green-900 flex items-center md:h-48">
      <div className="container flex justify-center">
        <img src={logo} alt="Logo Dev Finances" />
      </div>
    </header>
  );
}
