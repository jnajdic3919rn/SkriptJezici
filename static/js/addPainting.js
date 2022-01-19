function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-2];
   
    fetch('http://127.0.0.1:8090/admin/categories/' + id)
    .then(res => res.json())
    .then(el => {
        const catLink = document.getElementById('categoryLink');
        catLink.innerHTML += `<a href="/admin/categories/${id}">${el.name}</a>`;
        document.getElementById('category').value = el.name;
              
    });

    document.getElementById('addPainting').addEventListener('click', e => {
            e.preventDefault();
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let userId = res.userId;
            let image = document.getElementById('image').value;
                   
            const data = {
                    name: document.getElementById('name').value,
                    description: document.getElementById('description').value,
                    artist: document.getElementById('artist').value,
                    image: '/public/paintings/'+ image.substring(image.lastIndexOf('\\') + 1),
                    year: parseInt(document.getElementById('year').value),
                    userId: userId,
                    categoryId: id,
           }
                    fetch('http://127.0.0.1:8090/admin/paintings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    }).then(res => res.json())
                      .then(data => {
                        if(data.msg){
                            alert(data.msg);
                            return;
                        }  
                        let up = confirm("Painting added!");
                        document.getElementById('name').value = '';
                        document.getElementById('description').value = '';
                        document.getElementById('artist').value = '';
                        document.getElementById('year').value = '';
                        document.getElementById('image').value = '';
                    })
            
        }); 
}