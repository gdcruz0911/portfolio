import { toolbox } from "@/data/toolbox";

export function Toolbox() {
  return <section className="toolbox" aria-labelledby="toolbox-title">
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
  </section>;
}
