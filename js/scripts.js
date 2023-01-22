let lastTime;
let username;
let recipient = "Todos";
let typeMessage = "message";
let urlChat = "https://mock-api.driven.com.br/api/v6/uol/participants"

function loginChat() {
    username = prompt("Qual o seu nome?")
    const promise = axios.post(`${urlChat}/participants`, {
        name: username
    });
    promise.then(startChat);
    promise.catch(reloadPage)
}

function startChat() {
    loadMessages()
    loadUser()
    setInterval(loadMessages, 3000)
    setInterval(keepLogged, 5000)
    setInterval(loadUsers, 10000)
    document.addEventListener("keyup", sendMessageEnter)
}

function sendMessageEnter(e) {
    if (e.keyCode === 13) {
        sendMessageEnter();
    }
}

function keepLogged() {
    axios.post(`${urlChat}/status`, {
        name: username
    });
}

function reloadPage() {
    window.location.reload();
}

function loadMessages() {
    const promise = axios.get(`${urlChat}/messages`);
    promise.then(renderMessages);
}