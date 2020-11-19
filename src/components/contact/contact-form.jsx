import React, { useEffect, useState } from "react";
import "./contact.scss";

/* <span style={selectedBlock === i && selected.length ? { opacity: 1 } : null}>
  hello
  <div className={"close-chip"} onClick={() => setSelected("")}>
    X
  </div>
  <div className={"close-chip"} onClick={() => markSelected("green")}>
    green
  </div>
  <div className={"close-chip"} onClick={() => markSelected("red")}>
    red
  </div>
</span>; */

const data = [
  "Decided to write my book. For this I decided to write or edit One Chapter each day. I had started such staff before but didn't finish because of loosing focus. There was many things ongoing - mine project just lost the competition for me. THIS time I want to win and got all tools I know.",
  "It was scary to fail, but why not to try? I liked that I can see my points adding to the tree. I also hoped it would feel good. to see different viusals",
  "also, I splitted the goal to Writing-I and Writing-II' to separate the writing version and editing. I also limited my time to 40 min per day to be able to stop where it's interesting - advice from Haminguai.",
  "it was 43 day of efforts and, yes - not every day I worked and not every day it was 40 min :-). It also took me more than 30 days as I hoped but I see that I underestimated the complexity.",
];

const ContactForm = () => {
  const [selected, setSelected] = useState("");
  const [selectedBlock, setBlock] = useState(null);
  const [position, setPosition] = useState(null);
  const [text, setText] = useState(
    data.map((el) => {
      return [{ color: "transparent", text: el, cut: false }];
    })
  );
  console.log(text);
  const renderPara = (elem) => {
    return (
      <div className={`marked-div`}>
        {elem.map((el) => (
          <span style={{ backgroundColor: el.color }}>{el.text}</span>
        ))}
      </div>
    );
  };
  useEffect(() => {
    console.log(selected, selectedBlock);
  }, [selected, selectedBlock, text]);

  const handleSelect = () => {
    let obj = document.getSelection();
    let thisSelect = console.log(obj.selectionStart);
    let num = parseInt(obj.anchorNode.id);
    let string = obj.toString();
    let eltext = text[num][0].text;
    let position = eltext.indexOf(string);
    setBlock(num);
    setSelected(string);
    setPosition(position);
  };
  const handleMark = (color) => {
    let newParag = text;
    let updated = text[selectedBlock][0].text;
    // let newText = updated.slice(position);
    let restText = updated.slice(position + selected.length);
    console.log(restText);
    newParag[selectedBlock] = [
      { color: "transparent", text: updated.slice(0, position) },
    ];
    newParag[selectedBlock].push({ color, text: selected });
    newParag[selectedBlock].push({ color: "transparent", text: restText });
    setText(newParag);
    setSelected("");
    setBlock(null);
    setPosition(null);
  };

  return (
    <div>
      <input onSelect={(e) => console.log(e)} value={"test select"} />
      {text.map((el, i) => (
        <div className="text-container" id={i}>
          <div key={"block-" + i} className="under-div">
            {renderPara(el)}
          </div>
          <textarea
            className="text-edit"
            onSelect={() => handleSelect()}
            value={el.map((el) => el.text).join("")}
          />
          <div
            className="pop-up-mark"
            style={
              selectedBlock === i && selected.length ? { opacity: 1 } : null
            }
          >
            hello
            <div className={"close-chip"} onClick={() => setSelected("")}>
              X
            </div>
            <div className={"close-chip"} onClick={() => handleMark("green")}>
              G
            </div>
            <div className={"close-chip"} onClick={() => handleMark("red")}>
              R
            </div>
          </div>
          ;
        </div>
      ))}
    </div>
  );
};
export default ContactForm;
