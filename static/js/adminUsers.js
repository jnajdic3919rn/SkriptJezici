function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    console.log(token);
    fetch('http://127.0.0.1:8090/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })/** 
        .then( res => {
            if (res.ok) {
                return res.json();
              } else {
                throw new Error(res);
              }
            })
            */
        .then(res => res.json())
        .then( data => {
           /// console.log(data);
            
            const lst = document.getElementById('usrLst');

             lst.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Email </th> <th> Admin </th> <th> Moderator </th> <th> Action </th> </tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.email}</td> <td> ${el.admin} </td> <td> ${el.moderator} <td>
                <a href="/admin/updateUser/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteUser(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
            
            /// <a href="/admin/updateUser/${el.id}" class="btn btn-primary update" id = "updateUser">
        })
    document.getElementById('usrBtn').addEventListener('click', e => {
        e.preventDefault();

        let adm = false;
        let mod = false;
        if(document.getElementById('admin').checked)
            adm = true;
        if(document.getElementById('moderator').checked)
            mod = true;

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value, 
            password: document.getElementById('password').value,
            admin: adm,
            moderator: mod,
            lastLogged: new Date()
        };
        
        fetch('http://127.0.0.1:8090/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json())
           /// .then( res => res.json() )
            .then( data => {
                if(data.msg){
                    alert(data.msg);
                    return;
                }
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('admin').checked = false;
                document.getElementById('moderator').checked = false;
                
                document.getElementById('usrLst').innerHTML += `<tr> <td> ${data.id} </td> <td> ${data.name} </td> <td> ${data.email}</td> <td> ${data.admin} </td> <td> ${data.moderator} <td>
                <a href="/admin/updateUser/${data.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${data.id}" class="btn btn-secondary btn-dark delete" onclick="deleteUser(this)">
                Delete
              </button>
            </td> </tr>`;
            })
    });

}

function deleteUser(obj) {
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:8090/admin/users/' + id, {
            method: 'DELETE'
        })

        var table = document.getElementById('usrLst');
        let i, row, colId;
        console.log(id);
        for (i = 1, row; row = table.rows[i]; i++) {
            colId = row.cells[0].innerText;
             if(colId === id){
                document.getElementsByTagName('tr')[i].remove();
             }
           }  
        }
}

function getCurrUser(){
    let token = document.cookie.split(';')[0].split('=')[1];
    console.log(token);
    if(token === ''){
        console.log("uso");
        return 'no user';
    }
    let payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

function bannedView(){
    var blurDiv = document.createElement("div");
    blurDiv.id = "blurDiv";
    blurDiv.style.cssText = "position:absolute; top:0; right:0; width:" + screen.width + "px; height:" + screen.height + "px; background-color: #000000; opacity:0.5; filter:alpha(opacity=50)";
 
    document.getElementsByTagName("body")[0].appendChild(blurDiv);
}
