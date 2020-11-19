import React, { useState } from "react";
import MindStory from "../mind-story/mind-story-component";
import About from "./about-component";
import Introduction from "../introduction/introduction-component";

const AboutContainer = () => {
  const [activeTab, setActive] = useState(0);
  const tabs = ["about", "mechanics", "use story"];
  const content = [<About />, <Introduction />, <MindStory />];
  const aboutTabs = (tab) => (
    <div>
      {tabs.map((el, i) => (
        <div
          style={{
            margin: 20,
            cursor: i !== tab ? "pointer" : null,
            color: i === tab ? "darkrodengold" : "royalblue",
            display: "inline-block",
            textTransform: "uppercase",
          }}
          key={"tab-" + i}
          onClick={() => setActive(i)}
        >
          {el}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {aboutTabs(activeTab)}
      {content[activeTab]}
      <div>
        <h4> who leads the project on this topic: Nadia Erokhina</h4>
      </div>
    </div>
  );
};
export default AboutContainer;
