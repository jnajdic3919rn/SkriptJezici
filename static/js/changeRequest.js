function init() {
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:8090/admin/requests/' + id)
    .then( res => res.json() )
    .then( data => {
        document.getElementById('title').value = data.title;
        document.getElementById('body').value = data.body;
        document.getElementById('date').value = data.date;
        /// <a href="/admin/updateUser/${el.id}" class="btn btn-primary update" id = "updateUser">
    });

    document.getElementById('changeRequest').addEventListener('click', e => {
            e.preventDefault();
            
            fetch('http://127.0.0.1:8090/admin/requests/' + id)
            .then( res => res.json() )
            .then( el => {
                const data = {
                    name: document.getElementById('name').value,
                    body: document.getElementById('body').value,
                    date: document.getElementById('date').value,
                    status: el.status
                };
    
            fetch('http://127.0.0.1:8090/admin/requests/'+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.msg){
                    alert(data.msg);
                    return;
                }
                let up = confirm("User updated!");
            })
        });
        });
}