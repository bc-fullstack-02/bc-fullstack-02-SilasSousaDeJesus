import Menu from "../../components/Menu";
import Feed from "../../components/Feed";

export default function Home() {
  return (
    <div className="w-screen h-screen flex ">
      <Menu />
        <Feed />
    </div>
  );
}
