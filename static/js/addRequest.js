function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('addReq').addEventListener('click', e => {
            e.preventDefault();
            let payload = token.split('.')[1];
            let jsonpayload = JSON.parse(atob(payload));
            let currUser = jsonpayload.userId;
            const data = {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            date: document.getElementById('date').value,
            status: 'waiting',
            userId: currUser,
            };

            fetch('http://127.0.0.1:8090/admin/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.msg){
                    alert(data.msg);
                    return;
                }
                let up = confirm("Request added!");
            })

            document.getElementById('title').value = '';
            document.getElementById('body').value = '';
            document.getElementById('date').value = '';
    
        });
}