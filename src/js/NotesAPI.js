const notes = [
  {
    id: 1,
    title: "First note",
    body: "this is first note",
    updated: "2024-02-28T11:48:11.523Z",
  },
  {
    id: 2,
    title: "First note",
    body: "this is first note",
    updated: "2024-02-28T11:49:28.389Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is third note",
    updated: "2024-02-28T12:05:57.883Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    // JSON.parse(localStorage.getItem("notes-app"))
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    // 1. existed or 2. not
    const notes = NotesAPI.getAllNotes();

    const existedNotes = notes.find((n) => n.id === noteToSave.id);

    if (existedNotes) {
      existedNotes.title = noteToSave.title;
      existedNotes.body = noteToSave.body;
      existedNotes.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    // console.log(notes);
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
 static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
