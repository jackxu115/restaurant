import _ from 'lodash'
import './css/main.css'
import Beef from './img/beef.jpg'
import Chicken from './img/chicken.jpg'
import DimSum from './img/dim-sum.jpg'
import Gourmet from './img/gourmet.jpg'
import Seafood from './img/seafood.jpg'
import HotPot from './img/hot-pot.jpg'

const imgs = [Beef, Chicken, DimSum, Gourmet, Seafood, HotPot]
const navBar = ['home', 'menu', 'contact']

const data = {
    imgs,
    navBar,
    index: 0,
    timerID: null,
    singleImg: null,
    content: document.querySelector("#content"),
    contentChild: null
}

const timerHandler = () => {
    data.index++
    if (data.index === data.imgs.length) {
        data.index = 0
    }
    update(data.index)
}

const startAnimation = () => {
    data.timerID = setInterval(timerHandler, 3 * 1000)
}

const stopAnimation = () => {
    if (data.timerID) {
        clearInterval(data.timerID)
        data.timerID = null
    }
}

const update = index => {
    data.singleImg.src = data.imgs[index]
}

const cbClick = event => {
    data.content.removeChild(data.contentChild)
    const selection = event.target.id
    console.log(event.target.id)
    if (selection === "home") {
        data.content.appendChild(createHome())
    } else if (selection === "menu") {
        data.content.appendChild(createMenu())
    } else {
        data.content.appendChild(createContact())
    }
}

const cbMouseEnter = event => {
    stopAnimation()
}

const  cbMouseLeave = event => {
    startAnimation()
}

const createHeader = () => {
    const eleHeader = document.createElement('header')
    const eleName = document.createElement('h1')
    eleName.textContent = "Jack&Emily Foods"
    eleHeader.appendChild(eleName)
    return eleHeader

}

const createNavbar = () => {
    const eleNav = document.createElement('div')
    eleNav.classList.add('navBar')
    data.navBar.forEach(element => {
        let eleBtn = document.createElement('button')
        eleBtn.innerText = element
        eleBtn.setAttribute('id', `${element}`)
        eleBtn.addEventListener('click', cbClick)
        eleNav.appendChild(eleBtn)
    })
    return eleNav;
}

const createImg = () => {
    const eleImg = document.createElement('div')
    eleImg.classList.add('imgs')
    data.singleImg = document.createElement('img')
    data.singleImg.src = data.imgs[data.index]
    data.singleImg.classList.add('foodImg')
    data.singleImg.addEventListener('mouseenter', cbMouseEnter)
    data.singleImg.addEventListener('mouseleave', cbMouseLeave)
    eleImg.appendChild(data.singleImg)
    data.contentChild = eleImg
    return eleImg
}

const createFooter = () => {
    const eleFooter = document.createElement('footer')
    const eleProducer = document.createElement('p')
    eleProducer.textContent = "Created by Jack Xu"
    eleFooter.appendChild(eleProducer)
    return  eleFooter
}

const createHome = () => {
    const eleHome = document.createElement('div')
    eleHome.classList.add('home')
    const eleHeading = document.createElement('h2')
    eleHeading.textContent = "about"
    const eleContent = document.createElement('p')
    eleContent.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam aliquid commodi cumque distinctio eligendi eum fugiat illo, inventore labore magnam nam nobis non officia quasi quos sunt suscipit tenetur!"
    eleHome.appendChild(eleHeading)
    eleHome.appendChild(eleContent)
    data.contentChild = eleHome
    return eleHome
}

const createMenu = () => {
    const eleMenu = document.createElement('div')
    eleMenu.classList.add('menu')
    data.imgs.forEach(img => {
        let eleImg = document.createElement('img')
        eleImg.src = img
        eleMenu.appendChild(eleImg)
    })
    data.contentChild = eleMenu
    return eleMenu
}

const createContact = () => {
    const eleContact = document.createElement('div')
    eleContact.classList.add('contact')
    const elePhone = document.createElement('h2')
    elePhone.textContent = "phones"
    const eleNum1 = document.createElement('p')
    const eleNum2 = document.createElement('p')
    eleNum1.textContent = "xxx-xxx-xxxx"
    eleNum2.textContent = "xxx-xxx-xxxx"
    const eleAddress = document.createElement('h2')
    eleAddress.textContent = "Address"
    const eleAddressContent = document.createElement('p')
    eleAddressContent.textContent = "83-5838 Mosled Yaw, Atled, CB, 3A0C4v, Adanac"
    eleContact.appendChild(elePhone)
    eleContact.appendChild(eleNum1)
    eleContact.appendChild(eleNum2)
    eleContact.appendChild(eleAddress)
    eleContact.appendChild(eleAddressContent)
    data.contentChild = eleContact
    return eleContact
}

const loading = () => {
    document.body.prepend(createNavbar())
    document.body.prepend(createHeader())
    data.content.appendChild(createImg())
    document.body.appendChild(createFooter())
    startAnimation()
}

loading()
