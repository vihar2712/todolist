let addBtn = document.getElementById("addBtn");
let work = document.getElementById("work");
let todoList = document.querySelector(".todoList");
// console.log(work.value);
showNotes();
// console.log(todoList);
let counter = 0;
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let workStr = localStorage.getItem("work");
  let workArr = JSON.parse(workStr);
  // console.log(workArr,workArr.length);
  if (workArr === null || workArr.length === 0) {
    workArr = [];
    counter = 0;
  } else {
    counter = workArr.length;
  }
  if (work.value === "") {
    alert("Notes can not be empty");
    return false;
  }
  let workObj = {
    id: counter,
    actualWork: work.value,
  };
  workArr.push(workObj);
  // console.log(workArr);
  localStorage.setItem("work", JSON.stringify(workArr));
  counter++;
  work.value = ``;
  showNotes();
});

function showNotes() {
  let notesStr = localStorage.getItem("work");
  // console.log(JSON.parse(notesArr));
  let notesArr = JSON.parse(notesStr);
  // console.log(notesArr);
  if (notesArr === null || notesArr.length === 0) {
    todoList.innerHTML = `<h2 class="noNotes">Nothing to show here!!<h2>`;
  } else {
    let div = "";
    notesArr.forEach((note) => {
      div += `<div class="todoContainer">
      <input type='checkbox' id="checkBox${note.id}" onclick='checkThrough(${note.id})'/>
      <div id="notes${note.id}" onclick="updateNotes(${note.id})" class="noteDetails"> ${note.actualWork}</div>
      <div class="cross" onClick="deleteNote(${note.id})">⨯</div>
      </div>`;
      todoList.innerHTML = div;
      // console.log(todoList.innerHTML);
    });
  }
  //   console.log(work.value);
}
function deleteNote(noteId) {
  // console.log(noteId);
  let notesStr = localStorage.getItem("work");
  // console.log(notesStr);
  notesArr = JSON.parse(notesStr);
  // console.log(notesArr);
  notesArr.splice(noteId, 1);
  counter--;
  // console.log(notesArr);
  notesArr.filter(
    (note) => (note.id = note.id >= noteId ? (note.id -= 1) : note.id)
  );
  // console.log(notesArr);
  localStorage.setItem("work", JSON.stringify(notesArr));
  showNotes();
}
function checkThrough(noteId) {
  // console.log("hello");
  let notes = document.getElementById(`notes${noteId}`);
  notes.classList.toggle("checked");
}

function updateNotes(noteId) {
  let checkBox = document.getElementById(`checkBox${noteId}`);
  checkBox.classList.add("hide");
  let noteContainer = document.getElementById(`notes${noteId}`);
  // console.log(noteContainer.textContent);
  // console.log(noteContainer.textContent.length);
  noteContainer.outerHTML = `<form action=""  id="notes${noteId}"><textarea id="${noteId}notes" cols="20" rows="${
    noteContainer.textContent.length / 20 + 1
  }" class="noteDetails" >${
    noteContainer.textContent
  }</textarea><input id="updateBtn" type="submit" value="Update"/></form>`;

  // noteContainer.innerHTML = `<div>
  // <input type='checkbox' onclick='checkThrough(${noteId})'/>
  // <input type="text" id="notes${noteId}" class="noteDetails" value="${noteContainer.value}" ></input>
  // <div class="cross" onClick="deleteNote(${noteId})">⨯</div>
  // </div>`;
  let noteStr = localStorage.getItem("work");
  let notesArr = JSON.parse(noteStr);
  // console.log(notesArr);

  let currentNote = notesArr.filter((note) => {
    if (note.id === noteId) {
      return note;
    }
  });
  let updateBtn = document.getElementById("updateBtn");
  // console.log(updateBtn);
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(noteId);
    let notes = document.getElementById(`${noteId}notes`);
    // console.log(notes);

    let updatedNotes = notes.value;
    if (updatedNotes === "") {
      return false;
    }
    // console.log(notes.value);

    currentNote[0].actualWork = updatedNotes;
    notesArr.splice(noteId, 1, currentNote[0]);
    // console.log(notesArr);
    localStorage.setItem("work", JSON.stringify(notesArr));
    noteContainer = document.getElementById(`notes${noteId}`);
    // console.log(noteContainer);
    checkBox.classList.remove("hide");
    noteContainer.outerHTML = `<div id="notes${noteId}" onclick="updateNotes(${noteId})" class="noteDetails"> ${updatedNotes}</div>`;
    // console.log(notes);
  });
  // notes.removeAttribute("disabled");

  // console.log(currentNote);
}
