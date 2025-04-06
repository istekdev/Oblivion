const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/"
const frame = document.getElementById("frame");
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
    		frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
		}
});

function uv(link) {
	frame.style.display = "block";
	tabs.style.display = "flex";
	frame.src = __uv$config.prefix + __uv$config.encodeUrl(link);
}

function exit() {
	frame.style.display = "none";
	tabs.style.display = "none";
	frame.src = "";
}


