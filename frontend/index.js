const saveButton = document.querySelector('.save-note');
const inputsArea = document.querySelector('.inputs-area');
let noteValues = [];

const retrieveNotes = () => {
    fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) =>
        response.json()
    ).then(data => {
        if(data){
            noteValues = data;
            buildNotesSidebar(data);
        } else {
            console.log("undefined")
            return
        }
    })
}

const buildNotesSidebar = (notes) => {
    let notesHtml = '';
    for(let note of notes){
        notesHtml += `
            <li onclick="viewNote(this, event)" data-id=${note.id} class="note-li">
                <h4>${note.title}</h4>
                <i onclick="deleteNote(this)" class="fas fa-trash-alt"></i>
            </li>
        `
    }
    document.querySelector('.list-group').innerHTML = notesHtml;
}

const viewNote = (li, e) => {
    const liId = li.dataset.id;
    if(e.target.matches('h4')){
        fetch(`/api/notes/${liId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => setNoteInfo(data))
    } return
}

const setNoteInfo = (data) => {
    inputsArea.innerHTML = '';
    let inputAreaNote = `
        <h1>${data.title}</h1>
        <p>${data.text}</p>
    `
    inputsArea.innerHTML = inputAreaNote;
}

const deleteNote = (icon) => {
    const parentLi = icon.parentElement;
    const parentId = parentLi.dataset.id;
    const foundNote = noteValues.findIndex(note => note.id == parentId);
    noteValues.splice(foundNote, 1);
    parentLi.remove();
    fetch(`/api/notes/${parentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() => {
        setTimeout(() => {
            alert('Note Deleted!')
        }, 1000)
    })
    writeNewNote();
}

saveButton.addEventListener('click', () => {
    const noteTitle = document.querySelector('.note-title');
    const noteTextarea = document.querySelector('.note-textarea');
    const noteObject = {
        id: Date.now(),
        title: noteTitle.value,
        text: noteTextarea.value
    }
    noteValues.push(noteObject);
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteValues)
    }).then(() => {
        setTimeout(() => {
            alert('Adding Note!')
            retrieveNotes();
        }, 1000)
    })
    document.querySelector('.save-note').style.display = 'none';
    writeNewNote();
})

const writeNewNote = () => {
    inputsArea.innerHTML = `
        <input class="note-title" placeholder="Note Title" maxlength="28" type="text"/>
        <textarea class="note-textarea" placeholder="Note Text"></textarea>
    `
}

inputsArea.addEventListener('keyup', () => {
    const noteTitle = document.querySelector('.note-title');
    const noteTextarea = document.querySelector('.note-textarea');
    if(noteTitle.value.trim() && noteTextarea.value.trim()){
        document.querySelector('.save-note').style.display = 'inline-block';
    } else {
        document.querySelector('.save-note').style.display = 'none';
    }
})

retrieveNotes();