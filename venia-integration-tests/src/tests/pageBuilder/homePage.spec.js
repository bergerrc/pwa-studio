
/// <reference types="cypress" />



context('Assert Venia Home Page pagebuilder content', () => {
    describe('Assert banner element exists with slider', () => {
        it('.should() - make an assertion about the current subject', () => {

            // cy.intercept('GET', '**/venia-hero1.jpg*', { fixture: 'mock-image-data/venia-hero1.jpg' }).as('getCMSMockImage')
            // cy.intercept('GET', '**/venia-hero2.jpg*', { fixture: 'mock-image-data/venia-hero2.jpg' }).as('getCMSMockImage2')
            // cy.intercept('GET', '**/graphql?query=query+GetCmsPage*', { fixture: 'mock-json-data/venia-home-page.json' }).as('getCMSMockData')
            cy.visit('/default/venia-tops.html?page=1')
            // cy.wait(['@getCMSMockImage']).its('response.body')
            // cy.wait(['@getCMSMockImage2']).its('response.body')
            // cy.wait(['@getCMSMockData']).its('response.body')
            cy.wait(5000);
            // cy.get('.venia-home-slider').invoke("text").should('contain', 'Shop the NewOuterwear Collection')
            // cy.get('[class^="slider-bannerWrapper-"]').eq(0).invoke('attr', 'style').should('contain', '/media/venia-hero1.jpg?auto=webp&format=pjpg&quality=85")')
            // cy.get('[class^="slider-bannerWrapper-"]').parents('.slick-active').should('have.attr', 'data-index', '0').and('have.attr', 'aria-hidden', 'false')
            // cy.get('ul[class="slick-dots"] > li').eq(1).click()
            // cy.get('*[class^="slider-bannerWrapper-"]').eq(1).invoke('attr', 'style').should('contain', '/media/venia-hero2.jpg?auto=webp&format=pjpg&quality=85")')
            // cy.get('[class^="slider-bannerWrapper-"]').parents('.slick-active').should('have.attr', 'data-index', '1').and('have.attr', 'aria-hidden', 'false')
            // cy.get('ul[class="slick-dots"] > li').eq(1).should('have.class', 'slick-active')
            // cy.matchImageSnapshot('homepage');
            // cy.get('[class^="richContent-root-"]').eq(0).toMatchImageSnapshot('homepage');
            // cy.get('[class^="richContent-root-"]').eq(1).toMatchImageSnapshot('homepage2');
            // cy.get('[class^="richContent-root-"]').eq(2).toMatchImageSnapshot('homepage3');
            // cy.get('[class^="richContent-root-"]').eq(3).toMatchImageSnapshot('homepage4');
            // cy.get('[class^="richContent-root-"]').eq(4).toMatchImageSnapshot('homepage5');
            cy.get('[class^="category-headerButtons-"]').toMatchImageSnapshot('homepage6');
        })
    })
})