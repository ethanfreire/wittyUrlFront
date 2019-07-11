document.addEventListener("DOMContentLoaded",()=> {
  fetchSocialMediaOptions()
  getUserUrl().addEventListener("change",(event)=>{
    fillOutFullUrl(event)
  })
  getNewRowButton().addEventListener("click", (event) => {
    addNewRow(event)
  })
  getSubmit().addEventListener("click", addToBackend)
})
/// add info to backend

function addToBackend(event){
  addUserToBackend(event)
  
}

function fetchUserlinkPost(user_id, baselink_id, url){

  let formData = {
      user_id: user_id,
      baselink_id: baselink_id,
      url: url
  };
  
  let configObject = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
  };
  
  fetch("http://localhost:3000/api/v1/userlinks", configObject)
      .then(response => response.json())
      .then(object => {
          console.log(object)
      })
      .catch(error => {
          window.alert(error.message);
      });

}

function addUrlToBackend(object){
  let data = document.querySelectorAll(".formData")
  console.log(data)
  let user_id = object.id
  
  data.forEach((trElement)=>{
    debugger
    let dataSelectValue = trElement.children[0].children[0].value 
    let dataInputValue = trElement.children[1].children[0].children[0].value
    fetchUserlinkPost(user_id, dataSelectValue, dataInputValue)
  })
  
  
  // let baselink_id = document.("socialMediaDropDown").value
  // let url = document.getElementById("userSocialUrlId").value
 
  
}

function addUserToBackend(event){
  // let input = "wow"
  event.preventDefault()
  let hello
  let user = event.target.parentElement.children[0].children[1].value
  let formData = {
      username: user
  };
  
  let configObject = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
  };
  
  fetch("http://localhost:3000/api/v1/users", configObject)
      .then(response => response.json())
      .then(object => {
        addUrlToBackend(object) 
      })
      .catch(error => {
          window.alert(error.message);
      });
      
}



////
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
  socialMediaOption.value = objectSocialMediaOption.id
  socialMediaOption.innerText = objectSocialMediaOption.url
  let dropDownMenu = document.querySelector(`[data-select-id='${rowFix}']`)
  // this line needs to be fixed
  dropDownMenu.append(socialMediaOption)
  
}
////// url  
function getUserUrl(){
  let userFullUrl = document.querySelector("#userSocialUrlId")
  return userFullUrl
}

function fillOutFullUrl(event){
  console.log(event.target.value)
  let rows = document.querySelector(".socialMediaUrlTable").rows.length
  let rowParsedd = parseInt(rows)
  let rowFix = (rowParsedd - 1)
  let fullUrl = document.querySelector(`[data-full-url-id='${rowFix}']`)
 
  let urlSocialMediaSite =document.querySelector("#socialMediaDropDown").value
  fullUrl.innerText = urlSocialMediaSite + "/" +  event.target.value
}
////
function getNewRowButton(){
  let newRow = document.querySelector("#newRowButton")
  return newRow
}
function addNewRow(event){

  let newRowContainer = document.createElement("tr")
  newRowContainer.classList.add("formData")
  let currentNumberOfRows = document.querySelector(".socialMediaUrlTable").rows.length
  newRowContainer.id = currentNumberOfRows

  let newRowDropDownMenu = document.createElement("td")
  let newRowSelectMenu = document.createElement("select")
  //new
  newRowSelectMenu.dataset.selectId = currentNumberOfRows
  //new
  newRowDropDownMenu.append(newRowSelectMenu)
  newRowContainer.append(newRowDropDownMenu)

  let newRowUserSocialSite = document.createElement("td")
  // newRowUserSocialSite
  let newRowUiForm = document.createElement("div")
  newRowUiForm.classList = "ui form"
  let newRowFormInput = document.createElement("input")

  //////
  
  newRowFormInput.addEventListener("change",  fillOutFullUrl)
  

  /////
  newRowFormInput.placeholder = "Please fill this entry"
  newRowUiForm.append(newRowFormInput)
  newRowUserSocialSite.append(newRowUiForm)
  newRowContainer.append(newRowUserSocialSite)

  let newRowFullUrl= document.createElement("td")
  newRowFullUrl.dataset.fullUrlId = currentNumberOfRows
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


//// helpers

function getSubmit(){
 let getSubmit = document.querySelector("#submitButton")
 return getSubmit
}