let fetchPolyfill;

before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
    .then((response) => {
        fetchPolyfill = response.body;
    });

    cy.visit('localhost:8080/index.html', {
        onBeforeLoad(contentWindow) {
            delete contentWindow.fetch;
            contentWindow.eval(fetchPolyfill);
            contentWindow.fetch = contentWindow.unfetch;
        },
    });
});

describe ('Verifica que la página se cargue correctamente', () => {
    it('Verifica que las instrucciones se muestren la primera vez que entra al sitio', () => {
        cy.server();
        cy.route('./src/services/events.json', 'fixture:events')
        .as('obtainEvents');

        cy.get('#instructions').should('not.have.class','not-display');
            cy.get('#instructions-content').find('.instructions-box').should('have.length', 3)
            cy.get('#instructions-content').find('p').should('have.length', 3)
            cy.get('#instructions-content').find('.fa').should('have.length', 3)

        cy.get('#close-instructions-button').click()
        cy.get('#instructions').should('have.class','not-display');

    })
    it ('Verifica que el calendario y los eventos se carguen', () => {
        cy.server();
        cy.route('./src/services/events.json', 'fixture:events')
        .as('obtainEvents');

        cy.get('#event-modal').should('have.class', 'not-display')

        cy.get('#calendar-container').should('have.descendants', '.day-table')
        cy.get('.day-table').should('have.length', 7)

        const WEEK = ['2020-04-20','2020-04-21','2020-04-22','2020-04-23','2020-04-24','2020-04-25','2020-04-26',]

        WEEK.forEach((day) => {
            cy.get('.day-table').find('thead').find('th').contains(day);
        })

        cy.get('.day-table').find('td').should('have.length', 24*7)

        cy.get('[data-hour=2020-04-26-22]').should('have.descendants', '.event')

        cy.get('.event').should('have.attr', 'data-obj')
        cy.get('.event').should('have.text', 'Evento 1')
        cy.get('.event').find('.fa').should('have.length', 3)
        
    });

    it('Verifica que la semana pueda cambiarse', () => {
        cy.server();
        cy.route('./src/services/events.json', 'fixture:events')
        .as('obtainEvents');

        cy.get('#week-input').type('2020-W18')

        cy.get('#event-modal').should('have.class', 'not-display')

        cy.get('#calendar-container').should('have.descendants', '.day-table')
        cy.get('.day-table').should('have.length', 7)

        const WEEK = ['2020-04-27','2020-04-28','2020-04-29','2020-04-30','2020-05-01','2020-05-02','2020-05-03',]

        WEEK.forEach((day) => {
            cy.get('.day-table').find('thead').find('th').contains(day);
        })

        cy.get('.day-table').find('td').should('have.length', 24*7)

        cy.get('[data-hour=2020-04-27-22]').should('have.descendants', '.event')

        cy.get('.event').should('have.attr', 'data-obj')
        cy.get('.event').should('have.text', 'Evento 2')
        cy.get('.event').find('.fa').should('have.length', 3)

        cy.get('#week-input').type('2020-W19')

        const WEEK_TWO = ['2020-05-04','2020-05-05','2020-05-06','2020-05-07','2020-05-08','2020-05-09','2020-05-10',]

        WEEK_TWO.forEach((day) => {
            cy.get('.day-table').find('thead').find('th').contains(day);
        })
        

    })

    it('Verifica que los detalles de un evento pueden mostrarse y esconderse', () => {
        cy.server();
        cy.route('./src/services/events.json', 'fixture:events')
        .as('obtainEvents');

        cy.get('#week-input').type('2020-W17')

        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()

        cy.get('#event-modal').should('not.have.class', 'not-display')
        cy.get('#event-modal').should('be.visible')
        cy.get('#event-modal').should('have.descendants', '#event-information')
        cy.get('#event-information').should('have.attr', 'data-selected', '12020-04-26T22:39:50.984Z1')
        cy.get('#event-information').should('have.descendants', '#summary-modif')
            .and('have.descendants', '.duration-container')
            .and('have.descendants', '#description-modif')
            .and('have.descendants', '.creation-info')
            .and('have.descendants', '.attendee-box')
            .and('have.descendants', 'button')
        cy.get('#summary-modif').should('have.value', 'Evento 1')
        cy.get('#event-status').should('have.text', 'Status: pending')
        cy.get('#event-information').find('.duration-container').find('input').should('have.length', 19)
        cy.get('#description-modif').should('have.value', 'Descripción prolongada del evento 1')
        cy.get('.creation-info').find('.col').should('have.length', 2)
        cy.get('.creation-info').find('li').should('have.length', 2)
        cy.get('.attendee-box').find('.person').should('have.length', 3)
        cy.get('.attendee-box').find('.person').find('.custom-radio').should('have.length', 2)



        cy.get('#close-modal-button').click()

        cy.get('#event-modal').should('have.class', 'not-display')
        cy.get('#event-modal').should('not.be.visible')

        cy.get('#week-input').type('2020-W18')

        cy.get('[data-hour=2020-04-27-22]').find('.event').find('.fa-cog').click()
        cy.get('#event-modal').should('not.have.class', 'not-display')
        cy.get('#event-information').should('have.attr', 'data-selected', '12020-04-26T22:39:50.984Z2')
        cy.get('#event-information').should('have.descendants', '#summary-modif')
            .and('have.descendants', '.duration-container')
            .and('have.descendants', '#description-modif')
            .and('have.descendants', '.creation-info')
            .and('have.descendants', '.attendee-box')
            .and('have.descendants', 'button')
        cy.get('#summary-modif').should('have.value', 'Evento 2')
        cy.get('#event-status').should('have.text', 'Status: pending')
        cy.get('#event-information').find('.duration-container').find('input').should('have.length', 19)
        cy.get('#description-modif').should('have.value', 'Descripción prolongada del evento 2')
        cy.get('.creation-info').find('.col').should('have.length', 2)
        cy.get('.creation-info').find('li').should('have.length', 2)
        cy.get('.attendee-box').find('.person').should('have.length', 3)
        cy.get('.attendee-box').find('.person').find('.custom-radio').should('have.length', 0)


    })
});

describe('Verifica que los eventos pueden ser modificados', () => {

    it('Verifica que el titulo de un evento pueda ser modificado', () => {
        cy.get('#summary-modif').clear().type('test')
        cy.get('#event-information button').click()

        cy.get('#week-input').type('2020-W18')
        cy.get('[data-hour=2020-04-27-22]').find('.event').find('.fa-cog').click()
        cy.get('#summary-modif').should('have.value', 'test')
    })
    it('Verifica que la fecha de comienzo de un evento pueda ser modificada', () => {
        cy.get('#event-information>.duration-container>input').eq(4).clear().type(28)
        cy.get('#event-information>.duration-container>input').eq(6).clear().type(9)
        cy.get('#event-information>.duration-container>input').eq(14).clear().type(28)
        cy.get('#event-information>.duration-container>input').eq(16).clear().type(10)

        cy.get('#event-information button').click()
        cy.get('#week-input').type('2020-W18')
        cy.get('[data-hour=2020-04-28-9]').find('.event').find('.fa-cog').click()
  
    })
    it('Verifica que la descripcion de un evento pueda ser modificada', () => {
        cy.get('#description-modif').clear().type('test description')
        cy.get('#event-information button').click()

        cy.get('#week-input').type('2020-W18')
        cy.get('[data-hour=2020-04-28-9]').find('.event').find('.fa-cog').click()
        cy.get('#description-modif').should('have.value', 'test description')   
        

    })
    it('Verifica que el usuario pueda marcar si asistira al evento', () => {
        cy.get('#close-modal-button').click()
        cy.get('#week-input').type('2020-W17')
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        cy.get('#yes-radio').check()
        cy.get('#event-information button').click()

        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        cy.get('.attendee-box').find('strong').contains('You were invited!').siblings('p').contains('Invitation accepted')

        cy.get('#close-modal-button').click()
    })

    it('Verifica que el evento pueda marcarse como confirmado', () => {
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-check-square-o').click()

        cy.get('[data-hour=2020-04-26-22]').find('.event').should('have.attr', 'style', 'background-color: rgb(67, 187, 239);')
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        
        cy.get('#event-information').find('strong').contains('Status: confirmed');

        cy.get('#close-modal-button').click()

    })
    it('Verifica que el evento pueda marcarse como cancelado', () => {
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-trash-o').click()
        cy.get('[data-hour=2020-04-26-22]').find('.event').should('have.attr', 'style', 'background-color: rgb(160, 160, 160);')
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        
        cy.get('#event-information').find('strong').contains('Status: cancelled');
        cy.get('#close-modal-button').click()
    })

});

describe('Verifica que puedan crearse eventos y luego ser modificados', () => {
    it('El modal para crear eventos puede ser abierto', () => {
        cy.get('#new-event-modal').should('have.class', 'not-display')
        cy.get('#new-event-button').click();
        cy.get('#new-event-modal').should('not.have.class', 'not-display')
    });

    it('Las opciones y verificación del formulario para crear eventos funcionan correctamente', () => {
        cy.get('#create-button').should('be.disabled');
        cy.get('#new-event-modal').find('.modal-form').find('input').should('have.length', 25)
        cy.get('#new-event-modal').find('.modal-form').find('button').should('have.length', 3)

        cy.get('#new-summary').clear().type('Test A');
        cy.get('#create-button').should('be.disabled');
        cy.get('#new-description').clear().type('Descripcion del test A');
        cy.get('#create-button').should('be.disabled');

        cy.get('#new-event-modal').find('.new-date').eq(1).clear().type('04');
        cy.get('#new-event-modal').find('.new-date').eq(2).clear().type('20');
        cy.get('#new-event-modal').find('.new-date').eq(3).clear().type('16');
        cy.get('#new-event-modal').find('.new-date').eq(4).clear().type('40');
        cy.get('#new-event-modal').find('.new-date').eq(6).clear().type('04');
        cy.get('#new-event-modal').find('.new-date').eq(7).clear().type('20');
        cy.get('#new-event-modal').find('.new-date').eq(8).clear().type('17');
        cy.get('#new-event-modal').find('.new-date').eq(9).clear().type('40');
        cy.get('#create-button').should('be.disabled');

        cy.get('#organizer-info').find('[type="radio"]').first().check();
        cy.get('#create-button').should('be.disabled');

        cy.get('#new-event-modal').trigger('mouseover');
        cy.get('#create-button').should('not.be.disabled');

        cy.get('#invite-button').click();
            cy.get('.new-person').should('have.length', 1);
            cy.get('.new-person').find('input').should('have.length', 3);

            cy.get('#new-event-modal').trigger('mouseover');
            cy.get('#create-button').should('be.disabled');

        cy.get('#invite-button').click();
            cy.get('.new-person').should('have.length', 2);
            cy.get('.new-person').find('input').should('have.length', 6);

        cy.get('#erase-invite-button').click();
            cy.get('.new-person').should('have.length', 1);
            cy.get('.new-person').find('input').should('have.length', 3);
        
        cy.get('.new-person-id').first().clear().type('123');
        cy.get('.new-person-name').first().clear().type('Test');
        cy.get('.new-person-email').first().clear().type('test@gmail.com');
        cy.get('#new-event-modal').trigger('mouseover');
        cy.get('#create-button').should('not.be.disabled');

    });

    it('Un evento puede crearse y, por tanto, registrarse en el calendario', () => {
        cy.get('#create-button').click();

        cy.get('[data-hour=2020-04-20-16]').find('.event').find('.fa-cog').click();

        cy.get('#summary-modif').should('have.value', 'Test A');
        cy.get('#event-status').should('have.text', 'Status: pending');
        cy.get('#event-information').find('.duration-container').find('input').should('have.length', 19);
        cy.get('#description-modif').should('have.value', 'Descripcion del test A');
        cy.get('.creation-info').find('.col').should('have.length', 2);
        cy.get('.creation-info').find('li').should('have.length', 2);
        cy.get('.attendee-box').find('.person').should('have.length', 2);
        cy.get('.attendee-box').find('.person').find('.custom-radio').should('have.length', 2);
    });

    it('El evento creado puede ser modificado como los demas', () => {
        cy.get('#event-information>.duration-container>input').eq(4).clear().type(28);
        cy.get('#event-information>.duration-container>input').eq(6).clear().type(9);
        cy.get('#event-information>.duration-container>input').eq(14).clear().type(28);
        cy.get('#event-information>.duration-container>input').eq(16).clear().type(10);
        cy.get('#no-radio').check();

        cy.get('#event-information button').click();
        cy.get('#week-input').type('2020-W18');
        cy.get('[data-hour=2020-04-28-9]').find('.event').find('.fa-cog').click();
        cy.get('#summary-modif').should('have.value', 'Test A');
        cy.get('.attendee-box').find('strong').contains('You were invited!').siblings('p').contains('Invitation rejected');
    });
});


