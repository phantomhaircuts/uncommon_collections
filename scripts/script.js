var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key892LAYQL8OqDjw'}).base('appAKhLv2XNhfzfF4');

base('Table 1').select({
    maxRecords: 100,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        let masonry = document.querySelector('.masonry');
        masonry.innerHTML += `
            <img src='${record.fields.Attachments[0].url}'/> 
        </div>
    `
        console.log('Retrieved', record.get('Caption'));
        console.log(record.fields.Attachments[0].url);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});