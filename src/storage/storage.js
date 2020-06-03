export function loadEventsFromLocalStorage(date, base) {
    const exchangeRatesData = JSON.parse(localStorage.getItem(`${date}-${base}`));

    return exchangeRatesData;
};

export function saveEventsToLocalStorage (date, base, exchangeRatesData) {
    localStorage.setItem(`${date}-${base}`, JSON.stringify(exchangeRatesData));
};
