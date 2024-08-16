let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");

  formValidation()
    .then(acceptData)
    .then(createPost)
    .catch((error) => {
      msg.innerHTML = error;
      console.log("failure:", error);
    });
});

let formValidation = () => {
  return new Promise((resolve, reject) => {
    if (input.value === "") {
      reject("Post cannot be blank");
    } else {
      console.log("success");
      msg.innerHTML = "";
      resolve();
    }
  });
};

let data = {};

let acceptData = () => {
  return new Promise((resolve) => {
    data["text"] = input.value;
    console.log(data);
    resolve();
  });
};

let createPost = () => {
  return new Promise((resolve) => {
    posts.innerHTML += `
    <div>
      <p>${data.text}</p>
      <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `;
    input.value = "";
    resolve();
  });
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};

let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};
