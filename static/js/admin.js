/** 
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
*/

function init() {
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    document.getElementById('admin').addEventListener('click', e => {
        console.log("tok" + token);
        if(token === ''){
            alert('You are not logged in!');
         ///   window.location.href = 'http://127.0.0.1:8000/login';
        }
        else{
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let id = res.userId;
            console.log(id);

            window.location.href = 'http://127.0.0.1:8000/admin/users';
       }
        
    });

    document.getElementById('moderator').addEventListener('click', e => {
        if(token === ''){
            alert('You are not logged in!');
            window.location.href = 'http://127.0.0.1:8000/login';
        }
        else{
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let id = res.userId;
            console.log(id);
            window.location.href = 'http://127.0.0.1:8000/admin/requests';
        
        }
        
    });

    document.getElementById('messages').addEventListener('click', e => {
        if(token === ''){
            alert('You are not logged in!');
            window.location.href = 'http://127.0.0.1:8000/login';
        }
        else{
           window.location.href = 'http://127.0.0.1:8000/admin/messages';
        }
        
    });

    document.getElementById('categories').addEventListener('click', e => {
        if(token === ''){
            alert('You are not logged in!');
            window.location.href = 'http://127.0.0.1:8000/login';
        }
        else{
           window.location.href = 'http://127.0.0.1:8000/admin/categories';
        }
        
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '/login';
    });
}