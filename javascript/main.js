//-------------------------Create Array & Attribute for localStorage-----------------------------
let counter = 0
let get, get2, savedAllData = []

test =  JSON.parse(localStorage.getItem('savedData'));
console.log(test)

if(test == null){

     savedAllData = [];

}else{

    savedAllData = test;
}

//---------------------------- main & frist page data--------------------------------

const URL = 'https://saurav.tech/NewsAPI/top-headlines/category/general/us.json' 

fetch(URL)
.then(function(response) {
    return response.json()})
    .then(function (json) { 

       update(json)

    })


//----------------------------update HTML------------------------------

    function update(params) {

    const news = document.querySelector('.news') 
    news.innerHTML=""

    for(let i=0 ; i< params.articles.length ; i++){
    
    if((params.articles[i].title != null) && (params.articles[i].author != null) && (params.articles[i].source.name != null)){
   
    const div1 = document.createElement('div')
    div1.className = "col Sh-card"
    div1.style.maxWidth = "540px"

    news.append(div1)

    const div2 = document.createElement('div')
    div2.className = "card shadow-sm"
    div1.append(div2)

    const image = document.createElement('img')
    image.className = "bd-placeholder-img card-img-top"
    image.alt = "News image"
    image.style.width = "100%"
    image.style.height = "225px"
    image.src = params.articles[i].urlToImage
    div2.append(image)


    if( counter < 3){
    counter++
    const tagNew = document.createElement('div')
    tagNew.className = "badge bg-danger tag-new"
    tagNew.innerHTML = "new"
    div2.append(tagNew)
    }

    const div4 = document.createElement('div')
    div4.className = "card-body"
    div2.append(div4)

    const h4 = document.createElement('h4')
    h4.className = "title-text"
    h4.innerHTML = params.articles[i].title
    div4.append(h4)

    const p = document.createElement('p')
    p.className = "card-text author"
    p.innerHTML =  "author : " + params.articles[i].author
    div4.append(p)

    const pA = document.createElement('p')
    pA.className = "card-text source"
    pA.innerHTML =  "source : " + params.articles[i].source.name
    div4.append(pA)  

    const pB = document.createElement('p')
    pB.className = "card-text publishedAt"  
    pB.innerHTML =  "published At : " +  new Date(params.articles[i].publishedAt).toLocaleDateString('en-ZA' , params.articles[i].publishedAt)
    div4.append(pB)   

   
    const div5 = document.createElement('div')
    div5.className = " d-flex justify-content-between align-items-center"
    div4.append(div5)


    const div6 = document.createElement('div')
    div6.className = "btn-group"
    div5.append(div6)
   
    const button = document.createElement('a') 
    button.className = "btn btn-outline-primary "
    button.type = "button" 
    button.href = params.articles[i].url
    button.target = "_blank"
    button.innerHTML = "Read more" 
    button.id = "Read-more" + i
    div6.append(button) 

    const button2 = document.createElement('button')
    button2.className = "btn btn-outline-primary Favorite"
    button.type = "button"
    button2.innerHTML = "Favorite"
    div6.append(button2) 


    button2.onclick = function () {

        let node1 = document.querySelector('#Read-more' + i);
   
         let node2 = node1.parentNode
         let node3 = node2.parentNode  
         let node4 = node3.parentNode
         let node5 = node4.children
         let node6 = node4.parentNode
         let node7 = node6.children
         let img = node7[0].currentSrc

         let nodeUrl =  node4.childNodes[4]
         let nodeUrl2 = nodeUrl.childNodes[0]
      

    const Favorite = {

        image : img,
        title : node4.childNodes[0].innerHTML,
        author : node4.childNodes[1].innerHTML,
        source : node4.childNodes[2].innerHTML,
        publishedAt : node4.childNodes[3].innerHTML,
        url: nodeUrl2.childNodes[0].href
    }


    savedAllData.push(Favorite);
    localStorage.setItem("savedData", JSON.stringify(savedAllData));


      }

    }

  }
}

//----------------------------------select category News-----------------------------

function category(category){

    counter=0

    fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${category}/us.json`)
    .then(function(response) {
        return response.json()})
        .then(function (json) { 
      
           update(json)     

  });
}

//----------------------------------Search Countries News-----------------------------

document.querySelector('#search').addEventListener('click', (e)=>{

    e.preventDefault()

     let Countries  = document.querySelector(".d-flex").elements.item(0).value.toLowerCase();

     if(Countries === "india"){

        Countries = "in"

     }else if(Countries === "usa"){

        Countries = "us"
        
     }else if(Countries === "australia"){

        Countries = "au"

     }else if(Countries === "russia"){

        Countries = "ru"

     }else if(Countries === "france"){

        Countries = "fr"

     }else if(Countries === "united kingdom" || Countries === "uk"){

        Countries = "gb"

     }else{


        alert(" Countries available for search : \n India \n USA \n Australia \n Russia \n France \n United Kingdom ")
     }


        fetch(`https://saurav.tech/NewsAPI/top-headlines/category/general/${Countries}.json`)
        .then(function(response) {
            return response.json()})
            .then(function (json) {   
    
               update(json)
              
});

});



function Favorite(){

    get =  JSON.parse(localStorage.getItem('savedData'));
    const news = document.querySelector('.news') 
    news.innerHTML=""

    for(let i=0 ; i< get.length ; i++){
    

        const div1 = document.createElement('div')
        div1.className = "col Sh-card"
        div1.style.maxWidth = "540px"
    
        news.append(div1)
    
       
        const div2 = document.createElement('div')
        div2.className = "card shadow-sm"
        div1.append(div2)
    
        const image = document.createElement('img')
        image.className = "bd-placeholder-img card-img-top"
        image.alt = "News image"
        image.style.width = "100%"
        image.style.height = "225px"
        image.src = get[i].image
        div2.append(image)
    
        const div4 = document.createElement('div')
        div4.className = "card-body"
        div2.append(div4)
    
        const h4 = document.createElement('h4')
        h4.className = "title-text"
        h4.innerHTML =  get[i].title
        div4.append(h4)
    
        const p = document.createElement('p')
        p.className = "card-text author"
        p.innerHTML =   get[i].author
        div4.append(p)
    
        const pA = document.createElement('p')
        pA.className = "card-text source"
        pA.innerHTML =   get[i].source
        div4.append(pA)  
    
        const pB = document.createElement('p')
        pB.className = "card-text publishedAt"
        pB.innerHTML =  get[i].publishedAt
        div4.append(pB)   
    
       
        const div5 = document.createElement('div')
        div5.className = " d-flex justify-content-between align-items-center"
        div4.append(div5)
    
    
        
        const div6 = document.createElement('div')
        div6.className = "btn-group"
        div5.append(div6)
    


    const button = document.createElement('a')
    button.className = "btn btn-primary "
    button.innerHTML = "Read more" 
    button.target = "_blank"
    button.href = get[i].url
    button.id = "Read-more" + i
    div4.append(button) 

    const button3 = document.createElement('button')
    button3.className = "btn btn-primary delete"
    button3.innerHTML = "delete" 
    button3.id = "delete"+i
    button3.style.margin = "2px"
    div4.append(button3) 



    button3.onclick = function () {



       
        let note1 = document.querySelector('#delete'+i);
        let id = note1.id
        let nodeA = note1.parentNode
        let nodeB = nodeA.parentNode
        let nodeC = nodeB.parentNode
        console.log(nodeA)
        console.log(nodeB)
        console.log(nodeC)
        nodeC.style.display = "none"

        let index = id.charAt(id.length-1)
         savedAllData.splice(index, ++index);
         localStorage.setItem('savedData',JSON.stringify(savedAllData));


        
        }

    }
}

//---------------------------scrolls TOP------------------------------------

   
    let mybutton = document.querySelector('#myBtn');

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        
        scrollFunction()
    }

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    }

