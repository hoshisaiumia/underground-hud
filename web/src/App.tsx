import { Logo } from "./components/Logo";
import { Speedometer } from "./components/Speedometer";

function App() {
  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <Speedometer />
      <Logo />
    </div>
  );
}

export default App;
