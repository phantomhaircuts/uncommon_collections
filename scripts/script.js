var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key892LAYQL8OqDjw'}).base('appAKhLv2XNhfzfF4');

base('Table 1').select({
    maxRecords: 100,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {

    records.forEach(function(record) {
        let masonry = document.querySelector('.masonry');
        masonry.innerHTML += `
            <img src='${record.fields.Attachments[0].url}'/>
        </div>
    `
        console.log('Retrieved', record.get('Caption'));
        console.log(record.fields.Attachments[0].url);
    });
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});