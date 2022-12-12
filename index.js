//fix the adding of the site with similar names and site name (lower and upper case)
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
                alert("Already have this site url")
                document.getElementById("header-container").reset()
                return false
            } 
            if(bookmarks[i].name.toLowerCase()===name.toLowerCase()){
                alert("Already have this site name")
                document.getElementById("header-container").reset()
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
        alert("Wrong URL form")
        return false
    }
    return true
}
