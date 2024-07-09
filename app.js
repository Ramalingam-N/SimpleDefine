function outputValue() {
	const word = document.querySelector("#word").value;
	if (word.length > 0) {
		fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
			.then((response) => response.json())
			.then((data) => {
				let test = data[0].meanings[0].definitions[0].definition;
				let outputBox = document.querySelector(".output");
				outputBox.classList.add("outputUpdate");
				let h3 = document.querySelector(".outputHeadingName");
				if (h3.textContent == word.toUpperCase()) {
					return;
				}
				h3.textContent = word.toUpperCase();
				let img = document.querySelector(".audioButton");
				img.setAttribute("height", "18");
				img.setAttribute("width", "18");
				let index = 1;
				let definitions = document.querySelector(".definitions");
				definitions.innerHTML = "";
				let sound = "";
				for (let i = 0; i < data[0].phonetics.length; i++) {
					if (data[0].phonetics[i].audio != "") {
						sound = data[0].phonetics[i].audio;
						break;
					}
				}

				const audioElement = document.getElementById("myAudio321");
				if (audioElement) {
					audioElement.remove();
				}

				var audio = document.createElement("audio");
				audio.setAttribute("id", "myAudio321");
				audio.setAttribute("src", sound);
				document.body.appendChild(audio);

				var audioIcon = document.querySelector(".myAudio321");
				var newAudioIcon = audioIcon.cloneNode(true);
				audioIcon.parentNode.replaceChild(newAudioIcon, audioIcon);

				newAudioIcon.addEventListener("click", function () {
					audio.play();
				});

				for (let i = 0; i < data[0].meanings.length; i++) {
					for (
						let j = 0;
						j < data[0].meanings[i].definitions.length;
						j++
					) {
						let meaning =
							index +
							".  " +
							data[0].meanings[i].definitions[j].definition;
						let example =
							data[0].meanings[i].definitions[j].example;
						let li = document.createElement("li");
						li.style.marginBottom = "10px";
						li.style.marginLeft = "8px";
						li.style.listStyle = "none";
						li.style.fontSize = "14px";
						li.textContent = meaning;
						definitions.appendChild(li);
						index++;
					}
				}
				let ol = document.querySelector(".definitions");
				let height = ol.offsetHeight;
				if (height <= 250) {
					outputBox.style.height = height + 50 + "px";
				}
			});
	}
}

let input = document.querySelector(".submit");
input.addEventListener("click", outputValue);
document.addEventListener("keydown", function (event) {
	if (event.keyCode === 13) {
		outputValue();
	}
});
