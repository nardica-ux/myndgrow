import React from "react";
import DoneCard from "./category-done-card";

const done = [
  {
    name: "BrainStorm-I",
    points: [5, 3, 3, 5, 3, 6, 7, 8],
    color: "seagreen",
    days: 23,
    comments: [
      "did the group briefing, updated the meeting narrative",
      "send the invitations, scheduled the meeting",
      "run the meeting",
      "created presentation on the meeting results, updated participants",
    ],
  },
  {
    name: "Reading-I",
    points: [2, 3, 2, 1, 4, 5, 4, 2, 6, 7, 8, 3],
    color: "slateblue",
    days: 18,
    comments: [
      "read the  'Art of war and peace'",
      "read the 'little Prince'",
      "read the 'wealthy habits from Athins'",
      "read the 'Memories from the dreams",
    ],
  },
  {
    name: "Planning-II",
    points: [4, 3, 11, 11, 4, 7, 8],
    color: "palevioletred",
    days: 45,
    comments: [
      "created the pitch draft",
      "trained pitch 3 times",
      "trained the picth with the friend, got feedback",
      "improved the pitch, practiced once",
    ],
  },
  {
    name: "Health-II",
    points: [5, 5, 3, 2, 1, 3, 1, 2, 7, 8],
    color: "steelblue",
    days: 34,
    comments: ["run 3 miles", "run 3 miles", "run 3.8 miles", "run 5 miles"],
  },
];

const CategoriesDone = () => {
  return (
    <div style={{ width: "94%", margin: "2%" }}>
      <h3>Categories done</h3>
      <p className="comments">
        I split the complexity of my work into chucnk to improve focus. I
        appriciate the efoorts I've done and know there is more ahead. I can
        stop and get rest at any time because that's what in my control and olny
        i decide. I choose the reflect on what I am doing to keep track of
        success and not allow sadness diminosh my efforts. Next ideas to add to
        the active stack: BrainStorm-II, Reading-II, Planning-III
      </p>
      {done.map((el, i) => (
        <DoneCard el={el} key={el.name + el.color} />
      ))}
    </div>
  );
};
export default CategoriesDone;
