export function getSelectedWeek() {
    const weekOfTheYear = document.querySelector('#week-input').value;
    const year = weekOfTheYear.slice(0,4)
    const week = weekOfTheYear.slice(6,8)
    const selectedWeek = [week, year]

    return selectedWeek;
};

export function closeModal() {
    const $modal = document.querySelector('#event-modal');
    $modal.classList.add('not-display');
};

