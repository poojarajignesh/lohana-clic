// src/data/locations.js

export const locationData = {
  "Gujarat": {
    "Ahmedabad": {
      "Sanand": ["Sanand City", "Modasar", "Chekhla", "Nidhrad"],
      "Daskroi": ["Aslali", "Bopal", "Bareja", "Bhuvaldi"],
      "Viramgam": ["Viramgam City", "Sachana", "Karakthal"]
    },
    "Rajkot": {
      "Gondal": ["Gondal City", "Ribda", "Gomta", "Bhundikhakhra"],
      "Jetpur": ["Jetpur City", "Navagadh", "Derdi", "Pithadiya"],
      "Morbi": ["Morbi City", "Halvad", "Tankara"]
    },
    "Jamnagar": {
      "Dhrol": ["Dhrol City", "Jodiya", "Latipel"],
      "Jamjodhpur": ["Jamjodhpur City", "Sidsar"]
    }
  },
  "Maharashtra": {
    "Mumbai": {
      "Andheri": ["Andheri East", "Andheri West"],
      "Borivali": ["Borivali East", "Borivali West"]
    },
    "Pune": {
      "Haveli": ["Khadakwasla", "Manjari", "Wagholi"],
      "Baramati": ["Baramati City", "Malegaon"]
    }
  }
};

export const getStates = () => Object.keys(locationData);

export const getDistricts = (state) => Object.keys(locationData[state] || {});

export const getTalukas = (state, district) => Object.keys(locationData[state]?.[district] || {});

export const getVillages = (state, district, taluka) => locationData[state]?.[district]?.[taluka] || [];