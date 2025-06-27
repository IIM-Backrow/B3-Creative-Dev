import { ChevronDown } from "lucide-react";
import GlitchFadeIn from "./components/bits/glitch-text/glitch-fade-in";
import ShinyText from "./components/bits/shiny-text/shiny-text";
import Cover from "./layout/cover/cover";
import Footer from "./layout/footer/footer";

export default function App() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#121017]">
      <div className="flex flex-col items-center justify-center gap-8 pt-12 pb-6 px-4 min-h-[calc(100dvh-400px)]">
        <GlitchFadeIn>Les reves d'hier</GlitchFadeIn>
        <p className="text-white/50 text-lg max-w-xl text-justify">
          Osez affronter la beauté hostile de ce château français devenu ville
          minière et battez-vous pour ses précieuses ressources. Terrain
          flambant neuf, atmosphère classique. Découvrez Corrode.
          <br />
          <br />
          Créée en partenariat avec ARC Creative et ROSEWOOD Creative.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 mb-4">
        <ShinyText text="Scroll pour découvrir" disabled={false} speed={3} />
        <ChevronDown className="size-4 text-[#7A7A7C] animate-bounce" />
      </div>

      <Cover />

      <Footer />
    </main>
  );
}
