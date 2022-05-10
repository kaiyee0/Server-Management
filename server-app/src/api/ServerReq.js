function addServer(req) {
  console.log(req);
  return fetch("http://127.0.0.1:8080/server/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("iserror");
      console.log(err);
      return [];
    });
}

function getServer(server_id) {
  console.log(server_id);
  return fetch("http://127.0.0.1:8080/server/" + server_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res.ResultObject;
    })
    .catch((err) => {
      console.log("iserror");
      console.log(err);
      return [];
    });
}

function updateServer(req) {
  console.log(req);
  req.server_type = parseInt(req.server_type);
  return fetch("http://127.0.0.1:8080/server/update/" + req.server_id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log("iserror");
      console.log(err);
      return [];
    });
}

function deleteServer(server_id) {
  return fetch("http://127.0.0.1:8080/server/archive/" + server_id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log("iserror");
      console.log(err);
      return [];
    });
}

export { addServer, getServer, updateServer, deleteServer };
