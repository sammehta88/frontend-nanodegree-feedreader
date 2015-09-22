/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /**
         * Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /**
         * Tests to make sure each feed object in the allFeeds array
         * has a url property defined and not empty
         */

        it('has a url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /**
         * Tests to make sure each feed object in the allFeeds array
         * has a name property defined and not empty
         */

        it('has a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {

        var body = $('body');
        var menuIcon = $('.menu-icon-link');


        /**
         * Tests that to make sure the menu is hidden by default by
         * checking if the body element has class menu-hidden
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Tests menu visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });


        /**
         * Tests when the loadFeed function is called and completes its work,
         * there is at least one single .entry element within the .feed container.
         */
        it('have at least one entry after feed is loaded', function(done) {
            //var entries = $('.feed').children('.entry');
            var entries = $('.entry');
            expect(entries.length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        /**
         * Tests that the content actually changes when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('is different after a new feed is loaded', function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });
}());