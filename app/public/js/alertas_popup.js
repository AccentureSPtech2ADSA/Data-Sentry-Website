const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: true,
  confirmButtonText: "OK",
  // timer: 3000,
  // timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
//______Popup
function alertarQ(title = '', text = '', icon = '', confirmButtonText = '', cancelButtonText = ''){
    if(icon == 'warning'){
        iconColor = '#FFBF00'

    } else if (icon == 'error'){
        iconColor = '#8B0000'

    } else if (icon == 'success'){
        iconColor = 'green'

    }
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        iconColor: iconColor,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonColor: '#1a6969',
        timer: '20000',
        timerProgressBar: true
    })
}
function alertar(
  title = "",
  text = "",
  icon = "success",
  confirmButtonText = "",
  negativeButton = ""
) {
  if (icon == "warning") {
    iconColor = "#FFBF00";
  } else if (icon == "error") {
    iconColor = "#8B0000";
  } else if (icon == "success") {
    iconColor = "green";
  }
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    iconColor: iconColor,
    showDenyButton: negativeButton ? true : false,
    denyButtonText: negativeButton,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#1a6969",
    timer: "",
    timerProgressBar: true,
  });
}

function addMessage(title, message, type = 'warning'){
    /**
     * @type {HTMLDivElement}
     */
    let box = document.querySelector('#messages_alerts');
        box.style.display = 'block';
        box.innerHTML += 
        `
        <div class="message ${type}">
        <span class="close" onclick="closeMessage(this.parentElement)">X</span>
        <h4>${title}</h4>
        <p>
         ${message}
        </p>
        <button onclick="sendSlack('${type}','${title}', '${message}')">Avisar Slack</button>
      </div>
        `
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
function closeMessage(element){
    element.remove();
    let box = document.querySelector('#messages_alerts');
    if(box.childElementCount == 0){
        box.style.display = 'none'
    }

}

async function sendSlack(type, title, message){
  const { IncomingWebhook } = require('@slack/webhook');
  const url = process.env.SLACK_WEBHOOK_URL;
  
  const webhook = new IncomingWebhook(url);
  type = 'teste';
  title = 'tentativa 01';
  message = 'Hello World';

  (async () => {
    await webhook.send({
      text: `${type}/${title}: ${message}`,
    });
  })();
}