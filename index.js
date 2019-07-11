document.addEventListener("DOMContentLoaded",()=> {

  fetchSocialMediaOptions()
  getNewRowButton().addEventListener("click", (event) => {
    addNewRow(event)
  })

  let submitForm = document.querySelector("#makeUserLinks")
  submitForm.addEventListener("submit", (event) => {
    
    displayWittyUrlCard(event)
  })

})
function fetchSocialMediaOptions(){

  fetch("http://localhost:3000/api/v1/baselinks")
  .then(resp => resp.json())
  .then(arraySocialMediaOptions => iterateThroughArraySocialMedia(arraySocialMediaOptions))
}

function iterateThroughArraySocialMedia(arraySocialMediaOptions){
  arraySocialMediaOptions.forEach((objectSocialMediaOption)=> addToDropDown(objectSocialMediaOption))
}

function addToDropDown(objectSocialMediaOption){

  let rows = document.querySelector(".socialMediaUrlTable").rows.length
  let rowParsedd = parseInt(rows)
  let rowFix = (rowParsedd - 1)
  let socialMediaOption = document.createElement("option")
  socialMediaOption.id = objectSocialMediaOption.id
  socialMediaOption.value = objectSocialMediaOption.url
  socialMediaOption.innerText = objectSocialMediaOption.url
  let dropDownMenu = document.querySelector(`[data-select-id='${rowFix}']`)
  // this line needs to be fixed
  dropDownMenu.append(socialMediaOption)


}

function getUserUrl(){
  let arrayUserFullUrl = document.querySelectorAll(".userSocialSiteUrl")

  arrayUserFullUrl.forEach((userUrl)=> userUrl.addEventListener("change", (event)=>{

    fillOutFullUrl(event)
  }))
}

function fillOutFullUrl(event){
  //edit to more general

  console.log(event.target.value)
  // debugger
  // let fullUrl = document.querySelector(".fullUrlSocialSite")
  //
  // let urlSocialMediaSite =document.querySelector("#socialMediaDropDown").value
  // fullUrl.innerText = urlSocialMediaSite + "/" +  event.target.value

}

function getNewRowButton(){
  let newRow = document.querySelector("#newRowButton")
  return newRow
}
function addNewRow(event){

  let newRowContainer = document.createElement("tr")

  let currentNumberOfRows = document.querySelector(".socialMediaUrlTable").rows.length

  newRowContainer.id = currentNumberOfRows

  let newRowDropDownMenu = document.createElement("td")
  newRowDropDownMenu.classList.add("dropDownSocialSites")
  let newRowSelectMenu = document.createElement("select")
  newRowSelectMenu.dataset.selectId = currentNumberOfRows
  newRowDropDownMenu.append(newRowSelectMenu)
  newRowContainer.append(newRowDropDownMenu)

  let newRowUserSocialSite = document.createElement("td")
  newRowUserSocialSite.classList.add("userSocialSiteUrl")
  let newRowUiForm = document.createElement("div")
  newRowUiForm.classList = "ui form"
  let newRowFormInput = document.createElement("input")
  newRowFormInput.placeholder = "Please fill this entry"
  newRowUiForm.append(newRowFormInput)
  newRowUserSocialSite.append(newRowUiForm)
  newRowContainer.append(newRowUserSocialSite)

  let newRowFullUrl= document.createElement("td")
  newRowFullUrl.classList.add("fullUrlSocialSite")
  let newRowFullUrlDiv = document.createElement("div")
  newRowFullUrlDiv.classList = "field"
  let newRowFullUrlInput = document.createElement("input")
  newRowFullUrlInput.placeholder = ""
  newRowFullUrlDiv.append(newRowFullUrlInput)
  newRowFullUrl.append(newRowFullUrlDiv)
  newRowContainer.append(newRowFullUrl)



  let tableBody = document.querySelector("#makeUserLinks > table > tbody")
  tableBody.append(newRowContainer)

  fetchSocialMediaOptions()

}

function displayWittyUrlCard(event){
  console.log("submit button event => display card")

}

//get you value on the form for user social Sites
//document.querySelectorAll(".userSocialSiteUrl")[0].firstElementChild.firstElementChild.value


//// helpers

// function currentNumberOfRows(){
//   let rows = document.querySelector(".socialMediaUrlTable").rows.length
//   return rows
// }
