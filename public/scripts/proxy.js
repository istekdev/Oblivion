const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/"
const inputs = document.querySelectorAll("#top-search, input");
const frame = document.getElementById("frame");
const tabs = document.getElementById("tabs");

inputs.addEventListener("keydown", async function (event) {
	if (event.key === "Enter") {
    		event.preventDefault();
    		let url = inputs.value;
    		let searchUrl = "https://www.google.com/search?q=";
    		if (!url.includes(".")) {
        		url = searchUrl + encodeURIComponent(url);
    		} else {
        		if (!url.startsWith("http://") && !url.startsWith("https://")) {
            		url = "https://" + url;
        		}
    		}
		if (!await connection.getTransport()) {
			await connection.setTransport("/baremod/index.mjs", [bareUrl]);
		}
    		window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
		}
});

function uv(link) {
	frame.style.display = "block";
	tabs.style.display = "flex";
	window.location.href = __uv$config.prefix + __uv$config.encodeUrl(link);
}

function exit() {
	frame.style.display = "none";
	tabs.style.display = "none";
	frame.src = "";
}

function full() {
  var frame = document.getElementById('frame');
  if (frame.requestFullscreen) {
    frame.requestFullscreen();
  } else if (frame.webkitRequestFullscreen) {
    frame.webkitRequestFullscreen();
    } else if (frame.msRequestFullscreen) {
    frame.msRequestFullscreen();
    } else {
    console.log("old bropwser dosent support full");
  }
}

function redir(title, favi) {
    const frame = document.getElementById('frame');
    let inFrame;
    
    try {
        inFrame = window !== top;
    } catch (e) {
        inFrame = true;
    }

    if (!inFrame && !navigator.userAgent.includes("Firefox")) {
        const popup = window.open("about:blank", "_blank");

        if (!popup || popup.closed) {
        } else {
            const doc = popup.document;

            doc.title = title;

            const iframe = doc.createElement("iframe");
            const style = iframe.style;
            iframe.src = frame.src;
            style.position = "fixed";
            style.top = style.bottom = style.left = style.right = 0;
            style.border = style.outline = "none";
            style.width = style.height = "100%";

            doc.body.appendChild(iframe);

            location.replace("https://www.google.com");
        }
    }
}

function uvab() {
    redir("about:blank", "/images/cloak/about-blank.png");
}

