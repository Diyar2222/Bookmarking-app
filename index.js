let submitForm = document.getElementById("header-container")
submitForm.addEventListener('submit', addForm)


function addForm(e){
    e.preventDefault()
    let name = document.getElementById('website-name').value
    let url = document.getElementById('website-url').value
    let bookmark = {
        name: name,
        url:url
    }
    if(!validateForm(name,url)){
        return false
    }
    if(localStorage.getItem('bookmark')===null){
        if(name!="" && url != ""){
            let bookmarks=[]
        bookmarks.push(bookmark)
        localStorage.setItem('bookmark', JSON.stringify(bookmarks))
        }
        
    } else {
        if(name!="" && url != ""){
        let bookmarks = JSON.parse(localStorage.getItem('bookmark'))
        for(let i=0;i<bookmarks.length; i++){
            if(bookmarks[i].url===url){
                let name = bookmarks[i].name
                alert("уже есть такой сайт")
                document.getElementById("header-container").reset()
                let sitesDiv = document.querySelectorAll("#site-collection")
                for(let i=0; i<sitesDiv.length;i++){
                    let a = sitesDiv[i].innerText.indexOf(name)
                    console.log(sitesDiv[i])
                    if(a>-1){
                        sitesDiv[i].style.backgroundColor = "green"
                        // sitesDiv[i].className="green"
                    }
                }
                return false
            } 
        }
        bookmarks.push(bookmark)
        localStorage.setItem('bookmark', JSON.stringify(bookmarks))
        }
    }
    document.getElementById("header-container").reset()
    fetchBookmark()
}

function fetchBookmark(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmark'))
    let sitesDiv = document.getElementById('sites')
   
    sitesDiv.innerHTML=''
    for(let i=0; i<bookmarks.length;i++){
        let name = bookmarks[i].name
        let url = bookmarks[i].url
        
        sitesDiv.innerHTML += '<div id="site-collection">'+
        '<h3>'+name+'<span><a class="visit-delete" target="_blank" href="'+url+'">Visit</a> ' +
        ' <a onclick="deleteSite(\''+url+'\')" class="delete visit-delete" href="#">X</a> </span>' +
        '</h3>'+
        '</div>';
    }
}

function deleteSite(url){
    let bookmarks = JSON.parse(localStorage.getItem('bookmark'))
    for(let i=0; i<bookmarks.length;i++){
        if(bookmarks[i].url===url){
            bookmarks.splice(i,1)
        }
    }
  localStorage.setItem('bookmark',JSON.stringify(bookmarks))
  fetchBookmark()
}
function validateForm(name, url){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(url!="" && !url.match(regex)){
        alert("Неправильная форма URL")
        return false
    }
    return true
}
