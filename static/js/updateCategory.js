function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];
    let img;

    fetch('http://127.0.0.1:8090/admin/categories/' + id)
    .then( res => res.json() )
    .then( data => {
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description;
        document.getElementById('century').value = data.century;
        img = data.image;
        /// <a href="/admin/updateUser/${el.id}" class="btn btn-primary update" id = "updateUser">
    });


    document.getElementById('updateCategory').addEventListener('click', e => {
            e.preventDefault();
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let username = res.user;
            let image;
            if(document.getElementById('image').value == ""){
                console.log("nema slika");
                image = img;
            }
            else{
                console.log(image);
                image = document.getElementById('image').value;
                image = '/public/categories/'+ image.substring(image.lastIndexOf('\\') + 1);
            }
            const data = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                image: image,
                century: document.getElementById('century').value,
                moderator: username,
            };

            fetch('http://127.0.0.1:8090/admin/categories/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            }).then(res => res.json())
              .then(data => {
                if(data.msg){
                    alert(data.msg);
                    return;
                }
                let up = confirm("Category updated!");
            })
    
        });
}