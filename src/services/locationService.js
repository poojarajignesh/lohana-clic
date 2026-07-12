export async function loadStates() {
  return fetch("/location/states.json")
    .then(res => res.json());
}

export async function loadDistricts() {
  return fetch("/location/districts.json")
    .then(res => res.json());
}

export async function loadTalukas() {
  return fetch("/location/talukas.json")
    .then(res => res.json());
}

export async function loadCities() {
  return fetch("/location/cities.json")
    .then(res => res.json());
}