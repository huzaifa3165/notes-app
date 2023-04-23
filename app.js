// If user click on the add button store it in to the local storage
seeNote()
let addList=JSON.parse(localStorage.getItem('notes'))
if(addList==null){
    addList=[]
}

let addNoteBtn = document.getElementById('addBtn');
addNoteBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addObj = addTxt.value;
    if (addObj != "") {
        // console.log(addObj, 'I am console')


        addList.push(addObj)
        // console.log(addList)

        let notes = localStorage.setItem('notes', JSON.stringify(addList))
        seeNote()
    }
    addTxt.value=''
    location.reload()
})

// Making a template of the notes maded and importing it to the right place

function seeNote(params) {

    // Making a template of the notes maded
    let html = ''
    let myNotes = localStorage.getItem('notes')
    let myNotesList = JSON.parse(myNotes)
    // console.log(myNotesList,'inside seeNote')
    if (myNotesList != null) {
        myNotesList.forEach(function (element, index) {
            if (element != "") {
                html += `
        <div class="card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-primary delBtn">Delete Note</button>
        </div>
      </div>`
            }
        });
        // console.log(html)

        //importing it to the right place
        let notesParent = document.getElementById('notes');
        notesParent.innerHTML = html
    }
    else{
        let notesParent = document.getElementById('notes');
        notesParent.innerHTML = 'No notes to show'
    }

} 


// If someone deleted the note

    

    let d = document.getElementsByClassName('delBtn')
    Array.from(d).forEach(function(element){
        element.addEventListener('click',function(e){
            let paragraph=element.parentNode.children[1]
            let pValue=paragraph.innerHTML
            let myNotes = localStorage.getItem('notes')
            let myNotesList = JSON.parse(myNotes)
            let NotesList=[]
            myNotesList.forEach(function(e){
                if(e!=pValue){
                    NotesList.push(e)
                }
            })
            console.log(NotesList)
            localStorage.setItem('notes',JSON.stringify(NotesList))
            seeNote()
            location.reload()
        })
    })

let search=document.getElementById('searchT')
// console.log(searchTxt)

search.addEventListener('input',function(e){
    let searchTxt = search.value
    if(searchTxt==""){
        seeNote()
}
else{
    // console.log('You have been typed something',searchTxt)
    let para = document.getElementsByClassName('card-text')
    // console.log(para)
    Array.from(para).forEach(function(element){
        // console.log(element)
        let elementValue= element.innerHTML
        // console.log(elementValue)
        if(elementValue.includes(searchTxt)){
            console.log('YOu got the value',elementValue)

        }
        else{
            element.parentNode.parentNode.style.display='none'
            
        }
    })}
})