export default {
  methods: {
    whatDay(day) {
      let result;
      switch (day) {
        case 0:
          result = "Sunday";
          break;
        case 1:
          result = "Monday";
          break;
        case 2:
          result = "Tuesday";
          break;
        case 3:
          result = "Wednesday";
          break;
        case 4:
          result = "Thursday";
          break;
        case 5:
          result = "Friday";
          break;
        case 6:
          result = "Saturday";
          break;
      }
      return result;
    },
    doDate(date) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();
      let h = new Date().getHours();
      let m = new Date().getMinutes();
      day = day < 10 ? '0' + day : day;
      month = month < 10 ? '0' + month : month;
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return `${day}.${month}.${year}, ${h}:${m}`
    },
    whatTemp(temp) {
      const newTemp = Math.round(temp);
      return newTemp > 0 ? `+${newTemp}` : newTemp;
    },
    whatWindDir(deg) {
      if (deg > 11.25 && deg <= 33.75) {
        return "NNE";
      } else if (deg > 33.75 && deg <= 56.25) {
        return "ENE";
      } else if (deg > 56.25 && deg <= 78.75) {
        return "E";
      } else if (deg > 78.75 && deg <= 101.25) {
        return "ESE";
      } else if (deg > 101.25 && deg <= 123.75) {
        return "ESE";
      } else if (deg > 123.75 && deg <= 146.25) {
        return "SE";
      } else if (deg > 146.25 && deg <= 168.75) {
        return "SSE";
      } else if (deg > 168.75 && deg <= 191.25) {
        return "S";
      } else if (deg > 191.25 && deg <= 213.75) {
        return "SSW";
      } else if (deg > 213.75 && deg <= 236.25) {
        return "SW";
      } else if (deg > 236.25 && deg <= 258.75) {
        return "WSW";
      } else if (deg > 258.75 && deg <= 281.25) {
        return "W";
      } else if (deg > 281.25 && deg <= 303.75) {
        return "WNW";
      } else if (deg > 303.75 && deg <= 326.25) {
        return "NW";
      } else if (deg > 326.25 && deg <= 348.75) {
        return "NNW";
      } else {
        return "N";
      }
    }
  }
}