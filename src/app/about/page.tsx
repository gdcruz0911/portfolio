import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { personalInfo } from "@/data/content";
import { toolbox } from "@/data/toolbox";

export const metadata: Metadata = { title: "About", description: personalInfo.about };

export default function AboutPage() {
  return <div>
    <PageHeader title="about" />
    <section className="about-spread" aria-label="about gabriel">
      <div className="about-story"><p>i’m gabriel, a student at the university of virginia and an aspiring full-stack developer.</p><p>i spend a lot of my time learning the parts of the stack i don’t know yet, building websites, and finding small ways to make them feel more personal.</p><p>away from the keyboard, you’ll find me café-hopping, taking photographs, or playing volleyball.</p></div>
      <div className="about-notes">
        <div><h2 className="mono">currently</h2><p>studying at the university of virginia</p></div>
        <div><h2 className="mono">a few favorites</h2><p>oolong tea, matcha, cafés, plants, and a good playlist.</p></div>
      </div>
    </section>
    <section className="toolbox" aria-labelledby="toolbox-title">
      <h2 id="toolbox-title">toolbox</h2>
      <div className="toolbox-groups">
        {toolbox.map((group) => <div key={group.name}>
          <h3 className="mono">{group.name}</h3>
          <ul>
            {group.tools.map((tool) => <li key={tool.name} className="tool">
              <svg viewBox="0 0 24 24" aria-hidden><path d={tool.path} /></svg>
              <span className="mono">{tool.name}</span>
            </li>)}
          </ul>
        </div>)}
      </div>
    </section>
  </div>;
}
