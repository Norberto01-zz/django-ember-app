import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `Person ${i}`; },
  phone() {
    let date = new Date();
    let component = [
      Date.now(),
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
      Math.random().toString().replace('0.', '')
    ];
    return `809${component.join("").substring(0, 6)}`;
  },
  email() {
    let date = new Date();
    let component = [
      Date.now(),
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
      Math.random().toString().replace('0.', '')
    ];
    return `${component.join("").substring(0, 8)}@gmail.com`;
  },
  active: true,
  signup_token() {
    let date = new Date();
    let component = [
      Date.now(),
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
      Math.random().toString().replace('0.', '')
    ];
    return `${component.join("").substring(0, 40)}`;
  },
  created_date: '2016-11-26 14:04:24.080094',
  write_date: '2016-11-26 15:04:24.080094',
});
