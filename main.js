const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");

  const noteElement = document.createElement("textarea");
  noteElement.classList.add("note");
  noteElement.value = content;
  noteElement.placeholder = "Empty Sticky Note";

  noteElement.addEventListener("change", () => {
    updateNote(id, noteElement.value);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-note");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt"); // Assuming you are using FontAwesome for the delete icon

  deleteButton.appendChild(deleteIcon);

  deleteButton.addEventListener("click", () => {
    const doDelete = confirm("Are you sure you wish to delete this sticky note?");

    if (doDelete) {
      deleteNote(id, noteContainer);
    }
  });

  noteContainer.appendChild(noteElement);
  noteContainer.appendChild(deleteButton);

  // Generate random bright color for the note
  noteElement.style.backgroundColor = getRandomColor();

  return noteContainer;
}

function getRandomColor() {
  const colors = ["#FFFF99", "#99FF99", "#FF99CC", "#FFCC99"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
