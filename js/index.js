let items = $(".item-list .items");

let pictures = [
  {
    picture: "apple.png",
    count: 0,
  },
  {
    picture: "blue.png",
    count: 0,
  },
  {
    picture: "purple.png",
    count: 0,
  },
  {
    picture: "red.png",
    count: 0,
  },
  {
    picture: "silver.png",
    count: 0,
  },
  {
    picture: "strawberry.png",
    count: 0,
  },
  {
    picture: "yellow.png",
    count: 0,
  },
];

let changes = false;

fadeInTransitionItem();
function fadeInTransitionItem() {
  let timeDelay = 0;
  for (let i = 0; i < items.length; i++) {
    let element = $(items[i]);
    element = element[0];

    let divs = $(element).children("div");

    setTimeout(() => {
      for (let j = 0; j < divs.length; j++) {
        let randomSeed = Math.floor(Math.random() * pictures.length);

        $(divs[j])
          .children("img")
          .attr("src", "images/jewels/" + pictures[randomSeed].picture)
          .attr("data-id", pictures[randomSeed].picture.split(".")[0]);

        $(divs[j]).children("img").show();
        $(divs[j])
          .children("img")
          .attr("class", "animate__animated animate__backInDown");
      }
    }, (timeDelay += 100));
  }
  setTimeout(() => {
    newCheckItems();
  }, (timeDelay += 100));
}

function fadeOutTransitionItem() {
  let timeDelay = 0;
  for (let i = 0; i < items.length; i++) {
    let element = $(items[i]);
    element = element[0];

    let divs = $(element).children("div");

    setTimeout(() => {
      for (let j = 0; j < divs.length; j++) {
        $(divs[j])
          .children("img")
          .attr("class", "animate__animated animate__backOutDown");
        $(divs[j]).removeClass("active");
        $(divs[j]).children("img").fadeOut(900);
      }
    }, (timeDelay += 100));
  }
}

function checkItems() {
  changes = false;
  let timeDelay = 0;
  for (let i = 0; i < pictures.length; i++) {
    if (pictures[i].count >= 8) {
      for (let a = 0; a < items.length; a++) {
        let element = $(items[a]);
        element = element[0];

        let divs = $(element).children("div");

        setTimeout(() => {
          for (let j = 0; j < divs.length; j++) {
            let ids = $(divs[j]).children("img").attr("data-id");

            if (ids === pictures[i].picture.split(".")[0]) {
              changes = true;
              $("#respin").attr("disabled", changes);
              $(divs[j]).addClass("active");

              pictures[i].count--;
              setTimeout(() => {
                $(divs[j]).children("img").remove();
                $(divs[j]).removeClass("active");
              }, 2000);

              setTimeout(() => {
                resolveNewPosition();
              }, 2100);
            }
          }
        }, (timeDelay += 100));
      }
    }
  }

  $("#respin").attr("disabled", changes);
}

function resolveNewPosition() {
  for (let i = 0; i < items.length; i++) {
    const element = items[i];

    let divs = $(element).children("div");

    for (let j = 0; j < divs.length; j++) {
      const itemImage = divs[j];

      if ($(itemImage).children().length == 0) {
        if (j != 0) {
          $(divs[j - 1]).before(itemImage);
          changes = true;
        }
      }
    }
  }

  setTimeout(() => {
    addNewElement();
    setTimeout(() => {
      if (changes) newCheckItems();
      changes = false;
    }, 2000);
  }, 1000);
}

function addNewElement() {
  for (let i = 0; i < items.length; i++) {
    const element = items[i];

    let divs = $(element).children("div");

    for (let j = 0; j < divs.length; j++) {
      let randomSeed = Math.floor(Math.random() * pictures.length);

      let picture = pictures[randomSeed].picture;
      pictures[randomSeed].count++;
      const itemImage = divs[j];

      if ($(itemImage).children().length == 0) {
        $(itemImage).append(
          `<img src="images/jewels/${picture}" data-id="${
            picture.split(".")[0]
          }" class="animate__animated animate__backInDown" alt="" />`
        );
      }
    }
  }
}

function updateData() {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].count = 0;
  }
}

function newCheckItems() {
  updateData();
  for (let index = 0; index < pictures.length; index++) {
    for (let i = 0; i < items.length; i++) {
      const element = items[i];

      let divs = $(element).children("div");

      for (let j = 0; j < divs.length; j++) {
        const itemImage = divs[j];

        if (
          $(itemImage).children("img").attr("data-id") ===
          pictures[index].picture.split(".")[0]
        ) {
          pictures[index].count++;
        }
      }
    }
  }
  checkItems();
}

$("#respin").click(function () {
  updateData();
  fadeOutTransitionItem();
  setTimeout(() => {
    fadeInTransitionItem();
  }, 1500);
});
