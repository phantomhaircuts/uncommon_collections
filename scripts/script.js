let Airtable = require('airtable');
let base = new Airtable({apiKey: config.apiKey}).base('appAKhLv2XNhfzfF4');

base('Table 1').select({
    maxRecords: 100,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {

    records.forEach(function(record) {
        let masonry = document.querySelector('.masonry');
        masonry.innerHTML += `
        <div class='img-wrapper'>
            <img src='${record.fields.Attachments[0].thumbnails.large.url}'/>
            <div class='hidden overlay'>${record.get('Caption') || 'This is filler'}</div>
        </div>
    `
        console.log('Retrieved', record.get('Caption'));
        console.log(record.fields.Attachments[0].url);
    });
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});