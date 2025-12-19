/* ====== Data ====== */
/* Players (example) */
const players = [
  {
    name: "VIRAT KOHLI",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "assets/bat1.jpg",
  },
  {
    name: "M.H.IBRAHIM",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/bat01.jpg",
  },
  {
    name: "RAJAT PATIDAR",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points: 8,
    pic: "IPL_auction/assests/bat2.jpg",
  },
  {
    name: "SURYA KUMAR YADAV",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/bat3.jpg",
  },
  {
    name: "ROHIT SHARMA",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/bat4.jpg",
  },
  {
    name: "SHREYAS IYER",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/bat5.jpg",
  },
  {
    name: "SHUBMAN GILL",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points: 8,
    pic: "IPL_auction/assests/bat6.jpg",
  },
  {
    name: "YASHASVI JAISWAL",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points: 8,
    pic: "IPL_auction/assests/bat7.jpg",
  },
  {
    name: "RINKU SINGH",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points: 8,
    pic: "IPL_auction/assests/bat9.jpg",
  },
  {
    name: "AMBATI RAYUDU",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points: 10,
    pic: "IPL_auction/assests/bat13.jpg",
  },
  {
    name: "SURESH RAINA",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
    points: 10,
    pic: "IPL_auction/assests/bat14.jpg",
  },
  {
    name: "YUVRAJ SINGH",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bat15.jpg",
  },
  {
    name: "SHIKAR DHAWAN",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
 points:10,
    pic: "IPL_auction/assests/bat19.jpg",
  },
  {
    name: "RUTRAJ GAIKWAD",
    country: "India",
    category: "Batsman",
    basePrice: 2,
    foreign: false,
     points:8,
    pic: "IPL_auction/assests/bat22.jpg",
  },

  {
    name: "SHIMRON HETMYER",
    country: "West indians",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/bat8.jpg",
  },
  {
    name: "TRAVIS HEAD",
    country: "Australia",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bat10.jpg",
  },
  {
    name: "FAF DU PLESSIS",
    country: "South africa",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bat11.jpg",
  },
  {
    name: "DAVID MILLER",
    country: "South africa",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bat12.jpg",
  },
  {
    name: "JAKE FRASER-MCGURK",
    country: "Australia",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/bat16.jpg",
  },
  {
    name: "DAVID WARNER",
    country: "Australia",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bat17.jpg",
  },
  {
    name: "CHRIS GAYLE",
    country: "West indies",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bat18.jpg",
  },
  {
    name: "KANE WILLAMSON",
    country: "New zealand",
    category: "Batsman",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bat20.jpg",
  },
  {
    name: "HARRY BROOK",
    country: "England",
    category: "batsman",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/bat21.jpg",
  },

  {
    name: "DEVDUTT PADIKKAL",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat23.jpg",
  },
  {
    name: "MAYANK AGARWAL",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat24.jpg",
  },
  {
    name: "AYUSH MHATRE",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat25.jpg",
  },
  {
    name: "URVIL PATEL",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat27.jpg",
  },
  {
    name: "NAMAN DHIR",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat28.jpg",
  },
  {
    name: "TILAK VARMA",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat29.jpg",
  },
  {
    name: "PRIYANSH ARYA",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat30.jpg",
  },
  {
    name: "SHASHANK SINGH",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat31.jpg",
  },
  {
    name: "SAMEER RIZVI",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat32.jpg",
  },
  {
    name: "ASHUTOSH SHARMA",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat33.jpg",
  },
  {
    name: "KARUN NAIR",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat34.jpg",
  },
  {
    name: "SAI SUDHARSAN",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat35.jpg",
  },
  {
    name: "SHAHRUKH KHAN",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat36.jpg",
  },
  {
    name: "VAIBHAV SURYAVANSHI",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat38.jpg",
  },
  {
    name: "AJINKYA RAHANAE",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat39.jpg",
  },
  {
    name: "RAMANDEEP SINGH",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat40.jpg",
  },
  {
    name: "MANISH PANDEY",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat41.jpg",
  },
  {
    name: "ANGKRISH RAGHUVANSI",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat43.jpg",
  },
  {
    name: "AYSH BADONI",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat44.jpg",
  },
  {
    name: "ANIKET VERMA",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat46.jpg",
  },
  {
    name: "RAHUL TRIPATHI",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat47.jpg",
  },
  {
    name: "ABHINAV MANOHAR",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat51.jpg",
  },
  {
    name: "SACHIN BABY",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat52.jpg",
  },
  {
    name: "GAUTAM GAMBHIR",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat54.jpg",
  },
  {
    name: "SARFARAZ KHAN",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat56.jpg",
  },
  {
    name: "PRITHVI SHAW",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat57.jpg",
  },
  {
    name: "MANDEEP SINGH",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat58.jpg",
  },
  {
    name: "NITISH RANA",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bat65.jpg",
  },
  {
    name: "KEDAR JADAV",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat66.jpg",
  },
  {
    name: "MANAN VOHRA",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat68.jpg",
  },
  {
    name: "SHUBHAM DUBEY",
    country: "India",
    category: "Batsman",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bat70.jpg",
  },

  {
    name: "DEWALD BREVIS",
    country: "South africa",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bat26.jpg",
  },
  {
    name: "LHUAN-DRE PRETORIUS ",
    country: "South africa",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat37.jpg",
  },
  {
    name: "ROVMAN POWELL",
    country: "West indies",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat42.jpg",
  },
  {
    name: "MATTHEW BREETZKE",
    country: "South africa",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat45.jpg",
  },
  {
    name: "BEVON JACOBS",
    country: "New zealand",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat48.jpg",
  },
  {
    name: "DONOVAN FERREIRA",
    country: "South africa",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat49.jpg",
  },
  {
    name: "KARIM JANAT",
    country: "Afghanistan",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat50.jpg",
  },
  {
    name: "CHRIS LYNN",
    country: "Australia",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat53.jpg",
  },
  {
    name: "STIVE SMITH",
    country: "Australia",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat55.jpg",
  },
  {
    name: "MATTHEW WILLIAM SHORT",
    country: "Australia",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat59.jpg",
  },
  {
    name: "RILEE ROSSOUW",
    country: "South africa",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat60.jpg",
  },
  {
    name: "RASSIE VAN DER DUSSEN",
    country: "South africa",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat61.jpg",
  },
  {
    name: "JOE ROOT",
    country: "England",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat62.jpg",
  },
  {
    name: "AARON FINCH",
    country: "Australia",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat63.jpg",
  },
  {
    name: "JASON ROY",
    country: "England",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat64.jpg",
  },
  {
    name: "EVIN LEWIS",
    country: "West indies",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bat67.jpg",
  },
  {
    name: "KYLE MAYERS",
    country: "West indies",
    category: "Batsman",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bat69.jpg",
  },

  {
    name: "YASH DAYAL",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:8,
    pic: "IPL_auction/assests/bowl1.jpg",
  },
  {
    name: "JASPRIT BUMRAH",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl11.jpg",
  },
  {
    name: "DEEPAK CHAHAR",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl13.jpg",
  },
  {
    name: "ARSHDEEP SINGH",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl18.jpg",
  },
  {
    name: "MUKESH KUMAR",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:8,
    pic: "IPL_auction/assests/bowl19.jpg",
  },
  {
    name: "T.NATARAJAN",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:8,
    pic: "IPL_auction/assests/bowl21.jpg",
  },
  {
    name: "ISHANT SHARMA",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl23.jpg",
  },
  {
    name: "PRASIDH KRISHNA",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:8,
    pic: "IPL_auction/assests/bowl24.jpg",
  },
  {
    name: "MOHAMMED SIRAJ",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl26.jpg",
  },
  {
    name: "HARSHAL PATEL",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl41.jpg",
  },
  {
    name: "BHUVNESHWAR KUMAR",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl42.jpg",
  },
  {
    name: "MOHAMMAD SHAMI",
    country: "India",
    category: "Bowler",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/bowl61.jpg",
  },

  {
    name: "LUNGISANI NGIDI",
    country: "South africa",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/bowl3.jpg",
  },
  {
    name: "JOSH HAZLEWOOD",
    country: "Australia",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl5.jpg",
  },
  
  {
    name: "TRENT BOULT",
    country: "New zealand",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl14.jpg",
  },
  {
    name: "MITCHELL STARC",
    country: "Australia",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl22.jpg",
  },
  {
    name: "KAGISO RABADA",
    country: "South africa",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl25.jpg",
  },
  {
    name: "JOFRA ARCHER",
    country: "England",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl32.jpg",
  },
  {
    name: "MATHEESHA PATHIRANA",
    country: "Sri lanka",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/bowl43.jpg",
  },
  {
    name: "LASITH MALINGA",
    country: "Sri lanka",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl64.jpg",
  },
  {
    name: "LOCKIE FERGUSON",
    country: "New zealand",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/bowl77.jpg",
  },
  {
    name: "MARK WOOD",
    country: "England",
    category: "Bowler",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/bowl79.jpg",
  },

  {
    name: "RASIKH DAR",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl2.jpg",
  },
  {
    name: "GURJAPNEET SINGH",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl6.jpg",
  },
  {
    name: "MUKESH CHOUDHARY",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl8.jpg",
  },
  {
    name: "KHALEEL AHMED",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl9.jpg",
  },
  {
    name: "ANSHUL KAMBOJ",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl10.jpg",
  },
  {
    name: "ASHWANI KUMAR",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl12.jpg",
  },
  {
    name: "YASH THAKUR",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl16.jpg",
  },
  {
    name: "VYSHAK VIJAYKUMAR",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl17.jpg",
  },
  {
    name: "MOHD.ARSHAD KHAN",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl27.jpg",
  },
  {
    name: "SANDEEP SHARMA",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl29.jpg",
  },
  {
    name: "TUSHAR DESHPANDE",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl31.jpg",
  },
  {
    name: "HARSHIT RANA",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl33.jpg",
  },
  {
    name: "VAIBHAV ARORA",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl34.jpg",
  },
  {
    name: "MOHSIN KHAN",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl35.jpg",
  },
  {
    name: "MAYANK YADAV",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl36.jpg",
  },
  {
    name: "AKASH SINGH",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl37.jpg",
  },
  {
    name: "AVESH KHAN",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl38.jpg",
  },
  {
    name: "JAYDEV UNADKAT",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl40.jpg",
  },
  {
    name: "KAMLESH NAGARKOTI",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl44.jpg",
  },
  {
    name: "ARJUN TENDULKAR",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl46.jpg",
  },
  {
    name: "MOHIT SHARMA",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl49.jpg",
  },
  {
    name: "KULDEEP SEN",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl50.jpg",
  },
  {
    name: "AKASH MADHWAL",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl52.jpg",
  },
  {
    name: "CHETAN SAKARIYA",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl54.jpg",
  },
  {
    name: "AKASH DEEP",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl59.jpg",
  },
  {
    name: "SIMARJEET SINGH",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl60.jpg",
  },
  {
    name: "SHIVAM MAVI",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl70.jpg",
  },
  {
    name: "UMESH YADAV",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl72.jpg",
  },
  {
    name: "NAVDEEP SAINI",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl73.jpg",
  },
  {
    name: "SIDHARTH KAUL",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:4,
    pic: "IPL_auction/assests/bowl75.jpg",
  },
  {
    name: "UMRAN MALIK",
    country: "India",
    category: "Bowler",
    basePrice: 1,
    foreign: false,
     points:6,
    pic: "IPL_auction/assests/bowl82.jpg",
  },

  {
    name: "NUWAN THUSHARA",
    country: "Sri lanka",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bowl4.jpg",
  },
  {
    name: "NATHAN ELLIS",
    country: "Australia",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl7.jpg",
  },
  {
    name: "XAVIER BARTLETT",
    country: "Australia",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl15.jpg",
  },
  {
    name: "DUSHMANTHA CHAMEERA",
    country: "Sri lanka",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl20.jpg",
  },
  {
    name: "NANDRE BURGER",
    country: "South africa",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl28.jpg",
  },
  {
    name: "KWENA MAPHAKA",
    country: "South africa",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl30.jpg",
  },
  {
    name: "ESHAN MALINGA",
    country: "Sri lanka",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl39.jpg",
  },
  {
    name: "RICHARD GLEESON",
    country: "England",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl45.jpg",
  },
  {
    name: "REECE TOPLEY",
    country: "England",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bowl47.jpg",
  },
  {
    name: "MUSTAFIZUR RAHMAN",
    country: "Bangaladesh",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl48.jpg",
  },
  {
    name: "GERALD COETZEE",
    country: "South africa",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bowl51.jpg",
  },
  {
    name: "FAZALHOQ FAROOQI",
    country: "Afghanistan",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl53.jpg",
  },
  {
    name: "ANRICH NORTJE",
    country: "South africa",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bowl55.jpg",
  },
  {
    name: "SPENCER JOHNSON",
    country: "Australia",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl56.jpg",
  },
  {
    name: "WILLIAM O'ROURKE",
    country: "New zealand",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl57.jpg",
  },
  {
    name: "SHAMAR JOSEPH",
    country: "West indies",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl58.jpg",
  },
  {
    name: "CRIS JORDAN",
    country: "England",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl62.jpg",
  },
  {
    name: "ADAM MILNE",
    country: "New zealand",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl63.jpg",
  },
  {
    name: "RILEY MEREDITH",
    country: "Australia",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl65.jpg",
  },
  {
    name: "TYMAL MILLS",
    country: "England",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl66.jpg",
  },
  {
    name: "JASON BEHRENDORFF",
    country: "Australia",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl67.jpg",
  },
  {
    name: "JHYE RICHARDSON",
    country: "Australia",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl68.jpg",
  },
  {
    name: "JOSH LITTLE",
    country: "Ireland",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl71.jpg",
  },
  {
    name: "TIM SOUTHEE",
    country: "New zealand",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl74.jpg",
  },
  {
    name: "DAVID WILLEY",
    country: "England",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl76.jpg",
  },
  {
    name: "ALZARRI JOSEPH",
    country: "West indies",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:6,
    pic: "IPL_auction/assests/bowl78.jpg",
  },
  
  {
    name: "NAVEEN UL HOQ",
    country: "Afganistan",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl80.jpg",
  },
  {
    name: "MATT HENRY",
    country: "New zealand",
    category: "Bowler",
    basePrice: 1,
    foreign: true,
     points:4,
    pic: "IPL_auction/assests/bowl81.jpg",
  },

  {
    name: "KRUNAL PANDYA",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all1.jpg",
  },
  {
    name: "SHIVAM DUBE",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all2.jpg",
  },
  {
    name: "HARDIK PANDYA",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all3.jpg",
  },
  {
    name: "AXAR PATEL",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all4.jpg",
  },
  {
    name: "WASHINGTON SUNDAR",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all5.jpg",
  },
  {
    name: "ABHISHEK SHARMA",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all6.jpg",
  },
  {
    name: "RAVINDRA JADEJA",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all7.jpg",
  },
  {
    name: "RAVICHANDRAN ASHWIN",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:10,
    pic: "IPL_auction/assests/all8.jpg",
  },
  {
    name: "VENKATESH IYER",
    country: "India",
    category: "All-Rounder",
    basePrice: 2,
    foreign: false,
     points:8,
    pic: "IPL_auction/assests/all9.jpg",
  },

  {
    name: "TIM DAVID",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all10.jpg",
  },
  {
    name: "ROMARIO SHEPHERD",
    country: "West indies",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all11.jpg",
  },
  {
    name: "LIAM LIVINGSTONE",
    country: "England",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all12.jpg",
  },
  {
    name: "MARCO JANSEN",
    country: "South africa",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all13.jpg",
  },
  {
    name: "MARCUS STOINIS",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all14.jpg",
  },
  {
    name: "SUNIL NARINE",
    country: "West indies",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all15.jpg",
  },
  {
    name: "MITCHELL MARSH",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all16.jpg",
  },
  {
    name: "PAT CUMMINS",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all17.jpg",
  },
  {
    name: "WANINDU HASARANGA",
    country: "Sri lanka",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:8,
    pic: "IPL_auction/assests/all18.jpg",
  },
  {
    name: "ANDRE RUSSELL",
    country: "West indies",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all19.jpg",
  },
  {
    name: "SHANE WATSON",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all20.jpg",
  },
  {
    name: "DWAYNE BRAVO",
    country: "West indies",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all21.jpg",
  },
  {
    name: "BEN STOKES",
    country: "England",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
     points:10,
    pic: "IPL_auction/assests/all22.jpg",
  },
  {
    name: "KIERON POLLARD",
    country: "West indies",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/all23.jpg",
  },
  {
    name: "CAMERON GREEN",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/all24.jpg",
  },
  {
    name: "GLENN MAXWELL",
    country: "Australia",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/all25.jpg",
  },
  {
    name: "JACOB BETHELL",
    country: "England",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
    points:8,
    pic: "IPL_auction/assests/all26.jpg",
  },
  {
    name: "WILL JACKS",
    country: "England",
    category: "All-Rounder",
    basePrice: 2,
    foreign: true,
    points:8,
    pic: "IPL_auction/assests/all27.jpg",
  },

  {
    name: "SWAPNIL SINGH",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all28.jpg",
  },
  {
    name: "HARPREET BRAR",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all29.jpg",
  },
  {
    name: "NEHAL WADHERA",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all30.jpg",
  },
  {
    name: "VIPRAJ NIGAM",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all31.jpg",
  },
  {
    name: "RAHUL TEWATIA",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/all32.jpg",
  },
  {
    name: "JAYANT YADAV",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all33.jpg",
  },
  {
    name: "ANUKUL ROY",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all34.jpg",
  },
  {
    name: "SHAHBAZ AHMED",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/all35.jpg",
  },
  {
    name: "ABDUL SAMAD",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all36.jpg",
  },
  {
    name: "NITHISH KUMAR REDDY",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/all37.jpg",
  },
  {
    name: "DEEPAK HOODA",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/all38.jpg",
  },
  {
    name: "VIJAY SHANKAR",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/all39.jpg",
  },
  {
    name: "MAHIPAL LOMROR",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all40.jpg",
  },
  {
    name: "SHARDUL THAKUR",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/all41.jpg",
  },
  {
    name: "RAJVARDHAN HANGARGEKAR",
    country: "India",
    category: "All-Rounder",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/all42.jpg",
  },

  {
    name: "JAMIE OVERTON",
    country: "ENGLAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all43.jpg",
  },
  {
    name: "MITCHELL SANTNER",
    country: "NEW ZEALAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:8,
    pic: "IPL_auction/assests/all44.jpg",
  },
  {
    name: "AZMATULLAH OMARZAI",
    country: "AFGHANISTAN",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all45.jpg",
  },
  {
    name: "AIDEN MARKRAM",
    country: "SOUTH AFRICA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:8,
    pic: "IPL_auction/assests/all46.jpg",
  },
  {
    name: "KUSAL MENDIS",
    country: "SRI LANKA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all47.jpg",
  },
  {
    name: "SAM CURRAN",
    country: "ENGLAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/all48.jpg",
  },
  {
    name: "RACHIN RAVINDRA",
    country: "NEW ZEALAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/all49.jpg",
  },
  {
    name: "CHARITH ASALANKA",
    country: "SRI LANKA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all50.jpg",
  },
  {
    name: "KYLE JAMIESON",
    country: "NEW ZEALAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/all51.jpg",
  },
  {
    name: "DASUN SHANAKA",
    country: "SRI LANKA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all52.jpg",
  },
  {
    name: "SHERFANE RUTHERFORD",
    country: "WEST INDIES",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all53.jpg",
  },
  {
    name: "MOEEN ALI",
    country: "ENGLAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/all54.jpg",
  },
  {
    name: "WIAAN MULDER",
    country: "SOUTH AFRICA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all55.jpg",
  },
  {
    name: "DWAINE PRETORIUS",
    country: "SOUTH AFRICA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all56.jpg",
  },
  {
    name: "DARYL MITCHELL",
    country: "NEW ZEALAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all57.jpg",
  },
  {
    name: "JAMES NEESHAM",
    country: "NEW ZEALAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all58.jpg",
  },
  {
    name: "FABIAN ALLEN",
    country: "WEST INDIES",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all59.jpg",
  },
  {
    name: "DANIEL SAMS",
    country: "AUSTRALIA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all60.jpg",
  },
  {
    name: "MOHAMMAD NABI",
    country: "AFGHANISTAN",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all61.jpg",
  },
  {
    name: "MOISES HENRIQUES",
    country: "AUSTRALIA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all62.jpg",
  },
  {
    name: "ODEAN SMITH",
    country: "WEST INDIES",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all63.jpg",
  },
  {
    name: "SIKANDAR RAZA",
    country: "ZIMBABAWE",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all64.jpg",
  },
  {
    name: "CHRIS WOAKES",
    country: "ENGLAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all65.jpg",
  },
  {
    name: "NATHAN COULTER-NILE",
    country: "AUSTRALIA",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all66.jpg",
  },
  {
    name: "JASON HOLDER",
    country: "WEST INDIES",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/all67.jpg",
  },
  {
    name: "SHAKIB AL HASAN",
    country: "BANGLADESH",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/all68.jpg",
  },
  {
    name: "MICHAEL BRACEWELL",
    country: "NEW ZEALAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all69.jpg",
  },
  {
    name: "TOM CURRAN",
    country: "ENGLAND",
    category: "All-Rounder",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/all70.jpg",
  },

  {
    name: "MS DHONI",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/wk1.jpg",
  },
  {
    name: "KL RAHUL",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/wk2.jpg",
  },
  {
    name: "RISHABH PANT",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/wk3.jpg",
  },
  {
    name: "ISHAN KISHAN",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/wk4.jpg",
  },
  {
    name: "SANJU SAMSON",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/wk5.jpg",
  },
  {
    name: "DINESH KARTHIK",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/wk6.jpg",
  },

  {
    name: "PHIL SALT",
    country: "ENGLAND",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/wk7.jpg",
  },
  {
    name: "TRISTAN STUBBS",
    country: "South Africa",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/wk8.jpg",
  },
  {
    name: "JOS BUTTLER",
    country: "England",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/wk9.jpg",
  },
  {
    name: "NICHOLAS POORAN",
    country: "West indies",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/wk10.jpg",
  },
  {
    name: "HEINRICH KLAASEN",
    country: "South Africa",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/wk11.jpg",
  },
  {
    name: "AB DE VILLIERS",
    country: "South Africa",
    category: "Wicket Keeper",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/wk12.jpg",
  },

  {
    name: "JITESH SHARMA",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:8,
    pic: "IPL_auction/assests/wk13.jpg",
  },
  {
    name: "ROBIN MINZ",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk14.jpg",
  },
  {
    name: "PRABHSIMRAN SINGH",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:8,
    pic: "IPL_auction/assests/wk15.jpg",
  },
  {
    name: "ABISHEK POREL",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk16.jpg",
  },
  {
    name: "ANUJ RAWAT",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk17.jpg",
  },
  {
    name: "KUMAR KUSHAGRA",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk18.jpg",
  },
  {
    name: "DHRUV JUREL",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:8,
    pic: "IPL_auction/assests/wk19.jpg",
  },
  {
    name: "NARAYAN JAGADEESAN",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk20.jpg",
  },
  {
    name: "ROBIN UTHAPPA",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk21.jpg",
  },
  {
    name: "K.S BHARAT",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk22.jpg",
  },
  {
    name: "WRIDDHIMAN SAHA",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/wk23.jpg",
  },
  {
    name: "BABA INDRAJITH",
    country: "India",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/wk24.jpg",
  },

  {
    name: "TIM SEIFERT",
    country: "New Zealand",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk25.jpg",
  },
  {
    name: "RYAN RICKELTON",
    country: "South Africa",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk26.jpg",
  },
  {
    name: "GLENN PHILLIPS",
    country: "New Zealand",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk27.jpg",
  },
  {
    name: "DEVON CONWAY",
    country: "New Zealand",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk28.jpg",
  },
  {
    name: "JONNY BAIRSTOW",
    country: "England",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk29.jpg",
  },
  {
    name: "JOSH INGLIS",
    country: "Australia",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:8,
    pic: "IPL_auction/assests/wk30.jpg",
  },
  {
    name: "KUSAL MENDIS",
    country: "Sri lanka",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk31.jpg",
  },
  {
    name: "RAHMANULLAH GURBAZ",
    country: "Afghanistan",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk32.jpg",
  },
  {
    name: "QUINTON DE KOCK",
    country: "South Africa",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk33.jpg",
  },
  {
    name: "ALEX CAREY",
    country: "Australia",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk34.jpg",
  },
  {
    name: "SAM BILLINGS",
    country: "England",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk35.jpg",
  },
  {
    name: "SHAI HOPE",
    country: "West Indies",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk36.jpg",
  },
  {
    name: "BHANUKA RAJAPAKSA",
    country: "Sri Lanka",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk37.jpg",
  },
  {
    name: "MATTHEW WADE",
    country: "Australia",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/wk38.jpg",
  },
  {
    name: "TOM BANTON",
    country: "England",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk39.jpg",
  },
  {
    name: "FINN ALLEN",
    country: "New Zealand",
    category: "Wicket Keeper",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/wk40.jpg",
  },

  {
    name: "YUZVENDRA CHAHAL",
    country: "India",
    category: "Spinner",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/spin1.jpg",
  },
  {
    name: "KULDEEP YADAV",
    country: "India",
    category: "Spinner",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/spin2.jpg",
  },
  {
    name: "VARUN CHAKARAVARTHY",
    country: "India",
    category: "Spinner",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/spin3.jpg",
  },
  {
    name: "RAVI BISHNOI",
    country: "India",
    category: "Spinner",
    basePrice: 2,
    foreign: false,
    points:10,
    pic: "IPL_auction/assests/spin4.jpg",
  },

  {
    name: "NOOR AHMAD",
    country: "Afghanistan",
    category: "Spinner",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/spin5.jpg",
  },
  {
    name: "RASHID KHAN",
    country: "Afghanistan",
    category: "Spinner",
    basePrice: 2,
    foreign: true,
    points:10,
    pic: "IPL_auction/assests/spin6.jpg",
  },
  {
    name: "MAHEESH THEEKSHANA",
    country: "Sri Lanka",
    category: "Spinner",
    basePrice: 2,
    foreign: true,
    points:8,
    pic: "IPL_auction/assests/spin7.jpg",
  },

  {
    name: "SUYASH SHARMA",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin8.jpg",
  },
  {
    name: "SHREYAS GOPAL",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/spin9.jpg",
  },
  {
    name: "PIYUSH CHAWLA",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin10.jpg",
  },
  {
    name: "SAI KISHORE",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin11.jpg",
  },
  {
    name: "DIGVESH RATHI",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/spin12.jpg",
  },
  {
    name: "SIDDHARTH MANIMARAN",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/spin13.jpg",
  },
  {
    name: "KARAN SHARMA",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/spin14.jpg",
  },
  {
    name: "PRAVEEN DUBEY",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/spin15.jpg",
  },
  {
    name: "KUMAR KARTIKEYA",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:4,
    pic: "IPL_auction/assests/spin16.jpg",
  },
  {
    name: "MAYANK MARKANDE",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin17.jpg",
  },
  {
    name: "RAHUL CHAHAR",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin18.jpg",
  },
  {
    name: "MURUGAN ASHWIN",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin19.jpg",
  },
  {
    name: "AMIT MISHRA",
    country: "India",
    category: "Spinner",
    basePrice: 1,
    foreign: false,
    points:6,
    pic: "IPL_auction/assests/spin20.jpg",
  },

  {
    name: "MUJEEB UR RAHMAN",
    country: "Afganistan",
    category: "Spinner",
    basePrice: 1,
    foreign: true,
    points:4,
    pic: "IPL_auction/assests/spin21.jpg",
  },
  {
    name: "IMRAN TAHIR",
    country: "South africa",
    category: "Spinner",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/spin22.jpg",
  },
  {
    name: "ADIL RASHID",
    country: "England",
    category: "Spinner",
    basePrice: 1,
    foreign: true,
    points:6,
    pic:" IPL_auction/assests/spin23.jpg",
  },
  {
    name: "TABRAIZ SHAMSI",
    country: "South africa",
    category: "Spinner",
    basePrice: 1,
    foreign: true,
    points:6,
    pic: "IPL_auction/assests/spin24.jpg",
  },

  {
    name: "ADAM ZAMPA",
    country: "Australia",
    category: "Spinner",
    basePrice: 1,
    foreign: true,
    points:6,
    pic:"IPL_auction/assests/spin25.jpg",
  },

  {
    name: "KESHAV MAHARAJ",
    country: "South africa",
    category: "Spinner",
    basePrice: 1,
    foreign: true,
    points:4,
    pic:"IPL_auction/assests/spin26.jpg",
  },
];

let currentPlayerIndex = 0;

/* Teams created from selection */
let teams = []; // { teamName, friendName, avatarDataUrl, budget, players:[], foreignCount, totalPoints: 0 }

/* rules */
const MAX_PLAYERS_PER_TEAM = 26;
const MAX_FOREIGN_PER_TEAM = 8;

/* auction state */
let currentPrice = 0;
let highestBidderIdx = -1; // index into teams array, -1 means no bids yet
const priceIncrement = 1; // 1 Cr per click (manual)
let timerInterval = null;
const NO_BID_SECONDS = 10; // <-- changed to 10s
let countdown = NO_BID_SECONDS;

/* DEFAULT budget per team (Crores) */
const DEFAULT_BUDGET = 100;

/* IPL team full names */
const IPL_TEAMS = [
  "Chennai Super Kings",
  "Mumbai Indians",
  "Royal Challengers Bengaluru",
  "Kolkata Knight Riders",
  "Rajasthan Royals",
  "Delhi Capitals",
  "Sunrisers Hyderabad",
  "Punjab Kings",
  "Gujarat Titans",
  "Lucknow Super Giants",
];

const TEAM_SHORT_NAMES = {
  "Chennai Super Kings": "CSK",
  "Mumbai Indians": "MI",
  "Royal Challengers Bengaluru": "RCB",
  "Kolkata Knight Riders": "KKR",
  "Rajasthan Royals": "RR",
  "Delhi Capitals": "DC",
  "Sunrisers Hyderabad": "SRH",
  "Punjab Kings": "PBKS",
  "Gujarat Titans": "GT",
  "Lucknow Super Giants": "LSG",
};

/* TEAM LOGOS */
const TEAM_LOGOS = {
  "Chennai Super Kings": "IPL_auction/assests/logo9.jpg",
  "Mumbai Indians": "IPL_auction/assests/logo5.jpg",
  "Royal Challengers Bengaluru": "IPL_auction/assests/logo2.jpg",
  "Kolkata Knight Riders": "IPL_auction/assests/logo10.jpg",
  "Rajasthan Royals": "IPL_auction/assests/logo3.jpg",
  "Delhi Capitals": "IPL_auction/assests/logo7.jpg",
  "Sunrisers Hyderabad": "IPL_auction/assests/logo1.jpg",
  "Punjab Kings": "IPL_auction/assests/logo4.jpg",
  "Gujarat Titans": "IPL_auction/assests/logo8.jpg",
  "Lucknow Super Giants": "IPL_auction/assests/logo6.jpg",
};

/* DOM refs */
const teamInputs = document.getElementById("team-inputs");
const auctionBlock = document.getElementById("auction-block");
const playerPic = document.getElementById("player-pic");
const playerNameEl = document.getElementById("player-name");
const playerCountryEl = document.getElementById("player-country");
const playerCategoryEl = document.getElementById("player-category");
const playerBaseEl = document.getElementById("player-base");
const timerEl = document.getElementById("timer");
const currentPriceEl = document.getElementById("current-price");
const highestBidderEl = document.getElementById("highest-bidder");
const bidButtonsDiv = document.getElementById("bid-buttons");
const teamsListDiv = document.getElementById("teams-list");
const auctionHistory = document.getElementById("auction-history");

/* Buttons (if present in your HTML) */
const applyCountBtn = document.getElementById("applyCount");
const exampleFillBtn = document.getElementById("exampleFill");
const startAuctionBtn = document.getElementById("startAuctionBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
const declineBtn = document.getElementById("declineBtn");
const nextPlayerHistoryBtn = document.getElementById("nextPlayerHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const toggleNextPlayersBtn = document.getElementById("toggleNextPlayersBtn");
const showWinnerBtn = document.getElementById("showWinnerBtn");
const viewSquadBtn = document.getElementById("viewSquadBtn");

/* Safe attach only if elements exist */
if (applyCountBtn) applyCountBtn.addEventListener("click", applyFriendCount);
if (exampleFillBtn) exampleFillBtn.addEventListener("click", fillExample);
if (startAuctionBtn) startAuctionBtn.addEventListener("click", startAuction);
if (clearBtn) clearBtn.addEventListener("click", clearSelections);
if (resetBtn) resetBtn.addEventListener("click", () => location.reload());
if (declineBtn) declineBtn.addEventListener("click", declineNow);
if (nextPlayerHistoryBtn)
  nextPlayerHistoryBtn.addEventListener("click", skipCurrentPlayer);
if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", clearHistory);
if (toggleNextPlayersBtn)
  toggleNextPlayersBtn.addEventListener("click", toggleNextPlayers);
if (showWinnerBtn) showWinnerBtn.addEventListener("click", () => showResult());
if (viewSquadBtn) viewSquadBtn.addEventListener("click", viewSquads);

/* ====== UI: build friend rows (friend left, team right, avatar upload) ====== */
function buildTeamRows(count) {
  teamInputs.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const row = document.createElement("div");
    row.className = "team-row";
    row.innerHTML = `
      <div class="team-left">
        <img id="avatar-preview-${i}" class="avatar-preview" src="" alt="" style="display:none">
        <label>Friend Name:</label>
        <input type="text" id="friend-name-${i}" placeholder="Enter friend name" />
        <input type="file" id="friend-file-${i}" accept="image/*" style="margin-left:8px" />
      </div>
      <div class="team-right">
        <label>IPL Team:</label>
        <select id="team-select-${i}">
          <option value="">Select Team</option>
        </select>
      </div>
    `;
    teamInputs.appendChild(row);

    // fill team select options (initially all teams)
    const sel = row.querySelector(`#team-select-${i}`);
    IPL_TEAMS.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.text = t;
      sel.appendChild(opt);
    });

    // file input preview handler (uploaded photo overrides team logo)
    const fileInput = row.querySelector(`#friend-file-${i}`);
    const previewImg = row.querySelector(`#avatar-preview-${i}`);

    // mark dataset.uploaded default false
    previewImg.dataset.uploaded = "false";

    fileInput.addEventListener("change", (ev) => {
      const f = ev.target.files[0];
      if (!f) {
        previewImg.dataset.uploaded = "false";
        const sel2 = document.getElementById(`team-select-${i}`);
        if (sel2 && sel2.value && TEAM_LOGOS[sel2.value]) {
          previewImg.src = TEAM_LOGOS[sel2.value];
          previewImg.style.display = "inline-block";
        } else {
          previewImg.style.display = "none";
          previewImg.src = "";
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewImg.style.display = "inline-block";
        previewImg.dataset.uploaded = "true"; // mark as uploaded image present
      };
      reader.readAsDataURL(f);
    });

    // team change -> enforce uniqueness & show team logo only if no uploaded photo
    sel.addEventListener("change", () => {
      updateTeamDropdowns();

      const preview = document.getElementById(`avatar-preview-${i}`);
      const selected = sel.value;
      // if preview image is uploaded by user, keep it (uploaded overrides)
      if (preview.dataset.uploaded === "true") {
        // user picture exists — do nothing
      } else {
        if (selected && TEAM_LOGOS[selected]) {
          preview.src = TEAM_LOGOS[selected];
          preview.style.display = "inline-block";
          preview.dataset.uploaded = "false";
        } else {
          preview.style.display = "none";
          preview.src = "";
          preview.dataset.uploaded = "false";
        }
      }
    });
  }
}

/* apply selected friend count */
function applyFriendCount() {
  const c = parseInt(document.getElementById("friend-count").value, 10) || 3;
  buildTeamRows(c);
  // update dropdowns immediately
  setTimeout(updateTeamDropdowns, 40);
}

/* fill example values */
function fillExample() {
  applyFriendCount();
  setTimeout(() => {
    const c = parseInt(document.getElementById("friend-count").value, 10) || 3;
    const names = [
      "Sathish",
      "Ravi",
      "Kumar",
      "Arun",
      "Vijay",
      "Anil",
      "Mani",
      "Karthik",
      "Suresh",
      "Pradeep",
    ];
    const picks = IPL_TEAMS.slice();
    for (let i = 0; i < c; i++) {
      const fn = document.getElementById(`friend-name-${i}`);
      const ts = document.getElementById(`team-select-${i}`);
      const preview = document.getElementById(`avatar-preview-${i}`);
      if (fn) fn.value = names[i] || `Friend ${i + 1}`;
      if (ts) ts.value = picks[i] || IPL_TEAMS[i % IPL_TEAMS.length];
      // set logo in preview if no uploaded image
      if (preview && preview.dataset.uploaded !== "true") {
        preview.src = TEAM_LOGOS[ts.value];
        preview.style.display = "inline-block";
        preview.dataset.uploaded = "false";
      }
    }
    updateTeamDropdowns();
  }, 100);
}

/* clear selections */
function clearSelections() {
  document.getElementById("friend-count").value = "3";
  buildTeamRows(3);
  setTimeout(updateTeamDropdowns, 40);
}

/* init default: show 3 friend rows */
buildTeamRows(3);
setTimeout(updateTeamDropdowns, 40);

/* ====== Team dropdown uniqueness helper ====== */
function updateTeamDropdowns() {
  const selects = Array.from(document.querySelectorAll('[id^="team-select-"]'));
  const selected = selects.map((s) => s.value).filter((v) => v);
  selects.forEach((s) => {
    const own = s.value;
    // recreate options
    s.innerHTML = "";
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.text = "Select Team";
    s.appendChild(defaultOpt);

    IPL_TEAMS.forEach((team) => {
      if (!selected.includes(team) || team === own) {
        const o = document.createElement("option");
        o.value = team;
        o.text = team;
        s.appendChild(o);
      }
    });
    s.value = own;
  });
}

/* ====== Start Auction (validate selections) ====== */
function startAuction() {
  const selects = Array.from(document.querySelectorAll('[id^="team-select-"]'));
  const count = selects.length;
  const selectedTeams = [];
  teams = [];
  for (let i = 0; i < count; i++) {
    const friendEl = document.getElementById(`friend-name-${i}`);
    const teamSel = document.getElementById(`team-select-${i}`);
    const preview = document.getElementById(`avatar-preview-${i}`);

    const friendName =
      friendEl && friendEl.value.trim()
        ? friendEl.value.trim()
        : `Friend ${i + 1}`;
    const teamName = teamSel ? teamSel.value : null;
    if (!teamName) {
      showNotification("Select team for all friends", 'error');
      return;
    }
    if (selectedTeams.includes(teamName)) {
      showNotification(`${teamName} already selected — choose different IPL teams`, 'error');
      return;
    }
    selectedTeams.push(teamName);

    // Determine avatar: uploaded photo takes priority, otherwise team logo
    let avatarDataUrl = "";
    if (preview && preview.dataset.uploaded === "true" && preview.src) {
      avatarDataUrl = preview.src;
    } else if (teamName && TEAM_LOGOS[teamName]) {
      avatarDataUrl = TEAM_LOGOS[teamName];
    }

    teams.push({
      teamName,
      friendName,
      avatarDataUrl,
      budget: DEFAULT_BUDGET,
      players: [],
      foreignCount: 0,
      totalPoints: 0,
    });
  }

  // Send auction start to all players if in multiplayer mode
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    socket.emit('startAuction', {
      roomId: currentRoomId,
      teams: teams
    });
  } else {
    // Single player mode
    document.getElementById("team-selection").style.display = "none";
    auctionBlock.style.display = "grid";
    populateBidButtons();
    updateTeamsView();
    currentPlayerIndex = 0;
    loadPlayer();
    showNotification('Auction Started!', 'success');
  }
}

/* ====== Populate bid buttons with avatar & friend name ====== */
function populateBidButtons() {
  bidButtonsDiv.innerHTML = "";
  teams.forEach((t, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    const avatarHtml = t.avatarDataUrl
      ? `<img src="${t.avatarDataUrl}" class="btn-avatar">`
      : "";
    btn.innerHTML = `${avatarHtml}<span style="white-space:nowrap">${escapeHtml(
      t.friendName
    )} — ${escapeHtml(t.teamName)}</span>`;
    btn.addEventListener("click", () => bidNow(idx));
    bidButtonsDiv.appendChild(btn);
  });
}

/* simple escape to avoid accidental HTML injection via names */
function escapeHtml(s) {
  if (!s) return "";
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ])
  );
}

/* ====== Load current player (no auto-increment here) ====== */
function loadPlayer() {
  if (currentPlayerIndex >= players.length) {
    alert("Auction finished for provided players.");
    highestBidderEl.textContent = "-";
    timerEl.textContent = "0s";
    return;
  }
  const p = players[currentPlayerIndex];
  playerPic.src = p.pic || "";
  playerNameEl.textContent = p.name;
  playerCountryEl.textContent = p.country;
  playerCategoryEl.textContent = p.category;
  playerBaseEl.textContent = p.basePrice;

  currentPrice = p.basePrice;
  highestBidderIdx = -1;
  currentPriceEl.textContent = currentPrice;
  highestBidderEl.textContent = "-";

  // reset countdown display, but DO NOT start timer until first bid
  countdown = NO_BID_SECONDS;
  timerEl.textContent = `${countdown}s`;

  // ensure any previous timer is cleared
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // refresh next players list on load
  filterPlayers();
}

/* ====== Helper: start countdown timer (starts only after first bid) ====== */
function startCountdownIfNeeded() {
  if (timerInterval) return; // already running
  timerInterval = setInterval(() => {
    countdown--;
    timerEl.textContent = `${countdown}s`;

    if (countdown <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      // if there is a highest bidder, finalize sale; otherwise mark unsold
      assignPlayer(false);
    }
  }, 1000);
}

/* ====== Bid Now handler (manual increment) ====== */
function bidNow(idx) {
  const t = teams[idx];
  const p = players[currentPlayerIndex];

  // validations
  if (t.budget < currentPrice + priceIncrement) {
    showNotification(
      `${t.friendName} does not have enough budget (₹${
        t.budget
      } Cr) for next bid (₹${currentPrice + priceIncrement} Cr)`,
      'error'
    );
    return;
  }
  if (p.foreign && t.foreignCount >= MAX_FOREIGN_PER_TEAM) {
    showNotification(
      `${t.friendName} (${t.teamName}) already has ${MAX_FOREIGN_PER_TEAM} foreign players`,
      'error'
    );
    return;
  }
  if (t.players.length >= MAX_PLAYERS_PER_TEAM) {
    showNotification(
      `${t.friendName} (${t.teamName}) already has ${MAX_PLAYERS_PER_TEAM} players`,
      'error'
    );
    return;
  }

  // set highest bidder and increment price
  highestBidderIdx = idx;
  currentPrice += priceIncrement;
  currentPriceEl.textContent = currentPrice;
  highestBidderEl.textContent = `${t.friendName} (${t.teamName})`;

  // reset countdown to full time and start it (only starts on first bid)
  countdown = NO_BID_SECONDS;
  timerEl.textContent = `${countdown}s`;
  startCountdownIfNeeded();

  // Send bid to other players if in multiplayer mode
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    socket.emit('placeBid', {
      roomId: currentRoomId,
      bidAmount: currentPrice,
      teamIndex: idx,
      playerName: `${t.friendName} (${t.teamName})`,
      socketId: socket.id
    });
  }
}

/* ====== Decline (skip) ====== */
function declineNow() {
  // stop timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  assignPlayer(true);
}

/* ====== Assign player to highest bidder or mark unsold ====== */
function assignPlayer(skipped = false) {
  const p = players[currentPlayerIndex];

  // clear timer if running
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (highestBidderIdx !== -1 && !skipped) {
    const team = teams[highestBidderIdx];
    // final price is currentPrice (last bid value)
    if (team.budget < currentPrice) {
      auctionHistory.insertAdjacentHTML(
        "afterbegin",
        `<li>⚠ ${p.name} - highest bidder ${team.friendName} couldn't afford ₹${currentPrice} Cr, marked UNSOLD</li>`
      );
    } else if (p.foreign && team.foreignCount >= MAX_FOREIGN_PER_TEAM) {
      auctionHistory.insertAdjacentHTML(
        "afterbegin",
        `<li>⚠ ${p.name} - ${team.friendName} already has ${MAX_FOREIGN_PER_TEAM} foreign players</li>`
      );
    } else if (team.players.length >= MAX_PLAYERS_PER_TEAM) {
      auctionHistory.insertAdjacentHTML(
        "afterbegin",
        `<li>⚠ ${p.name} - ${team.friendName} already has ${MAX_PLAYERS_PER_TEAM} players</li>`
      );
    } else {
      team.players.push(p);
      team.budget = +(team.budget - currentPrice).toFixed(2);
      team.totalPoints += p.points || 0;
      if (p.foreign) team.foreignCount++;
      auctionHistory.insertAdjacentHTML(
        "afterbegin",
        `<li>✅ ${p.name} → ${team.teamName} (${team.friendName}) sold for ₹${currentPrice} Cr (+${p.points || 0} pts)</li>`
      );
      updateLiveScoreboard();
    }
  } else {
    auctionHistory.insertAdjacentHTML(
      "afterbegin",
      `<li>❌ ${p.name} - UNSOLD</li>`
    );
  }

  // reset
  highestBidderIdx = -1;
  currentPlayerIndex++;
  updateTeamsView();

  // Send player assignment and next player event in multiplayer mode
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    const assignedPlayer = players[currentPlayerIndex - 1];
    const winningTeam = highestBidderIdx !== -1 ? teams[highestBidderIdx] : null;
    
    socket.emit('playerAssigned', {
      roomId: currentRoomId,
      player: assignedPlayer,
      winningTeam: winningTeam,
      price: currentPrice,
      skipped: skipped
    });
    
    socket.emit('nextPlayer', {
      roomId: currentRoomId,
      playerIndex: currentPlayerIndex
    });
  }

  setTimeout(() => {
    if (currentPlayerIndex < players.length) {
      loadPlayer();
    } else {
      showNotification("Auction completed for all players in the list.", 'success');
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      highestBidderEl.textContent = "-";
      timerEl.textContent = "0s";
      
      // Auto show final results when auction ends
      showResult();
      const showWinnerBtn = document.getElementById("showWinnerBtn");
      if (showWinnerBtn) {
        showWinnerBtn.style.display = "inline-block";
      }
    }
  }, 600);
}

/* ====== Skip current player from History (Next Player action) ====== */
function skipCurrentPlayer() {
  if (currentPlayerIndex >= players.length) {
    showNotification("No more players to skip.", 'info');
    return;
  }
  const p = players[currentPlayerIndex];
  auctionHistory.insertAdjacentHTML(
    "afterbegin",
    `<li>⏭ ${p.name} - SKIPPED (moved to next)</li>`
  );
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  highestBidderIdx = -1;
  currentPlayerIndex++;
  
  // Send next player event in multiplayer mode
  if (isMultiplayer && socket && socket.connected && currentRoomId) {
    socket.emit('nextPlayer', {
      roomId: currentRoomId,
      playerIndex: currentPlayerIndex
    });
  }
  
  updateTeamsView();
  if (currentPlayerIndex < players.length) {
    loadPlayer();
  } else {
    showNotification("Auction completed for all players in the list.", 'success');
    highestBidderEl.textContent = "-";
    timerEl.textContent = "0s";
    
    // Auto show final results when auction ends
    showResult();
    const showWinnerBtn = document.getElementById("showWinnerBtn");
    if (showWinnerBtn) {
      showWinnerBtn.style.display = "inline-block";
    }
  }
}

/* ====== Clear history ====== */
function clearHistory() {
  auctionHistory.innerHTML = "";
}

/* ====== Update Teams & Budget view ====== */
function updateTeamsView() {
  teamsListDiv.innerHTML = "";
  teams.forEach((t) => {
    const div = document.createElement("div");
    div.className = "team-card";
    div.innerHTML = `
      <div class="team-left-display">
        ${
          t.avatarDataUrl
            ? `<img src="${t.avatarDataUrl}" class="avatar-preview">`
            : `<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.02);display:inline-block"></div>`
        }
        <div>
          <div style="font-weight:700">${escapeHtml(
            t.friendName
          )} <span style="color:var(--muted)">(${escapeHtml(
      t.teamName
    )})</span></div>
          <div class="team-meta">Budget: ₹${t.budget} Cr • Players: ${
      t.players.length
    } • Foreign: ${t.foreignCount} • Points: ${t.totalPoints}</div>
        </div>
      </div>
      <div style="text-align:right;font-size:13px;color:var(--muted)">${escapeHtml(
        t.players.slice(0, 2).map(p => typeof p === 'string' ? p : p.name).join(", ")
      )}${t.players.length > 2 ? "..." : ""}</div>
    `;
    teamsListDiv.appendChild(div);
  });
}

/* ====== Pagination variables ====== */
let currentPage = 0;
const playersPerPage = 5;
let filteredPlayersList = [];

/* ====== Next Players table with pagination ====== */
function fillNextPlayersTable(list) {
  filteredPlayersList = list;
  const tbody = document.querySelector("#nextPlayersTable tbody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted)">No players</td></tr>`;
    updatePaginationControls(0, 0);
    return;
  }

  const startIndex = currentPage * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const pageData = list.slice(startIndex, endIndex);

  pageData.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.country)}</td>
        <td>${escapeHtml(p.category)}</td>
        <td>₹${p.basePrice} Cr</td>
        <td>${p.points || 0}</td>
      </tr>`;
  });

  updatePaginationControls(list.length, pageData.length);
}

function filterPlayers() {
  const country = document.getElementById("country").value;
  const role = document.getElementById("role").value;

  // slice from currentPlayerIndex + 1 so we show players after current
  let filtered = players.slice(currentPlayerIndex + 1);

  if (country !== "All") {
    if (country === "India") {
      filtered = filtered.filter((p) => p.country === "India");
    } else {
      filtered = filtered.filter((p) => p.country !== "India");
    }
  }

  if (role !== "All") {
    const normalizedRole = role.toLowerCase().replace(/\s|-|_/g, "");
    filtered = filtered.filter(
      (p) => p.category.toLowerCase().replace(/\s|-|_/g, "") === normalizedRole
    );
  }

  currentPage = 0;
  fillNextPlayersTable(filtered);
}

function updatePaginationControls(totalItems, currentItems) {
  const totalPages = Math.ceil(totalItems / playersPerPage);
  let controlsHtml = '';
  
  if (totalPages > 1) {
    controlsHtml = `
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px;justify-content:center">
        <button onclick="previousPage()" ${currentPage === 0 ? 'disabled' : ''}>Previous</button>
        <span>Page ${currentPage + 1} of ${totalPages}</span>
        <button onclick="nextPage()" ${currentPage >= totalPages - 1 ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }
  
  let existingControls = document.getElementById('pagination-controls');
  if (!existingControls) {
    existingControls = document.createElement('div');
    existingControls.id = 'pagination-controls';
    document.getElementById('nextPlayersTable').parentNode.appendChild(existingControls);
  }
  existingControls.innerHTML = controlsHtml;
}

window.nextPage = function() {
  currentPage++;
  fillNextPlayersTable(filteredPlayersList);
}

window.previousPage = function() {
  currentPage--;
  fillNextPlayersTable(filteredPlayersList);
}

function toggleNextPlayers() {
  const table = document.getElementById("nextPlayersTable");
  table.classList.toggle("hidden");
  if (!table.classList.contains("hidden")) {
    filterPlayers();
  }
}

/* ====== Utility: add more player (dev helper) ====== */
function addPlayer(name, country, category, base, foreign, pic) {
  players.push({ name, country, category, basePrice: base, foreign, pic });
}

/* initialize next players table visibility & default filter */
filterPlayers();
document.getElementById("country").value = "All";
document.getElementById("role").value = "All";

/* ====== VIEW SQUADS TABLE - White table, Orange header ====== */
function viewSquads() {
  const teamsListDiv = document.getElementById("teams-list");
  teamsListDiv.innerHTML = ""; // clear previous

  const activeTeams = teams.filter((t) => t.players.length > 0);
  if (activeTeams.length === 0) {
    teamsListDiv.textContent = "No teams have players yet.";
    return;
  }

  activeTeams.forEach((team) => {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginBottom = "16px";
    table.style.border = "1px solid #ccc";
    table.style.backgroundColor = "#0d1b2a"; // dark background

    const caption = document.createElement("caption");
    caption.textContent = `${team.teamName} (${team.friendName})`;
    caption.style.fontWeight = "bold";
    caption.style.marginBottom = "8px";
    caption.style.color = "#fff";
    table.appendChild(caption);

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Batsmen", "Bowlers", "All-Rounders", "Wicket-Keepers", "Spinners"].forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      th.style.border = "1px solid #fff";
      th.style.padding = "6px";
      th.style.backgroundColor = "#ff9800"; // header orange
      th.style.color = "#fff"; // white text
      th.style.fontWeight = "600";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");

    const categories = ["Batsman", "Bowler", "All-Rounder", "Wicket Keeper", "Spinner"];
    categories.forEach((cat) => {
      const td = document.createElement("td");
      td.style.border = "1px solid #ccc";
      td.style.padding = "6px";
      td.style.textAlign = "center";
      td.style.color = "#fff";

      const catPlayers = team.players
        .filter((p) => {
          const player = typeof p === 'string' ? players.find(pl => pl.name === p) : p;
          return player && player.category.toLowerCase().includes(cat.toLowerCase().replace(' ', ''));
        });

      td.textContent = catPlayers.map((p) => typeof p === 'string' ? p : p.name).join(", ") || "None";
      row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);
    teamsListDiv.appendChild(table);
  });
}

// Multiplayer functionality
let socket = null;
let currentRoomId = null;
let isMultiplayer = false;
let playerData = null;

// Initialize socket connection
function initializeSocket() {
  // Always connect to current server
  const serverUrl = `${window.location.protocol}//${window.location.host}`;
  
  socket = io(serverUrl, {
    transports: ['websocket', 'polling'],
    timeout: 20000,
    forceNew: true
  });
  
  console.log('Connecting to server:', serverUrl);

  socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
    updateConnectionStatus(true);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    updateConnectionStatus(false);
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    updateConnectionStatus(false);
  });

  setupSocketListeners();
}

function updateConnectionStatus(connected) {
  const statusEl = document.getElementById('connectionStatus');
  if (!statusEl) {
    const status = document.createElement('div');
    status.id = 'connectionStatus';
    status.style.cssText = 'position:fixed;top:10px;right:10px;padding:5px 10px;border-radius:5px;font-size:12px;z-index:1000';
    document.body.appendChild(status);
  }
  const statusElement = document.getElementById('connectionStatus');
  if (connected) {
    statusElement.textContent = '🟢 Connected';
    statusElement.style.backgroundColor = '#4CAF50';
    statusElement.style.color = 'white';
  } else {
    statusElement.textContent = '🔴 Disconnected';
    statusElement.style.backgroundColor = '#f44336';
    statusElement.style.color = 'white';
  }
}

function setupSocketListeners() {
  socket.on('roomCreated', (roomId) => {
    console.log('Room created:', roomId);
    currentRoomId = roomId;
    document.getElementById('roomId').value = roomId;
    const statusText = `Room ${roomId} created - Share this ID with other players`;
    document.getElementById('roomStatus').textContent = statusText;
    document.getElementById('roomStatus').style.color = '#4CAF50';
    showNotification(`Room Created: ${roomId}`, 'success');
    isMultiplayer = true;
  });

  socket.on('joinedRoom', (data) => {
    console.log('Successfully joined room:', data);
    currentRoomId = data.roomId;
    const statusText = `Connected to Room ${data.roomId} - ${data.players.length} player(s)`;
    document.getElementById('roomStatus').textContent = statusText;
    document.getElementById('roomStatus').style.color = '#4CAF50';
    showNotification(`Joined Room: ${data.roomId}`, 'success');
    isMultiplayer = true;
  });

  socket.on('joinError', (error) => {
    console.error('Join error:', error);
    const statusEl = document.getElementById('roomStatus');
    if (statusEl) {
      statusEl.textContent = `Failed to join room: ${error}`;
      statusEl.style.color = '#f44336';
    }
    showNotification(`Join Error: ${error}`, 'error');
    // Clear room input on error
    const roomInput = document.getElementById('roomId');
    if (roomInput) roomInput.value = '';
  });

  socket.on('playerJoined', (data) => {
    if (currentRoomId) {
      document.getElementById('roomStatus').textContent = `Room ${currentRoomId} - ${data.playerCount} player(s) connected`;
      document.getElementById('roomStatus').style.color = '#4CAF50';
      if (data.playerId !== socket.id) {
        showNotification(`Player joined: ${data.newPlayer?.name || 'Unknown'}`, 'info');
      }
    }
  });

  socket.on('playerLeft', (data) => {
    showNotification(`Player left the room`, 'info');
  });

  socket.on('auctionStarted', (data) => {
    console.log('Auction started:', data);
    // Sync teams and game state for ALL players
    if (data.teams) {
      teams = data.teams;
      currentPlayerIndex = data.gameState.currentPlayerIndex || 0;
      // Hide selection and show auction for all players
      document.getElementById("team-selection").style.display = "none";
      auctionBlock.style.display = "grid";
      populateBidButtons();
      updateTeamsView();
      loadPlayer();
      showNotification('Auction Started - All players can bid!', 'success');
    }
  });

  socket.on('bidPlaced', (data) => {
    console.log('Bid received:', data);
    // Only update if this bid is from another player
    if (data.socketId !== socket.id) {
      currentPrice = data.bidAmount;
      highestBidderIdx = data.teamIndex;
      currentPriceEl.textContent = currentPrice;
      highestBidderEl.textContent = data.playerName;
      
      // Reset timer
      countdown = NO_BID_SECONDS;
      timerEl.textContent = `${countdown}s`;
      startCountdownIfNeeded();
      
      showNotification(`${data.playerName} bid ₹${data.bidAmount} Cr`, 'info');
    }
  });

  socket.on('playerChanged', (data) => {
    console.log('Player changed:', data);
    // Move to next player
    currentPlayerIndex = data.gameState.currentPlayerIndex;
    highestBidderIdx = -1;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    if (currentPlayerIndex < players.length) {
      loadPlayer();
      showNotification('Next player loaded', 'info');
    } else {
      showNotification('Auction completed!', 'success');
      showResult();
    }
  });

  socket.on('gameStateUpdated', (gameState) => {
    console.log('Game state updated:', gameState);
    // Sync game state
    if (gameState.currentPlayerIndex !== undefined) {
      currentPlayerIndex = gameState.currentPlayerIndex;
    }
    if (gameState.currentPrice !== undefined) {
      currentPrice = gameState.currentPrice;
      currentPriceEl.textContent = currentPrice;
    }
  });

  socket.on('playerAssigned', (data) => {
    console.log('Player assigned:', data);
    if (data.winningTeam && !data.skipped) {
      // Find the team in local teams array and update it
      const teamIndex = teams.findIndex(t => t.teamName === data.winningTeam.teamName);
      if (teamIndex !== -1) {
        // Only add if player not already in team
        const playerExists = teams[teamIndex].players.some(p => 
          (typeof p === 'string' ? p : p.name) === data.player.name
        );
        if (!playerExists) {
          teams[teamIndex].players.push(data.player);
          teams[teamIndex].budget = +(teams[teamIndex].budget - data.price).toFixed(2);
          teams[teamIndex].totalPoints += data.player.points || 0;
          if (data.player.foreign) teams[teamIndex].foreignCount++;
        }
        updateTeamsView();
        updateLiveScoreboard();
      }
    }
  });
}

// Get user info and initialize socket
function initializeMultiplayer() {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    playerData = JSON.parse(userInfo);
    initializeSocket();
  }
}

// Get buttons & input
const createBtn = document.getElementById("createRoom");
const joinBtn = document.getElementById("joinRoom");
const roomInput = document.getElementById("roomId");

// Create Room button click
if (createBtn) {
  createBtn.addEventListener("click", () => {
    if (!socket) {
      showNotification('Socket not initialized. Please refresh the page.', 'error');
      return;
    }
    
    if (!socket.connected) {
      showNotification('Not connected to server. Trying to reconnect...', 'error');
      socket.connect();
      return;
    }
    
    const userData = {
      name: playerData?.name || 'Anonymous',
      email: playerData?.email || '',
      uid: playerData?.uid || socket.id
    };
    
    console.log('Creating room with userData:', userData);
    socket.emit("createRoom", userData);
  });
}

// Join Room button click
if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    const id = roomInput.value.trim().toUpperCase();
    if (!id) {
      showNotification('Enter a Room ID to join!', 'error');
      return;
    }
    
    if (!socket) {
      showNotification('Socket not initialized. Please refresh the page.', 'error');
      return;
    }
    
    if (!socket.connected) {
      showNotification('Not connected to server. Trying to reconnect...', 'error');
      socket.connect();
      return;
    }
    
    const userData = {
      name: playerData?.name || 'Anonymous',
      email: playerData?.email || '',
      uid: playerData?.uid || socket.id
    };
    
    console.log('Attempting to join room:', id, 'Socket connected:', socket.connected);
    document.getElementById('roomStatus').textContent = `Joining room ${id}...`;
    document.getElementById('roomStatus').style.color = '#2196F3';
    socket.emit("joinRoom", { roomId: id, userData });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 50px;
    right: 20px;
    padding: 10px 15px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 1001;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  switch(type) {
    case 'success':
      notification.style.backgroundColor = '#4CAF50';
      break;
    case 'error':
      notification.style.backgroundColor = '#f44336';
      break;
    case 'info':
    default:
      notification.style.backgroundColor = '#2196F3';
      break;
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Initialize multiplayer when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeMultiplayer, 1000);
});






// UPDATE LIVE SCOREBOARD
function updateLiveScoreboard() {
  const board = document.getElementById("teamBoard");
  if (!board) return;
  
  board.innerHTML = "";
  teams.forEach(team => {
    const shortName = TEAM_SHORT_NAMES[team.teamName] || team.teamName;
    board.innerHTML += `
      <div class="team-box">
        ${shortName}<br>
        ${team.friendName}<br>
        Players: ${team.players.length}<br>
        Points: ${team.totalPoints}
      </div>
    `;
  });
}



/***********************
 * AUCTION STATE
 ***********************/
let auctionEnded = false; // auction running by default

/***********************
 * CALL DURING AUCTION
 * (points hidden)
 ***********************/
function showLiveTable() {
  auctionEnded = false;
  renderWinnerTable();
}

/***********************
 * SHOW CURRENT STANDINGS
 * (can be called anytime)
 ***********************/
function showCurrentStandings() {
  auctionEnded = false;
  renderWinnerTable();
}

/***********************
 * CALL WHEN AUCTION ENDS
 * (points visible)
 ***********************/
function showResult() {
  auctionEnded = true; // ✅ THIS LINE reveals points
  renderWinnerTable();
}

/***********************
 * COMMON RENDER FUNCTION
 ***********************/
function renderWinnerTable() {
  const winnerDiv = document.getElementById("winnerArea");
  if (!winnerDiv) {
    console.error("Winner area not found!");
    return;
  }

  winnerDiv.style.display = "block";

  const activeTeams = teams.filter(
    t => t.players && t.players.length > 0
  );

  if (activeTeams.length === 0) {
    winnerDiv.innerHTML = "<p style='text-align:center; color:#ff8c00; font-size:18px;'>No teams have players yet. Start the auction first!</p>";
    return;
  }

  const sorted = [...activeTeams].sort(
    (a, b) => (b.totalPoints || 0) - (a.totalPoints || 0)
  );

  let html = `
    <h2 style="text-align:center; color:#ff8c00; margin:20px 0;">🏆 FINAL WINNER TABLE</h2>
    <table class="winner-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Friend</th>
          <th>Players</th>
          <th>Budget Left</th>
          ${auctionEnded ? "<th>Total Points</th>" : ""}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  sorted.forEach((team, index) => {
    let status = "";
    let rowClass = "";

    if (index === 0) {
      status = "🥇 WINNER";
      rowClass = "gold";
    } else if (index === 1) {
      status = "🥈 RUNNER-UP";
      rowClass = "silver";
    } else if (index === 2) {
      status = "🥉 THIRD";
      rowClass = "bronze";
    } else {
      status = `#${index + 1}`;
    }

    html += `
      <tr class="${rowClass}">
        <td>${index + 1}</td>
        <td>${escapeHtml(team.teamName)}</td>
        <td>${escapeHtml(team.friendName)}</td>
        <td>${team.players.length}</td>
        <td>₹${team.budget} Cr</td>
        ${auctionEnded ? `<td><strong>${team.totalPoints || 0}</strong></td>` : ""}
        <td><strong>${status}</strong></td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>

  `;
  
  winnerDiv.innerHTML = html;
  winnerDiv.scrollIntoView({ behavior: "smooth" });
  
  console.log("Winner table rendered successfully!");
}
