import poster from "./poster.png";

export default function Cover() {
  return (
    <div className="aspect-square w-full max-w-xl bg-[#E35AE7] relative">
      <img src={poster} alt="Les rêves d'hier" className="w-full h-full" />
    </div>
  );
}
