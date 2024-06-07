async function getTask() {
  try {
    const response = await fetch("http://localhost:3000/api/task");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const postTask = async (txt) => {
  try {
    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: txt,
        status: false,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/task/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const putTask = async (txt) => {
  try {
    txt.status = !txt.status;
    const response = await fetch(`http://localhost:3000/api/task/${txt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txt),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export { postTask, getTask, deleteTask, putTask };
