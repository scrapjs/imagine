/* Main data-generator class */

var Improviser = function(){

}

Improviser.stripTags = function(htmlString) {		
	htmlString = htmlString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

	return htmlString;
};

Improviser.eval = function(str, name) {
		var self = this;

		str = self.stripTags(str);

		var tpl = swig.compile(str,{ filename: 'str'});

		//TODO: init data with Fakes
		var data = {
			"posts": [
			{
				"title": "post title 1",
				"content": "some post description 1",
				"author": "dmitry_f",
				"date": new Date()
			},
			{
				"title": "post title 2 ",
				"content": "some post description 2",
				"author": "dmitry_f",
				"date": new Date()
			},
			{
				"title": "post title 2 ",
				"content": "some post description 2",
				"author": "dmitry_f",
				"date": new Date()
			}
			],
			"name": "page name",
			"intro": "Some intro text"
		};

		return tpl(data);
	}


/*


	HandleField(field, pos) {
		global local
		global rRes
		global toLowerFlag

		field := substr(field, 3, -2)

		initialLocale := local
		initialFlag := toLowerFlag
		if (RegExMatch(field, "userName")){ ;username should always be in ascii
			local := "en"
			toLowerFlag := true
		}

		renderFormat(field)

		local := initialLocale
		toLowerFlag := initialFlag

		return 1
		}

	HandleSpace(spacer, pos){
		global local
		global rRes
		rRes .= lexnum(spacer)
		return 1
	}


}



//TODO:
// - define if length reached
// - randomize lorem
// - customize date
// - make url

fakeData := {en : {}, ru : {}} ;main data array

//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ Fake data
//-------------------------Lorem Ipsum

fakeData["en"]["lorem"] := array("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Vestibulum ullamcorper mauris at ligula. Fusce fermentum. Nullam cursus lacinia erat. Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue. Curabitur vestibulum aliquam leo. Praesent egestas neque eu enim. In hac habitasse platea dictumst. Fusce a quam. Etiam ut purus mattis mauris sodales aliquam. Curabitur nisi. Quisque malesuada placerat nisl. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Morbi mollis tellus ac sapien. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Fusce vel dui. Sed in libero ut nibh placerat accumsan. Proin faucibus arcu quis ante. In consectetuer turpis ut velit. Nulla sit amet est. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Suspendisse feugiat. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus hendrerit. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Suspendisse eu ligula. Nulla facilisi. Donec id justo. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Curabitur suscipit suscipit tellus. Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti. Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius.")

fakeData["ru"]["lorem"] := array("Пешеходов надо любить. Пешеходы составляют большую часть человечества. Мало того – лучшую его часть. Пешеходы создали мир. Это они построили города, возвели многоэтажные здания, провели канализацию и водопровод, замостили улицы и осветили их электрическими лампами. Это они распространили культуру по всему свету, изобрели книгопечатание, выдумали порох, перебросили мосты через реки, расшифровали египетские иероглифы, ввели в употребление безопасную бритву, уничтожили торговлю рабами и установили, что из бобов сои можно изготовить 114  вкусных питательных блюд. И когда все было готово, когда родная планета приняла сравнительно благоустроенный вид, появились автомобилисты. Надо заметить, что автомобиль тоже был изобретен пешеходом. Но автомобилисты об этом как то сразу забыли. Кротких и умных пешеходов стали давить. Улицы, созданные пешеходами, перешли во власть автомобилистов. Мостовые стали вдвое шире, тротуары сузились до размера табачной бандероли. И пешеходы стали испуганно жаться к стенам домов. В большом городе пешеходы ведут мученическую жизнь. Для них ввели некое транспортное гетто. Им разрешают переходить улицы  только на перекрестках, то есть именно в тех местах, где движение сильнее всего и где волосок, на котором обычно висит жизнь пешехода, легче всего оборвать. В нашей обширной стране обыкновенный автомобиль, предназначенный, по мысли пешеходов, для мирной перевозки людей и грузов, принял грозные очертания братоубийственного снаряда. Он выводит из строя целые шеренги членов профсоюзов и их семей. Если пешеходу иной раз удается выпорхнуть из под серебряного носа машины живым, – его штрафует милиция за нарушение правил уличного катехизиса вообще авторитет пешеходов сильно пошатнулся. Они, давшие миру таких замечательных людей, как Гораций, Бойль Мариотт , Лобачевский и Гутенберг, они, выделившие из своей среды таких завзятых пешеходов, как Пушкин, Вольтер, Мейерхольд  и Анатоль Франс, – принуждены теперь кривляться самым пошлым образом, чтобы только напомнить о своем существовании. Боже, боже, которого, в сущности, нет! До  чего ты, которого на самом деле то и нет, довел пешехода! Вот идет он из Владивостока в Москву по сибирскому тракту, держа в одной руке знамя с надписью: «Перестроим быт текстильщиков» и перекинув через плечо палку, на конце которой болтаются резервные сандалии «Дядя Ваня» и жестяной чайник без крышки. Это советский пешеход физкультурник, который вышел из Владивостока юношей и на склоне лет у самых ворот Москвы будет задавлен тяжелым автокаром, номер которого так и не успеют заметить. Или другой, европейский могикан пешеходного движения. Он идет пешком вокруг света, катя перед собой бочку. Он пошел бы просто  так, без бочки, но тогда никто не заметит, что он действительно пешеход дальнего следования и про него ничего не напишут в газетах. Приходится всю жизнь толкать перед собой проклятую тару, на которой к тому же (позор, позор!) выведена большая желтая надпись, восхваляющая непревзойденные качества автомобильного масла «Грезы шофера». Так деградировал пешеход. И только в маленьких русских городах пешехода еще уважают и любят. Там он еще является хозяином улиц, беззаботно бродит по мостовой и пересекает ее самым замысловатым образом в любом направлении. Гражданин в фуражке с белым верхом, какую по большей части носят администраторы летних садов и конферансье, несомненно принадлежал к большей и лучшей части человечества. Он двигался по улицам города Арбатова пешком, со снисходительным любопытством озираясь по сторонам. В руке он держал небольшой акушерский саквояж. Город, видимо, ничем не поразил пешехода в артистической фуражке. Он увидел десятка полтора голубых, резедовых и бело розовых звонниц; бросилось ему в глаза облезлое кавказское  золото церковных куполов. Флаг клубничного цвета  трещал над официальным зданием. У белых башенных ворот провинциального кремля две суровые старухи разговаривали по французски, жаловались на советскую власть и вспоминали любимых дочерей. Из церковного подвала несло холодом, бил оттуда кислый винный запах. Там, как видно, хранился картофель. – Храм Спаса  на картошке, – негромко сказал пешеход. Пройдя под фанерной аркой со свежим известковым лозунгом: «Привет 5й окружной конференции женщин и девушек», он очутился у начала длинной аллеи, именовавшейся Бульваром Молодых Дарований. – Нет, – сказал он с огорчением, – это не Рио де Жанейро, это гораздо хуже. Почти на всех скамьях Бульвара Молодых Дарований сидели одинокие девицы с раскрытыми книжками в руках. Дырявые тени падали на страницы книг, на голые локти, на трогательные челки. Когда приезжий вступил в прохладную аллею, на скамьях произошло заметное движение. Девушки, прикрывшись книгами Гладкова, Элизы Ожешко и Сейфуллиной, бросали на приезжего трусливые взгляды. Он проследовал мимо взволнованных читательниц парадным шагом и вышел к зданию исполкома – цели своей прогулки. В эту минуту из за угла выехал извозчик. Рядом с ним, держась за пыльное обугленное  крыло экипажа и размахивая вздутой папкой с тисненой надписью «Musique», быстро шел человек в длиннополой толстовке. Он что то горячо доказывал седоку. Седок – пожилой мужчина с висячим, как банан, носом – сжимал ногами чемодан и время от времени показывал своему собеседнику кукиш. В пылу спора его инженерская фуражка, околыш которой сверкал зеленым диванным плюшем, покосилась набок. Обе тяжущиеся стороны часто и особенно громко произносили слово «оклад».", "Мифопоэтическое пространство взаимно. Талант Капниста по-настоящему раскрылся в комедии «Ябеда», здесь верлибр редуцирует ямб, первым образцом которого принято считать книгу А.Бертрана «Гаспар из тьмы». Метр аннигилирует контрапункт, об этом свидетельствуют краткость и завершенность формы, бессюжетность, своеобразие тематического развертывания. Эпическая медлительность неумеренно аннигилирует экзистенциальный дольник, тем не менее узус никак не предполагал здесь родительного падежа. Гекзаметр, несмотря на внешние воздействия, точно аннигилирует музыкальный жанр, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Первое полустишие диссонирует диссонансный дискурс, при этом нельзя говорить, что это явления собственно фоники, звукописи. Филиация вразнобой осознаёт эпизодический реципиент, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Стихотворение, чтобы уловить хореический ритм или аллитерацию на «л», приводит поток сознания и передается в этом стихотворении Донна метафорическим образом циркуля. Размер отталкивает литературный эпитет, именно поэтому голос автора романа не имеет никаких преимуществ перед голосами персонажей. Женское окончание вызывает диалектический характер, таким образом, очевидно, что в нашем языке царит дух карнавала, пародийного отстранения. Подтекст, по определению отражает лирический субъект, таким образом постепенно смыкается с сюжетом. Аллюзия вероятна. Жанр приводит эпизодический диалектический характер, об этом свидетельствуют краткость и завершенность формы, бессюжетность, своеобразие тематического развертывания. После того как тема сформулирована, речевой акт отражает пастиш, потому что в стихах и в прозе автор рассказывает нам об одном и том же. Гекзаметр, без использования формальных признаков поэзии, полидисперсен. Матрица выбирает музыкальный речевой акт, где автор является полновластным хозяином своих персонажей, а они - его марионетками.Уместно оговориться: подтекст полидисперсен. Холодный цинизм изменяем. Правило альтернанса абсурдно отражает стих и передается в этом стихотворении Донна метафорическим образом циркуля. Полифонический роман интегрирует дискурс, таким образом постепенно смыкается с сюжетом. Ударение, несмотря на внешние воздействия, абсурдно осознаёт дактиль, также необходимо сказать о сочетании метода апроприации художественных стилей прошлого с авангардистскими стратегиями. Силлабика непосредственно интегрирует жанр, но языковая игра не приводит к активно-диалогическому пониманию. Скрытый смысл прочно начинает прозаический акцент, но известны случаи прочитывания содержания приведённого отрывка иначе. Гекзаметр отражает гекзаметр, но не рифмами. Контрапункт дает эпизодический одиннадцатисложник, потому что сюжет и фабула различаются. Развивая эту тему, парафраз абсурдно отталкивает ритмический рисунок, потому что в стихах и в прозе автор рассказывает нам об одном и том же Аффилиация вероятна. Стихотворение фонетически интегрирует коммунальный модернизм, потому что в стихах и в прозе автор рассказывает нам об одном и том же. Развивая эту тему, линеаризация мышления абсурдно отталкивает культурный коммунальный модернизм, хотя в существование или актуальность этого он не верит, а моделирует собственную реальность. Стихотворение аллитерирует метр, но известны случаи прочитывания содержания приведённого отрывка иначе. Зачин, если уловить хореический ритм или аллитерацию на «р», притягивает деструктивный не-текст, таким образом, очевидно, что в нашем языке царит дух карнавала, пародийного отстранения. Мифопоэтическое пространство взаимно. Талант Капниста по-настоящему раскрылся в комедии «Ябеда», здесь верлибр редуцирует ямб, первым образцом которого принято считать книгу А.Бертрана «Гаспар из тьмы». Метр аннигилирует контрапункт, об этом свидетельствуют краткость и завершенность формы, бессюжетность, своеобразие тематического развертывания. Эпическая медлительность неумеренно аннигилирует экзистенциальный дольник, тем не менее узус никак не предполагал здесь родительного падежа. Гекзаметр, несмотря на внешние воздействия, точно аннигилирует музыкальный жанр, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Первое полустишие диссонирует диссонансный дискурс, при этом нельзя говорить, что это явления собственно фоники, звукописи. Филиация вразнобой осознаёт эпизодический реципиент, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Стихотворение, чтобы уловить хореический ритм или аллитерацию на «л», приводит поток сознания и передается в этом стихотворении Донна метафорическим образом циркуля. Размер отталкивает литературный эпитет, именно поэтому голос автора романа не имеет никаких преимуществ перед голосами персонажей. Женское окончание вызывает диалектический характер, таким образом, очевидно, что в нашем языке царит дух карнавала, пародийного отстранения. Подтекст, по определению отражает лирический субъект, таким образом постепенно смыкается с сюжетом. Аллюзия вероятна. Жанр приводит эпизодический диалектический характер, об этом свидетельствуют краткость и завершенность формы, бессюжетность, своеобразие тематического развертывания. После того как тема сформулирована, речевой акт отражает пастиш, потому что в стихах и в прозе автор рассказывает нам об одном и том же. Гекзаметр, без использования формальных признаков поэзии, полидисперсен. Матрица выбирает музыкальный речевой акт, где автор является полновластным хозяином своих персонажей, а они - его марионетками.Уместно оговориться: подтекст полидисперсен. Холодный цинизм изменяем. Правило альтернанса абсурдно отражает стих и передается в этом стихотворении Донна метафорическим образом циркуля. Полифонический роман интегрирует дискурс, таким образом постепенно смыкается с сюжетом. Ударение, несмотря на внешние воздействия, абсурдно осознаёт дактиль, также необходимо сказать о сочетании метода апроприации художественных стилей прошлого с авангардистскими стратегиями. Силлабика непосредственно интегрирует жанр, но языковая игра не приводит к активно-диалогическому пониманию. Скрытый смысл прочно начинает прозаический акцент, но известны случаи прочитывания содержания приведённого отрывка иначе. Гекзаметр отражает гекзаметр, но не рифмами. Контрапункт дает эпизодический одиннадцатисложник, потому что сюжет и фабула различаются. Развивая эту тему, парафраз абсурдно отталкивает ритмический рисунок, потому что в стихах и в прозе автор рассказывает нам об одном и том же Аффилиация вероятна. Стихотворение фонетически интегрирует коммунальный модернизм, потому что в стихах и в прозе автор рассказывает нам об одном и том же. Развивая эту тему, линеаризация мышления абсурдно отталкивает культурный коммунальный модернизм, хотя в существование или актуальность этого он не верит, а моделирует собственную реальность. Стихотворение аллитерирует метр, но известны случаи прочитывания содержания приведённого отрывка иначе. Зачин, если уловить хореический ритм или аллитерацию на «р», притягивает деструктивный не-текст, таким образом, очевидно, что в нашем языке царит дух карнавала, пародийного отстранения.")

fakeData["ru"]["preposition"] := array()
fakeData["en"]["preposition"] := array()

fakeData["ru"]["phraseFormat"] := array()

//------------------------------------------------------------------------------- ADDR DATA

fakeData["ru"]["cityPrefix"] := array("город", "село", "аул", "деревня", "поселение")
fakeData["en"]["cityPrefix"] := array("North", "East", "West", "South", "New", "Lake", "Port")

fakeData["en"]["citySuffix"] := array("town", "ton", "land", "ville", "berg", "burgh", "borough", "bury", "view", "port", "mouth", "stad", "furt", "chester", "mouth", "fort", "haven", "side", "shire")

fakeData["ru"]["regionSuffix"] := array("область")

fakeData["ru"]["streetPrefix"] := array("пер.", "ул.", "пр.", "шоссе", "пл.", "бульвар","въезд", "спуск", "проезд", "наб.")

fakeData["en"]["streetSuffix"] := array( "Alley","Avenue","Branch","Bridge","Brook","Brooks","Burg","Burgs","Bypass","Camp","Canyon","Cape","Causeway","Center","Centers","Circle","Circles","Cliff","Cliffs","Club","Common","Corner","Corners","Course","Court","Courts","Cove","Coves","Creek","Crescent","Crest","Crossing","Crossroad","Curve","Dale","Dam","Divide","Drive","Drive","Drives","Estate","Estates","Expressway","Extension","Extensions","Fall","Falls","Ferry","Field","Fields","Flat","Flats","Ford","Fords","Forest","Forge","Forges","Fork","Forks","Fort","Garden","Gardens","Gateway","Glen","Glens","Green","Greens","Grove","Groves","Harbour","Harbours","Haven","Heights","Highway","Hill","Hills","Hollow","Inlet", "Island","Islands", "Isle","Junction","Junctions","Key","Keys","Knoll","Knolls","Lake","Lakes","Land","Landing","Lane","Light","Lights","Loaf","Lock","Locks","Locks","Lodge","Lodge","Loop","Manor","Manors","Meadow","Meadows","Mews","Mill","Mills","Motorway","Mount","Mountain","Mountains","Neck","Orchard","Oval","Overpass","Park","Parks","Parkway","Parkways","Pass","Passage","Path","Pike","Pine","Pines","Place","Plain","Plains","Plaza","Point","Points","Port","Ports","Radial","Ramp","Ranch","Rapid","Rapids","Rest","Ridge","Ridges","River","Road","Road","Roads","Roads","Route","Row","Rue","Run","Shoal","Shoals","Shore","Shores","Spring","Springs","Springs","Spur","Spurs","Square","Square","Squares","Squares","Station","Station","Stream","Stream","Street","Streets","Summit","Terrace","Throughway","Trace","Track","Trafficway","Trail","Tunnel","Turnpike","Underpass","Union","Unions","Valley","Valleys","Via","Viaduct","View","Views","Village","Villages","Ville","Vista","Vista","Walk","Walks","Wall","Way","Ways","Well","Wells")

fakeData["ru"]["country"] := array("Украина", "Российская Федерация", "США", "Канада", "Австралия", "Австрия", "Азербайджан", "Аландские острова", "Албания", "Алжир", "Американские острова Самоа", "Ангилья","Ангола", "Андорра", "Антарктика", "Антигуа и Барбуда", "Аргентина", "Армения","Аруба", "Афганистан, Исламская Республика", "Багамы", "Бангладеш", "Барбадос", "Бахрейн",        "Белиз", "Белоруссия", "Бельгия", "Бермудские Острова", "Болгария", "Боливия","Босния и Герцеговина", "Ботсвана", "Бразилия", "Британская территория Индийского океана","Бруней Даруссалам", "Буркина Фасо", "Бурунди", "Бутан", "Вануату","Великобритания", "Венгрия", "Венесуэла", "Виргинские о-ва, Великобритания", "Виргинские о-ва, США","Восточный Тимор", "Вьетнам", "Габон", "Гаити", "Гайана","Гамбия", "Гана", "Гваделупа", "Гватемала", "Гвинея","Гвинея-Биссау", "Германия", "Гибралтар", "Гонгконг", "Гондурас","Государство-город Ватикан", "Гренада", "Гренландия", "Греция", "Грузия","Гуам", "Дания", "Джерси", "Джибути", "Доминиканская Республика","Египет", "Замбия", "Западная Сахара", "Зимбабве", "Израиль","Индия", "Индонезия", "Иордания", "Ирак", "Иран","Ирландия", "Исландия", "Испания", "Италия", "Йемен","Казахстан, Республика", "Каймановы Острова", "Камбоджа", "Камерун", "Катар","Кения", "Кипр", "Кирибати", "Китай", "Кокосовые острова","Колумбия", "Коморские Острова", "Конго, Демократическая Республика", "Конго, Республика", "Коста-Рика","Кот-д’Ивуар", "Куба", "Кувейт", "Кыргызстан", "Лаос","Латвия", "Лесото", "Либерия", "Ливан", "Ливия","Литва", "Лихтенштейн", "Люксембург", "Маврикий", "Мавритания","Мадагаскар, Республика", "Майотта", "Макао", "Македония, Республика", "Малави","Малайзия", "Мали", "Мальдивы", "Мальта", "Марокко","Мартиник", "Маршалловы Острова", "Мексика", "Мелкие отдаленные острова США", "Мозамбик","Молдова", "Монако", "Монголия", "Монтсеррат", "Мьянма","Намибия", "Науру", "Непал", "Нигерия", "Нигерия","Нидерландские Антильские острова", "Нидерланды", "Никарагуа", "Ниуэ", "Новая Зеландия","Новая Каледония", "Норвегия", "Объединённые Арабские Эмираты", "О. Гернси", "Оман","Острова Зеленого Мыса", "Острова Кука", "Острова Теркс И Кайкос", "Острова Уоллис и Футуна", "Острова Херд и Макдональд","Остров Буве", "Остров Доминика", "Остров Мэн", "Остров Норфолк", "Остров Святого Мартина","Остров Святой Елены", "О. Южная Георгия И Южные Сандвичевы Острова", "Пакистан", "Палау", "Палестина","Панама", "Папуа-Новая Гвинея", "Парагвай", "Перу", "Питкерн", "Польша", "Португалия", "Пуэрто-Рико", "Реюньон", "Рождественские острова","Руанда", "Румыния", "Сальвадор", "Самоа", "Сан-Марино","Сан-Томе и Принсипи", "Саудовская Аравия", "Свазиленд", "Северная Корея", "Северные Марианские Острова","Сейшельские Острова", "Сен-Бартельми", "Сенегал", "Сен-Пьер и Микелон", "Сент-Винсент и Гренадины","Сент-Киттс и Невис", "Сент-Люсия", "Сербия", "Сербия и Черногория, Государственный Союз", "Сингапур","Сирия", "Словацкая республика", "Словения", "Соломонские острова", "Сомали","Судан", "Суринам", "Сьерра-Леоне", "Таджикистан", "Тайвань","Тайланд", "Танзания", "Того", "Токелау", "Тонга","Тринидад и Тобаго", "Тувалу", "Тунис", "Туркмения", "Турция","Уганда", "Узбекистан", "Уругвай", "Фарерские острова", "Федеративные Штаты Микронезии","Фиджи", "Филиппины", "Финляндия", "Фолклендские о-ва", "Франция","Французская Гвинея", "Французская Полинезия", "Французские Южные Территории", "Хорватия", "Чад","Черногория", "Чешская Республика", "Чили", "Швейцария", "Швеция","Шпицберген и Ян-Майен", "Шри-Ланка", "Эквадор", "Экваториальная Гвинея", "Эритрея","Эстония", "Эфиопия", "Южная Корея", "Южно-Африканская Республика", "Ямайка", "Япония")

fakeData["en"]["country"] := array("Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica (the territory South of 60 deg S)","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island (Bouvetoya)","Brazil","British Indian Ocean Territory (Chagos Archipelago)","British Virgin Islands","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling)Islands", "Colombia", "Comoros","Congo","Congo","Cook Islands","Costa Rica","Cote d’Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Faroe Islands","Falkland Islands (Malvinas)","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea","Korea","Kuwait","Kyrgyz Republic","Lao People’s Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands Antilles","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Barthelemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia (Slovak Republic)","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard & Jan Mayen Islands","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","United States Minor Outlying Islands","United States Virgin Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe")

fakeData["ru"]["region"] := array("Амурская", "Архангельская", "Астраханская", "Белгородская", "Брянская","Владимирская", "Волгоградская", "Вологодская", "Воронежская", "Ивановская","Иркутская", "Калининградская", "Калужская", "Кемеровская", "Кировская","Костромская", "Курганская", "Курская", "Ленинградская", "Липецкая","Магаданская", "Московская", "Мурманская", "Нижегородская", "Новгородская","Новосибирская", "Омская", "Оренбургская", "Орловская", "Пензенская","Псковская", "Ростовская", "Рязанская", "Самарская", "Саратовская","Сахалинская", "Свердловская", "Смоленская", "Тамбовская", "Тверская","Томская", "Тульская", "Тюменская", "Ульяновская", "Челябинская","Читинская", "Ярославская")

fakeData["ru"]["city"] := array("Балашиха", "Видное", "Волоколамск", "Воскресенск", "Дмитров","Домодедово", "Дорохово", "Егорьевск", "Зарайск", "Истра","Кашира", "Клин", "Коломна", "Красногорск", "Лотошино","Луховицы", "Люберцы", "Можайск", "Москва", "Мытищи","Наро-Фоминск", "Ногинск", "Одинцово", "Озёры", "Орехово-Зуево","Павловский Посад", "Подольск", "Пушкино", "Раменское", "Сергиев Посад","Серебряные Пруды", "Серпухов", "Солнечногорск", "Ступино", "Талдом","Чехов", "Шатура", "Шаховская", "Щёлково")

fakeData["ru"]["county"] := array("Aberdeenshire", "Anglesey", "Angus", "Argyll", "Ayrshire", "Banffshire", "Bedfordshire", "Berwickshire", "Breconshire", "Buckinghamshire", "Bute", "Caernarvonshire", "Caithness", "Cambridgeshire", "Cardiganshire", "Carmarthenshire", "Cheshire", "Clackmannanshire", "Cornwall", "Isles of Scilly", "Cumbria", "Denbighshire", "Derbyshire", "Devon", "Dorset", "Dumbartonshire", "Dumfriesshire", "Durham", "East Lothian", "East Sussex", "Essex", "Fife", "Flintshire", "Glamorgan", "Gloucestershire", "Greater London", "Greater Manchester", "Hampshire", "Hertfordshire", "Inverness", "Kent", "Kincardineshire", "Kinross-shire", "Kirkcudbrightshire", "Lanarkshire", "Lancashire", "Leicestershire", "Lincolnshire", "London", "Merionethshire", "Merseyside", "Midlothian", "Monmouthshire", "Montgomeryshire", "Moray", "Nairnshire", "Norfolk", "North Yorkshire", "Northamptonshire", "Northumberland", "Nottinghamshire", "Orkney", "Oxfordshire", "Peebleshire", "Pembrokeshire", "Perthshire", "Radnorshire", "Renfrewshire", "Ross & Cromarty", "Roxburghshire", "Selkirkshire", "Shetland", "Shropshire", "Somerset", "South Yorkshire", "Staffordshire", "Stirlingshire", "Suffolk", "Surrey", "Sutherland", "Tyne and Wear", "Warwickshire", "West Lothian", "West Midlands", "West Sussex", "West Yorkshire", "Wigtownshire", "Wiltshire", "Worcestershire")


fakeData["ru"]["street"] := array("Косиора", "Ладыгина", "Ленина", "Ломоносова", "Сталина", "Печорина", "Макарова", "Маяковского", "Немцова", "Татарского", "Строителей", "Непокоренных", "Пионеров", "Труда", "Гегеля", "Академиков")

fakeData["en"]["freeEmailDomain"] := array("gmail.com", "yahoo.com", "hotmail.com", "gmail.co.uk", "yahoo.co.uk", "hotmail.co.uk")
fakeData["ru"]["freeEmailDomain"] := array("mail.ru", "inbox.ru", "km.ru", "gmail.com", "yandex.ru", "rambler.ru")
fakeData["en"]["domainName"] := array("com", "com", "com", "com", "com", "com", "biz", "info", "net", "org", "co.uk")
fakeData["ru"]["domainName"] := array("com", "com", "net", "org", "ru", "ru", "ru", "ru")

fakeData["ru"]["postcode"] := array("######","######","#####")
fakeData["en"]["postcode"] := array("?# #??", "?## #??", "??# #??", "??## #??", "?#? #??", "??#? #??")

fakeData["ru"]["phone"] := array("+7 (812) ###-##-##","+7 (495) ###-##-##","+7 (922) ###-####","+7 (35222) ##-####","8-800-###-####")
fakeData["en"]["phone"] := array("+##(#)##########","+##(#)##########","0##########","0##########","###-###-####","(###)###-####","1-###-###-####","###.###.####","###-###-####","(###)###-####","1-###-###-####","###.###.####","###-###-####x###","(###)###-####x###","1-###-###-####x###","###.###.####x###","###-###-####x####","(###)###-####x####","1-###-###-####x####","###.###.####x####","###-###-####x#####","(###)###-####x#####","1-###-###-####x#####","###.###.####x#####")


//---------------Ru person
fakeData["ru"]["firstName"] := array("Александр", "Алексей", "Дмитрий", "Сергей", "Андрей", "Антон", "Артём","Артемий", "Виталий", "Владимир", "Денис", "Евгений", "Иван", "Игорь","Константин", "Максим", "Михаил", "Николай", "Павел", "Роман", "Станислав","Август", "Адам", "Адриан", "Аким", "Ананий", "Анатолий", "Антонин","Аполлон", "Аркадий", "Арсений", "Богдан", "Болеслав", "Борис", "Бронислав","Вадим", "Валентин", "Валериан", "Валерий", "Василий", "Вениамин", "Виктор","Викентий", "Виль", "Витольд", "Владислав", "Владлен", "Всеволод", "Вячеслав","Геннадий", "Георгий", "Герасим", "Герман", "Глеб", "Гордей", "Григорий","Давид", "Дан", "Даниил", "Данила", "Добрыня", "Донат", "Егор", "Ефим","Захар", "Игнатий", "Игнат", "Илларион", "Илья", "Иннокентий", "Иосиф","Ираклий", "Кирилл", "Клим", "Кузьма", "Лаврентий", "Лев", "Леонид", "Макар","Марк", "Матвей", "Милан", "Мирослав", "Назар", "Никита", "Никодим","Олег", "Пётр", "Платон", "Прохор", "Радислав", "Рафаил", "Родион","Ростислав", "Руслан", "Савва", "Сава", "Святослав", "Семён", "Степан","Стефан", "Тарас", "Тимофей", "Тит", "Фёдор", "Феликс", "Филипп", "Юлиан","Юлий", "Юрий", "Яков", "Ян", "Ярослав")
fakeData["ru"]["middleName"] := array("Александрович", "Алексеевич", "Андреевич", "Дмитриевич", "Евгеньевич","Сергеевич", "Иванович", "Фёдорович", "Львович")
fakeData["ru"]["lastName"] := array("Смирнов", "Иванов", "Кузнецов", "Соколов", "Попов", "Лебедев", "Козлов","Новиков", "Морозов", "Петров", "Волков", "Соловьёв", "Васильев", "Зайцев","Павлов", "Семёнов", "Голубев", "Виноградов", "Богданов", "Воробьёв","Фёдоров", "Михайлов", "Беляев", "Тарасов", "Белов", "Комаров", "Орлов","Киселёв", "Макаров", "Андреев", "Ковалёв", "Ильин", "Гусев", "Титов","Кузьмин", "Кудрявцев", "Баранов", "Куликов", "Алексеев", "Степанов","Яковлев", "Сорокин", "Сергеев", "Романов", "Захаров", "Борисов", "Королёв","Герасимов", "Пономарёв", "Григорьев", "Лазарев", "Медведев", "Ершов","Никитин", "Соболев", "Рябов", "Поляков", "Цветков", "Данилов", "Жуков","Фролов", "Журавлёв", "Николаев", "Крылов", "Максимов", "Сидоров", "Осипов","Белоусов", "Федотов", "Дорофеев", "Егоров", "Матвеев", "Бобров", "Дмитриев","Калинин", "Анисимов", "Петухов", "Антонов", "Тимофеев", "Никифоров","Веселов", "Филиппов", "Марков", "Большаков", "Суханов", "Миронов", "Ширяев","Александров", "Коновалов", "Шестаков", "Казаков", "Ефимов", "Денисов","Громов", "Фомин", "Давыдов", "Мельников", "Щербаков", "Блинов", "Колесников","Карпов", "Афанасьев", "Власов", "Маслов", "Исаков", "Тихонов", "Аксёнов","Гаврилов", "Родионов", "Котов", "Горбунов", "Кудряшов", "Быков", "Зуев","Третьяков", "Савельев", "Панов", "Рыбаков", "Суворов", "Абрамов", "Воронов","Мухин", "Архипов", "Трофимов", "Мартынов", "Емельянов", "Горшков", "Чернов","Овчинников", "Селезнёв", "Панфилов", "Копылов", "Михеев", "Галкин", "Назаров","Лобанов", "Лукин", "Беляков", "Потапов", "Некрасов", "Хохлов", "Жданов","Наумов", "Шилов", "Воронцов", "Ермаков", "Дроздов", "Игнатьев", "Савин","Логинов", "Сафонов", "Капустин", "Кириллов", "Моисеев", "Елисеев", "Кошелев","Костин", "Горбачёв", "Орехов", "Ефремов", "Исаев", "Евдокимов", "Калашников","Кабанов", "Носков", "Юдин", "Кулагин", "Лапин", "Прохоров", "Нестеров","Харитонов", "Агафонов", "Муравьёв", "Ларионов", "Федосеев", "Зимин", "Пахомов","Шубин", "Игнатов", "Филатов", "Крюков", "Рогов", "Кулаков", "Терентьев","Молчанов", "Владимиров", "Артемьев", "Гурьев", "Зиновьев", "Гришин", "Кононов","Дементьев", "Ситников", "Симонов", "Мишин", "Фадеев", "Комиссаров", "Мамонтов","Носов", "Гуляев", "Шаров", "Устинов", "Вишняков", "Евсеев", "Лаврентьев","Брагин", "Константинов", "Корнилов", "Авдеев", "Зыков", "Бирюков", "Шарапов","Никонов", "Щукин", "Дьячков", "Одинцов", "Сазонов", "Якушев", "Красильников","Гордеев", "Самойлов", "Князев", "Беспалов", "Уваров", "Шашков", "Бобылёв","Доронин", "Белозёров", "Рожков", "Самсонов", "Мясников", "Лихачёв", "Буров","Сысоев", "Фомичёв", "Русаков", "Стрелков", "Гущин", "Тетерин", "Колобов","Субботин", "Фокин", "Блохин", "Селиверстов", "Пестов", "Кондратьев", "Силин","Меркушев", "Лыткин", "Туров")
//------------En person
fakeData["en"]["firstName"] := array("Aaliyah","Aaron","Abagail","Abbey","Abbie","Abbigail","Abby","Abdiel","Abdul","Abdullah","Abe","Abel","Abelardo","Abigail","Abigale","Abigayle","Abner","Abraham","Ada","Adah","Adalberto","Adaline","Adam","Adan","Addie","Addison","Adela","Adelbert","Adele","Adelia","Adeline","Adell","Adella","Adelle","Aditya","Adolf","Adolfo","Adolph","Adolphus","Adonis","Adrain","Adrian","Adriana","Adrianna","Adriel","Adrien","Adrienne","Afton","Aglae","Agnes","Agustin","Agustina","Ahmad","Ahmed","Aida","Aidan","Aiden","Aileen","Aimee","Aisha","Aiyana","Akeem","Al","Alaina","Alan","Alana","Alanis","Alanna","Alayna","Alba","Albert","Alberta","Albertha","Alberto","Albin","Albina","Alda","Alden","Alec","Aleen","Alejandra","Alejandrin","Alek","Alena","Alene","Alessandra","Alessandro","Alessia","Aletha","Alex")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Alexa","Alexander","Alexandra","Alexandre","Alexandrea","Alexandria","Alexandrine","Alexandro","Alexane","Alexanne","Alexie","Alexis","Alexys","Alexzander","Alf","Alfonso","Alfonzo","Alford","Alfred","Alfreda","Alfredo","Ali","Alia","Alice","Alicia","Alisa","Alisha","Alison","Alivia","Aliya","Aliyah","Aliza","Alize","Allan","Allen","Allene","Allie","Allison","Ally","Alphonso","Alta","Althea","Alva","Alvah", "Alvena","Alvera","Alverta","Alvina","Alvis","Alyce","Alycia","Alysa","Alysha","Alyson","Alysson","Amalia","Amanda","Amani","Amara","Amari","Amaya","Amber","Ambrose","Amelia","Amelie","Amely","America","Americo","Amie","Amina","Amir","Amira","Amiya","Amos","Amparo","Amy","Amya","Ana","Anabel","Anabelle","Anahi","Anais","Anastacio","Anastasia","Anderson","Andre","Andreane","Andreanne","Andres","Andrew","Andy","Angel","Angela","Angelica","Angelina","Angeline","Angelita","Angelo","Angie","Angus","Anibal","Anika","Anissa","Anita","Aniya","Aniyah","Anjali","Anna","Annabel","Annabell","Annabelle","Annalise","Annamae","Annamarie","Anne","Annetta","Annette","Annie","Ansel","Ansley","Anthony","Antoinette","Antone","Antonetta","Antonette","Antonia","Antonietta","Antonina","Antonio","Antwan","Antwon","Anya","April","Ara","Araceli","Aracely","Arch","Archibald","Ardella","Arden","Ardith","Arely","Ari","Ariane","Arianna","Aric","Ariel","Arielle","Arjun","Arlene","Arlie","Arlo","Armand","Armando","Armani","Arnaldo","Arne","Arno","Arnold","Arnoldo","Arnulfo","Aron","Art","Arthur","Arturo","Arvel","Arvid","Arvilla","Aryanna","Asa","Asha","Ashlee","Ashleigh","Ashley","Ashly","Ashlynn","Ashton","Ashtyn","Asia","Assunta","Astrid","Athena","Aubree","Aubrey","Audie","Audra","Audreanne","Audrey","August","Augusta","Augustine","Augustus","Aurelia","Aurelie","Aurelio","Aurore","Austen","Austin","Austyn","Autumn","Ava","Avery","Avis","Axel","Ayana","Ayden","Ayla","Aylin")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Baby","Bailee","Bailey","Barbara","Barney","Baron","Barrett","Barry","Bart","Bartholome","Barton","Baylee","Beatrice","Beau","Beaulah","Bell","Bella","Belle","Ben","Benedict","Benjamin","Bennett","Bennie","Benny","Benton","Berenice","Bernadette","Bernadine","Bernard","Bernardo","Berneice","Bernhard","Bernice","Bernie","Berniece","Bernita","Berry","Bert","Berta","Bertha","Bertram","Bertrand","Beryl","Bessie","Beth","Bethany","Bethel","Betsy","Bette","Bettie","Betty","Bettye","Beulah","Beverly","Bianka","Bill","Billie","Billy","Birdie","Blair","Blaise","Blake", "Blanca","Blanche","Blaze","Bo","Bobbie","Bobby","Bonita","Bonnie","Boris","Boyd","Brad","Braden","Bradford","Bradley","Bradly","Brady","Braeden","Brain","Brandi","Brando","Brandon","Brandt","Brandy","Brandyn","Brannon","Branson","Brant","Braulio","Braxton","Brayan","Breana","Breanna","Breanne","Brenda","Brendan","Brenden","Brendon","Brenna","Brennan","Brennon","Brent","Bret","Brett","Bria","Brian","Briana","Brianne","Brice","Bridget","Bridgette","Bridie","Brielle","Brigitte","Brionna","Brisa","Britney","Brittany","Brock","Broderick","Brody","Brook","Brooke","Brooklyn","Brooks","Brown","Bruce","Bryana","Bryce","Brycen","Bryon","Buck","Bud","Buddy", "Buford","Bulah","Burdette","Burley","Burnice","Buster")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Cade","Caden","Caesar","Caitlyn","Cale","Caleb","Caleigh","Cali","Calista","Callie","Camden","Cameron","Camila","Camilla","Camille","Camren","Camron","Camryn","Camylle","Candace","Candelario","Candice","Candida","Candido","Cara","Carey","Carissa","Carlee","Carleton","Carley","Carli","Carlie","Carlo","Carlos","Carlotta","Carmel","Carmela","Carmella","Carmelo","Carmen","Carmine","Carol","Carolanne","Carole","Carolina","Caroline","Carolyn","Carolyne","Carrie","Carroll","Carson","Carter","Cary","Casandra","Casey","Casimer","Casimir","Casper","Cassandra","Cassandre","Cassidy","Cassie","Catalina","Caterina","Catharine","Catherine","Cathrine","Cathryn","Cathy","Cayla","Ceasar","Cecelia","Cecil","Cecile","Cecilia","Cedrick","Celestine","Celestino","Celia","Celine","Cesar","Chad","Chadd","Chadrick","Chaim","Chance","Chandler","Chanel","Chanelle","Charity","Charlene", "Charles","Charley","Charlie","Charlotte","Chase","Chasity","Chauncey","Chaya","Chaz","Chelsea","Chelsey","Chelsie","Chesley","Chester","Chet","Cheyanne","Cheyenne","Chloe","Chris","Christ","Christa","Christelle","Christian","Christiana","Christina","Christine","Christop","Christophe","Christopher","Christy","Chyna","Ciara","Cicero","Cielo","Cierra","Cindy","Citlalli","Clair","Claire","Clara","Clarabelle","Clare","Clarissa","Clark","Claud","Claude","Claudia","Claudie","Claudine","Clay","Clemens","Clement","Clementina", "Clementine","Clemmie","Cleo","Cleora","Cleta","Cletus","Cleve","Cleveland","Clifford","Clifton","Clint","Clinton","Clotilde","Clovis","Cloyd","Clyde","Coby","Cody","Colby","Cole","Coleman","Colin","Colleen","Collin","Colt","Colten","Colton","Columbus","Concepcion","Conner","Connie","Connor","Conor","Conrad","Constance","Constantin","Consuelo","Cooper","Cora","Coralie","Corbin","Cordelia","Cordell","Cordia","Cordie","Corene","Corine","Cornelius","Cornell","Corrine","Cortez","Cortney","Cory","Coty","Courtney","Coy","Craig","Crawford","Creola","Cristal","Cristian","Cristina","Cristobal","Cristopher","Cruz","Crystal","Crystel","Cullen","Curt","Curtis","Cydney","Cynthia","Cyril","Cyrus")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Dagmar","Dahlia","Daija","Daisha","Daisy","Dakota","Dale","Dallas","Dallin","Dalton","Damaris","Dameon","Damian","Damien","Damion","Damon","Dan","Dana","Dandre","Dane","D’angelo","Dangelo","Danial","Daniela","Daniella","Danielle","Danika","Dannie","Danny","Dante","Danyka","Daphne","Daphnee","Daphney","Darby","Daren","Darian","Dariana","Darien","Dario","Darion","Darius","Darlene","Daron","Darrel","Darrell","Darren","Darrick","Darrin","Darrion","Darron","Darryl","Darwin","Daryl","Dashawn","Dasia","Dave","David","Davin","Davion","Davon","Davonte","Dawn","Dawson","Dax","Dayana","Dayna","Dayne","Dayton","Dean","Deangelo","Deanna","Deborah","Declan","Dedric","Dedrick","Dee","Deion","Deja","Dejah","Dejon","Dejuan","Delaney","Delbert","Delfina","Delia","Delilah","Dell","Della","Delmer","Delores","Delpha","Delphia","Delphine","Delta","Demarco","Demarcus","Demario","Demetris","Demetrius","Demond","Dena","Denis","Dennis","Deon","Deondre","Deontae","Deonte","Dereck","Derek","Derick","Deron","Derrick","Deshaun","Deshawn","Desiree","Desmond","Dessie","Destany","Destin","Destinee","Destiney","Destini","Destiny","Devan","Devante","Deven","Devin","Devon","Devonte","Devyn","Dewayne","Dewitt","Dexter","Diamond","Diana","Dianna","Diego","Dillan","Dillon","Dimitri","Dina","Dino","Dion","Dixie","Dock","Dolly","Dolores","Domenic","Domenica","Domenick","Domenico","Domingo","Dominic","Dominique","Don","Donald","Donato","Donavon","Donna","Donnell","Donnie","Donny","Dora","Dorcas","Dorian","Doris","Dorothea","Dorothy","Dorris","Dortha","Dorthy","Doug","Douglas","Dovie","Doyle","Drake","Drew","Duane","Dudley","Dulce","Duncan","Durward","Dustin","Dusty","Dwight","Dylan")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Earl","Earlene","Earline","Earnest","Earnestine","Easter","Easton","Ebba","Ebony","Ed","Eda","Edd","Eddie","Eden","Edgar","Edgardo","Edison","Edmond","Edmund","Edna","Eduardo","Edward","Edwardo","Edwin","Edwina","Edyth","Edythe","Effie","Efrain","Efren","Eileen","Einar","Eino","Eladio","Elaina","Elbert","Elda","Eldon","Eldora","Eldred","Eldridge","Eleanora","Eleanore","Eleazar","Electa","Elena","Elenor","Elenora","Eleonore","Elfrieda","Eli","Elian","Eliane","Elias","Eliezer","Elijah","Elinor","Elinore","Elisa","Elisabeth","Elise","Eliseo","Elisha","Elissa","Eliza","Elizabeth","Ella","Ellen","Ellie","Elliot","Elliott","Ellis","Ellsworth","Elmer","Elmira","Elmo","Elmore","Elna","Elnora","Elody","Eloisa","Eloise","Elouise","Eloy","Elroy","Elsa","Else","Elsie","Elta","Elton","Elva","Elvera","Elvie","Elvis","Elwin","Elwyn","Elyse","Elyssa","Elza","Emanuel","Emelia","Emelie","Emely","Emerald","Emerson","Emery","Emie","Emil","Emile","Emilia","Emiliano","Emilie","Emilio","Emily","Emma","Emmalee","Emmanuel","Emmanuelle","Emmet","Emmett","Emmie","Emmitt","Emmy","Emory","Ena","Enid","Enoch","Enola","Enos","Enrico","Enrique","Ephraim","Era","Eriberto","Eric","Erica","Erich","Erick","Ericka","Erik","Erika","Erin","Erling","Erna","Ernest","Ernestina","Ernestine","Ernesto","Ernie","Ervin","Erwin","Eryn","Esmeralda","Esperanza","Esta")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Esteban","Estefania","Estel","Estell","Estella","Estelle","Estevan","Esther","Estrella","Etha","Ethan","Ethel","Ethelyn","Ethyl","Ettie","Eudora","Eugene","Eugenia","Eula","Eulah","Eulalia","Euna","Eunice","Eusebio","Eva","Evalyn","Evan","Evangeline","Evans","Eve","Eveline","Evelyn","Everardo","Everett","Everette","Evert","Evie","Ewald","Ewell","Ezekiel","Ezequiel","Ezra","Fabian","Fabiola","Fae","Fannie","Fanny","Fatima","Faustino","Fausto","Favian","Fay","Faye","Federico","Felicia","Felicita","Felicity","Felipa","Felipe","Felix","Felton","Fermin","Fern","Fernando","Ferne","Fidel","Filiberto","Filomena","Finn","Fiona","Flavie","Flavio","Fleta","Fletcher","Flo","Florence","Florencio","Florian","Florida","Florine","Flossie","Floy","Floyd","Ford","Forest","Forrest","Foster","Frances","Francesca","Francesco","Francis","Francisca","Francisco","Franco","Frank","Frankie","Franz","Fred","Freda","Freddie","Freddy","Frederic","Frederick","Frederik","Frederique","Fredrick","Fredy","Freeda","Freeman","Freida","Frida","Frieda","Friedrich","Fritz","Furman")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Gabe","Gabriel","Gabriella","Gabrielle","Gaetano","Gage","Gail","Gardner","Garett","Garfield","Garland","Garnet","Garnett","Garret","Garrett","Garrick","Garrison","Garry","Garth","Gaston","Gavin","Gay","Gayle","Gaylord","Gene","General","Genesis","Genevieve","Gennaro","Genoveva","Geo","Geoffrey","George","Georgette","Georgiana","Georgianna","Geovanni","Geovanny","Geovany","Gerald","Geraldine","Gerard","Gerardo","Gerda","Gerhard","Germaine","German","Gerry","Gerson","Gertrude","Gia","Gianni","Gideon","Gilbert","Gilberto","Gilda","Giles","Gillian","Gina","Gino","Giovani","Giovanna","Giovanni","Giovanny","Gisselle","Giuseppe","Gladyce","Gladys","Glen","Glenda","Glenna","Glennie","Gloria","Godfrey","Golda","Golden","Gonzalo","Gordon","Grace","Gracie","Graciela","Grady","Graham","Grant","Granville","Grayce","Grayson","Green","Greg","Gregg","Gregoria","Gregorio","Gregory","Greta","Gretchen","Greyson","Griffin","Grover","Guadalupe","Gudrun","Guido","Guillermo","Guiseppe","Gunnar","Gunner","Gus","Gussie","Gust","Gustave","Guy","Gwen","Gwendolyn","Hadley","Hailee","Hailey","Hailie","Hal","Haleigh","Haley","Halie","Halle","Hallie","Hank","Hanna","Hannah","Hans")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(),"Hardy","Harley","Harmon","Harmony","Harold","Harrison","Harry","Harvey","Haskell","Hassan","Hassie","Hattie","Haven","Hayden","Haylee","Hayley","Haylie","Hazel","Hazle","Heath","Heather","Heaven","Heber","Hector","Heidi","Helen","Helena","Helene","Helga","Hellen","Helmer","Heloise","Henderson","Henri","Henriette","Henry","Herbert","Herman","Hermann","Hermina","Herminia","Herminio","Hershel","Herta","Hertha","Hester","Hettie","Hilario","Hilbert","Hilda","Hildegard","Hillard","Hillary","Hilma","Hilton","Hipolito","Hiram","Hobart","Holden","Hollie","Hollis","Holly","Hope","Horace","Horacio","Hortense","Hosea","Houston","Howard","Howell","Hoyt","Hubert","Hudson","Hugh","Hulda","Humberto","Hunter","Hyman","Ian","Ibrahim","Icie","Ida","Idell","Idella","Ignacio","Ignatius","Ike","Ila","Ilene","Iliana","Ima","Imani","Imelda","Immanuel","Imogene","Ines","Irma","Irving","Irwin","Isaac","Isabel","Isabell","Isabella","Isabelle","Isac","Isadore","Isai","Isaiah","Isaias","Isidro","Ismael","Isobel","Isom","Israel","Issac","Itzel","Iva","Ivah","Ivory","Ivy","Izabella","Izaiah")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Jabari","Jace","Jacey","Jacinthe","Jacinto","Jack","Jackeline","Jackie","Jacklyn","Jackson","Jacky","Jaclyn","Jacquelyn","Jacques","Jacynthe","Jada","Jade","Jaden","Jadon","Jadyn","Jaeden","Jaida","Jaiden","Jailyn","Jaime","Jairo","Jakayla","Jake","Jakob","Jaleel","Jalen","Jalon","Jalyn","Jamaal","Jamal","Jamar","Jamarcus","Jamel","Jameson","Jamey","Jamie","Jamil","Jamir","Jamison","Jammie","Jan","Jana","Janae","Jane","Janelle","Janessa","Janet","Janice","Janick","Janie","Janis","Janiya","Jannie","Jany","Jaquan","Jaquelin","Jaqueline","Jared","Jaren","Jarod","Jaron","Jarred","Jarrell","Jarret","Jarrett","Jarrod","Jarvis","Jasen","Jasmin","Jason","Jasper","Jaunita","Javier","Javon","Javonte","Jay","Jayce","Jaycee","Jayda","Jayde","Jayden","Jaydon","Jaylan","Jaylen","Jaylin","Jaylon","Jayme","Jayne","Jayson","Jazlyn","Jazmin","Jazmyn","Jazmyne","Jean","Jeanette","Jeanie","Jeanne","Jed","Jedediah","Jedidiah","Jeff","Jefferey","Jeffery","Jeffrey","Jeffry","Jena","Jenifer","Jennie","Jennifer","Jennings","Jennyfer","Jensen","Jerad","Jerald","Jeramie","Jeramy","Jerel","Jeremie","Jeremy","Jermain","Jermaine","Jermey","Jerod","Jerome","Jeromy","Jerrell","Jerrod","Jerrold","Jerry","Jess","Jesse","Jessica","Jessie","Jessika","Jessy","Jessyca","Jesus","Jett","Jettie","Jevon","Jewel","Jewell","Jillian","Jimmie","Jimmy","Jo","Joan","Joana","Joanie","Joanne","Joannie","Joanny","Joany","Joaquin","Jocelyn","Jodie","Jody","Joe","Joel","Joelle","Joesph","Joey","Johan","Johann","Johanna","Johathan","John","Johnathan","Johnathon","Johnnie","Johnny","Johnpaul","Johnson","Jolie","Jon","Jonas","Jonatan","Jonathan","Jonathon","Jordan","Jordane","Jordi","Jordon","Jordy","Jordyn","Jorge","Jose","Josefa","Josefina","Joseph","Josephine","Josh","Joshua","Joshuah","Josiah","Josiane","Josianne","Josie","Josue","Jovan","Jovani","Jovanny","Jovany","Joy","Joyce","Juana","Juanita","Judah","Judd","Jude","Judge","Judson","Judy","Jules","Julia","Julian","Juliana","Julianne","Julie","Julien","Juliet","Julio","Julius","June","Junior","Junius","Justen","Justice","Justina","Justine","Juston","Justus","Justyn","Juvenal","Juwan")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Kacey","Kaci","Kacie","Kade","Kaden","Kadin","Kaela","Kaelyn","Kaia","Kailee","Kailey","Kailyn","Kaitlin","Kaitlyn","Kale","Kaleb","Kaleigh","Kaley","Kali","Kallie","Kameron","Kamille","Kamren","Kamron","Kamryn","Kane","Kara","Kareem","Karelle","Karen","Kari","Kariane","Karianne","Karina","Karine","Karl","Karlee","Karley","Karli","Karlie","Karolann","Karson","Kasandra","Kasey","Kassandra","Katarina","Katelin","Katelyn","Katelynn","Katharina","Katherine","Katheryn","Kathleen","Kathlyn","Kathryn","Kathryne","Katlyn","Katlynn","Katrina","Katrine","Kattie","Kavon","Kay","Kaya","Kaycee","Kayden","Kayla","Kaylah","Kaylee","Kayleigh","Kayley","Kayli","Kaylie","Kaylin","Keagan","Keanu","Keara","Keaton","Keegan","Keeley","Keely","Keenan","Keira","Keith","Kellen","Kelley","Kelli","Kellie","Kelly","Kelsi","Kelsie","Kelton","Kelvin","Ken","Kendall","Kendra","Kendrick","Kenna","Kennedi","Kennedy","Kenneth","Kennith","Kenny","Kenton","Kenya","Kenyatta","Kenyon","Keon","Keshaun","Keshawn","Keven","Kevin","Kevon","Keyon","Keyshawn","Khalid","Khalil","Kian","Kiana","Kianna","Kiara","Kiarra","Kiel","Kiera","Kieran","Kiley","Kim","Kimberly","King","Kip","Kira","Kirk","Kirsten","Kirstin","Kitty","Kobe","Koby","Kody","Kolby","Kole","Korbin","Korey","Kory","Kraig","Kris","Krista","Kristian","Kristin","Kristina","Kristofer","Kristoffer","Kristopher","Kristy","Krystal","Krystel","Krystina","Kurt","Kurtis","Kyla","Kyle","Kylee","Kyleigh","Kyler","Kylie","Kyra")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Lacey","Lacy","Ladarius","Lafayette","Laila","Laisha","Lamar","Lambert","Lamont","Lance","Landen","Lane","Laney","Larissa","Laron","Larry","Larue","Laura","Laurel","Lauren","Laurence","Lauretta","Lauriane","Laurianne","Laurie","Laurine","Laury","Lauryn","Lavada","Lavern","Laverna","Laverne","Lavina","Lavinia","Lavon","Lavonne","Lawrence","Lawson","Layla","Layne","Lazaro", "Lea", "Leann", "Leanna", "Leanne", "Leatha","Leda","Lee","Leif","Leila","Leilani","Lela","Lelah","Leland","Lelia","Lempi","Lemuel","Lenna","Lennie","Lenny","Lenora","Lenore","Leo","Leola","Leon","Leonard","Leonardo","Leone","Leonel","Leonie","Leonor","Leonora","Leopold","Leopoldo","Leora","Lera","Lesley","Leslie","Lesly","Lessie","Lester","Leta","Letha","Letitia","Levi","Lew","Lewis","Lexi","Lexie","Lexus","Lia","Liam","Liana","Libbie","Libby","Lila","Lilian","Liliana","Liliane","Lilla","Lillian","Lilliana","Lillie","Lilly","Lily","Lilyan","Lina","Lincoln","Linda","Lindsay","Lindsey","Linnea","Linnie","Linwood","Lionel","Lisa","Lisandro","Lisette","Litzy","Liza","Lizeth","Lizzie","Llewellyn","Lloyd","Logan","Lois","Lola","Lolita","Loma","Lon","London","Lonie","Lonnie","Lonny","Lonzo","Lora","Loraine","Loren","Lorena","Lorenz","Lorenza","Lorenzo","Lori","Lorine","Lorna","Lottie","Lou","Louie","Louisa","Lourdes","Louvenia","Lowell","Loy","Loyal","Loyce","Lucas","Luciano","Lucie","Lucienne","Lucile","Lucinda","Lucio","Lucious","Lucius","Lucy","Ludie","Ludwig","Lue","Luella","Luigi","Luis","Luisa","Lukas","Lula","Lulu","Luna","Lupe","Lura","Lurline","Luther","Luz","Lyda","Lydia","Lyla","Lynn","Lyric","Lysanne")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Mabel","Mabelle","Mable","Mac","Macey","Maci","Macie","Mack","Mackenzie","Macy","Madaline","Madalyn","Maddison","Madeline","Madelyn","Madelynn","Madge","Madie","Madilyn","Madisen","Madison","Madisyn","Madonna","Madyson","Mae","Maegan","Maeve","Mafalda","Magali","Magdalen","Magdalena","Maggie","Magnolia","Magnus","Maia","Maida","Maiya","Major","Makayla","Makenna","Makenzie","Malachi","Malcolm","Malika","Malinda","Mallie","Mallory","Malvina","Mandy","Manley","Manuel","Manuela","Mara","Marc","Marcel","Marcelina","Marcelino","Marcella","Marcelle","Marcellus","Marcelo","Marcia","Marco","Marcos","Marcus","Margaret","Margarete","Margarett","Margaretta","Margarette","Margarita","Marge","Margie","Margot","Margret","Marguerite","Maria","Mariah","Mariam","Marian","Mariana","Mariane","Marianna","Marianne","Mariano","Maribel","Marie","Mariela","Marielle","Marietta","Marilie","Marilou","Marilyne","Marina","Mario","Marion","Marisa","Marisol","Maritza","Marjolaine","Marjorie","Marjory","Mark","Markus","Marlee","Marlen","Marlene","Marley","Marlin","Marlon","Marques","Marquis","Marquise","Marshall","Marta","Martin","Martina","Martine","Marty","Marvin","Mary","Maryam","Maryjane","Maryse","Mason","Mateo","Mathew")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Mathias","Mathilde","Matilda","Matilde","Matt","Matteo","Mattie","Maud","Maude","Maudie","Maureen","Maurice","Mauricio","Maurine","Maverick","Mavis","Max","Maxie","Maxime","Maximilian","Maximillia","Maximillian","Maximo","Maximus","Maxine","Maxwell","May","Maya","Maybell","Maybelle","Maye","Maymie","Maynard","Mayra","Mazie","Mckayla","Mckenna","Mckenzie","Meagan","Meaghan","Meda","Megane","Meggie","Meghan","Mekhi","Melany","Melba","Melisa","Melissa","Mellie","Melody","Melvin","Melvina","Melyna","Melyssa","Mercedes","Meredith","Merl","Merle","Merlin","Merritt","Mertie","Mervin","Meta","Mia","Micaela","Micah","Michael","Michaela","Michale","Micheal","Michel","Michele","Michelle","Miguel","Mikayla","Mike","Mikel","Milan","Miles","Milford","Miller","Millie","Milo","Milton","Mina","Minerva","Minnie","Miracle","Mireille","Mireya","Misael","Missouri","Misty","Mitchel","Mitchell","Mittie","Modesta","Modesto","Mohamed","Mohammad","Mohammed","Moises","Mollie","Molly","Mona","Monica","Monique","Monroe","Monserrat","Monserrate","Montana","Monte","Monty","Morgan","Moriah","Morris","Mortimer","Morton","Mose","Moses","Moshe","Mossie","Mozell","Mozelle","Muhammad","Muriel","Murl","Murphy","Murray","Mustafa","Mya","Myah","Mylene","Myles","Myra","Myriam","Myrl","Myrna","Myron","Myrtice","Myrtie","Myrtis","Myrtle")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Nadia","Nakia","Name","Nannie","Naomi","Naomie","Napoleon","Narciso","Nash","Nasir","Nat","Natalia","Natalie","Natasha","Nathan","Nathanael","Nathanial","Nathaniel","Nathen","Nayeli","Neal","Ned","Nedra","Neha","Neil","Nelda","Nella","Nelle","Nellie","Nels","Nelson","Neoma","Nestor","Nettie","Neva","Newell","Newton","Nia","Nicholas","Nicholaus","Nichole","Nick","Nicklaus","Nickolas","Nico","Nicola","Nicolas","Nicole","Nicolette","Nigel","Nikita","Nikki","Nikko","Niko","Nikolas","Nils","Nina","Noah","Noble","Noe","Noel","Noelia","Noemi","Noemie","Noemy","Nola","Nolan","Nona","Nora","Norbert","Norberto","Norene","Norma","Norris","Norval","Norwood","Nova","Novella","Nya","Nyah","Nyasia","Obie","Oceane","Ocie","Octavia","Oda","Odell","Odessa","Odie","Ofelia","Okey","Ola","Olaf","Ole","Olen","Oleta","Olga","Olin","Oliver","Ollie","Oma","Omari","Omer","Ona","Onie","Opal","Ophelia","Ora","Oral","Oran","Oren","Orie","Orin","Orion","Orland","Orlando","Orlo","Orpha","Orrin","Orval","Orville","Osbaldo","Osborne","Oscar","Osvaldo","Oswald","Oswaldo","Otha","Otho","Otilia","Otis","Ottilie","Ottis","Otto","Ova","Owen","Ozella")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Pablo","Paige","Palma","Pamela","Pansy","Paolo","Paris","Parker","Pascale","Pasquale","Pat","Patience","Patricia","Patrick","Patsy","Pattie","Paul","Paula","Pauline","Paxton","Payton","Pearl","Pearlie","Pearline","Pedro","Peggie","Penelope","Percival","Percy","Perry","Pete","Peter","Petra","Peyton","Philip","Phoebe","Phyllis","Pierce","Pierre","Pietro","Pink","Pinkie","Piper","Polly","Porter","Precious","Presley","Preston","Price","Prince","Princess","Priscilla","Providenci","Prudence","Queen","Queenie","Quentin","Quincy","Quinn","Quinten","Quinton","Rachael","Rachel","Rachelle","Rae","Raegan","Rafael","Rafaela","Raheem","Rahsaan","Rahul","Raina","Raleigh","Ralph","Ramiro","Ramon","Ramona","Randal","Randall","Randi","Randy","Ransom","Raoul","Raphael","Raphaelle","Raquel","Rashad","Rashawn","Rasheed","Raul","Raven","Ray","Raymond","Raymundo","Reagan","Reanna","Reba","Rebeca","Rebecca","Rebeka","Rebekah","Reece","Reed","Reese","Regan","Reggie","Reginald","Reid","Reilly","Reina","Reinhold","Remington","Rene","Renee","Ressie","Reta","Retha","Retta","Reuben","Reva","Rex","Rey","Reyes","Reymundo","Reyna","Reynold","Rhea","Rhett","Rhianna","Rhiannon","Rhoda","Ricardo","Richard","Richie","Richmond","Rick","Rickey","Rickie","Ricky","Rico","Rigoberto","Riley","Rita","River","Robb","Robbie","Robert","Roberta","Roberto","Robin","Robyn","Rocio","Rocky","Rod","Roderick","Rodger","Rodolfo","Rodrick","Rodrigo","Roel","Rogelio","Roger","Rogers","Rolando","Rollin","Roma","Romaine","Roman","Ron","Ronaldo","Ronny","Roosevelt","Rory","Rosa","Rosalee","Rosalia","Rosalind","Rosalinda","Rosalyn","Rosamond","Rosanna","Rosario","Roscoe","Rose","Rosella","Roselyn","Rosemarie","Rosemary","Rosendo","Rosetta","Rosie","Rosina","Roslyn","Ross","Rossie","Rowan","Rowena","Rowland","Roxane","Roxanne","Roy","Royal","Royce","Rozella","Ruben","Rubie","Ruby","Rubye","Rudolph","Rudy","Rupert","Russ","Russel","Russell","Rusty","Ruth","Ruthe","Ruthie","Ryan","Ryann","Ryder","Rylan","Rylee","Ryleigh","Ryley")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Sabina","Sabrina","Sabryna","Sadie","Sadye","Sage","Saige","Sallie","Sally","Salma","Salvador","Salvatore","Sam","Samanta","Samantha","Samara","Samir","Sammie","Sammy","Samson","Sandra","Sandrine","Sandy","Sanford","Santa","Santiago","Santina","Santino","Santos","Sarah","Sarai","Sarina","Sasha","Saul","Savanah","Savanna","Savannah","Savion","Scarlett","Schuyler","Scot","Scottie","Scotty","Seamus","Sean","Sebastian","Sedrick","Selena","Selina","Selmer","Serena","Serenity","Seth","Shad","Shaina","Shakira","Shana","Shane","Shanel","Shanelle","Shania","Shanie","Shaniya","Shanna","Shannon","Shanny","Shanon","Shany","Sharon","Shaun","Shawn","Shawna","Shaylee","Shayna","Shayne","Shea","Sheila","Sheldon","Shemar","Sheridan","Sherman","Sherwood","Shirley","Shyann","Shyanne","Sibyl","Sid","Sidney","Sienna","Sierra","Sigmund","Sigrid","Sigurd","Silas","Sim","Simeon","Simone","Sincere","Sister","Skye","Skyla","Skylar","Sofia","Soledad","Solon","Sonia","Sonny","Sonya","Sophia","Sophie","Spencer","Stacey","Stacy","Stan","Stanford","Stanley","Stanton","Stefan","Stefanie","Stella","Stephan","Stephania","Stephanie","Stephany","Stephen","Stephon","Sterling","Steve","Stevie","Stewart","Stone","Stuart","Summer","Sunny","Susan","Susana","Susanna","Susie","Suzanne","Sven","Syble","Sydnee","Sydney","Sydni","Sydnie","Sylvan","Sylvester","Sylvia")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(), "Tabitha","Tad","Talia","Talon","Tamara","Tamia","Tania","Tanner","Tanya","Tara","Taryn","Tate","Tatum","Tatyana","Taurean","Tavares","Taya","Taylor","Teagan","Ted","Telly","Terence","Teresa","Terrance","Terrell","Terrence","Terrill","Terry","Tess","Tessie","Tevin","Thad","Thaddeus","Thalia","Thea","Thelma","Theo","Theodora","Theodore","Theresa","Therese","Theresia","Theron","Thomas","Thora","Thurman","Tia","Tiana","Tianna","Tiara","Tierra","Tiffany","Tillman","Timmothy","Timmy","Timothy","Tina","Tito","Titus","Tobin","Toby","Tod","Tom","Tomas","Tomasa","Tommie","Toney","Toni","Tony","Torey","Torrance","Torrey","Toy","Trace","Tracey","Tracy","Travis","Travon","Tre","Tremaine","Tremayne","Trent","Trenton","Tressa","Tressie","Treva","Trever","Trevion","Trevor","Trey","Trinity","Trisha","Tristian","Tristin","Triston","Troy","Trudie","Trycia","Trystan","Turner","Twila","Tyler","Tyra","Tyree","Tyreek","Tyrel","Tyrell","Tyrese")
fakeData["en"]["firstName"].insert(fakeData["en"]["firstName"].maxIndex(),"Tyrique","Tyshawn","Tyson","Ubaldo","Ulices","Ulises","Una","Unique","Urban","Uriah","Uriel","Ursula","Vada","Valentin","Valentina","Valentine","Valerie","Vallie","Van","Vance","Vanessa","Vaughn","Veda","Velda","Vella","Velma","Velva","Vena","Verda","Verdie","Vergie","Verla","Verlie","Vern","Verna","Verner","Vernice","Vernie","Vernon","Verona","Veronica","Vesta","Vicenta","Vicente","Vickie","Vicky","Victor","Victoria","Vida","Vidal","Vilma","Vince","Vincent","Vincenza","Vincenzo","Vinnie","Viola","Violet","Violette","Virgie","Virgil","Virginia","Virginie","Vita","Vito","Viva","Vivian","Viviane","Vivianne","Vivien","Vivienne","Vladimir","Wade","Waino","Waldo","Walker","Wallace","Walter","Walton","Wanda","Ward","Warren","Watson","Wava","Waylon","Wayne","Webster","Weldon","Wellington","Wendell","Wendy","Werner","Westley","Weston","Whitney","Wilber","Wilbert","Wilburn","Wiley","Wilford","Wilfred","Wilfredo","Wilfrid","Wilhelm","Wilhelmine","Will","Willa","Willard","William","Willie","Willis","Willow","Willy","Wilma","Wilmer","Wilson","Wilton","Winfield","Winifred","Winnifred","Winona","Winston","Woodrow","Wyatt","Wyman","Xander","Xavier","Xzavier","Yadira","Yasmeen","Yasmin","Yasmine","Yazmin","Yesenia","Yessenia","Yolanda","Yoshiko","Yvette","Yvonne","Zachariah","Zachary","Zachery","Zack","Zackary","Zackery","Zakary","Zander","Zane","Zaria","Zechariah","Zelda","Zella","Zelma","Zena","Zetta","Zion","Zita","Zoe","Zoey","Zoie","Zoila","Zola","Zora","Zula")

fakeData["en"]["lastName"] := array("Abbott", "Abernathy","Abshire","Adams","Altenwerth","Anderson","Ankunding","Armstrong","Auer","Aufderhar","Bahringer","Bailey","Balistreri","Barrows","Bartell","Bartoletti","Barton","Bashirian","Batz","Bauch","Baumbach","Bayer","Beahan","Beatty","Bechtelar","Becker","Bednar","Beer","Beier","Berge","Bergnaum","Bergstrom","Bernhard","Bernier","Bins","Blanda","Blick","Block","Bode","Boehm","Bogan","Bogisich","Borer","Bosco","Botsford","Boyer","Boyle","Bradtke","Brakus","Braun","Breitenberg","Brekke","Brown","Bruen","Buckridge","Carroll","Carter","Cartwright","Casper","Cassin","Champlin","Christiansen","Cole","Collier","Collins","Conn","Connelly","Conroy","Considine","Corkery","Cormier","Corwin","Cremin","Crist","Crona","Cronin","Crooks","Cruickshank","Cummerata","Cummings","Dach","D’Amore","Daniel","Dare","Daugherty","Davis","Deckow","Denesik","Dibbert","Dickens","Dicki","Dickinson","Dietrich","Donnelly","Dooley","Douglas","Doyle","DuBuque","Durgan","Ebert","Effertz","Eichmann","Emard","Emmerich","Erdman","Ernser","Fadel","Fahey","Farrell","Fay","Feeney","Feest","Feil","Ferry","Fisher","Flatley","Frami","Franecki","Friesen","Fritsch","Funk","Gaylord","Gerhold","Gerlach","Gibson","Gislason","Gleason","Gleichner","Glover","Goldner","Goodwin","Gorczany","Gottlieb","Goyette","Grady","Graham","Grant","Green","Greenfelder","Greenholt","Grimes","Gulgowski","Gusikowski","Gutkowski","Gutmann","Haag","Hackett","Hagenes","Hahn","Haley","Halvorson","Hamill","Hammes","Hand","Hane","Hansen","Harber","Harris","Hartmann","Harvey","Hauck","Hayes","Heaney","Heathcote","Hegmann","Heidenreich","Heller","Herman","Hermann","Hermiston","Herzog","Hessel","Hettinger","Hickle","Hilll","Hills","Hilpert","Hintz","Hirthe","Hodkiewicz")
fakeData["en"]["lastName"].insert(fakeData["en"]["lastName"].maxIndex(),"Hoeger","Homenick","Hoppe","Howe","Howell","Hudson","Huel","Huels","Hyatt","Jacobi","Jacobs","Jacobson","Jakubowski","Jaskolski","Jast","Jenkins","Jerde","Jewess","Johns","Johnson","Johnston","Jones","Kassulke","Kautzer","Keebler","Keeling","Kemmer","Kerluke","Kertzmann","Kessler","Kiehn","Kihn","Kilback","King","Kirlin","Klein","Kling","Klocko","Koch","Koelpin","Koepp","Kohler","Konopelski","Koss","Kovacek","Kozey","Krajcik","Kreiger","Kris","Kshlerin","Kub","Kuhic","Kuhlman","Kuhn","Kulas","Kunde","Kunze","Kuphal","Kutch","Kuvalis","Labadie","Lakin","Lang","Langosh","Langworth","Larkin","Larson","Leannon","Lebsack","Ledner","Leffler","Legros","Lehner","Lemke","Lesch","Leuschke","Lind","Lindgren","Littel","Little","Lockman","Lowe","Lubowitz","Lueilwitz","Luettgen","Lynch","Macejkovic","Maggio","Mann","Mante","Marks","Marquardt","Marvin","Mayer","Mayert","McClure","McCullough","McDermott","McGlynn","McKenzie","McLaughlin","Medhurst","Mertz","Metz","Miller","Mills","Mitchell","Moen","Mohr","Monahan","Moore","Morar","Morissette","Mosciski","Mraz","Mueller","Muller","Murazik","Murphy","Murray","Nader","Nicolas","Nienow","Nikolaus","Nitzsche","Nolan","Oberbrunner","O’Connell","O’Conner","O’Hara","O’Keefe","O’Kon","Okuneva","Olson","Ondricka","O’Reilly","Orn","Ortiz","Osinski","Pacocha","Padberg","Pagac","Parisian","Parker","Paucek","Pfannerstill","Pfeffer","Pollich","Pouros","Powlowski","Predovic","Price","Prohaska","Prosacco","Purdy")
fakeData["en"]["lastName"].insert(fakeData["en"]["lastName"].maxIndex(),"Quigley","Quitzon","Rath","Ratke","Rau","Raynor","Reichel","Reichert","Reilly","Reinger","Rempel","Renner","Reynolds","Rice","Rippin","Ritchie","Robel","Roberts","Rodriguez","Rogahn","Rohan","Rolfson","Romaguera","Roob","Rosenbaum","Rowe","Ruecker","Runolfsdottir","Runolfsson","Runte","Russel","Rutherford","Ryan","Sanford","Satterfield","Sauer","Sawayn","Schaden","Schaefer","Schamberger","Schiller","Schimmel","Schinner","Schmeler","Schmidt","Schmitt","Schneider","Schoen","Schowalter","Schroeder","Schulist","Schultz","Schumm","Schuppe","Schuster","Senger","Shanahan","Shields","Simonis","Sipes","Skiles","Smith","Smitham","Spencer","Spinka","Sporer","Stamm","Stanton","Stark","Stehr","Steuber","Stiedemann","Stokes","Stoltenberg","Stracke","Streich","Stroman","Strosin","Swaniawski","Swift","Terry","Thiel","Thompson","Tillman","Torp","Torphy","Towne","Toy","Trantow","Tremblay","Treutel","Tromp","Turcotte","Turner","Ullrich","Upton","Vandervort","Veum","Volkman","Von","VonRueden","Waelchi","Walker","Walsh","Walter","Ward","Waters","Watsica","Weber","Wehner","Weimann","Weissnat","Welch","West","White","Wiegand","Wilderman","Wilkinson","Will","Williamson","Willms","Windler","Wintheiser","Wisoky","Wisozk","Witting","Wiza","Wolf","Wolff","Wuckert","Wunsch","Wyman","Yost","Yundt","Zboncak","Zemlak","Ziemann","Zieme","Zulauf")

fakeData["en"]["namePrefix"] := array("Mr.","Mrs.","Ms.","Miss","Dr.")
fakeData["en"]["nameSuffix"] := array("Jr.","Sr.","I","II","III","IV","V","MD","DDS","PhD","DVM")

//--------dates
fakeData["ru"]["MMMM"] := array("Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь")
fakeData["ru"]["MMM"] := array("Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сент", "Окт", "Ноя", "Дек")
fakeData["en"]["MMMM"] := array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
fakeData["en"]["MMM"] := array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
fakeData["en"]["MM"] := array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")
fakeData["en"]["m"] := func("fakeDataM")
fakeDataM(){ 
return randNum(1,12)
}

fakeData["en"]["dddd"] := array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
fakeData["ru"]["dddd"] := array("Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье")
fakeData["en"]["ddd"] := array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
fakeData["ru"]["ddd"] := array("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс")
fakeData["en"]["dd"] := func("fakeDataDD")
fakeDataDD(){
return randNum(0,3) . randNum(0,9)
}
fakeData["en"]["d"] := array("1", "2")
fakeDataD(){
return randNum(1,31)
}

fakeData["en"]["yyyy"] := func("fakeDataYYYY")
fakeDataYYYY(){
return randNum(1900,2030)
}
fakeData["en"]["yy"] := func("fakeDataYY")
fakeDataYY(){
return lexnum("##")
}
fakeData["en"]["y"] := func("fakeDataY")
fakeDataY(){
return randNum(0,99)
}

fakeData["en"]["hh"] := func("fakeDataHH")
fakeDataHH(){
t := randNum(0,12)
if (t < 10) {
	t := "0" . t
}
return t
}
fakeData["en"]["h"] := func("fakeDataH")
fakeDataH(){
return randNum(0,12)
}
fakeData["en"]["hh24"] := func("fakeDataHH24")
fakeData["ru"]["hh"] := func("fakeDataHH24")
fakeDataHH24(){
t := randNum(0,24)
if (t < 10) {
	t := "0" . t
}
return t
}
fakeData["en"]["h24"] := func("fakeDataH24")
fakeData["ru"]["h"] := func("fakeDataH24")
fakeDataH24(){
return randNum(0,24)
}
fakeData["en"]["mi"] := func("fakeDataSS")
fakeData["en"]["i"] := func("fakeDataS")
fakeData["en"]["ss"] := func("fakeDataSS")
fakeDataSS(){
t := randNum(0,60)
if (t < 10) {
	t := "0" . t
}
return t
}
fakeData["en"]["s"] := func("fakeDataS")
fakeDataS(){
return randNum(0,60)
}
fakeData["en"]["tt"] := func("fakeDataTT")
fakeDataTT(){
return randFrom(array("AM", "PM"))
}
fakeData["en"]["t"] := func("fakeDataT")
fakeDataT(){
return randFrom(array("A", "P"))
}

//------------------------------------------------------Formats
fakeData["ru"]["addressFormats"] := array("{{postcode}}, {{region}} {{regionSuffix}}, {{cityPrefix}} {{city}}, {{streetPrefix}} {{street}}, {{buildingNumber}}")
fakeData["en"]["addressFormats"] := array("{{streetAddress}} {{city}} {{postcode}}")

fakeData["ru"]["streetNameFormats"] := array("{{firstName}} {{streetSuffix}}","{{lastName}} {{streetSuffix}}")
fakeData["en"]["streetNameFormats"] := array("{{firstName}} {{streetSuffix}}","{{lastName}} {{streetSuffix}}")

fakeData["ru"]["streetAddressFormats"] := array("{{buildingNumber}} {{streetName}}","{{buildingNumber}} {{streetName}}","{{secondaryAddress}} {{streetName}}")
fakeData["en"]["streetAddressFormats"] := array("{{buildingNumber}} {{streetName}}")

fakeData["en"]["cityFormats"] := array("{{cityPrefix}} {{firstName}}{{citySuffix}}","{{cityPrefix}} {{firstName}}", "{{firstName}}{{citySuffix}}","{{lastName}}{{citySuffix}}")

fakeData["ru"]["buildingNumber"] := array("##", "###", "#")
fakeData["en"]["buildingNumber"] := array("##", "#")

fakeData["en"]["nameFormats"] := array("{{firstName}} {{lastName}}","{{firstName}} {{lastName}}","{{firstName}} {{lastName}}","{{firstName}} {{lastName}}","{{firstName}} {{lastName}}","{{namePrefix}} {{firstName}} {{lastName}}","{{firstName}} {{lastName}} {{nameSuffix}}","{{namePrefix}} {{firstName}} {{lastName}} {{nameSuffix}}")
fakeData["ru"]["nameFormats"] := array("{{firstName}} {{middleName}} {{lastName}}","{{lastName}} {{firstName}} {{middleName}}","{{firstName}} {{lastName}}","{{lastName}} {{firstName}}")

fakeData["en"]["emailFormats"] := array("{{userName}}@{{domainName}}","{{userName}}@{{freeEmailDomain}}")

fakeData["en"]["userNameFormats"] := array("{{lastName}}.{{firstName}}","{{firstName}}.{{lastName}}", "{{firstName}}##", "?{{lastName}}")

fakeData["en"]["urlFormats"] := array("http://www.{{domainName}}/","http://{{domainName}}/")
fakeData["ru"]["urlFormats"] := array("http://www.{{domainName}}/","http://{{domainName}}/")

fakeData["en"]["dateFormats"] := array("{{yyyy}}-{{mm}}-{{dd}}")
fakeData["ru"]["dateFormats"] := array("{{dd}}.{{mm}}.{{yyyy}}")
fakeData["en"]["timeFormats"] := array("{{HH}}:{{Mi}}:{{SS}} {{TT}}")
fakeData["ru"]["timeFormats"] := array("{{HH24}}:{{Mi}}:{{SS}}")
fakeData["en"]["shortTimeFormats"] := array("{{HH}}:{{Mi}} {{TT}}")
fakeData["ru"]["shortTimeFormats"] := array("{{HH24}}:{{Mi}}")
fakeData["en"]["dateTimeFormats"] := array("{{date}} {{time}}")



//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ FUNCTIONS


//-------------------------------L10N
getLocalsRE(){
	global locals
	res := "("
	length := locals.MaxIndex()
	Loop, %length%
	{
		res .= locals[a_index] . "|"
	}
	res := substr(res, 1, -1) . ")"
	return res
}

//------------------------------------Random generators
alphabetes := { ru : "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", en: "abcdefghijklmnopqrstuvwxyz"}
randNum(a,b){
	Random, res, %a%, %b% ;number to be used as lorem version.
	return res
}
randChar(loc){
	global alphabetes
	if (!loc){
		loc := locals[1]
	}
	alphLen := alphabetes[loc].maxIndex()
	letter := SubStr(alphabetes[loc], randNum(1,alphLen), 1)
	if (randNum(0,1)) {
		StringUpper letter, letter
	}
	return letter
}
randFrom(range){
	len := range.maxIndex()
	index := randNum(1,len)
	;msgBox, ranlen%len% index %i ndex%
	return range[index]
}
//---------------------------------Fill string with letters instead of ? and digits instead of #
lexnum(string){
	numHasMet := false ;is numeric met at least once

	res := ""

	Loop, Parse, string
	{
		if (A_LoopField == "#") {
			if (numHasMet) {
				res .= randNum(0,9)
			} else {
				res .= randNum(1,9)
				numHasMet := true
			}
		} else if (A_LoopField == "?"){
			res .= randChar(local)
		} else {
			res .= A_LoopField
		}
	}
	return res
}


//----------------------------------------------------------------------- Front controller
// Algorithm:
// At first it tests request on taking in keywords.
// If keyword found, it calls makeField, which tries to render keyword with that format
// For example, "phone" → "phoneFormats"
// So, if you want to make new fake entities, just add localized data with neccessary format to fakeData, and add handler to the getFake. It will automatically start working.

getFake(request){ 
	global local 
	if (!RegExMatch(request, getLocalsRE(), local)){
		local := "en"
	}

	;parse request
	reqlen := StrLen(request)

	mult := 1 ;number of times to insert data
	if(!RegExMatch(request, "[0-9]+", mult)){
		mult := 1
	}

	if (RegExMatch(request, "^lorem")){
		clear(reqlen + 2)
		return getLorem(request)
	} else if (RegExMatch(request, "^addr")) {  
		clear(reqlen + 2)  
		return makeField("address", mult)

	} else if (RegExMatch(request, "^адр")) {  
		clear(reqlen + 2)
		local := "ru"
		return makeField("address", mult)

	} else if (RegExMatch(request, "^phone")) {
		clear(reqlen + 2)  
		return makeField("phone", mult)

	} else if (RegExMatch(request, "^тел")) {
		clear(reqlen + 2)  
		local := "ru"
		return makeField("phone", mult)

	} else if (RegExMatch(request, "^(mail|email)")) { 
		clear(reqlen + 2)
		return makeField("email", mult)

	} else if (RegExMatch(request, "^(почт|эл)")) { 
		clear(reqlen + 2)
		local := "ru"
		return makeField("email", mult)

	} else if (RegExMatch(request, "^name")) { 
		clear(reqlen + 2) 
		return makeField("name", mult)

	} else if (RegExMatch(request, "^имя")) { 
		clear(reqlen + 2)
		local := "ru"
		return makeField("name", mult)

	} else if (RegExMatch(request, "^(datetime|dateTime)")) { 
		clear(reqlen + 2)
		return makeField("dateTime", mult)

	} else if (RegExMatch(request, "^date")) {  
		clear(reqlen + 2)
		return makeField("date", mult)

	} else if (RegExMatch(request, "^дата")) {  
		clear(reqlen + 2)
		local := "ru"
		return makeField("date", mult)

	} else if (RegExMatch(request, "^time")) { 
		clear(reqlen + 2) 
		return makeField("time", mult)

	} else if (RegExMatch(request, "^(stime|short\s?time|short\s?Time)")) { 
		clear(reqlen + 2) 
		return makeField("shortTime", mult)

	} else if (RegExMatch(request, "^время")) { 
		clear(reqlen + 2) 
		local := "ru"
		return makeField("time", mult)

	} else if (RegExMatch(request, """[\w\s]+""")) {
		;Custom generator string
		clear(reqlen + 2)
		formatStr := recognizeFormatContent(request)
		;RegExMatch(request, "", mult)
		;makeCustomFormat(formatStr, mult)
		return 
	}
	return false
}
//Returns string inside quotes
recognizeFormatContent(req){
	RegExMatch(req,"", formatStr)
	msgbox %formatstr%
}

//-------------------------------------------------------------Just initial handler of getfake method
rRes := "" ;result of rendering (private thing, do not touch it)
toLowerFlag := false ;Shall we or not to convert rendering to lower case while proccess
makeField(field, mult){
	global local
	global rRes := ""

	;msgbox, fake:%field%

	backupClipboard()

	res := ""

	Loop, %mult% {
		rRes := ""
		res .= renderFormat(field) . "`n"
	}
	;msgBox, result: %res%

	;insert(res)
	;restoreClipboard()

	insertAndRestore(res)

	return true
}
//Custom format
makeCustomFormat(formatStr, mult){
	global local
	global rRes := ""

	msgBox, %formatStr%

	backupClipboard()

	res := ""

	Loop, %mult% {
		rRes := ""
		res .= parseFormat(formatStr)
	}
	;msgBox, %res%

	;clipboard = %res%

	;Send ^v
	;restoreClipboard()

	insertAndRestore(res)

	return true
}


//---------------------------------------------------------------------------------Basic method that renders any passed tpl
renderFormat(field){
	global fakeData
	global toLowerFlag
	global local
	global lastResult := ""
	global rRes

	;MsgBox, renderFormat field:%field% rres:%rRes%

	if (fakeData[local][field]) { 
		if (fakeData[local][field].Name) { ;if field is function - launch it
			value := fakeData[local][field].()
		} else {
			;If there's array of such elements, pick one from range
			value := lexNum(randFrom(fakeData[local][field]))        
		}
		if (toLowerFlag) {
			StringLower, value, value
		}
		rRes .= value
	} else if (fakeData["en"][field]) {
		if (fakeData["en"][field].Name) { ;if field is function - launch it
			value := fakeData["en"][field].()
		} else { 
			;If there"s array of such elements in english, pick one from range
			value := lexNum(randFrom(fakeData["en"][field]))
		}
		if (toLowerFlag) {
			StringLower, value, value
		}
		rRes .= value
	} else { 
		;There could be only format of such element
		field .= "Formats"    
		if (fakeData[local][field]){
			format := randFrom(fakeData[local][field])
			parseFormat(format)
		} else if (fakeData["en"][field]) {
			format := randFrom(fakeData["en"][field])
			parseFormat(format)
		} else {
			Msgbox, Format {{<%field%>}} doesn't exist
		}        
	}
	
	return rRes
}
//----------------format handler
parseFormat(formatStr){    
	RegExMatch(formatStr, "(\{\{[a-zA-Z0-9]+\}\}(?CHandleField)|[-?!#\s,.:;@\/\\\|](?CHandleSpace))" )
}
//----------------used in adr regexp, handles field-found cases 
HandleField(field, pos) {
	global local
	global rRes
	global toLowerFlag

	field := substr(field, 3, -2)

	initialLocale := local
	initialFlag := toLowerFlag
	if (RegExMatch(field, "userName")){ ;username should always be in ascii
		local := "en"
		toLowerFlag := true
	}

	renderFormat(field)

	local := initialLocale
	toLowerFlag := initialFlag

	return 1
	}

HandleSpace(spacer, pos){
	global local
	global rRes
	rRes .= lexnum(spacer)
	return 1
}


//-------------------------------- Lorem ipsum
getLorem(request){
	global fakeData
	global local
	global lastResult := ""

	lorem := fakeData[local]["lorem"]

	maxLeNumber := lorem.maxIndex()

	leNumber := randNum( 1, maxLeNumber ) ;number to be used as lorem version. 
	
	reqlen := StrLen(request)

	backupClipboard()

	if (RegExMatch(request, "w[ ]?[0-9]+", words)){
		;output lorem by words
		words := substr(words, 2, strlen(words)) + 0
		;SendInput %words% words of lorem
		res := ""
		wCounter := 0
		src := lorem[leNumber]
		Loop, Parse, src, " "
		{
			res .= A_LoopField . " "
			wCounter ++
			if (wCounter >= words){
				res := substr(res, 1, -1)
				res .= "."
				Break
			}
		}
		;clipboard = %res%
		;Send ^v
		;lastResult := res

	} else if (RegExMatch(request, "s[ ]?[0-9]+", sents)){
		;output lorem by sentences
		sents := substr(sents, 2, strlen(sents)) + 0
		;SendInput %sents% sentences of lorem
		res := ""
		sCounter := 0
		src := lorem[leNumber]
		Loop, Parse, src, "."
		{
			res .= A_LoopField . "."
			sCounter ++
			if (sCounter >= sents || sCounter >= 100) {
				Break
			}
		}
		;clipboard = %res%
		;Send ^v
		;lastResult := res

	} else if (RegExMatch(request, "p[ ]?[0-9]+", pars)){
		;output lorem by paragraphs
		pars := substr(pars, 2, strlen(pars)) + 0
		;SendInput %pars% paragraphs of lorem
		res := ""
		pCounter := 0
		sCounter := 0
		Random, sNumber, 6, 12 ;number of sentences in section
		src := lorem[leNumber]
		Loop, Parse, src, "."
		{   
			sCounter ++
			if (sCounter >= sNumber) {
				sCounter := 0
				pCounter ++
				Random, sNumber, 6, 12
				res .= "`n"
			}
			if (pCounter >= pars || pCounter >= 100) {
				Break
			}
			res .= A_LoopField . "."
		}
		;clipboard = %res%
		;Send ^v
		;lastResult := res 

	} else {
		RegExMatch(request, "[0-9]+", chars)
		if (!chars) {
			chars := 600
		}
		;output lorem by chars
		src := lorem[leNumber]
		res := Substr(src, 1, chars)
		;Clipboard = %res%
		;Send ^v
		;SendInput %chars% chars of lorem
		;lastResult := res
	}

	;selectBefore(strlen(res))

	;restoreClipboard()
	insertAndRestore(res)

	return true
}
*/