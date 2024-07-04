import Hero from "@/components/Home/Hero";
import MaxWrapper from "@/components/shared/MaxWrapper";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-950" id="heroPattern">
      <MaxWrapper>
        <Hero />
     </MaxWrapper>
    </main>
  );
}
