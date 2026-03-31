const fetchR = async () => {
    try {
      const response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=restaurant&bounded=1&viewbox=-0.1478,51.5274,-0.1078,51.4874&limit=10');
      console.log('STATUS:', response.status);
      const data = await response.json();
      console.log('RESULTS:', data.length);
      if(data.length > 0) console.log(data[0].name);
    } catch (e) {
      console.error(e);
    }
}
fetchR();
