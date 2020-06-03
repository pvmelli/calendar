export function getDaysOfAWeek(date) {
    let week = []
    
    for (let i = 1; i <= 7; i++) {
      let first = date.getDate() - date.getDay() + i 
      let day = new Date(date.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }

    return week;
}

export function getDateOfISOWeek(w, y) {
    let simple = new Date(y, 0, 1 + (w - 1) * 7);
    let dow = simple.getDay();
    let ISOweekStart = simple;
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    }else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

  return ISOweekStart;
};