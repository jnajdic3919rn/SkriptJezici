function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    console.log(token);
    fetch('http://127.0.0.1:8090/admin/categories', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then( data => {
           /// console.log(data);
            
            const lst = document.getElementById('categoryLst');
            data.forEach( el => {
                lst.innerHTML += `<div class="col"> <a href="/admin/categories/${el.id}" class="col text-center category__link" id="link-${el.id}">
                <div clas="category__img--ex shadow">
                    <img src="${el.image}" alt="${el.name} loading="lazy">
                </div>
                    <div class="pt-1">${el.name}</div>
            </a>
            <br>
            <div class="text-center">
            <a href="/admin/categories/updateCategory/${el.id}" class="btn border-shadow update" id="edit-${el.id}">
                Edit
            </a>
            <button data-id="${el.id}" id="delete-${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteCategory(this)">
            Delete
            </button></div></div>`;
            });
            
        })

    }

    function deleteCategory(obj) {
        let result = confirm("Want to delete?");
        let id;
        if (result) {
             id = obj.getAttribute('data-id');
    
            fetch('http://127.0.0.1:8090/admin/categories/' + id, {
                method: 'DELETE'
            })
            .then(res => {
                document.getElementById('delete-'+id).remove();
                document.getElementById('edit-'+id).remove();
                document.getElementById('link-'+id).remove();
            })
        }
    }