function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];
   
    console.log(id);
    fetch('http://127.0.0.1:8090/admin/paintings/' + id)
    .then(res => res.json())
    .then(el => {
        document.getElementById('name').innerHTML += el.name;
        fetch('http://127.0.0.1:8090/admin/categories/' + el.categoryId)
        .then(res => res.json())
        .then(category => {
            document.getElementById('category').innerHTML += category.name;
            document.getElementById('about').innerHTML += el.description;
            document.getElementById('artist').innerHTML += el.artist;
            document.getElementById('year').innerHTML += el.year;
            document.getElementById('categoryLink').innerHTML += `<a href="/admin/categories/${el.categoryId}/paintings">${category.name}</a>`;
            document.getElementById('paintImage').innerHTML += `<img src="${el.image}" class="img-fluid sticky-top" style="top: 2-px;" alt="${el.name} loading="lazy">`;
          })
        });
    
}