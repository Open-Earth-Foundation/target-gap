import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";

export default function Home() {
  return (
    <>
      <TextBox
        description="This target visualiser shows Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
      <Emissions/>
      <Reductions/>
      <TextBox
        description="The 1.5C is calculated Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
    </>
  )
}
