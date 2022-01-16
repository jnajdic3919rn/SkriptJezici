function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('addCategory').addEventListener('click', e => {
            e.preventDefault();
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let username = res.user;
            let image = document.getElementById('image').value;
            const data = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                image: '/public/categories/'+ image.substring(image.lastIndexOf('\\') + 1),
                century: document.getElementById('century').value,
                moderator: username,
            };

            fetch('http://127.0.0.1:8090/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => {
                let up = confirm("Category added!");
            })

            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('century').value = '';
            document.getElementById('image').value = '';
    
        });
}