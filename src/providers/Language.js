var Language = {
	alphabete: "abcdefghijklmnopqrstuvxyz",
	verb: {
		being: ["is", "are", "was", "were", "has been", "have been", "had been"].join("|"),
		linking: ["smell", "taste", "look", "feel", "seem", "become", "appear", "grow"].join("|"),
		action: ["see", "jump", "embrace", "write", "imagine", "buy", "plummet", "think"].join("|")
	},
	term: {
		NP1: "",
		NP2: "",
		NP3: "",
		Vbe: "",
		LV: "",
		Vint: "",
		Vtr: "",
		TP: "",
		Adv: "",
		Adj: ""
	},
	sentencePatterns: [
		"{{ NP1 }} {{ Vbe }} (?:{{ Adv }}|{{ TP }})",
		"{{ NP1 }} {{ Vbe }} {{ Adj }}",
		"{{ NP1 }} {{ Vbe }} {{ NP1 }}",
		"{{ NP1 }} {{ LV }} {{ Adj }}",
		"{{ NP1 }} {{ LV }} {{ NP1 }}",
		"{{ NP1 }} {{ Vint }}",
		"{{ NP1 }} {{ Vtr }} {{ NP2 }}",
		"{{ NP1 }} {{ Vtr }} {{ NP2 }} {{ NP3 }}",
		"{{ NP1 }} {{ Vtr }} {{ NP2 }} {{ Adj }}",
		"{{ NP1 }} {{ Vtr }} {{ NP2 }} {{ NP2 }}",
	]
}