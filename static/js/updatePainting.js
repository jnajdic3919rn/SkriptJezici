function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let idPaint = urlParams[urlParams.length-1];
    let idCategory = urlParams[urlParams.length-3];
    let img;

    console.log(idPaint);
    console.log(idCategory);

    fetch('http://127.0.0.1:8090/admin/categories/' + idCategory)
    .then( res => res.json() )
    .then( el => {
        const catLink = document.getElementById('categoryLink');
        catLink.innerHTML += `<a href="/admin/categories/${el.id}" id="link">${el.name}</a>`;
        /// <a href="/admin/updateUser/${el.id}" class="btn btn-primary update" id = "updateUser">
    });

    fetch('http://127.0.0.1:8090/admin/paintings/' + idPaint)
    .then( res => res.json() )
    .then( data => {
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description;
        document.getElementById('year').value = data.year;
        document.getElementById('artist').value = data.artist;
        img = data.image;
        fetch('http://127.0.0.1:8090/admin/categories')
        .then(res => res.json())
        .then(el => {
            let categoryL = document.getElementById('categoryLst');
            el.forEach( catData => {
                categoryL.innerHTML +=
               `<option value="${catData.id}">${catData.name}</option>`;
            })
        })
        /// <a href="/admin/updateUser/${el.id}" class="btn btn-primary update" id = "updateUser">
    });


    document.getElementById('updatePainting').addEventListener('click', e => {
            e.preventDefault();
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let image;
            if(document.getElementById('image').value == ""){
                console.log("nema slika");
                image = img;
            }
            else{
                console.log(image);
                image = document.getElementById('image').value;
                image = '/public/paintings/'+ image.substring(image.lastIndexOf('\\') + 1);
            }
            var selected = document.getElementById('categoryLst');

                    const data = {
                        name: document.getElementById('name').value,
                        description: document.getElementById('description').value,
                        image: image,
                        year: document.getElementById('year').value,
                        artist: document.getElementById('artist').value,
                        categoryId: selected.options[selected.selectedIndex].value,
                    };

            fetch('http://127.0.0.1:8090/admin/paintings/' + idPaint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            }).then(res => {
                let up = confirm("Painting updated!");
                const catLink = document.getElementById('categoryLink');
                document.getElementById("link").remove();
                catLink.innerHTML += `<a href="/admin/categories/${selected.options[selected.selectedIndex].value}" id="link">${selected.options[selected.selectedIndex].text}</a>`;
            })

            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('year').value = '';
            document.getElementById('artist').value = '';
            document.getElementById('image').value = '';
    
        });
}