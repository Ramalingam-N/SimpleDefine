// chrome.tabs.query(
// 	{
// 		active: true,
// 		currentWindow: true,
// 	},
// 	function (tabs) {
// 		let tab = tabs[0];
// 		chrome.scripting.executeScript({
// 			target: { tabId: tab.id },
// 			function: searchWord,
// 		});
// 	}
// );

// function searchWord() {
// 	console.log(document.body);
// 	function addEventListenerToTextNode(node) {
// 		node.addEventListener("select", function () {
// 			// Your event handling code here
// 			console.log("Text clicked:", node.textContent);
// 		});
// 	}

// 	document.body.addEventListener("select", function () {
// 		console.log("Okkk");
// 	});
// }

// // function Search() {
// // var word = "search";
// // fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
// // 	.then((response) => response.json())
// // 	.then((data) => {
// // 		console.log(data);
// // 		document.getElementById("output").innerHTML =
// // 			data[0].meanings[0].definitions[0].definition;
// // 	})
// // 	.catch((error) => {
// // 		console.error("Error fetching data:", error);
// // 		document.getElementById("output").innerHTML =
// // 			"<p>No definition found for this word.</p>";
// // 	});
// // }
