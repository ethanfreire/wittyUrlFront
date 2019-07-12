document.addEventListener("DOMContentLoaded",()=> {

  fetchSocialMediaOptions()
  getNewRowButton().addEventListener("click", (event) => {
    addNewRow(event)
  })
  getSubmit().addEventListener("click", addToBackend)
})
/// add info to backend

function addToBackend(event){
  addUserToBackend(event)
   setTimeout(displayWittyUrlCard(event), 2000)

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
  // console.log(data)
  let user_id = object.id

  data.forEach((trElement)=>{

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
  newRowDropDownMenu.classList.add("dropDownSocialSites")
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

  // newRowFormInput.addEventListener("change",  fillOutFullUrl)


  /////
  newRowFormInput.placeholder = "Please fill this entry"
  newRowUiForm.append(newRowFormInput)
  newRowUserSocialSite.append(newRowUiForm)
  newRowContainer.append(newRowUserSocialSite)





  let tableBody = document.querySelector("#makeUserLinks > table > tbody")
  tableBody.append(newRowContainer)

  fetchSocialMediaOptions()


}

function displayWittyUrlCard(event){
  // document.querySelector("#makeUserLinks").innerHTML= ""
//overlap keeping the form on submit event
//on overlap display wittyUrl card with value from form
//add entry with wittyUrl
  console.log(event.currentTarget)

  //addDataToOverlay()

  on()



}
function on() {
  document.querySelector(".overlay").style.display = "block";
  // document.querySelector(".modal").style.display = "block";
  // document.querySelector(".content").style.display = "block";
  // document.querySelector(".h1").style.display = "block";
}

// function addDataToOverlay(){
//   let displayCardUserName =document.querySelector(".field").firstElementChild.nextElementSibling.value




//   let displayCardUserNameContainer = document.createElement("div")
//   displayCardUserNameContainer.classList.add("displayUserName")
// displayCardUserNameContainer.append(displayCardUserName)
// let overlayContainer = document.querySelector("#text")
// overlayContainer.append(displayCardUserNameContainer)
// }
//get you value on the form for user social Sites
//document.querySelectorAll(".userSocialSiteUrl")[0].firstElementChild.firstElementChild.value


//// helpers

function getSubmit(){
 let getSubmit = document.querySelector("#submitButton")
 return getSubmit
}
