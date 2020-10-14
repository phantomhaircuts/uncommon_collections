let Airtable = require('airtable');
let base = new Airtable({apiKey: config.apiKey}).base('appAKhLv2XNhfzfF4');
let data;
base('Table 1').select({
    maxRecords: 100,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {

    records.forEach(function(record) {
        let masonry = document.querySelector('.masonry');
        masonry.innerHTML += `
        <div class='img-wrapper'>
            <img class='detail' id=${record.id} src='${record.fields.Attachments[0].thumbnails.large.url}'/>
            <div class='overlay'>${record.get('Caption') || 'This is filler'}</div>
        </div>
    `
    data = records;
    });
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
// Handle Click for Detail View
document.addEventListener('click', function (event) {
	if (!event.target.matches('.detail')) return;
	event.preventDefault();
	console.log(event.target.id);
    data.forEach(d => {if(d.id === event.target.id){
        console.log(d)
        let el = document.querySelector('.detail-modal');
        el.classList.toggle('hide')
        el.innerHTML = `
        <h2>${d.get('Caption') || 'This is filler'}</h2>
        <img class="detail-img" src='${d.fields.Attachments[0].thumbnails.full.url}'/>
        `
        }
    })
}, false);