const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage with stunning ocean views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stylish loft in the heart of the city.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: { type: "Point", coordinates: [-74.0060, 40.7128] }
  },
  {
    title: "Mountain Retreat",
    description: "Peaceful cabin surrounded by mountains.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Beautiful villa in Tuscany with vineyards.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Unique treehouse experience in nature.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    price: 800,
    location: "Portland",
    country: "United States",
    geometry: { type: "Point", coordinates: [-122.6765, 45.5152] }
  },
  {
    title: "Beachfront Paradise",
    description: "Relax in this beachfront condo.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Lake view cabin perfect for relaxation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geometry: { type: "Point", coordinates: [-120.0324, 39.0968] }
  },
  {
    title: "Luxury Penthouse",
    description: "Penthouse with amazing city views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
  },
  {
    title: "Ski Chalet",
    description: "Luxury chalet in the Swiss Alps.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    geometry: { type: "Point", coordinates: [7.2266, 46.0960] }
  },
  {
    title: "Safari Lodge",
    description: "Wildlife safari experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e" },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    geometry: { type: "Point", coordinates: [34.6857, -2.3333] }
  },
  {
    title: "Canal House",
    description: "Historic canal house stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] }
  },
  {
    title: "Private Island Retreat",
    description: "Entire island experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972" },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    geometry: { type: "Point", coordinates: [178.0650, -17.7134] }
  },
  {
    title: "Cotswolds Cottage",
    description: "Charming English countryside stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f" },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    geometry: { type: "Point", coordinates: [-1.8433, 51.8330] }
  },
  {
    title: "Boston Brownstone",
    description: "Historic Boston home.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1533619239233-6280475a633a" },
    price: 2200,
    location: "Boston",
    country: "United States",
    geometry: { type: "Point", coordinates: [-71.0589, 42.3601] }
  },
  {
    title: "Bali Bungalow",
    description: "Beach bungalow with pool.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602391833977-358a52198938" },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    geometry: { type: "Point", coordinates: [115.1889, -8.4095] }
  },
  {
    title: "Banff Cabin",
    description: "Cabin with mountain views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb" },
    price: 1500,
    location: "Banff",
    country: "Canada",
    geometry: { type: "Point", coordinates: [-115.5708, 51.1784] }
  },
  {
    title: "Miami Apartment",
    description: "Art Deco apartment.",
    image: { filename: "listingimage", url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579" },
    price: 1600,
    location: "Miami",
    country: "United States",
    geometry: { type: "Point", coordinates: [-80.1918, 25.7617] }
  },
  {
    title: "Phuket Villa",
    description: "Luxury tropical villa.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9" },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    geometry: { type: "Point", coordinates: [98.3381, 7.8804] }
  },
  {
    title: "Scottish Castle",
    description: "Historic castle stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98" },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    geometry: { type: "Point", coordinates: [-4.2026, 57.1200] }
  },
  {
    title: "Dubai Oasis",
    description: "Luxury desert stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] }
  },
  {
    title: "Montana Cabin",
    description: "Rustic cabin in nature.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f" },
    price: 1100,
    location: "Montana",
    country: "United States",
    geometry: { type: "Point", coordinates: [-110.3626, 46.8797] }
  },
  {
    title: "Greek Villa",
    description: "Mediterranean beachfront villa.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f" },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    geometry: { type: "Point", coordinates: [25.3289, 37.4467] }
  },
  {
    title: "Costa Rica Treehouse",
    description: "Eco-friendly stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7" },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: { type: "Point", coordinates: [-83.7534, 9.7489] }
  },
  {
    title: "Charleston Cottage",
    description: "Historic southern charm.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904" },
    price: 1600,
    location: "Charleston",
    country: "United States",
    geometry: { type: "Point", coordinates: [-79.9311, 32.7765] }
  },
  {
    title: "Tokyo Apartment",
    description: "Modern city apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd" },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    geometry: { type: "Point", coordinates: [139.6503, 35.6762] }
  },
  {
    title: "New Hampshire Cabin",
    description: "Lakefront cabin retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce" },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    geometry: { type: "Point", coordinates: [-71.5724, 43.1939] }
  },
  {
    title: "Maldives Villa",
    description: "Overwater luxury villa.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000" },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    geometry: { type: "Point", coordinates: [73.2207, 3.2028] }
  },
  {
    title: "Aspen Ski Chalet",
    description: "Luxury ski experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" },
    price: 4000,
    location: "Aspen",
    country: "United States",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] }
  },
  {
    title: "Costa Rica Beach House",
    description: "Secluded oceanfront stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2" },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: { type: "Point", coordinates: [-83.7534, 9.7489] }
  }
];

module.exports = sampleListings;