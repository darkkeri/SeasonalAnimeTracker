const apiUrl = "https://api.waifu.pics/sfw/waifu";
const img = document.getElementById("waifupic");
const button = document.getElementById("waifubutton");

function getWaifu() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            img.src = data.url;
        })
        .catch(error => {
            console.error("Error fetching waifu:", error)
        });
}
button.addEventListener('click', getWaifu);

var formatted_Card_Payload = {
    "type": "message",
    "attachments": [
        {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "contentUrl": null,
            "content": {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.2",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "Hei maailma mitä kuuluu"
                    }
                ]
            }
        }
    ]
}

var webhookURL = "https://prod-57.westeurope.logic.azure.com:443/workflows/243ca9726957422e88678f6cd3b551e9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8GTqcS_24e_69d8FpA9DY227IgKxbEjSvfukaTQ2ARE";

function sendTeamsMSG(){
    axios.post(webhookURL , formatted_Card_Payload )
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    }

//window.onload = sendTeamsMSG();