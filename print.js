'use strict';

//Print Top Stories
function printStories(data) {
    var stories = [],
        i = 0,
        j = 0,
        segment = '',
        topStory = {};


    //console.log(data.zoneContents.length);
    for (i; i < data.zoneContents.length; i ++) {
        if (data.zoneContents[i].title.toLowerCase() === 'top stories') {
            //console.log('Match found:' + data.zoneContents[i].title + 'Length: '  + data.zoneContents[i].containerContents.length);
            for (j; j < data.zoneContents[i].containerContents.length; j++) {
                //Used to shorten concatenation of each story object
                segment = data.zoneContents[i].containerContents[j].cardContents;
                //Default top story object
                topStory = {
                    url: '',
                    headline: '',
                    imageUrl: '',
                    byLine: ''
                };
                topStory.url = `www.cnn.com ${segment.url}` || 'www.cnn.com';
                topStory.headline = segment.headlinePlainText || '';
                topStory.imageUrl = segment.media.elementContents.imageUrl || segment.media.elementContents.imageAlt;
                topStory.byLine =  segment.auxiliaryText || '';
                stories.push(topStory);
            }
        }
    }
    console.log('Stories:', stories);
    return stories;
}

//print error messages
function printError(error) {
    console.error(error.message);
}

module.exports.printStories = printStories;
module.exports.printError = printError;
