function getAllService() {
  return fetch("http://127.0.0.1:8080/service", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.ResultObject;
    })
    .catch((err) => {
      console.log("iserror");
      console.log(err);
      return [];
    });
}

function getService(service_id) {
  return fetch("http://127.0.0.1:8080/service/" + service_id, {
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

function getServiceDetail(service_id) {
  return fetch("http://127.0.0.1:8080/service/" + service_id + "/detail", {
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

function addService(req) {
  console.log(req);
  return fetch("http://127.0.0.1:8080/service/save", {
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

function updateService(req) {
  console.log(req);
  return fetch("http://127.0.0.1:8080/service/update/" + req.service_id, {
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

function deleteService(service_id) {
  return fetch("http://127.0.0.1:8080/service/archive/" + service_id, {
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
export {
  getAllService,
  getService,
  getServiceDetail,
  addService,
  updateService,
  deleteService,
};
