export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  ingredients: string
  nutrition: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
}

export const categories = [
  { id: "soup", name: "Супы" },
  { id: "hot", name: "Горячее" },
  { id: "grill", name: "Гриль" },
  { id: "drinks", name: "Напитки" },
  { id: "desserts", name: "Десерты" },
]

export const menuItems: MenuItem[] = [

  {
    id: "1",
    name: "Сорпа",
    description: "Наваристый бульон из баранины с картофелем и зеленью",
    price: 450,
    category: "soup",
    image: "/assets/food/sorpa.png",
    ingredients: "Баранина на кости, картофель, морковь, лук репчатый, свежая зелень, специи",
    nutrition: { calories: 280, protein: 18, fat: 20, carbs: 12 },
  },
  {
    id: "2",
    name: "Лагман",
    description: "Густой суп с домашней лапшой, овощами и говядиной",
    price: 520,
    category: "soup",
    image: "/assets/food/lagman.png",
    ingredients: "Домашняя лапша (мука, яйца), говядина, перец болгарский, сельдерей, томаты, чеснок",
    nutrition: { calories: 420, protein: 22, fat: 16, carbs: 45 },
  },
  {
    id: "3",
    name: "Шурпа",
    description: "Традиционный суп с крупными кусками мяса и овощами",
    price: 480,
    category: "soup",
    image: "/assets/food/shurpa.png",
    ingredients: "Мякоть баранины, крупный картофель, морковь, помидоры, сладкий перец, зира",
    nutrition: { calories: 350, protein: 24, fat: 22, carbs: 18 },
  },
  {
    id: "4",
    name: "Бешбармак",
    description: "Национальное блюдо из отварной баранины с домашней лапшой",
    price: 890,
    category: "hot",
    image: "/assets/food/beshbarmak.png",
    ingredients: "Отборная баранина, конина (казы), домашнее тесто (жайма), лук (туздык), бульон",
    nutrition: { calories: 650, protein: 45, fat: 35, carbs: 40 },
  },
  {
    id: "5",
    name: "Плов",
    description: "Рассыпчатый рис с бараниной, морковью и специями",
    price: 650,
    category: "hot",
    image: "/assets/food/plov.png",
    ingredients: "Рис девзира, баранина, желтая морковь, лук, зира, барбарис, чеснок",
    nutrition: { calories: 580, protein: 26, fat: 30, carbs: 55 },
  },
  {
    id: "6",
    name: "Манты",
    description: "Большие пельмени на пару с сочной мясной начинкой (5 шт)",
    price: 420,
    category: "hot",
    image: "/assets/food/manty.png",
    ingredients: "Рубленая говядина и баранина, курдючный жир, лук репчатый, тонкое пресное тесто, черный перец",
    nutrition: { calories: 480, protein: 25, fat: 28, carbs: 36 },
  },
  {
    id: "7",
    name: "Казы",
    description: "Традиционная конская колбаса с гарниром",
    price: 780,
    category: "hot",
    image: "/assets/food/kazy.png",
    ingredients: "Конина высшего сорта, конский жир, чеснок, черный перец, соль",
    nutrition: { calories: 510, protein: 40, fat: 38, carbs: 2 },
  },
  {
    id: "8",
    name: "Шашлык из баранины",
    description: "Сочное мясо на углях с луком и зеленью (300г)",
    price: 720,
    category: "grill",
    image: "/assets/food/shashlik_mutton.png",
    ingredients: "Мякоть баранины, курдюк, маринад на основе лука и специй, подается с маринованным луком",
    nutrition: { calories: 620, protein: 42, fat: 48, carbs: 5 },
  },
  {
    id: "9",
    name: "Шашлык куриный",
    description: "Нежное филе курицы на мангале (250г)",
    price: 450,
    category: "grill",
    image: "/assets/food/shashlik_chicken.png",
    ingredients: "Филе куриного бедра, кефирный маринад, паприка, чеснок, зелень",
    nutrition: { calories: 380, protein: 38, fat: 22, carbs: 4 },
  },
  {
    id: "10",
    name: "Люля-кебаб",
    description: "Рубленое мясо на шампуре с пряностями (2 шт)",
    price: 380,
    category: "grill",
    image: "/assets/food/lula_kebab.png",
    ingredients: "Рубленая баранина и говядина, курдючный жир, репчатый лук, кинза, зира",
    nutrition: { calories: 450, protein: 32, fat: 35, carbs: 6 },
  },
  {
    id: "11",
    name: "Кумыс",
    description: "Традиционный кисломолочный напиток из кобыльего молока",
    price: 180,
    category: "drinks",
    image: "/assets/food/kumis.png",
    ingredients: "Свежее кобылье молоко, закваска",
    nutrition: { calories: 50, protein: 2.5, fat: 1.5, carbs: 5 },
  },
  {
    id: "12",
    name: "Шубат",
    description: "Кисломолочный напиток из верблюжьего молока",
    price: 200,
    category: "drinks",
    image: "/assets/food/shubat.png",
    ingredients: "Верблюжье молоко, закваска",
    nutrition: { calories: 65, protein: 3.5, fat: 3.5, carbs: 4.5 },
  },
  {
    id: "13",
    name: "Чай казахский",
    description: "Крепкий чай с молоком и сливками (чайник)",
    price: 250,
    category: "drinks",
    image: "/assets/food/kazakh_tea.png",
    ingredients: "Черный листовой чай, натуральное кипяченое молоко, домашние сливки",
    nutrition: { calories: 120, protein: 4, fat: 8, carbs: 10 },
  },
  {
    id: "14",
    name: "Компот из сухофруктов",
    description: "Домашний напиток из сушёных фруктов",
    price: 120,
    category: "drinks",
    image: "/assets/food/compote.png",
    ingredients: "Курага, изюм, яблоки сушеные, чернослив, сахар, вода",
    nutrition: { calories: 95, protein: 0.5, fat: 0, carbs: 24 },
  },
  {
    id: "15",
    name: "Баурсаки",
    description: "Пышные обжаренные кусочки теста с мёдом (10 шт)",
    price: 280,
    category: "desserts",
    image: "/assets/food/baursak.png",
    ingredients: "Пшеничная мука, дрожжи, молоко, кефир, сливочное масло, сахар, подаются с натуральным медом",
    nutrition: { calories: 420, protein: 8, fat: 18, carbs: 56 },
  },
  {
    id: "16",
    name: "Чак-чак",
    description: "Сладкое лакомство из теста с мёдом",
    price: 320,
    category: "desserts",
    image: "/assets/food/chak_chak.png",
    ingredients: "Пшеничная мука, яйца, натуральный мед, сахарный сироп",
    nutrition: { calories: 450, protein: 7, fat: 14, carbs: 75 },
  },
  {
    id: "17",
    name: "Курт с мёдом",
    description: "Солёный сыр курт с натуральным мёдом",
    price: 240,
    category: "desserts",
    image: "/assets/food/kurt.png",
    ingredients: "Традиционный сухой кисломолочный сыр (курт), цветочный мед",
    nutrition: { calories: 250, protein: 15, fat: 10, carbs: 25 },
  },
]
