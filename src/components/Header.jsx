import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="h-48 bg-green-900 flex items-center">
      <div className="container flex justify-center">
        <img src={logo} alt="Logo Dev Finances" />
      </div>
    </header>
  );
}
