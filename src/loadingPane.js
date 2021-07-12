export class LoadingPane {
  pane;

  constructor() {
    let paneElem = document.createElement("div");
    paneElem.setAttribute("id", "loading-pane");

    document.body.appendChild(paneElem);

    let messageElem = document.createElement("div");
    messageElem.setAttribute("id", "loading-messages");

    paneElem = document.getElementById("loading-pane");
    paneElem.appendChild(messageElem);
  }

  hidePane() {
    let paneElem = document.getElementById("loading-pane");
    // paneElem.classList.add("hidden");
    paneElem.style.display = "none";
  }

  showPane() {
    let paneElem = document.getElementById("loading-pane");
    paneElem.classList.remove("hidden");
    paneElem.style.display = "flex";
  }

  clear() {
    this.sendMessage("");
  }

  sendMessage(message) {
    if (message == "") {
      this.hidePane();
    } else {
      this.showPane();
    }
    let messageElem = document.getElementById("loading-messages");
    messageElem.innerHTML = message;
  }
}
