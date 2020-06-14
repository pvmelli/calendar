export function showInstructions() {
    const $instructions = document.querySelector('#instructions');
    $instructions.classList.remove('not-display');
    
    const $closeInstructionsButton = document.querySelector('#close-instructions-button');
    $closeInstructionsButton.addEventListener('click', () => {$instructions.classList.add('not-display')});
};

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

