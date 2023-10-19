(() => {
  // node_modules/nanoid/index.browser.js
  var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte > 62) {
      id += "-";
    } else {
      id += "_";
    }
    return id;
  }, "");

  // public/javascripts/booking.js
  function error_msg(message, element_ids) {
    for (let i = 0; i < element_ids.length; i++) {
      document.getElementById(element_ids[i]).classList.toggle("error_borders");
    }
    document.getElementById("error_section").classList.toggle("hide");
    document.getElementById("error_text").innerHTML = message;
    console.log(message);
  }
  function hide_errors() {
    document.getElementById("error_section").classList.toggle("hide");
  }
  hide_errors();
  function createBooking(data2) {
    console.log(data2);
  }
  var isFirstRun = false;
  var card_number = document.getElementById("card_number");
  var expiry_date = document.getElementById("expiry_date");
  var counter = 1;
  card_number.addEventListener("input", () => card_number.value = formatNumber(card_number.value.replaceAll(" ", "")));
  var formatNumber = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && index % 4 == 0)
      seed += " ";
    return seed + next;
  }, "");
  expiry_date.addEventListener("input", () => expiry_date.value = slasher(expiry_date.value.replaceAll(" ")));
  var slasher = (number) => number.split("").reduce((seed, next, index) => {
    if (index % 2 == 0 && index !== 0 && !expiry_date.value.includes("/"))
      seed += "/";
    return seed + next;
  }, "");
  function getBookingDetails() {
    isFirstRun = true;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let cvc = document.getElementById("cvc").value;
    let time = document.getElementById("time").value;
    let skill_level = document.getElementById("skill_level").value;
    let current_date = /* @__PURE__ */ new Date();
    let input_date = new Date(date);
    let input_date_time = input_date.getTime();
    let current_date_time = current_date.getTime();
    let invalid_name = name == "";
    let invalid_date = !(input_date_time >= current_date_time);
    let invalid_email = !(email.includes("@") && email.includes("."));
    let isError = false;
    input_date = input_date.toDateString();
    if (invalid_name) {
      error_msg("Invalid name input", ["name"]);
      isError = true;
    } else if (invalid_email) {
      error_msg("Invalid email input", ["email"]);
      isError = true;
    } else if (invalid_date) {
      error_msg("Invalid date", ["date"]);
      isError = true;
    }
    let data2 = {
      "name": name,
      "email": email,
      "card_number": card_number.value,
      "expiry_date": expiry_date.value,
      "cvc": cvc,
      "time": time,
      "date": input_date,
      "skill_level": skill_level,
      "id": nanoid()
    };
    if (isError == false) {
      createBooking(data2);
    }
    console.log(data2);
  }
  function autoFill(data2) {
    let id_desc = ["name", "email", "card_number", "expiry_date", "cvc", "time", "date", "skill_level"];
    for (let i = 0; i < id_desc.length; i++) {
      let key = id_desc[i];
      let value = data2[key];
      data2[key] = value;
      document.getElementById(key).value = value;
    }
  }
  var data = {
    "name": "Emmanuel Koledoye",
    "email": "example@gmail.com",
    "card_number": "1111 2222 3333 4444",
    "expiry_date": "10/28",
    "cvc": "123",
    "time": "17:00",
    "date": "31/10/2023",
    "skill_level": "Advanced"
  };
  autoFill(data);
  if (isFirstRun) {
    getBookingDetails();
  }
  document.getElementById("submit_button").addEventListener("click", getBookingDetails);
  function autoDate() {
    let today = (/* @__PURE__ */ new Date()).toJSON().slice(0, 10);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toJSON().slice(0, 10);
    document.getElementById("date").value = tomorrow;
  }
  autoDate();
  counter = 0;
  function flashNotice() {
    if (counter == 0) {
      document.getElementById("notice").classList.toggle("flash");
      counter = 1;
    } else {
      document.getElementById("notice").classList.toggle("not-flash");
      counter = 0;
    }
    setTimeout(flashNotice, 700);
  }
  flashNotice();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5icm93c2VyLmpzIiwgImJvb2tpbmcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7IHVybEFscGhhYmV0IH0gZnJvbSAnLi91cmwtYWxwaGFiZXQvaW5kZXguanMnXG5leHBvcnQgbGV0IHJhbmRvbSA9IGJ5dGVzID0+IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxuZXhwb3J0IGxldCBjdXN0b21SYW5kb20gPSAoYWxwaGFiZXQsIGRlZmF1bHRTaXplLCBnZXRSYW5kb20pID0+IHtcbiAgbGV0IG1hc2sgPSAoMiA8PCAoTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikpIC0gMVxuICBsZXQgc3RlcCA9IC1+KCgxLjYgKiBtYXNrICogZGVmYXVsdFNpemUpIC8gYWxwaGFiZXQubGVuZ3RoKVxuICByZXR1cm4gKHNpemUgPSBkZWZhdWx0U2l6ZSkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBieXRlcyA9IGdldFJhbmRvbShzdGVwKVxuICAgICAgbGV0IGogPSBzdGVwXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIGlkICs9IGFscGhhYmV0W2J5dGVzW2pdICYgbWFza10gfHwgJydcbiAgICAgICAgaWYgKGlkLmxlbmd0aCA9PT0gc2l6ZSkgcmV0dXJuIGlkXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgbGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBzaXplID0gMjEpID0+XG4gIGN1c3RvbVJhbmRvbShhbHBoYWJldCwgc2l6ZSwgcmFuZG9tKVxuZXhwb3J0IGxldCBuYW5vaWQgPSAoc2l6ZSA9IDIxKSA9PlxuICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKS5yZWR1Y2UoKGlkLCBieXRlKSA9PiB7XG4gICAgYnl0ZSAmPSA2M1xuICAgIGlmIChieXRlIDwgMzYpIHtcbiAgICAgIGlkICs9IGJ5dGUudG9TdHJpbmcoMzYpXG4gICAgfSBlbHNlIGlmIChieXRlIDwgNjIpIHtcbiAgICAgIGlkICs9IChieXRlIC0gMjYpLnRvU3RyaW5nKDM2KS50b1VwcGVyQ2FzZSgpXG4gICAgfSBlbHNlIGlmIChieXRlID4gNjIpIHtcbiAgICAgIGlkICs9ICctJ1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCArPSAnXydcbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH0sICcnKVxuIiwgIi8vID8gYWRkIGEgdmFsaWRhdGlvbiBmaWxlP1xyXG4vLyB0b2RvOiBzZXR1cCBtb25nb0RCICsgbW9uZ29vc2VcclxuLy8gdG9kbzogdXNlIGZ1c2VqcyAgZm9yIHRoZSBzZWFyY2ggZnVuY3Rpb24gKCBodHRwczovL3d3dy5mdXNlanMuaW8vIClcclxuLy8gdG9kbzogdXNlIG5hbm9pZCBmb3IgdXNlcmlkXHJcbi8vIHRvZG86IGxvb2sgaW50byB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIE1vbmdvREIgYW5kIG1vbmdvb3NlIGNhdXNlIHRoZXkgYXJlIHNlcGVyYXRlIGJ1dCBpcyBwcm9iIGJldHRlciBvZmYgdXNpbmcgTW9uZ29EQnMgdmVyc2lvblxyXG5cclxuLy8gZmlyZWJhc2UgaG9zdGluZzpjaGFubmVsOmRlcGxveSBwcmV2aWV3IChhdCByb290KVxyXG5cclxuaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnbmFub2lkJztcclxuLy8gY29uc3QgbmFub2lkID0gcmVxdWlyZShcIm5hbm9pZFwiKTtcclxuXHJcbi8vIHRvZG86IGNyZWF0ZSBlcnJvciBtZXNzYWdlIHNlY3Rpb25cclxuZnVuY3Rpb24gZXJyb3JfbXNnKG1lc3NhZ2UsIGVsZW1lbnRfaWRzKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50X2lkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRfaWRzW2ldKS5jbGFzc0xpc3QudG9nZ2xlKFwiZXJyb3JfYm9yZGVyc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yX3NlY3Rpb25cIikuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yX3RleHRcIikuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpOyAvLyAhIGhlbHBzIHdpdGggZGVidWdnaW5nIGFuZCB3aWxsIGJlIHJlbW92ZWQgbGF0ZXJcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZV9lcnJvcnMoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yX3NlY3Rpb25cIikuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XHJcbn1cclxuXHJcbi8vICEgaGlkZSB0aGUgZXJyb3Igc2VjaXRvbiBmb3IgdGhlIHBhZ2UgbG9kYXNcclxuaGlkZV9lcnJvcnMoKTtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtKU09OfSBkYXRhIFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlQm9va2luZyhkYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxufVxyXG5cclxuXHJcbi8vICEgR0xPQkFMXHJcbi8vIHRoZSBib29sZWFuIHZhbHVlIGhlbHB0IHNvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBoYXMgYWxyZWFkeSBydW4gc28gdGhhdCB0aGUgdXNlciB3b24ndCBoYXZlIHRvIHNlZSBlcnJvciBtZXNzYWdlcyBiZWZvcmUgdGhleSBjYW4gZXZlbiBpbnB1dCBhbnl0aGluZ1xyXG5sZXQgaXNGaXJzdFJ1biA9IGZhbHNlO1xyXG5cclxuLy8gbm8gLnZhbHVlIGJlY2F1c2UgaSdtIHVzaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgd2lsbCBsYXRlciBnZXQgdGhlaXIgdmFsdWVcclxubGV0IGNhcmRfbnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkX251bWJlclwiKTtcclxubGV0IGV4cGlyeV9kYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBpcnlfZGF0ZVwiKTtcclxuXHJcbi8vICEgQ0FSRCBERVRBSUxTIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxubGV0IGNvdW50ZXIgPSAxO1xyXG5cclxuY2FyZF9udW1iZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IGNhcmRfbnVtYmVyLnZhbHVlID0gZm9ybWF0TnVtYmVyKGNhcmRfbnVtYmVyLnZhbHVlLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKSk7XHJcblxyXG5jb25zdCBmb3JtYXROdW1iZXIgPSAobnVtYmVyKSA9PiBudW1iZXIuc3BsaXQoXCJcIikucmVkdWNlKChzZWVkLCBuZXh0LCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGluZGV4ICE9PSAwICYmIGluZGV4ICUgNCA9PSAwKSBzZWVkICs9IFwiIFwiO1xyXG4gICAgcmV0dXJuIHNlZWQgKyBuZXh0O1xyXG59LCBcIlwiKTtcclxuLy8gYWRkIGEgc2xhc2ggYXV0b21pY2FsbHkgZm9yIHRoZSBleHBpcnkgZGF0ZSBpbmJldHdlZW4gdGhlIDJuZCBhbmQgM3JkIG51bWJlclxyXG5leHBpcnlfZGF0ZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gZXhwaXJ5X2RhdGUudmFsdWUgPSBzbGFzaGVyKGV4cGlyeV9kYXRlLnZhbHVlLnJlcGxhY2VBbGwoXCIgXCIpKSk7XHJcblxyXG5jb25zdCBzbGFzaGVyID0gKG51bWJlcikgPT4gbnVtYmVyLnNwbGl0KFwiXCIpLnJlZHVjZSgoc2VlZCwgbmV4dCwgaW5kZXgpID0+IHtcclxuICAgIGlmIChpbmRleCAlIDIgPT0gMCAmJiBpbmRleCAhPT0gMCAmJiAhZXhwaXJ5X2RhdGUudmFsdWUuaW5jbHVkZXMoXCIvXCIpKSBzZWVkICs9IFwiL1wiO1xyXG4gICAgcmV0dXJuIHNlZWQgKyBuZXh0O1xyXG59LCBcIlwiKTtcclxuXHJcbi8vICEgQ0FSRCBERVRBSUxTIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9va2luZ0RldGFpbHMoKSB7XHJcbiAgICBpc0ZpcnN0UnVuID0gdHJ1ZTtcclxuICAgIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lXCIpLnZhbHVlO1xyXG4gICAgbGV0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZTtcclxuICAgIGxldCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlO1xyXG4gICAgbGV0IGN2YyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3ZjXCIpLnZhbHVlO1xyXG4gICAgbGV0IHRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikudmFsdWU7XHJcbiAgICBsZXQgc2tpbGxfbGV2ZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsX2xldmVsXCIpLnZhbHVlO1xyXG5cclxuICAgIGxldCBjdXJyZW50X2RhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGlucHV0X2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHJcbiAgICBsZXQgaW5wdXRfZGF0ZV90aW1lID0gaW5wdXRfZGF0ZS5nZXRUaW1lKCk7XHJcbiAgICBsZXQgY3VycmVudF9kYXRlX3RpbWUgPSBjdXJyZW50X2RhdGUuZ2V0VGltZSgpO1xyXG5cclxuICAgIGxldCBpbnZhbGlkX25hbWUgPSBuYW1lID09IFwiXCI7XHJcbiAgICBsZXQgaW52YWxpZF9kYXRlID0gIShpbnB1dF9kYXRlX3RpbWUgPj0gY3VycmVudF9kYXRlX3RpbWUpO1xyXG4gICAgbGV0IGludmFsaWRfZW1haWwgPSAhKGVtYWlsLmluY2x1ZGVzKFwiQFwiKSAmJiBlbWFpbC5pbmNsdWRlcyhcIi5cIikpO1xyXG5cclxuICAgIGxldCBpc0Vycm9yID0gZmFsc2U7XHJcbiAgICBpbnB1dF9kYXRlID0gaW5wdXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcclxuXHJcbiAgICBpZiAoaW52YWxpZF9uYW1lKSB7XHJcbiAgICAgICAgZXJyb3JfbXNnKFwiSW52YWxpZCBuYW1lIGlucHV0XCIsIFtcIm5hbWVcIl0pO1xyXG4gICAgICAgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW52YWxpZF9lbWFpbCkge1xyXG4gICAgICAgIGVycm9yX21zZyhcIkludmFsaWQgZW1haWwgaW5wdXRcIiwgW1wiZW1haWxcIl0pO1xyXG4gICAgICAgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW52YWxpZF9kYXRlKSB7XHJcbiAgICAgICAgZXJyb3JfbXNnKFwiSW52YWxpZCBkYXRlXCIsIFtcImRhdGVcIl0pO1xyXG4gICAgICAgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICEgc2VuZCB0aGlzIHRvIE1vbmdvREIgbGF0ZXJcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAgIFwiZW1haWxcIjogZW1haWwsXHJcbiAgICAgICAgXCJjYXJkX251bWJlclwiOiBjYXJkX251bWJlci52YWx1ZSxcclxuICAgICAgICBcImV4cGlyeV9kYXRlXCI6IGV4cGlyeV9kYXRlLnZhbHVlLFxyXG4gICAgICAgIFwiY3ZjXCI6IGN2YyxcclxuICAgICAgICBcInRpbWVcIjogdGltZSxcclxuICAgICAgICBcImRhdGVcIjogaW5wdXRfZGF0ZSxcclxuICAgICAgICBcInNraWxsX2xldmVsXCI6IHNraWxsX2xldmVsLFxyXG4gICAgICAgIFwiaWRcIjogbmFub2lkKCksXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpc0Vycm9yID09IGZhbHNlKSB7XHJcbiAgICAgICAgY3JlYXRlQm9va2luZyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGF1dG9GaWxsKGRhdGEpIHtcclxuICAgIGxldCBpZF9kZXNjID0gW1wibmFtZVwiLCBcImVtYWlsXCIsIFwiY2FyZF9udW1iZXJcIiwgXCJleHBpcnlfZGF0ZVwiLCBcImN2Y1wiLCBcInRpbWVcIiwgXCJkYXRlXCIsIFwic2tpbGxfbGV2ZWxcIl07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZF9kZXNjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGlkX2Rlc2NbaV07XHJcbiAgICAgICAgbGV0IHZhbHVlID0gZGF0YVtrZXldO1xyXG5cclxuICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXkpLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vICEgc2VuZCB0aGlzIHRvIE1vbmdvREIgbGF0ZXJcclxubGV0IGRhdGEgPSB7XHJcbiAgICBcIm5hbWVcIjogXCJFbW1hbnVlbCBLb2xlZG95ZVwiLFxyXG4gICAgXCJlbWFpbFwiOiBcImV4YW1wbGVAZ21haWwuY29tXCIsXHJcbiAgICBcImNhcmRfbnVtYmVyXCI6IFwiMTExMSAyMjIyIDMzMzMgNDQ0NFwiLFxyXG4gICAgXCJleHBpcnlfZGF0ZVwiOiBcIjEwLzI4XCIsXHJcbiAgICBcImN2Y1wiOiBcIjEyM1wiLFxyXG4gICAgXCJ0aW1lXCI6IFwiMTc6MDBcIixcclxuICAgIFwiZGF0ZVwiOiBcIjMxLzEwLzIwMjNcIixcclxuICAgIFwic2tpbGxfbGV2ZWxcIjogXCJBZHZhbmNlZFwiXHJcbn07XHJcblxyXG5hdXRvRmlsbChkYXRhKTtcclxuXHJcblxyXG5pZiAoaXNGaXJzdFJ1bikge1xyXG4gICAgZ2V0Qm9va2luZ0RldGFpbHMoKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRCb29raW5nRGV0YWlscyk7XHJcblxyXG4vLyB0aGlzIGZ1bmN0aW9uIGRvZXNuJ3QgbmVlZCB0byB3YWl0IGZvciB0aGUgc3VibWl0IGJ1dHRvbiB0byBiZSBwcmVzc2VkXHJcbmZ1bmN0aW9uIGF1dG9EYXRlKCkge1xyXG4gICAgLy8gYXV0b21pY2FsbHkgc2V0IHRoZSBjdXJyZW50IGRhdGVcclxuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCkudG9KU09OKCkuc2xpY2UoMCwgMTApO1xyXG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcclxuICAgIHRvbW9ycm93ID0gdG9tb3Jyb3cudG9KU09OKCkuc2xpY2UoMCwgMTApO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlID0gdG9tb3Jyb3c7XHJcbn1cclxuYXV0b0RhdGUoKTtcclxuXHJcbmNvdW50ZXIgPSAwO1xyXG5mdW5jdGlvbiBmbGFzaE5vdGljZSgpIHtcclxuICAgIGlmIChjb3VudGVyID09IDApIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGljZVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiZmxhc2hcIik7XHJcbiAgICAgICAgY291bnRlciA9IDE7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGljZVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwibm90LWZsYXNoXCIpO1xyXG4gICAgICAgIGNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoZmxhc2hOb3RpY2UsIDcwMCk7XHJcbn1cclxuXHJcbmZsYXNoTm90aWNlKCk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBbUJPLE1BQUksU0FBUyxDQUFDLE9BQU8sT0FD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
