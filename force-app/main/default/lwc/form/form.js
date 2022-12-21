import { LightningElement } from "lwc";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default class Form extends LightningElement {
  firstName = window.localStorage.getItem("first_name") ?? "";
  lastName = "";
  isError = true;

  connectedCallback() {
    //check if any values were passed in

    console.log("start", { ...window.localStorage });
    if (window.localStorage.getItem("first_name")) {
      //An Id key is in the session Storage
      this.firstName = window.localStorage.getItem("first_name");
    }
  }

  // disconnectedCallback() {
  //   window.localStorage.setItem("first_name", this.firstName);
  // }

  handleChange(event) {
    console.log("inside Change", localStorage.getItem("first_name"));

    const field = event.target.name;
    if (field === "firstName") {
      this.firstName = event.target.value;

      window.localStorage.setItem("first_name", event.target.value);

      console.log(event.target.value);

      if (event.target.value) {
        console.log("false");
        this.isError = false;
      } else {
        console.log("true");

        this.Error = true;
      }
    } else if (field === "lastName") {
      this.lastName = event.target.value;
    }
  }

  get uppercasedFullName() {
    return `${this.firstName} ${this.lastName}`.toUpperCase();
  }

  handleCancel() {}

  handleSubmit() {
    postData("https://example.com/answer", { answer: 42 }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }

  contacts = [
    {
      Id: 1,
      Name: "Amy Taylor",
      Title: "VP of Engineering"
    },
    {
      Id: 2,
      Name: "Michael Jones",
      Title: "VP of Sales"
    },
    {
      Id: 3,
      Name: "Jennifer Wu",
      Title: "CEO"
    }
  ];
}
