import Hero from "@/components/Home/Hero";
import Jackpots from "@/components/Home/Jackpots";
import HowToPlay from "@/components/Home/HowToPlay";
import MaxWrapper from "@/components/shared/MaxWrapper";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-950" id="heroPattern">
      <MaxWrapper>
        <Hero />

        <Jackpots />
        <HowToPlay />
     </MaxWrapper>
    </main>
  );
}
