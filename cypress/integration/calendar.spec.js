let fetchPolyfill;

before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
    .then((response) => {
        fetchPolyfill = response.body;
    });

    cy.visit('http://192.168.0.31:8080/', {
        onBeforeLoad(contentWindow) {
            delete contentWindow.fetch;
            contentWindow.eval(fetchPolyfill);
            contentWindow.fetch = contentWindow.unfetch;
        },
    });
});

describe ('Verifies the page is loading correctly', () => {
    it ('Verifies the events and calendar are loading', () => {
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

    it('Verifies week can be changed', () => {
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

    it('Verifies event details can be shown and hidden later', () => {
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
        cy.get('.duration-container').find('input').should('have.length', 19)
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
        cy.get('.duration-container').find('input').should('have.length', 19)
        cy.get('#description-modif').should('have.value', 'Descripción prolongada del evento 2')
        cy.get('.creation-info').find('.col').should('have.length', 2)
        cy.get('.creation-info').find('li').should('have.length', 2)
        cy.get('.attendee-box').find('.person').should('have.length', 3)
        cy.get('.attendee-box').find('.person').find('.custom-radio').should('have.length', 0)


    })
});

describe('Verifies events can be modified', () => {

    it('Verifies the summary of an event can be changed', () => {
        cy.get('#summary-modif').clear().type('test')
        cy.get('#event-information button').click()

        cy.get('#week-input').type('2020-W18')
        cy.get('[data-hour=2020-04-27-22]').find('.event').find('.fa-cog').click()
        cy.get('#summary-modif').should('have.value', 'test')
    })
    it('Verifies the starting time of an event can be changed', () => {
        cy.get('.duration-container>input').eq(4).clear().type(28)
        cy.get('.duration-container>input').eq(6).clear().type(9)
        cy.get('.duration-container>input').eq(14).clear().type(28)
        cy.get('.duration-container>input').eq(16).clear().type(10)

        cy.get('#event-information button').click()
        cy.get('#week-input').type('2020-W18')
        cy.get('[data-hour=2020-04-28-9]').find('.event').find('.fa-cog').click()
  
    })
    it('Verifies the description of an event can be changed', () => {
        cy.get('#description-modif').clear().type('test description')
        cy.get('#event-information button').click()

        cy.get('#week-input').type('2020-W18')
        cy.get('[data-hour=2020-04-28-9]').find('.event').find('.fa-cog').click()
        cy.get('#description-modif').should('have.value', 'test description')   
        

    })
    it('Verifies the response status of the user can be changed', () => {
        cy.get('#close-modal-button').click()
        cy.get('#week-input').type('2020-W17')
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        cy.get('#yes-radio').check()
        cy.get('#event-information button').click()

        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        cy.get('.attendee-box').find('strong').contains('You were invited!').siblings('p').contains('Invitation accepted')

        cy.get('#close-modal-button').click()
    })

    it('Verifies the event can be marked as confirmed', () => {
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-check-square-o').click()

        cy.get('[data-hour=2020-04-26-22]').find('.event').should('have.attr', 'style', 'background-color: rgb(67, 187, 239);')
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        
        cy.get('#event-information').find('strong').contains('Status: confirmed');

        cy.get('#close-modal-button').click()

    })
    it('Verifies the event can be marked as cancelled', () => {
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-trash-o').click()
        cy.get('[data-hour=2020-04-26-22]').find('.event').should('have.attr', 'style', 'background-color: rgb(160, 160, 160);')
        cy.get('[data-hour=2020-04-26-22]').find('.event').find('.fa-cog').click()
        
        cy.get('#event-information').find('strong').contains('Status: cancelled');
    })

})


