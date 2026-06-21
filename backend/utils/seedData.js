require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
console.log('URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');
const Route = require('../models/Route');

const udaipurRoutes = [
  {
    routeNumber: '1',
    name: 'Balicha → Badgaon',
    from: 'Balicha',
    to: 'Badgaon',
    popular: true,
    frequency: '35 mins',
    firstBus: '06:00 AM',
    lastBus: '09:00 PM',
    stops: [
      { name: 'Balicha',          lat: 24.5502, lng: 73.6891 },
      { name: 'Sec 14',           lat: 24.5560, lng: 73.6950 },
      { name: 'Railway Station',  lat: 24.5769, lng: 73.7134 },
      { name: 'Udaipole',         lat: 24.5820, lng: 73.7100 },
      { name: 'Surajpole',        lat: 24.5848, lng: 73.7075 },
      { name: 'Delhi Gate',       lat: 24.5862, lng: 73.7044 },
      { name: 'Court Choraha',    lat: 24.5871, lng: 73.7010 },
      { name: 'Sukhadiya Circle', lat: 24.5880, lng: 73.6975 },
      { name: 'Fatehpura Circle', lat: 24.5860, lng: 73.6930 },
      { name: 'Syphon Circle',    lat: 24.5840, lng: 73.6890 },
      { name: 'Badgaon',          lat: 24.5800, lng: 73.6820 },
    ],
  },
  {
    routeNumber: '2',
    name: 'Badgaun → Titardi',
    from: 'Badgaun',
    to: 'Titardi',
    popular: true,
    frequency: '30 mins',
    firstBus: '06:00 AM',
    lastBus: '09:00 PM',
    stops: [
      { name: 'Badgaun',          lat: 24.5800, lng: 73.6820 },
      { name: 'Syphon Circle',    lat: 24.5840, lng: 73.6890 },
      { name: 'Fatehpura Circle', lat: 24.5860, lng: 73.6930 },
      { name: 'Sukhadia Circle',  lat: 24.5880, lng: 73.6975 },
      { name: 'Chetak Circle',    lat: 24.5900, lng: 73.7010 },
      { name: 'Court Choraha',    lat: 24.5871, lng: 73.7010 },
      { name: 'Delhi Gate',       lat: 24.5862, lng: 73.7044 },
      { name: 'Surajpole',        lat: 24.5848, lng: 73.7075 },
      { name: 'Seva Ashram',      lat: 24.5950, lng: 73.7150 },
      { name: 'Sector 3',         lat: 24.6000, lng: 73.7200 },
      { name: 'Sector 4',         lat: 24.6050, lng: 73.7250 },
      { name: 'Sector 6',         lat: 24.6100, lng: 73.7300 },
      { name: 'Titardi',          lat: 24.6150, lng: 73.7350 },
    ],
  },
  {
    routeNumber: '3',
    name: 'Dabok → Rampura',
    from: 'Dabok',
    to: 'Rampura Chowk',
    popular: true,
    frequency: '35 mins',
    firstBus: '06:30 AM',
    lastBus: '08:30 PM',
    stops: [
      { name: 'Dabok',                     lat: 24.6177, lng: 73.8961 },
      { name: 'Debari',                    lat: 24.6100, lng: 73.8500 },
      { name: 'Transport Nagar',           lat: 24.6050, lng: 73.8100 },
      { name: 'Pratapnagar',               lat: 24.5980, lng: 73.7800 },
      { name: 'Railway Station',           lat: 24.5769, lng: 73.7134 },
      { name: 'Seva Ashram',               lat: 24.5950, lng: 73.7150 },
      { name: 'Surajpole',                 lat: 24.5848, lng: 73.7075 },
      { name: 'Delhi Gate',                lat: 24.5862, lng: 73.7044 },
      { name: 'Court Chauraha',            lat: 24.5871, lng: 73.7010 },
      { name: 'MB Hospital',               lat: 24.5833, lng: 73.7026 },
      { name: 'Chetak Circle',             lat: 24.5900, lng: 73.7010 },
      { name: 'Siksha Bhawan Circle',      lat: 24.5920, lng: 73.6960 },
      { name: 'Fateh Sagar',               lat: 24.6010, lng: 73.6870 },
      { name: 'Rada Ji Circle',            lat: 24.5980, lng: 73.6820 },
      { name: 'Malla Talai',               lat: 24.5950, lng: 73.6780 },
      { name: 'Rampura Chowk',             lat: 24.5900, lng: 73.6750 },
    ],
  },
  {
    routeNumber: '4',
    name: 'Amberi → Savina',
    from: 'Amberi',
    to: 'Balicha via Savina',
    popular: false,
    frequency: '30 mins',
    firstBus: '06:00 AM',
    lastBus: '09:00 PM',
    stops: [
      { name: 'Amberi',                      lat: 24.6300, lng: 73.7500 },
      { name: 'Sukher',                      lat: 24.6250, lng: 73.7400 },
      { name: 'Bhuvana Bypass',              lat: 24.6200, lng: 73.7300 },
      { name: 'R.T.O.',                      lat: 24.6150, lng: 73.7200 },
      { name: 'Pratap Nagar',                lat: 24.5980, lng: 73.7800 },
      { name: 'Railway Station (Rana Pratap)',lat: 24.5769, lng: 73.7134 },
      { name: 'Thokar',                      lat: 24.6050, lng: 73.7400 },
      { name: 'Seva Ashram',                 lat: 24.5950, lng: 73.7150 },
      { name: 'Sector Road',                 lat: 24.6000, lng: 73.7300 },
      { name: 'Hiran Magri Police Station',  lat: 24.6100, lng: 73.7100 },
      { name: 'Savina Circle',               lat: 24.6050, lng: 73.7120 },
      { name: 'Balicha',                     lat: 24.5502, lng: 73.6891 },
    ],
  },
  {
    routeNumber: '5',
    name: 'Circular Route',
    from: 'Chungi Naka',
    to: 'Chungi Naka (Circular)',
    popular: false,
    frequency: '40 mins',
    firstBus: '07:00 AM',
    lastBus: '08:00 PM',
    stops: [
      { name: 'Chungi Naka',        lat: 24.5833, lng: 73.6800 },
      { name: 'CA Circle',          lat: 24.5870, lng: 73.6850 },
      { name: 'Savina',             lat: 24.6050, lng: 73.7120 },
      { name: 'Sector 6',           lat: 24.6100, lng: 73.7300 },
      { name: 'Seva Ashram',        lat: 24.5950, lng: 73.7150 },
      { name: 'Thokar',             lat: 24.6050, lng: 73.7400 },
      { name: 'Dhulkot',            lat: 24.6100, lng: 73.7500 },
      { name: 'University Main Gate',lat: 24.6050, lng: 73.7600 },
      { name: 'Lake City Mall',      lat: 24.5980, lng: 73.7650 },
      { name: 'Shastri Circle',      lat: 24.5900, lng: 73.7500 },
      { name: 'Delhi Gate',          lat: 24.5862, lng: 73.7044 },
      { name: 'Surajpole',           lat: 24.5848, lng: 73.7075 },
      { name: 'Udaipole',            lat: 24.5820, lng: 73.7100 },
      { name: 'Railway Station',     lat: 24.5769, lng: 73.7134 },
      { name: 'Paras Sec 14',        lat: 24.5560, lng: 73.6950 },
      { name: 'Chungi Naka',         lat: 24.5833, lng: 73.6800 },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Route.deleteMany({});
    console.log('🗑️  Cleared existing routes');

    await Route.insertMany(udaipurRoutes);
    console.log(`🌱 Seeded ${udaipurRoutes.length} real Udaipur bus routes`);

    mongoose.disconnect();
    console.log('✅ Done!');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seedDB();