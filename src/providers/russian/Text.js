var Text = {
	newsTitlePatterns: [
		"{{ object }}{{ verb|passive| }}", //сбой устранен
		"{{ lastName|politician }}{{ verb|transitive }}{{ position }}{{ company }}", //собянин назначил главу еврогортранса
		"{{ verb|reflective }} {{ post }} {{ object }} {{ firstName }}{{ lastName }}", //скончался режиссер "клетки" Эдвард Криг
		"{{ name }} {{ verb }} {{ name }} {{ place }}", //Локомотив догнал зенит в подворотне
		"{{ subject }} {{ verb }} {{ objectClause }} {{ place }}" //ФИФА изменила время начала игры России и Бельгии на ЧМ 2014
	]
}