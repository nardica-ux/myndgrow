import { groups } from "./groups";
import { notes } from "./notes";

export function sampleData(num) {
  const date = new Date();

  const dateBack = (i) => new Date(date.getTime() - i * 8 * 60 * 60 * 1000);

  let groupRound = [...groups];
  let notesRound = [...notes];
  let dataArray = [];

  for (let i = 0; i < num; i++) {
    if (!groupRound.length) groupRound = [...groups];
    if (!notesRound.length) notesRound = [...notes];
    let indexRandom = Math.floor(Math.random() * (groupRound.length - 1));
    let thisGroup = groupRound.splice(indexRandom, 1)[0];

    let el = {
      createdAt: dateBack(i).toLocaleDateString(),
      id: parseInt(Math.random() * 100) * 137,
      group: thisGroup.name,
      name: thisGroup
        ? thisGroup.sub_groups[Math.floor(Math.random() * 5)]
        : "strategy",
      text: notesRound.pop(),
      value: Math.floor(Math.random() * 10 + 2),
    };
    dataArray.push(el);
  }
  return [...dataArray];
}
