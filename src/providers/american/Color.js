var Color = {
	safeNames: "",

	//wiki-list colors on 10.12.2013
	names: 
		"Air Force Blue
		Alice Blue
		Alizarin Crimson
		Almond
		Amaranth
		Amber
		American Rose
		Amethyst
		Anti-flash White
		Antique White
		Apple Green
		Asparagus
		Aqua
		Aquamarine
		Army Green
		Arsenic
		Azure
		Battleship Grey
		Beige
		Bistre
		Bittersweet
		Black
		Blond
		Blue
		Bondi Blue
		Boston University Red
		Brass
		Bright green
		Bright turquoise
		Bright violet
		Bronze
		Brown
		Buff
		Burgundy
		Burnt Orange
		Burnt Sienna
		Burnt umber
		Camouflage green
		Cardinal
		Carmine
		Carrot
		Celadon
		Cerise
		Cerulean
		Cerulean blue
		Chartreuse
		Chestnut
		Chocolate
		Cinnamon
		Cobalt
		Copper
		Coral
		Corn
		Cornflower blue
		Cream
		Crimson
		Cyan
		Dark blue
		Dark brown
		Dark cerulean
		Dark chestnut
		Dark coral
		Dark goldenrod
		Dark green
		Dark Indigo
		Dark Khaki
		Dark Olive
		Dark pastel green
		Dark Peach
		Dark pink
		Dark salmon
		Dark Scarlet
		Dark slate gray
		Dark spring green
		Dark tan
		Dark tangerine
		Dark Tea Green
		Dark turquoise
		Dark violet
		Deep pink
		Deep sky blue
		Denim
		Dodger blue
		Emerald
		Eggplant
		Fern green
		Fire brick
		Flax
		Fuchsia
		Gamboge
		Gold
		Goldenrod
		Gray
		Gray-asparagus
		Gray-Tea Green
		Green
		Green-yellow
		Gradus Blue
		Heliotrope
		Hot pink
		Indigo
		International orange 
		Indian Red
		Jade
		Khaki
		Klein Blue
		Lavender
		Lavender Blush
		Lemon
		Lemon Cream
		Light brown
		Lilac
		Lime
		Linen
		Lawn Green
		Magenta
		Malachite
		Maroon
		Mauve
		Midnight Blue
		Mint Green
		Moss green
		Mountbatten pink
		Mustard
		Navajo white
		Navy
		Ochre
		Old Gold
		Olive
		Olive Drab
		Orange
		Orchid
		Old Lace
		Pale Blue
		Pale brown
		Pale carmine
		Pale chestnut
		Pale cornflower blue
		Pale magenta
		Pale mauve
		Pale pink
		Pale red-violet
		Pale Sandy Brown
		Pale yellow
		Pang
		Papaya whip
		Pastel green
		Pastel pink
		Peach
		Peach-orange
		Peach-yellow
		Pear
		Periwinkle
		Persian blue
		Pine Green
		Pink
		Pink-orange
		Plum
		Powder blue
		Puce
		Prussian blue
		Pumpkin
		Purple
		Raw umber
		Red
		Red-violet
		Robin egg blue
		Royal Blue
		Russet
		Rust
		Rosy Brown
		Safety Orange 
		Saffron
		Sapphire
		Salmon
		Sandy brown
		Sangria
		Scarlet
		School bus yellow
		Sea Green
		Seashell
		Selective yellow
		Sepia
		Silver
		Slate gray
		Spring Green
		Steel blue
		Swamp green
		Tan
		Tenn
		Tangerine
		Tea Green
		Teal
		Thistle
		Turquoise
		Titian
		Tomato
		Ultramarine
		United Nations Blue
		Vanilla
		Vermilion
		Violet
		Violet-eggplant
		Viridian
		Wheat
		White
		Wisteria
		Wine
		Xanadu
		Yellow
		Zinnwaldite
		Zaffre".split("\n"),

	hexCodes: 
		"5D8AA8
		F0F8FF
		E32636
		EFDECD
		E52B50
		FFBF00
		FF033E
		9966CC
		F2F3F4
		FAEBD7
		8DB600
		7BA05B
		00FFFF
		7FFFD4
		4B5320
		3B444B
		007FFF
		848482
		F5F5DC
		3D2B1F
		FE6F5E
		000000
		FAF0BE
		0000FF
		0095B6
		CC0000
		B5A642
		66FF00
		08E8DE
		CD00CD
		CD7F32
		964B00
		F0DC82
		900020
		CC5500
		E97451
		8A3324
		78866B
		C41E3A
		960018
		ED9121
		ACE1AF
		DE3163
		007BA7
		2A52BE
		7FFF00
		CD5C5C
		D2691E
		7B3F00
		0047AB
		B87333
		FF7F50
		FBEC5D
		6495ED
		FFFDD0
		DC143C
		00FFFF
		00008B
		654321
		08457E
		986960
		CD5B45
		B8860B
		013220
		310062
		BDB76B
		556832
		03C03C
		FFDAB9
		E75480
		E9967A
		560319
		2F4F4F
		177245
		918151
		FFA812
		BADBAD
		116062
		423189
		FF1493
		00BFFF
		1560BD
		1E90FF
		50C878
		990066
		4F7942
		B22222
		EEDC82
		FF00FF
		E49B0F
		FFD700
		DAA520
		808080
		465945
		CADABA
		00FF00
		ADFF2F
		007DFF
		DF73FF
		FC0FC0
		4B0082
		FF4F00
		CD5C5C
		00A86B
		C3B091
		3A75C4
		E6E6FA
		FFF0F5
		FDE910
		FFFACD
		CD853F
		C8A2C8
		CCFF00
		FAF0E6
		7CFC00
		FF00FF
		0BDA51
		800000
		993366
		003366
		98FF98
		ADDFAD
		997A8D
		FFDB58
		FFDEAD
		000080
		CC7722
		CFB53B
		808000
		6B8E23
		FFA500
		DA70D6
		FDF5E6
		AFEEEE
		987654
		AF4035
		DDADAF
		ABCDEF
		F984E5
		996666
		FADADD
		DB7093
		DABDAB
		F0DC82
		C7FCEC
		FFEFD5
		77DD77
		FFD1DC
		FFE5B4
		FFCC99
		FADFAD
		D1E231
		CCCCFF
		6600FF
		01796F
		FFC0CB
		FF9966
		660066
		003399
		CC8899
		003153
		FF7518
		800080
		734A12
		FF0000
		C71585
		00CCCC
		4169E1
		755A57
		B7410E
		BC8F8F
		FF9900
		F4C430
		082567
		FF8C69
		F4A460
		92000A
		FF2400
		FFD800
		2E8B57
		FFF5EE
		FFBA00
		704214
		C0C0C0
		708090
		00FF7F
		4682B4
		ACB78E
		D2B48C
		CD5700
		FFCC00
		D0F0C0
		008080
		D8BFD8
		30D5C8
		CC0605
		FF6347
		120A8F
		5B92E5
		F3E5AB
		E34234
		8B00FF
		991199
		40826D
		F5DEB3
		FFFFFF
		C9A0DC
		722F37
		738678
		FFFF00
		EBC2AF
		0014A8".split("\n")
}