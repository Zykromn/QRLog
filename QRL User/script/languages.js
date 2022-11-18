// Vars and consts
let LANL_ItemKZ = $(".kz")
let LANL_ItemRU = $(".ru")
let LANL_ItemEN = $(".en")



// Main functions
LANL_ItemKZ.click(() => {
    document.cookie = "language=kz; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    window.location.href = 'index.html';
})
LANL_ItemRU.click(() => {
    document.cookie = "language=ru; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    window.location.href = 'index.html';})
LANL_ItemEN.click(() => {
    document.cookie = "language=en; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    window.location.href = 'index.html';
})
