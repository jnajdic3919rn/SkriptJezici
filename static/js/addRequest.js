function init() {

    document.getElementById('addReq').addEventListener('click', e => {
            e.preventDefault();
            const data = {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            date: document.getElementById('date').value,
            status: 'waiting',
            userId: 1,
            };

            fetch('http://127.0.0.1:8090/admin/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => {
                let up = confirm("Request added!");
            })

            document.getElementById('title').value = '';
            document.getElementById('body').value = '';
            document.getElementById('date').value = '';
    
        });
}