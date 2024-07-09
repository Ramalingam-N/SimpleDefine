// content.js
var div = document.createElement("div");
div.style.position = "absolute";
div.style.backgroundColor = "white";
div.style.display = "none";
div.style.zIndex = "9999";
div.style.boxShadow = "0px 1px 6px 7px rgba(0, 0, 0, 0.3)";
document.body.appendChild(div);

document.body.addEventListener("dblclick", () => {
	const word1 = window.getSelection().toString().trim();
	const word = word1.toUpperCase();
	var meaning1 = "";
	var meaning2 = "";

	fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word1)
		.then((response) => response.json())
		.then((data) => {
			meaning1 = data[0].meanings[0].definitions[0].definition;
			meaning2 = data[0].meanings[0].definitions[1].definition;
			var partOfSpeech = data[0].meanings[0].partOfSpeech;
			var sound = "";
			for (let i = 0; i < data[0].phonetics.length; i++) {
				if (data[0].phonetics[i].audio != "") {
					sound = data[0].phonetics[i].audio;
					break;
				}
			}

			var temp = document.createElement("div");
			temp.style.width = "max-content";
			var p1 = document.createElement("p");
			p1.innerHTML = `${meaning1}`;
			var p2 = document.createElement("p");
			p2.innerHTML = `${meaning2}`;
			temp.appendChild(p1);
			temp.appendChild(p2);
			document.body.appendChild(temp);
			var width = Math.max(p1.offsetWidth, p2.offsetWidth);
			width = Math.min(420, width);
			width = Math.max(220, width);
			temp.style.display = "none";

			var audio = document.createElement("audio");
			audio.setAttribute("id", "myAudio321");
			audio.setAttribute("src", sound);

			div.style.padding = "0px";
			div.innerHTML = `<div
						class = "meaning-div"
						style="
							background-color: rgb(255, 255, 255);
							padding: 10px 22px;
							box-sizing: border-box;
							width: ${width + 82}px;
							font-style: Arial;
						"
					>
						<div
							style="
								display: flex;
								align-items: center;
								flex-direction: row;
								gap: 20px;
								margin-bottom: 6px;
							"
						>
							<span class="hoverMe" style="font-size: 20px; font-weight: 600"
								><a
									href="https://en.wiktionary.org/wiki/${word.toLowerCase()}"
									target="_blank"
									style="text-decoration: none; color: black"
									>${word}</a
								></span
							>
							<span
								class="myAudio321"
								style="
									cursor: pointer;
									height: 20px;
									width: 20px;
									margin-left: -14px;
								"
							>
								<img height="18" width="18" srcset="
									https://img.icons8.com/?size=50&id=11408&format=png  1x,
									https://img.icons8.com/?size=100&id=11408&format=png 2x
							" />
							</span>
							<span>---</span>
							<span style="font-size: 18px">${partOfSpeech}</span>
						</div>
						<div style="margin-left: 8px">
							<p style="margin-bottom: 6px;">
								1. ${meaning1}
							</p>
							<p>
								2. ${meaning2}
							</p>
						</div>
					</div>
			`;

			if (word !== "") {
				if (word.split(/\s+/).length === 1) {
					var range = window.getSelection().getRangeAt(0);
					var span = document.createElement("span");
					range.surroundContents(span);
					span.setAttribute("data-toggle", "tooltip");
					span.setAttribute("data-html", "true");
					var rect = span.getBoundingClientRect();
					div.style.display = "block";
					div.style.left = rect.left + "px";
					div.style.top = rect.bottom + window.pageYOffset + 5 + "px";

					var audioIcon = document.querySelector(".myAudio321");
					audioIcon.addEventListener("click", function () {
						audio.play();
					});
				}
			}
		})
		.catch((error) => {
			meaning1 = "No definition found for this word.";
			div.style.padding = "10px 20px";
			div.innerHTML =
				"<span style='font-size: 20px; letter-spacing: 1px; font-weight: 600'><strong>" +
				word +
				"</strong></span><br /><span style='font-size: 16px; margin-top: 10px'>" +
				meaning1 +
				"</span><br />";

			if (word !== "") {
				if (word.split(/\s+/).length === 1) {
					var range = window.getSelection().getRangeAt(0);
					var span = document.createElement("span");
					range.surroundContents(span);
					span.setAttribute("data-toggle", "tooltip");
					span.setAttribute("data-html", "true");
					var rect = span.getBoundingClientRect();
					div.style.display = "block";
					div.style.left = rect.left + "px";
					div.style.top = rect.bottom + window.pageYOffset + 5 + "px";
					document.body.appendChild(div);
				}
			}
		});

	document.body.addEventListener("click", function () {
		div.style.display = "none";
	});

	div.addEventListener("click", function (event) {
		event.stopPropagation();
	});
});
