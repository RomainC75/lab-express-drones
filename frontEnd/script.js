const tbody = document.querySelector("tbody");

const deletedIndicator = document.getElementById("indiDeleted");
const errorIndicator = document.getElementById("indiError");

const removeItem = (drone, element) => {
  console.log("done._id", `http://localhost:3000/${drone._id}`);
  axios({
    method: "delete",
    url: `http://localhost:3000/drones/${drone._id}`,
  })
    .then((ans) => {
      console.log("ans", ans);
      element.remove();
      deletedIndicator.classList.remove("anim");
      window.setTimeout(()=>{
          deletedIndicator.classList.add("anim");
      })
    //   deletedIndicator.classList.remove("anim");
    })
    .catch((err) => {
      console.log("err", err);
      errorIndicator.classList.remove("anim");
      window.setTimeout(()=>{
          errorIndicator.classList.add("anim");
      })
    });
};

const toggleDisplay = () =>{

}

const insertDrone = (drone) => {
  const newTr = document.createElement("tr");
  newTr.innerHTML = `
            <th scope="row">${drone.name}</th>
            <td>${drone.propellers}</td>
            <td>${drone.maxSpeed}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" class="trashIcon" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></td>
        `;
  newTr.querySelector("td:last-child").addEventListener("click", () => {
    removeItem(drone, newTr);
  });
  tbody.appendChild(newTr);
};

axios({
  method: "get",
  url: "http://localhost:3000/drones",
}).then((ans) => {
  console.log(ans);
  ans.data.forEach((drone) => {
    insertDrone(drone);
  });
});

const name = document.getElementById("name");
const propellers = document.getElementById("propellers");
const maxSpeed = document.getElementById("maxSpeed");

document.querySelector("#add").addEventListener("click", (e) => {
  e.preventDefault();
  if (
    name.value.length > 0 &&
    propellers.value.length > 0 &&
    maxSpeed.value.length > 0
  ) {
    axios({
      method: "post",
      url: "http://localhost:3000/drones",
      data: {
        name: name.value,
        propellers: parseInt(propellers.value),
        maxSpeed: parseInt(maxSpeed.value),
      },
    })
      .then((ans) => {
        insertDrone(ans.data);
      })
      .catch((err) => console.log(err));
  }
});
