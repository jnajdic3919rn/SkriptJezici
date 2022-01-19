function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];
   
    console.log(id);
    fetch('http://127.0.0.1:8090/admin/categories/' + id)
    .then(res => res.json())
    .then(el => {
            document.getElementById('name').innerHTML += el.name;
            document.getElementById('about').innerHTML += el.description;
            document.getElementById('century').innerHTML += el.century;
            document.getElementById('uploadedBy').innerHTML += el.moderator;
            document.getElementById('categoryImage').innerHTML += `<img src="${el.image}" class="img-fluid sticky-top" style="top: 2-px;" alt="${el.name} loading="lazy">`;
          });
    
}