import GridDistortion from "../../components/bits/grid-distortion";

export default function Footer() {
  return (
    <footer className="w-full relative h-screen">
      <div className="absolute inset-0">
        <GridDistortion
          imageSrc="/corrode.png"
          grid={20}
          mouse={0.1}
          strength={0.25}
          relaxation={0.9}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-[50%] from-[#121017ff] via-[#121017cc] to-[#12101700] bg-gradient-to-b pointer-events-none"></div>
    </footer>
  );
}
