import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextArea from "@/components/sections/TextArea";

export default function Home() {
  return (
    <>
      <TextArea
        description="This target visualiser shows Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
      <Emissions/>
      <Reductions/>
      <TextArea
        description="The 1.5C is calculated Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
    </>
  )
}
