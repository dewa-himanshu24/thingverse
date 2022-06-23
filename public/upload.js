const myForm = document.getElementById("my-form");
const inpFile = document.getElementById("inpFile");
const fileNameContainer = document.getElementById("file-name-container");



myForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const endpoint = window.location.origin + "/api/v1/3dmodels/uploads";
  const formData = new FormData();
  console.log(formData);
  formData.append(inpFile.files[0].name, inpFile.files[0]);
  const response = await fetch(endpoint, {
    method: "post",
    body: formData,
  });
  console.log(response);
  responseJson = await response.json();
  responseStatus = response.status;
  if (responseStatus == 200) {
    getAllFilesName();
  } else {
    alert(responseJson.message);
  }
});


window.addEventListener("load", (event) => {
  getAllFilesName();
});


function renderFileNames(fileNames) {
  let htmlStr = "";
  for (let i = 0; i < fileNames.length; i++) {
    htmlStr +=
      '<div><a href="/view-model.html?model-name=' +
      fileNames[i] +
      '">' +
      fileNames[i] +
      "</a></div>";
  }
  fileNameContainer.innerHTML = htmlStr;
}


async function getAllFilesName() {
  const response = await fetch(
    window.location.origin + "/api/v1/3dmodels/file-name",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson = await response.json();
  console.log(responseJson);
  const fileNames = responseJson;
  renderFileNames(fileNames);
}
