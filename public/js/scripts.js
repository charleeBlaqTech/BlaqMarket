const menuBar=document.querySelector('.hamburger')
const navBar=document.querySelector('.nav-bar')
const menuExit=document.querySelector('.fa-xmark')
const menuLinks=document.querySelectorAll('.link')
const mainImg=document.getElementById('mainImage')
const smImgs=document.querySelectorAll('.small-img')




if(menuBar){
    menuBar.addEventListener('click',()=>{
        navBar.classList.toggle('active-nav')
    })
}
if(menuExit){
    menuExit.addEventListener('click',()=>{
        navBar.classList.remove('active-nav')
    })
}
menuLinks.forEach((link)=>{
    link.addEventListener('click',()=>{
        navBar.classList.remove('active-nav')
    })
})


smImgs.forEach((image)=>{
    image.addEventListener('click',()=>{
        mainImg.src=image.src
    })
})



