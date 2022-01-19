function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-2];

    const add = document.getElementById('add');
    add.innerHTML += `  <a href="/admin/categories/${id}/addPaint" class="btn btn-primary border-shadow add">
    Add new paint
   </a>`;

    console.log(token);
    fetch('http://127.0.0.1:8090/admin/categories/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then( data => {
         console.log(data);
          
           fetch('http://127.0.0.1:8090/admin/paintings', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then(res => res.json())
            .then(data2 => {
                const lst = document.getElementById('paintingLst');
                console.log(data2);
                data2.forEach( el => {
                    if(el.categoryId === data.id){
                        lst.innerHTML += `<div class="col"> <a href="/admin/categories/${data.id}/paintings/${el.id}" class="col text-center category__link" id="link-${el.id}">
                        <div clas="category__img--ex shadow">
                            <img src="${el.image}" alt="${el.name} loading="lazy">
                        </div>
                            <div class="pt-1">${el.name}</div>
                        </a>
                        <br>
                        <div class="text-center">
                        <a href="/admin/categories/${data.id}/updatePaint/${el.id}" class="btn border-shadow update" id="edit-${el.id}">
                            Edit
                        </a>
                        <button data-id="${el.id}" id="delete-${el.id}" class="btn btn-secondary btn-dark delete" onclick="deletePainting(this)">
                        Delete
                        </button></div></div>`;
                    }
                });
            })
            
        })

    }

    function deletePainting(obj) {
        let result = confirm("Want to delete?");
        let id;
        if (result) {
             id = obj.getAttribute('data-id');
    
            fetch('http://127.0.0.1:8090/admin/paintings/' + id, {
                method: 'DELETE'
            })
            .then(res => {
                document.getElementById('delete-'+id).remove();
                document.getElementById('edit-'+id).remove();
                document.getElementById('link-'+id).remove();
            })
        }
    }