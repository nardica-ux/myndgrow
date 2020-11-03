import { entryActionTypes } from "./entry-actions";
import { sampleData } from "../components/app/generate-data";

const INITIAL_STATE = {
  entries: null,
  errorEntry: null,
  entriesToday: [],
  updatedId: undefined,
};
const entryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case entryActionTypes.FAKE_DATA:
      return {
        ...state,
        entries: sampleData(action.payload),
        errorEntry: null,
        entriesToday: [],
      };
    default:
      return state;

    case entryActionTypes.ADD_ENTRY_SUCCESS: {
      const newEntry = action.payload;
      const today = newEntry.createdAt;
      let updated = {};
      if (!state.entries) {
        updated[newEntry.createdAt] = { [newEntry.own_id]: newEntry };
      } else {
        if (!state.entries.hasOwnProperty(today)) {
          updated = {
            ...state.entries,
            [today]: { [newEntry.own_id]: newEntry },
          };
        } else {
          updated = {
            ...state.entries,
            [today]: {
              ...state.entries[today],
              [newEntry.own_id]: newEntry,
            },
          };
        }
      }
      return {
        ...state,
        entriesToday: [...state.entriesToday, action.payload],
        entries: { ...updated },
      };
    }

    case entryActionTypes.DELETE_ENTRY_REDUX: {
      let entry = action.payload;
      let update = { ...state.entries[entry.createdAt] };
      delete update[entry.own_id];

      let updateToday = [...state.entriesToday];
      let index = updateToday.indexOf(entry);
      if (index !== -1) updateToday.splice(index, 1);

      return {
        ...state,
        entries: {
          ...state.entries,
          [entry.createdAt]: update,
        },
        entriesToday: updateToday,
      };
    }

    case entryActionTypes.ADD_ENTRY_FAILURE:
      return {
        ...state,
        errorEntry: action.payload,
      };

    case entryActionTypes.INIT_ENTRIES: {
      let today = new Date().toLocaleDateString();
      let sortedArr = {};
      if (action.payload.length) {
        action.payload.map((el) =>
          sortedArr[el.createdAt]
            ? (sortedArr[el.createdAt] = {
                ...sortedArr[el.createdAt],
                [el.own_id]: el,
              })
            : (sortedArr = {
                ...sortedArr,
                [el.createdAt]: { [el.own_id]: el },
              })
        );
      } else sortedArr = null;
      let update = null;
      if (sortedArr && sortedArr[today]) update = sortedArr[today];

      return {
        ...state,
        entries: sortedArr,
        entriesToday: update ? Object.values(update) : [],
        errorEntry: null,
      };
    }

    case entryActionTypes.UPDATE_ENTRY_SUCCESS: {
      let updated = action.payload;
      let el = state.entries[updated.createdAt];
      el[updated.own_id] = updated;

      return {
        ...state,
        entries: {
          ...state.entries,
          [updated.createdAt]: el,
        },
        errorEntry: null,
        updatedEntry: updated,
      };
    }
    case entryActionTypes.UPDATE_ENTRY_FAILURE:
      return { ...state, errorEntry: action.payload, updatedEntry: undefined };
  }
};
export default entryReducer;
