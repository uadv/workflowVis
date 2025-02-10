const textButton = document.getElementById('textButton')
const reloadButton = document.getElementById('reloadButton')

textButton.addEventListener('click' , (event) => {
    const textinp = document.getElementById('fname').value
    fetch('http://localhost:3000/send', {
        method: 'POST', // HTTP method
        headers: {
            'Content-Type': 'application/json' // Tell server we're sending JSON
        },
        body: JSON.stringify({textinp})
    // now just need to send the text inp value to the server and add that to the array when accepting post requests on the server
})})

reloadButton.addEventListener('click' , (event) => {
    fetch('http://localhost:3000/get')
    .then(response => response.json()) // Convert response to JSON
    .then(data => document.getElementById('textbox').textContent = data) // Now log the data
    .catch(error => console.error('Error fetching messages:', error));
})