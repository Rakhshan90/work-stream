import AppBar from "@/components/appbar";

export default async function Home() {

  return (
    <div>
      <AppBar />
      <div className="text-blue-600 font-bold text-4xl ml-12">
        Home Page
      </div>
    </div>
  );
}
