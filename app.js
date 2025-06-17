function getTime() {
  let date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dataSting = `${day}/${month}/${year}`;
  document.querySelector(".time").innerHTML = dataSting;
  document.querySelector(".timeSchedule").innerHTML = dataSting;

  setTimeout(getTime, 1000);
}
getTime();

let add_task = document.querySelector(".add-task");
let form = document.querySelector(".form");
let addButtom = document.createElement("button");
let startTime = document.createElement("input");
let endTime = document.createElement("input");
let input = document.createElement("input");
let categoryParent = document.createElement("select");
let categories = ["work", "health", "Personal", "study", "other"];

let parent = document.createElement("div");

let overaly = document.createElement("div");
let title = document.createElement("h3");
let titleTxt = document.createTextNode("Add_A_new_Task");
let header = document.createElement("div");
let txt = document.createElement("div");
let x = document.createTextNode("X");
let body = document.createElement("div");
let txtBody = document.createTextNode("Task Title");
let p = document.createElement("p");
let timeParent = document.createElement("div");
let cancelButtom = document.createElement("button");
let categoryLabel = document.createElement("label");
let complete = 0;
let pend = 0;
let comp = document.querySelector(".comp");
let tot = document.querySelector(".total");

// Sche

console.log(tot);

categoryLabel.textContent = "Category";
categories.forEach((cat) => {
  let option = document.createElement("option");
  option.value = cat.toLowerCase();
  option.text = cat;
  categoryParent.appendChild(option);
});
//

add_task.addEventListener("click", generate);
function generate() {
  txt.appendChild(x);

  title.appendChild(titleTxt);
  header.appendChild(title);
  header.appendChild(txt);

  header.classList.add("header");
  txt.className = "x";
  parent.appendChild(header);
  document.body.appendChild(parent);
  parent.className = "form";
  overaly.className = "pop-overlay";
  document.body.appendChild(overaly);

  body.className = "body";
  // let input = document.createElement("input");

  p.appendChild(txtBody);
  body.appendChild(p);
  body.appendChild(input);
  parent.appendChild(body);

  //Category And Time
  // let categoryParent = document.createElement("select");
  // let categories = ["work","health", "Personal", "study", "other"];

  parent.appendChild(categoryLabel);
  categoryLabel.className = "catlabel";
  categoryParent.className = "cat";
  parent.appendChild(categoryParent);

  // Start Time
  // let startTime=document.createElement("input");
  // let endTime=document.createElement("input");
  endTime.type = "time";
  startTime.type = "time";
  timeParent.appendChild(startTime);
  timeParent.appendChild(endTime);
  parent.appendChild(timeParent);
  timeParent.className = "timeParent";
  startTime.className = "startTime";
  endTime.className = "endTime";

  // Footer
  let footer = document.createElement("div");
  footer.className = "footer";

  // let addButtom=document.createElement("button");
  cancelButtom.textContent = "Cancel";
  addButtom.textContent = "Add Task";
  cancelButtom.className = "cancel";
  addButtom.className = "addButtom";

  footer.appendChild(cancelButtom);
  footer.appendChild(addButtom);
  parent.appendChild(footer);

  // Close The Form

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("x")) {
      overaly.remove();
      parent.remove();
    } else if (e.target.classList.contains("cancel")) {
      overaly.remove();
      parent.remove();
    }
  });
  // Function Create Task
}
// let theBody=document.querySelector(".task-container .left .body");
let left = document.querySelector(".task-container .left");
let categoryCount = { work: 0, personal: 0, health: 0, study: 0, other: 0 };
addButtom.addEventListener("click", function () {
  if (input.value.trim() === "") {
    Swal.fire({
      text: "Add Task",
      icon: "error",
    });
    return;
  } else {
    let i = document.createElement("i");
    let theBody = document.createElement("div");
    let icons = document.createElement("div");
    let check = document.createElement("input");

    theBody.classList.add("body");

    let task = document.createElement("div");
    task.classList.add("task");
    check.type = "checkbox";
    check.id = "check";
    check.classList.add("check");
    let info = document.createElement("div");
    info.classList.add("info");
    info.innerHTML = input.value;

    let taskCat = document.createElement("span");
    taskCat.classList.add("task-category");
    taskCat.classList.add(categoryParent.value);
    taskCat.innerHTML = `${categoryParent.value}`;
    let taskTime = document.createElement("span");
    taskTime.classList.add("task-time");
    taskTime.innerHTML = `${startTime.value}-${endTime.value}`;
    task.appendChild(check);
    task.appendChild(info);
    task.appendChild(taskCat);
    task.appendChild(taskTime);
    icons.classList.add("icons");
    i.classList.add("fa-solid");
    i.classList.add("fa-trash");
    i.classList.add("trash");
    icons.appendChild(i);
    theBody.appendChild(task);
    theBody.appendChild(icons);
    left.appendChild(theBody);
    // Task for Schdule
    let taskForsceh = document.createElement("div");
    let startHour = parseInt(startTime.value.slice(0, 2));

    taskForsceh.className = "task";

    taskForsceh.innerHTML = input.value;
let taskSlot = document.querySelector(`.task${startHour} .tasks`);
if(taskSlot)
{
  taskSlot.appendChild(taskForsceh);
}
    categoryCount[categoryParent.value]++;
    updateChart();

    overaly.remove();
    parent.remove();
    input.value = "";
    pend++;
    comp.innerHTML = `Completed: ${complete} | Pending: ${pend}`;
    tot.innerHTML = `Total : ${complete + pend}`;
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("trash")) {
    e.target.parentNode.parentNode.remove();
    let taskCategory =
      e.target.parentNode.parentNode.querySelector(".task-category").innerHTML;
    categoryCount[taskCategory]--;
    updateChart(); //
    if (
      e.target.parentNode.parentNode
        .querySelector(".info")
        .classList.contains("line")
    ) {
      complete--;
      comp.innerHTML = `Completed: ${complete} | Pending: ${pend}`;
      tot.innerHTML = `Total : ${complete + pen}`;
    } else {
      pend--;
      comp.innerHTML = `Completed: ${complete} | Pending: ${pend}`;
      tot.innerHTML = `Total : ${complete + pend}`;
    }
  }
});

// Remove All

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("check")) {
    e.target.classList.add("checked");
    let deletedtext = e.target.parentElement.querySelector(".info");
    deletedtext.classList.toggle("line");
    if (deletedtext.classList.contains("line")) {
      complete++;
      pend--;
    } else {
      complete--;
      pend++;
    }
    comp.innerHTML = `Completed: ${complete} | Pending: ${pend}`;
    tot.innerHTML = `Total : ${complete + pend}`;
  }
});
const ctx = document.getElementById("timeDistributionChart").getContext("2d");
let timeDistributionChart;

function updateChart() {
  const data = [
    categoryCount.work,
    categoryCount.personal,
    categoryCount.health,
    categoryCount.study,
    categoryCount.other,
  ];

  if (timeDistributionChart) {
    timeDistributionChart.data.datasets[0].data = data;
    timeDistributionChart.update();
  } else {
    timeDistributionChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["work", "personal", "health", "study", "other"],
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#0000FF",
              "#008000",
              "#FF0000",
              "#FFFF00",
              "#808080",
            ],
            borderWidth: 1,
            borderColor: "#FFFFFF",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Task Categories", color: "#000000" },
        },
      },
    });
  }
}

updateChart();

// Today's Progress
// Azkar
let azkar = document.querySelector(".azkarcontainer");
let tastContainer = document.querySelector(".task-container");

document.querySelector(".azkar").addEventListener("click", function (e) {
  azkar.style.display = "block";
  tastContainer.style.display = "none";
  schedule.style.display = "none";
});
document.querySelector(".home").addEventListener("click", function (e) {
  azkar.style.display = "none";
  schedule.style.display = "none";

  tastContainer.style.display = "grid";
});

// schedule
let schedule = document.querySelector(".schedulecontainer");
document.querySelector(".schedule").addEventListener("click", function (e) {
  schedule.style.display = "block";
  tastContainer.style.display = "none";
  azkar.style.display = "none";
});

function generateSchedule() {
  let bodyOfTasks = document.querySelector(".schedulecontainer .body");

  // TaskNumber time tasksDivforEachClock  task
  // Apper The Container and dis

  for (let i = 0; i <= 23; i++) {
    let taskNumber = document.createElement("div");
    let timer = document.createElement("p");
    let tasksDivforEachClock = document.createElement("div");
    taskNumber.className = `task${i}`;
    timer.className = "timer";
    // tasksDivForSech.className=`tasks`;

    timer.innerHTML = `${i.toString().padStart(2, "0")}:00`;

    tasksDivforEachClock.className = `tasks`;
    taskNumber.appendChild(timer);
    taskNumber.appendChild(tasksDivforEachClock);
    // taskNumber.appendChild(tasksDivForSech);
    bodyOfTasks.appendChild(taskNumber);
  }

  // get the time in it
}

generateSchedule();
