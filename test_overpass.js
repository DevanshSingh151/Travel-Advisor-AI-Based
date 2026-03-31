const fetchR = async () => {
    const baseLat = 51.5074;
    const baseLng = -0.1278;
    const queryTag = 'node["amenity"="restaurant"]["name"]';
    
    const query = `
      [out:json][timeout:10];
      nwr["amenity"="restaurant"]["name"](around:2000, ${baseLat}, ${baseLng});
      out center 15;
    `;
    
    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      console.log('STATUS:', response.status);
      const text = await response.text();
      console.log('TEXT:', text);
    } catch (e) {
      console.error(e);
    }
}
fetchR();
