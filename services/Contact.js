const getClient = async (id, token) => {
    return fetch(`http://192.168.1.174:8080/api/user/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((errors) => console.log(errors));
};

const updateClient = async (id, token, data) => {
    return fetch(`http://192.168.1.174:8080/api/user/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
        },
        body:JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((errors) => console.log(errors));
};


export { getClient, updateClient };
