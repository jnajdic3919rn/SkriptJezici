const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];
function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    console.log(new Date().toISOString().replace('T', ' ').split('\.')[0]);

                fetch('http://127.0.0.1:8090/admin/messages')
                .then( res => res.json() )
                .then( data => {
                    let payload = token.split('.')[1];
                    let res = JSON.parse(atob(payload));
                    console.log(res);
                    let id = res.userId;
                           
                            fetch('http://127.0.0.1:8090/admin/users/' + id)
                            .then( res => res.json() )
                            .then( data2 => {
                                const lst = document.getElementById('msgLstAuto');
                                const lst1 = document.getElementById('msgLst');

                                lst.innerHTML += `<tr><th> ID </th> <th> Title </th> <th> Content </th> <th> Reciever </th> <th> Type </th> <th> Sent </th> </tr>`;
                                lst1.innerHTML += `<tr><th> ID </th> <th> Title </th> <th> Content </th> <th> Reciever </th> <th> Type </th> <th> Sent </th> <th> Action </th> </tr>`;
                                data.forEach( el => {
                                    console.log(data2.name + " " + el.auto + " " + el.sender + " " + el.userId);
                                    if(el.auto && el.sender === data2.name){
                                        const now = new Date().toISOString().split('T')[0];
                                        const dt = el.createdAt.split('T')[0];
                                        var d1 = Date.parse(now);
                                        var d2 = Date.parse(dt);
                                        const diffTime = Math.abs(d1 - d2);
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                        console.log(diffDays + " " + d1 + " " + d2);

                                        if(diffDays <= 10){
                                          lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.title} </td> <td> ${el.body} </td> <td> ${el.userId} </td> <td> ${el.type} </td> <td> ${el.createdAt} </td> </tr>`;
                                        }
                                        else{
                                            fetch('http://127.0.0.1:8090/admin/messages/' + el.id, {
                                                method: 'DELETE'
                                        })
                                       }
                                    }
                                    else if(el.auto === false && el.sender === data2.name){
                                        lst1.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.title} </td> <td> <button data-id="${el.id}" class="btn btn-primary update" onclick="readDes(this)">
                                        Show Description </button> </td> <td> ${el.userId} </td> <td> ${el.type} </td> <td> ${el.updatedAt} </td>
                                        <td>
                                        <button data-id="${el.id}" class="btn btn-primary update" onclick="updateMsg(this)">
                                        Choose to update
                                        </button>
                                        <button data-id="${el.id}" class="btn btn-primary btn-dark delete" onclick="deleteMsg(this)">
                                            Delete
                                        </button>
                                        </td>
                                        </tr>`;
                                    }
                                });
                           
                             });
                            /// <a href="/admin/updateUser/${el.id}" class="btn btn-primary update" id = "updateUser">
                        });

                        document.getElementById('send').addEventListener('click', e => {
                            e.preventDefault();
                            console.log("klik");
                            let payload = token.split('.')[1];
                            let res = JSON.parse(atob(payload));
                            console.log(res);
                            let username = res.user;
                            console.log(username);
                            let recId = -1;
                            fetch('http://127.0.0.1:8090/admin/users', {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            .then(res => res.json())
                            .then(usr => {
                                usr.forEach( el => {
                                    console.log("1" + el.name);
                                    console.log("2" + document.getElementById('user').value);
                                    if(el.name === document.getElementById('user').value)
                                        recId = el.id;
                                })
                                console.log("uidd " + recId);
                                if(recId != -1){
                                    const data = {
                                        title: document.getElementById('title').value,
                                        body: document.getElementById('body').value,
                                        auto: false,
                                        userId: recId,
                                        sender: username,
                                        type: document.getElementById('type').value
                                    }
                                    console.log(data);
                                    fetch('http://127.0.0.1:8090/admin/messages', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data)
                                    })
                                    .then(res => res.json())
                                    .then(newMsg => {
                                        if(newMsg.msg){
                                            alert(newMsg.msg);
                                            return;
                                        }
                                        fetch('http://127.0.0.1:8090/admin/messages/' + newMsg.id)
                                        .then(res => res.json())
                                        .then(msg => {
                                            const lst = document.getElementById('msgLst');
                                            lst.innerHTML += `<tr> <td> ${msg.id} </td> <td> ${msg.title} </td> <td> <button data-id="${msg.id}" class="btn btn-primary update" onclick="readDes(this)">
                                                    Show Description </button> </td> <td> ${msg.userId} </td> <td> ${msg.type} </td> <td> ${msg.updatedAt} </td>
                                                    <td>
                                                    <button data-id="${msg.id}" class="btn btn-primary update" onclick="updateMsg(this)">
                                                    Choose to update
                                                    </button>
                                                    <button data-id="${msg.id}" class="btn btn-primary btn-dark delete" onclick="deleteMsg(this)">
                                                        Delete
                                                    </button>
                                                    </td>
                                                    </tr>`;
                                        })
                                        document.getElementById('title').value = '';
                                        document.getElementById('body').value = '';
                                        document.getElementById('user').value = '';
                                    })
                                }

                            })
                           alert("User does not exist!");
                        });
                    
}

function readDes(obj){
    let id;
    id = obj.getAttribute('data-id');
    fetch('http://127.0.0.1:8090/admin/messages/' + id, {
            method: 'GET'
    })
    .then( res => res.json() )
        .then( data => {
            console.log(data);
            /// document.getElementById('reqTitle').remove();
           alert(data.body);
    });
}

function deleteMsg(obj) {
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:8090/admin/messages/' + id, {
            method: 'DELETE'
        })

        var table = document.getElementById('msgLst');
        let i, row, colId;
        console.log(id);
        for (i = 1, row; row = table.rows[i]; i++) {
            colId = row.cells[0].innerText;
             if(colId === id){
                document.getElementById('msgLst').deleteRow(i);
             }
           }  
        }
}

function updateMsg(obj){

    id = obj.getAttribute('data-id');

    fetch('http://127.0.0.1:8090/admin/messages/' + id)
    .then( res => res.json() )
    .then( data => {
        if(data.user == null){
            alert("User does not exist anymore!");
        }
        else{
            document.getElementById('title').value = data.title;
            document.getElementById('body').value = data.body;
            document.getElementById('user').value = data.user.name;
            alert("User does not exist!");
            document.getElementById('user').disabled = true;
            const action = document.getElementById('action');
            document.getElementById('cancelBtn').remove();
            action.innerHTML += `<button data-id="${id}" type="submit" class="btn btn-primary btn-white" id="update" onclick="update(this)">Update</button>`
            action.innerHTML += `<button data-id="${id}" type="cancel" class="btn btn-primary btn-dark" id="cancel" onclick="cancel(this)">Cancel</button>`
        }
    });

}

function update(obj){
    id = obj.getAttribute('data-id');
 
    const data = { 
        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        type: document.getElementById('type').value
    }
           
            fetch('http://127.0.0.1:8090/admin/messages/'+id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         }).then(res => res.json())
           .then(data => {
            if(data.msg){
                alert(data.msg);
                return;
            }
            let up = confirm("Message updated!");
        
    var table = document.getElementById('msgLst');
    let i, row, colId;
        
    for (i = 1, row; row = table.rows[i]; i++) {
        colId = row.cells[0].innerText;
        if(colId === id){
             document.getElementById('msgLst').deleteRow(i);
             fetch('http://127.0.0.1:8090/admin/messages/'+id)
             .then(res => res.json())
             .then(el =>{
                table.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.title} </td> <td> <button data-id="${el.id}" class="btn btn-primary update" onclick="readDes(this)">
                Show Description </button> </td> <td> ${el.userId} </td> <td> ${el.type} </td> <td> ${el.updatedAt} </td>
                <td>
                <button data-id="${el.id}" class="btn btn-primary update" onclick="updateMsg(this)">
                Choose to update
                </button>
                <button data-id="${el.id}" class="btn btn-primary btn-dark delete" onclick="deleteMsg(this)">
                    Delete
                </button>
                </td>
                </tr>`;
             })
             
        }
     }  
    })
    document.getElementById('update').remove();
    document.getElementById('cancel').remove();
    document.getElementById('action').innerHTML += `<button type="btn" class="btn btn-primary btn-dark" id="cancelBtn">Cancel</button>`;
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('user').value = '';
    document.getElementById('user').disabled = false;
}

function cancel(obj){
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('user').disabled = false;
    document.getElementById('user').value = '';
    document.getElementById('update').remove();
    document.getElementById('cancel').remove();
    document.getElementById('action').innerHTML += `<button type="btn" class="btn btn-primary btn-dark" id="cancelBtn" onclick="cancelAdd()">Cancel</button>`;

}

function cancelAdd(){

    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('user').disabled = false;
    document.getElementById('user').value = '';
}