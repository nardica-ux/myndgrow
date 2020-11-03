import React from "react";
import SuccessStoryCard from "./success-story-card.jsx";

const stories = [
  {
    name: "Maria Twins",
    title: "Getting book done",
    story: [
      "Decided to write my book. For this I decided to write or edit One Chapter each day. I had started such staff before but didn't finish because of loosing focus. There was many things ongoing - mine project just lost the competition for me. THIS time I want to win and got all tools I know.",
      "It was scary to fail, but why not to try? I liked that I can see my points adding to the tree. I also hoped it would feel good. to see different viusals",
      "also, I splitted the goal to Writing-I and Writing-II' to separate the writing version and editing. I also limited my time to 40 min per day to be able to stop where it's interesting - advice from Haminguai.",
      "it was 43 day of efforts and, yes - not every day I worked and not every day it was 40 min :-). It also took me more than 30 days as I hoped but I see that I underestimated the complexity.",
    ],
    img: "",
    img_ava: "./img/avatars/sample-ava.png",
    date: "12/12/12",
    own_id: "287348172",
    diagram: {
      color: "slateblue",
      total: 87,
      topics: ["writing", "editing", "feedback"],
      points: [
        3,
        3,
        2,
        3,
        5,
        2,
        1,
        3,
        6,
        5,
        4,
        5,
        7,
        5,
        7,
        6,
        8,
        9,
        7,
        6,
        6,
        5,
        4,
        3,
      ],
    },
    comments: [
      {
        comm_id: "23874",
        name: "ewy",
        comment: "wuyf wef uyfg rygv vg",
      },
    ],
  },
  {
    name: "Maria Twins",
    title: "Getting book done",
    story: [
      "Decided to write my book. For this I decided to write or edit One Chapter each day. I had started such staff before but didn't finish because of loosing focus. There was many things ongoing - mine project just lost the competition for me. THIS time I want to win and got all tools I know.",
      "It was scary to fail, but why not to try? I liked that I can see my points adding to the tree. I also hoped it would feel good. to see different viusals",
      "also, I splitted the goal to Writing-I and Writing-II' to separate the writing version and editing. I also limited my time to 40 min per day to be able to stop where it's interesting - advice from Haminguai.",
      "it was 43 day of efforts and, yes - not every day I worked and not every day it was 40 min :-). It also took me more than 30 days as I hoped but I see that I underestimated the complexity.",
    ],
    img: "",
    img_ava: "./img/avatars/sample-ava.png",
    date: "12/12/12",
    own_id: "287348172",
    diagram: {
      color: "violet",
      total: 87,
      topics: ["writing", "editing", "feedback"],
      points: [
        3,
        3,
        2,
        3,
        5,
        2,
        1,
        3,
        6,
        5,
        4,
        5,
        7,
        5,
        7,
        6,
        8,
        9,
        7,
        6,
        6,
        5,
        4,
        3,
      ],
    },
    comments: [
      {
        comm_id: "23874",
        name: "ewy",
        comment: "wuyf wef uyfg rygv vg",
      },
    ],
  },
];
const SuccessStoryContainer = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {stories.map((el, i) => (
        <SuccessStoryCard storyData={el} />
      ))}
    </div>
  );
};
export default SuccessStoryContainer;
