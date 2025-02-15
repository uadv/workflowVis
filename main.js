const textButton = document.getElementById('textButton')
const reloadButton = document.getElementById('reloadButton')
const addStepButton = document.getElementById('addStep')
let notes = []

function createProjObject(textinp) {
    // Get the container div
    const container = document.getElementById("projcontainer");

    // Create the main div
    const div = document.createElement("div");
    div.classList.add("projobject");

    // Create elements
    const title = document.createElement("h6");
    title.textContent = textinp;

    // Append everything with line breaks
    div.append(title)
    if (textinp){
        container.appendChild(div);
    }

}

function showNotes() {
    console.log('Showing the Notes')
    for (let i = 0; i < notes.length; i++){
        console.log(notes[i])
        createProjObject(notes[i])
    }
}

fetch('http://192.168.12.231:3000/get') // This is gathering the notes from the server (There are no notes on the server yet.)
    .then(response => response.json())
    .then(data => notes = data)
    .catch(error => console.error('Error:', error))

async function getNotes() {
    let receivedData = await fetch('http://192.168.12.231:3000/get') // this waits for the fetch and then will assign the notes
    let note = await receivedData.json()
    notes = note
    console.log("Notes Received from Server")
    showNotes()
}

getNotes()

addStepButton.addEventListener('click' , (event) => {
    let textInput = document.getElementById("noteinp").value
    
    // This sends the note to the server: 
    fetch('http://192.168.12.231:3000/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },  // Important! Tell the server it's plain text
        body: JSON.stringify({note : textInput})  // Send text directly
    })
    .then(response => response.text())  // Convert response to text
    .then(data => console.log('Success:', data))  // Log response
    .catch(error => console.error('Error:', error));  // Handle errors
    
    // This creates the HTML blueprint including the note input:
    createProjObject(textInput)
})
