const eventsData = [
  {
    id: 1,
    title: "Event 1",
    price: "₹100",
    tag: "TCET",
    college: "TCET",
    image: "/event1.jpg",
    desc:"This is a brief description for Event 1.",
    phone_no: "1234567890"
  },
  {
    id: 2,
    title: "Event 2",
    price: "₹200",
    tag: "IITB",
    college: "IITB",
    image: "/event2.jpg",
    desc:"This is a brief description for Event 2.",
    phone_no: "1234567890"
  },
  {
    id: 3,
    title: "Event 3",
    price: "₹300",
    tag: "IITD",
    college: "IITD",
    image: "/event3.jpg",
    desc:"This is a brief description for Event 3.",
    phone_no: "1234567890"
  },
  {
    id: 4,
    title: "Event 4",
    price: "₹400",
    tag: "VJTI",
    college: "VJTI",
    image: "/event4.jpg",
    desc:"This is a brief description for Event 4.",
    phone_no: "1234567890"
  },
  {
    id: 5,
    title: "Event 5",
    price: "₹500",
    tag: "COEP",
    college: "COEP",
    image: "/event5.jpg",
    desc:"This is a brief description for Event 5.",
    phone_no: "1234567890"
  },
  {
    id: 6,
    title: "Event 6",
    price: "₹600",
    tag: "SPIT",
    college: "SPIT",
    image: "/event6.jpg",
    desc:"This is a brief description for Event 6.",
    phone_no: "1234567890"
  },
  {
    id: 7,
    title: "Event 7",
    price: "₹700",
    tag: "XYZ",
    college: "XYZ",
    image: "/event7.jpg",
    desc:"This is a brief description for Event 7.",
    phone_no: "1234567890"
  },
  {
    id: 8,
    title: "Event 8",
    price: "₹800",
    tag: "ABC",
    college: "ABC",
    image: "/event8.jpg",
    desc:"This is a brief description for Event 8.",
    phone_no: "1234567890"
  },
  {
    id: 9,
    title: "Event 9",
    price: "₹900",
    tag: "DEF",
    college: "DEF",
    image: "/event9.jpg",
    desc:"This is a brief description for Event 9.",
    phone_no: "1234567890"
  },
  {
    id: 10,
    title: "Event 10",
    price: "₹1000",
    tag: "GHI",
    college: "GHI",
    image: "/event10.jpg",
    desc:"This is a brief description for Event 10.",
    phone_no: "1234567890"
  },
  {
    id: 11,
    title: "Event 11",
    price: "₹1100",
    tag: "JKL",
    college: "JKL",
    image: "/event11.jpg",
    desc:"This is a brief description for Event 11.",
    phone_no: "1234567890"
  },
  {
    id: 12,
    title: "Event 12",
    price: "₹1200",
    tag: "MNO",
    college: "MNO",
    image: "/event12.jpg",
    desc:"This is a brief description for Event 12.",
    phone_no: "1234567890"
  },
  {
    id: 13,
    title: "Event 13",
    price: "₹1300",
    tag: "PQR",
    college: "PQR",
    image: "/event13.jpg",
    desc:"This is a brief description for Event 13.",
    phone_no: "1234567890"
  },
  {
    id: 14,
    title: "Event 14",
    price: "₹1400",
    tag: "STU",
    college: "STU",
    image: "/event14.jpg",
    desc:"This is a brief description for Event 14.",
    phone_no: "1234567890"
  },
  {
    id: 15,
    title: "Event 15",
    price: "₹1500",
    tag: "VWX",
    college: "VWX",
    image: "/event15.jpg",
    desc:"This is a brief description for Event 15.",
    phone_no: "1234567890"
  },
  {
    id: 16,
    title: "Event 16",
    price: "₹1600",
    tag: "YZA",
    college: "YZA",
    image: "/event16.jpg",
    desc:"This is a brief description for Event 16.",
    phone_no: "1234567890"
  },
  {
    id: 17,
    title: "Event 17",
    price: "₹1700",
    tag: "BCD",
    college: "BCD",
    image: "/event17.jpg",
    desc:"This is a brief description for Event 17.",
    phone_no: "1234567890"
  },
  {
    id: 18,
    title: "Event 18",
    price: "₹1800",
    tag: "EFG",
    college: "EFG",
    image: "/event18.jpg",
    desc:"This is a brief description for Event 18.",
    phone_no: "1234567890"
  },
  {
    id: 19,
    title: "Event 19",
    price: "₹1900",
    tag: "HIJ",
    college: "HIJ",
    image: "/event19.jpg",
    desc:"This is a brief description for Event 19.",
    phone_no: "1234567890"
  },
  {
    id: 20,
    title: "Event 20",
    price: "₹2000",
    tag: "KLM",
    college: "KLM",
    image: "/event20.jpg",
    desc:"This is a brief description for Event 20.",
    phone_no: "1234567890"
  },
  {
    id: 21,
    title: "Event 21",
    price: "₹2100",
    tag: "NOP",
    college: "NOP",
    image: "/event21.jpg",
    desc:"This is a brief description for Event 21.",
    phone_no: "1234567890"
  },
   {
    id: 22,
    title: "Event 22",
    price: "₹2200",
    tag: "PQR",
    college: "PQR",
    image: "/event22.jpg",
    desc:"This is a brief description for Event 22.",
    phone_no: "1234567890"
  },
  {
    id: 23,
    title: "Event 23",
    price: "₹2300",
    tag: "IITB",
    college: "IITB",
    image: "/event23.jpg",
    desc:"This is a brief description for Event 23.",
    phone_no: "1234567890"
  },
  {
    id: 24,
    title: "Event 24",
    price: "₹2400",
    tag: "IITD",
    college: "IITD",
    image: "/event24.jpg",
    desc:"This is a brief description for Event 24."
  },
  {
    id: 25,
    title: "Event 25",
    price: "₹2500",
    tag: "VJTI",
    college: "VJTI",
    image: "/event25.jpg",
    desc:"This is a brief description for Event 25."
  },
  {
    id: 26,
    title: "Event 26",
    price: "₹2600",
    tag: "XYZ",
    college: "XYZ",
    image: "/event26.jpg",
    desc:"This is a brief description for Event 26."
  },
  {
    id: 27,
    title: "Event 27",
    price: "₹2700",
    tag: "SPIT",
    college: "SPIT",
    image: "/event27.jpg",
    desc:"This is a brief description for Event 27."
  },
  {
    id: 28,
    title: "Event 28",
    price: "₹2800",
    tag: "XYZ",
    college: "XYZ",
    image: "/event28.jpg",
    desc:"This is a brief description for Event 28."
  },
  {
    id: 29,
    title: "Event 29",
    price: "₹2900",
    tag: "ABC",
    college: "ABC",
    image: "/event29.jpg",
    desc:"This is a brief description for Event 29."
  },
  {
    id: 30,
    title: "Event 30",
    price: "₹900",
    tag: "DEF",
    college: "DEF",
    image: "/event30.jpg",
    desc:"This is a brief description for Event 30."
  },
  {
    id: 31,
    title: "Event 31",
    price: "₹1000",
    tag: "GHI",
    college: "GHI",
    image: "/event31.jpg",
    desc:"This is a brief description for Event 31."
  },
  
  {
    id: 32,
    title: "Event 32",
    price: "₹1200",
    tag: "MNO",
    college: "MNO",
    image: "/event32.jpg",
    desc:"This is a brief description for Event 32."
  },
  {
    id: 33,
    title: "Event 33",
    price: "₹1300",
    tag: "PQR",
    college: "PQR",
    image: "/event33.jpg",
    desc:"This is a brief description for Event 33."
  },
  {
    id: 34,
    title: "Event 34",
    price: "₹1400",
    tag: "STU",
    college: "STU",
    image: "/event34.jpg",
    desc:"This is a brief description for Event 34."
  },
  {
    id: 35,
    title: "Event 35",
    price: "₹1500",
    tag: "VWX",
    college: "VWX",
    image: "/event35.jpg",
    desc:"This is a brief description for Event 35."
  },
  {
    id: 36,
    title: "Event 36",
    price: "₹1600",
    tag: "YZA",
    college: "YZA",
    image: "/event36.jpg",
    desc:"This is a brief description for Event 36."
  },
  {
    id: 37,
    title: "Event 37",
    price: "₹1700",
    tag: "BCD",
    college: "BCD",
    image: "/event37.jpg",
    desc:"This is a brief description for Event 37."
  },
  {
    id: 38,
    title: "Event 38",
    price: "₹1800",
    tag: "EFG",
    college: "EFG",
    image: "/event38.jpg",
    desc:"This is a brief description for Event 38."
  },
  {
    id: 39,
    title: "Event 39",
    price: "₹1900",
    tag: "HIJ",
    college: "HIJ",
    image: "/event39.jpg",
    desc:"This is a brief description for Event 39."
  },
  {
    id: 40,
    title: "Event 40",
    price: "₹2000",
    tag: "KLM",
    college: "KLM",
    image: "/event40.jpg",
    desc:"This is a brief description for Event 40."
  },
  {
    id: 41,
    title: "Event 41",
    price: "₹2100",
    tag: "NOP",
    college: "NOP",
    image: "/event41.jpg",
    desc:"This is a brief description for Event 41.",
    phone_no: "1234567890"
  },
  {
    id: 42,
    title: "Event 42",
    price: "₹2200",
    tag: "PQR",
    college: "PQR",
    image: "/event42.jpg",
    desc:"This is a brief description for Event 42.",
    phone_no: "1234567890"
  },
  {
    id: 43,
    title: "Event 43",
    price: "₹2300",
    tag: "STU",
    college: "STU",
    image: "/event43.jpg",
    desc:"This is a brief description for Event 43.",
    phone_no: "1234567890"
  }
];

export default eventsData;