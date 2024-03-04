export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
    <div class="notes__sidebar">
        <div class="notes__logo">NOTE APP</div>
        <div class="notes__list"></div>
        <button class="notes__add">ADD NOTE</button>
      </div>
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="note title ..." />
        <textarea name="" class="notes__body">Take some note...</textarea>
      </div> 
    `;

    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitel = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    addNoteBtn.addEventListener("click", () => {
      // run add note method !!
      this.onNoteAdd();
    });

    [inputBody, inputTitel].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newBody = inputBody.value.trim();
        const newTitle = inputTitel.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    // hide notes preview in firs tloading :
    this.updateNotePreviewVisibilty(false)
  }

  _creatListeItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `
    <div class="notes__list-item" data-note-id="${id}">
    <div class="notes__item-header"> 
    <div class="notes__small-title">${title}</div>
    <span class="notes__list-trash" data-note-id="${id}" >
      <i class="todo__remove far fa-trash-alt"></i>
    </span>
    </div>
    <div class="notes__small-body">
    ${body.substring(0, MAX_BODY_LENGTH)}
    ${body.length > MAX_BODY_LENGTH ? "..." : ""}</div>
    <div class="notes__small-update">
    ${new Date(updated).toLocaleString("en", {
      dateStyle: "full",
      timeStyle: "short",
    })}</div>
  </div>`;
  }

  updateNoteList(notes) {
    const noteContainer = this.root.querySelector(".notes__list");
    // empty noteList
    noteContainer.innerHTML = "";
    let notesList = "";
    for (const note of notes) {
      const { id, title, body, updated } = note;
      const html = this._creatListeItemHTML(id, title, body, updated);
      notesList += html;
    }
    noteContainer.innerHTML = notesList;
    noteContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });
    noteContainer.querySelectorAll(".notes__list-trash").forEach((noteItem) => {
      noteItem.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNoteDelete(noteItem.dataset.noteId);
      });
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    // add selected class
    this.root.querySelectorAll(".notes__list-item").forEach((item) => {
      item.classList.remove("notes__list--selected");
    });

    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list--selected");
  }
  updateNotePreviewVisibilty(visible){
    this.root.querySelector(".notes__preview").style.visibility=visible?"visible":"hidden"
  }
}
